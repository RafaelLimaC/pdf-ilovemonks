import { pdfToImg } from "../utils/pdfUtils";
import { toast } from "sonner";
import FileDropzone from "./FileDropzone";

const HandlePDFToImg = () => {
  const handleFilesDrop = async (files: File[]) => {
    if (files.length > 1) {
      toast.error("Por favor, selecione apenas um arquivo PDF");
      return;
    }

    const pdf = files[0];
    if (pdf.type !== "application/pdf") {
      toast.error("Apenas arquivos PDF são permitidos");
      return;
    }

    try {
      const { imageUrl, imageName } = await pdfToImg(pdf);

      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = imageName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(imageUrl);

      toast.success("PDF convertido em imagem com sucesso!");
    } catch (error) {
      toast.error("Erro ao converter o PDF");
      console.error("Erro durante a conversão:", error);
    }
  };

  return (
    <div className="space-y-6">
      <FileDropzone onFilesDrop={handleFilesDrop} accept="application/pdf" multiple={false} />
    </div>
  );
}

export default HandlePDFToImg;

