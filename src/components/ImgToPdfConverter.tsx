import { imgToPDF } from "../utils/pdfUtils";
import { toast } from "sonner";
import FileDropzone from "./FileDropzone";

const HandleImgToPDF = () => {
  const handleFilesDrop = async (files: File[]) => {
    if (files.length > 1) {
      toast.error("Por favor, selecione apenas um arquivo");
      return;
    }

    const img = files[0];
    if (!img.type.startsWith("image/")) {
      toast.error("Apenas arquivos de imagem são permitidos");
      return;
    }

    try {
      const pdf = await imgToPDF(img);

      const blob = new Blob([pdf], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "converted.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Imagem convertida com sucesso!");
    } catch (error) {
      toast.error("Erro ao converter a imagem");
      console.error("Erro durante a conversão:", error);
    }
  };

  return (
    <div className="space-y-6">
      <FileDropzone onFilesDrop={handleFilesDrop} accept="image/*" multiple={false} />
    </div>
  );
}

export default HandleImgToPDF;
