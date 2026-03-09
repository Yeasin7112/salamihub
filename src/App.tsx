import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import CreateEidi from "./pages/CreateEidi";
import EidiPage from "./pages/EidiPage";
import SpinWheel from "./pages/SpinWheel";
import RoastGenerator from "./pages/RoastGenerator";
import Leaderboard from "./pages/Leaderboard";
import Founder from "./pages/Founder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create" element={<CreateEidi />} />
          <Route path="/eidi/:id" element={<EidiPage />} />
          <Route path="/spin" element={<SpinWheel />} />
          <Route path="/roast" element={<RoastGenerator />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
