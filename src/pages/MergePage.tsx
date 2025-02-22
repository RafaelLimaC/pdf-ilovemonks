import Header from "@/components/Header";
import PDFMerger from "@/components/PDFMerger";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Merge = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12 relative">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 absolute top-6 left-2 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <h1 className="text-xj font-bold text-center text-secondary">
          Juntar arquivos PDF
        </h1>
        <p className="text-center text-2xl font-light text-muted max-w-3xl m-auto mb-10">
          Mesclar e juntar PDFs e colocá-los em qualquer ordem que desejar. É
          tudo muito fácil e rápido!
        </p>

        <div className="max-w-3xl mx-auto">
          <PDFMerger />
        </div>
      </div>
    </div>
  );
};

export default Merge;
