import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-center text-xj font-bold text-secondary">
          Ferramentas online para os amantes de PDF
        </h1>

        <div className="mx-auto space-y-8">
          <div className="space-y-4 text-center">
            <p className="text-2xl font-light text-muted">
              Escolha uma das opções abaixo para começar, de Monk para Monk:
            </p>
          </div>

          <div className="mx-auto flex flex-col sm:flex-row max-w-3xl gap-8">
            <Button
              onClick={() => navigate("/merge")}
              className="h-20 w-full rounded-xl bg-accent text-2xl hover:bg-accent-foreground"
            >
              Juntar PDFs
            </Button>

            <Button
              onClick={() => navigate("/split")}
              className="h-20 w-full rounded-xl bg-accent text-2xl hover:bg-accent-foreground"
            >
              Dividir PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
