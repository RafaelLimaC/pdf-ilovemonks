import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Merge from "./pages/Merge";
import Split from "./pages/Split";
import ImgToPDFPage from "./pages/ImgToPDF";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/merge" element={<Merge />} />
        <Route path="/split" element={<Split />} />
        <Route path="/img-to-pdf" element={<ImgToPDFPage />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
