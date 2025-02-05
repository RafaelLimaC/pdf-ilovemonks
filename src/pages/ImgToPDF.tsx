import Header from "@/components/Header";
import HandleImgToPDF from "@/components/ImgToPDF";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


const ImgToPDFPage = () => {
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
        Transformar imagens em PDF
      </h1>
      <p className="text-center text-2xl font-light text-muted max-w-3xl m-auto mb-10">
        Converta suas imagens JPG/PNG para PDF.
      </p>

      <div className="max-w-3xl mx-auto">
          <HandleImgToPDF />
        </div>
    </div>
  </div>
  )
}   

export default ImgToPDFPage;
