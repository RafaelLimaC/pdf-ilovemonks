import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Merge from "./pages/MergePage";
import Split from "./pages/SplitPage";
import { Analytics } from "@vercel/analytics/react"
import ImgToPDFPage from "./pages/ImgToPdfPage";
import PdfToImagePage from "./pages/PdfToImgPage";

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
        <Route path="/pdf-to-img" element={<PdfToImagePage />} />
      </Routes>
    </BrowserRouter>
    <Analytics/>
  </TooltipProvider>
);

export default App;
