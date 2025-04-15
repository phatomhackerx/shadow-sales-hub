
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import ProdutoCadastro from "./pages/ProdutoCadastro";
import Vendas from "./pages/Vendas";
import Assinaturas from "./pages/Assinaturas";
import Relatorios from "./pages/Relatorios";
import Afiliados from "./pages/Afiliados";
import Financeiro from "./pages/Financeiro";
import Integracoes from "./pages/Integracoes";
import Cupons from "./pages/Cupons";
import Configuracoes from "./pages/Configuracoes";
import BotsAI from "./pages/BotsAI";
import NotFound from "./pages/NotFound";

const App = () => {
  // Create a QueryClient instance for React Query
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
      },
    },
  }));
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner 
          position="bottom-right" 
          expand 
          closeButton 
          theme="dark" 
          richColors 
          toastOptions={{
            style: { 
              background: 'hsl(var(--secondary))',
              border: '1px solid hsl(var(--border))',
              color: 'hsl(var(--foreground))',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            },
            className: "interactive-element",
            duration: 4000,
          }} 
        />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/produtos/novo" element={<ProdutoCadastro />} />
              <Route path="/produtos/:id" element={<ProdutoCadastro />} />
              <Route path="/produtos/editar/:id" element={<ProdutoCadastro />} />
              <Route path="/vendas" element={<Vendas />} />
              <Route path="/botsai" element={<BotsAI />} />
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
