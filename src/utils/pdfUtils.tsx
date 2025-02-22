import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

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
