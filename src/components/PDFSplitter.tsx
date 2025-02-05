import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { splitPDF } from "@/utils/pdfUtils";
import { useState } from "react";
import { toast } from "sonner";
import FileDropzone from "./FileDropzone";

const PDFSplitter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const handleFilesDrop = async (files: File[]) => {
    if (files.length > 1) {
      toast.error("Por favor, selecione apenas um arquivo");
      return;
    }

    const pdf = files[0];
    if (pdf.type !== "application/pdf") {
      toast.error("Apenas arquivos PDF são permitidos");
      return;
    }

    setFile(pdf);

    // Get total pages
    try {
      const pages = await splitPDF(pdf, "1-1", true);
      setTotalPages(pages);
    } catch (error) {
      toast.error("Erro ao ler o PDF");
      console.error(error);
    }
  };

  const handleSplit = async () => {
    if (!file) return;

    if (!pageRange.match(/^\d+(\s*-\s*\d+)?(\s*,\s*\d+(\s*-\s*\d+)?)*$/)) {
      toast.error("Formato inválido. Use: 1-3, 5, 7-9");
      return;
    }

    try {
      await splitPDF(file, pageRange);
      toast.success("PDF separado com sucesso!");
    } catch (error) {
      toast.error("Erro ao separar o PDF");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <FileDropzone onFilesDrop={handleFilesDrop} multiple={false} />

      {file && (
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="font-medium text-gray-700">Arquivo selecionado:</p>
            <p className="text-sm text-gray-600">{file.name}</p>
            <p className="mt-1 text-sm text-gray-600">
              Total de páginas: {totalPages}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Intervalo de páginas
            </label>
            <Input
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
              placeholder="Ex: 1-3, 5, 7-9"
              className="w-full ring-red-400 placeholder:text-gray-600"
            />
            <p className="text-xs text-gray-500">
              Use vírgulas para separar páginas ou intervalos (ex: 1-3, 5, 7-9).
              Caso queira apenas uma página, coloque apenas o número dela.
            </p>
          </div>

          <Button
            onClick={handleSplit}
            className="w-full hover:bg-accent"
            disabled={!pageRange}
          >
            Separar PDF
          </Button>
        </div>
      )}
    </div>
  );
};

export default PDFSplitter;
