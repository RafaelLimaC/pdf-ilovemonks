import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import * as pdf from "pdfjs-dist";

export async function mergePDFs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const fileBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(fileBuffer);
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));
  }

  return mergedPdf.save();
}

export async function splitPDF(
  file: File,
  pageRange: string,
  countOnly: boolean = false,
  splitEachPage: boolean = false
): Promise<number> {
  const fileBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(fileBuffer);
  const totalPages = pdf.getPageCount();

  if (countOnly) return totalPages;

  const ranges = pageRange.split(",").map((range) => {
    const [start, end] = range.split("-").map((num) => parseInt(num));
    return end ? { start: start - 1, end } : { start: start - 1, end: start };
  });

  if (splitEachPage) {
    const zip = new JSZip();
    for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();
      const [page] = await newPdf.copyPages(pdf, [i]);
      newPdf.addPage(page);

      const pdfBytes = await newPdf.save();
      zip.file(`page_${i + 1}.pdf`, pdfBytes);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "split_pages.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else {
    for (const range of ranges) {
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(
        pdf,
        Array.from({ length: range.end - range.start }, (_, i) => range.start + i)
      );

      pages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `split_${range.start + 1}-${range.end}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }

  return totalPages;
}

export async function imgToPDF(img: File): Promise<Uint8Array> {
  const imgBuffer = await img.arrayBuffer();
  const pdf = await PDFDocument.create();

  let imgData;
  if (img.type === "image/png") {
    imgData = await pdf.embedPng(imgBuffer);
  } else if (img.type === "image/jpeg" || img.type === "image/jpg") {
    imgData = await pdf.embedJpg(imgBuffer);
  } else {
    throw new Error("Formato de imagem não suportado!");
  }

  const page = pdf.addPage([imgData.width, imgData.height]);
  page.drawImage(imgData, {
    x: 0,
    y: 0,
    width: imgData.width,
    height: imgData.height,
  });

  return pdf.save();
}

export async function pdfToImg(file: File): Promise<{ imageUrl: string, imageName: string }> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      
      reader.onload = async function(event) {
        const pdfData = event.target?.result;
        if (!pdfData) {
          reject(new Error("Failed to read PDF file"));
          return;
        }
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) {
          reject(new Error("Canvas context could not be created"));
          return;
        }
        
        pdf.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdf.version}/pdf.worker.min.js`
        
        const loadingTask = pdf.getDocument(new Uint8Array(pdfData as ArrayBuffer));
        const pdfDocument = await loadingTask.promise;
        
        const page = await pdfDocument.getPage(1);
        
        const scale = 2; 
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        
        await page.render(renderContext).promise;
        
        const imageUrl = canvas.toDataURL('image/png');
        
        const originalName = file.name.replace(/\.pdf$/i, '');
        const imageName = `${originalName}.png`;
        
        resolve({ imageUrl, imageName });
      };
      
      reader.onerror = function() {
        reject(new Error("Error reading the file"));
      };
      
      reader.readAsArrayBuffer(file);
    } catch (error) {
      reject(error);
    }
  });
}
