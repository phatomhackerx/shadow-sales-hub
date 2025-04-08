
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
import NotFound from "./pages/NotFound";

// Páginas temporárias para as outras seções
const RelatoriosPage = () => (
  <div className="animate-fade-in">
    <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
    <p className="text-muted-foreground">Página em desenvolvimento</p>
  </div>
);

const AfiliadosPage = () => (
  <div className="animate-fade-in">
    <h1 className="text-2xl font-bold tracking-tight">Afiliados</h1>
    <p className="text-muted-foreground">Página em desenvolvimento</p>
  </div>
);

const FinanceiroPage = () => (
  <div className="animate-fade-in">
    <h1 className="text-2xl font-bold tracking-tight">Financeiro</h1>
    <p className="text-muted-foreground">Página em desenvolvimento</p>
  </div>
);

const IntegracoesPage = () => (
  <div className="animate-fade-in">
    <h1 className="text-2xl font-bold tracking-tight">Integrações</h1>
    <p className="text-muted-foreground">Página em desenvolvimento</p>
  </div>
);

const CuponsPage = () => (
  <div className="animate-fade-in">
    <h1 className="text-2xl font-bold tracking-tight">Cupons</h1>
    <p className="text-muted-foreground">Página em desenvolvimento</p>
  </div>
);

const ConfiguracoesPage = () => (
  <div className="animate-fade-in">
    <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
    <p className="text-muted-foreground">Página em desenvolvimento</p>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
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
            <Route path="/relatorios" element={<RelatoriosPage />} />
            <Route path="/afiliados" element={<AfiliadosPage />} />
            <Route path="/financeiro" element={<FinanceiroPage />} />
            <Route path="/integracoes" element={<IntegracoesPage />} />
            <Route path="/cupons" element={<CuponsPage />} />
            <Route path="/configuracoes" element={<ConfiguracoesPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
