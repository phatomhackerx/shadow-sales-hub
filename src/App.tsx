
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import Vendas from "./pages/Vendas";
import Assinaturas from "./pages/Assinaturas";
import Relatorios from "./pages/Relatorios";
import Afiliados from "./pages/Afiliados";
import Financeiro from "./pages/Financeiro";
import Integracoes from "./pages/Integracoes";
import Cupons from "./pages/Cupons";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const App = () => {
  // Move the queryClient creation inside the component function
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/vendas" element={<Vendas />} />
              <Route path="/assinaturas" element={<Assinaturas />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/afiliados" element={<Afiliados />} />
              <Route path="/financeiro" element={<Financeiro />} />
              <Route path="/integracoes" element={<Integracoes />} />
              <Route path="/cupons" element={<Cupons />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
