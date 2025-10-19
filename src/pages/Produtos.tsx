
import { useState } from "react";
import { Plus, Search, Filter, FileText, Edit, Trash2, Layout } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const produtos = [
  {
    id: 1,
    nome: "Curso de Marketing Digital",
    preco: "R$ 497,00",
    vendas: 145,
    revenue: "R$ 72.065,00",
    status: "Ativo"
  },
  {
    id: 2,
    nome: "Mentoria de Negócios",
    preco: "R$ 997,00",
    vendas: 78,
    revenue: "R$ 77.766,00",
    status: "Ativo"
  },
  {
    id: 3,
    nome: "E-book: Estratégias de Vendas",
    preco: "R$ 47,00",
    vendas: 312,
    revenue: "R$ 14.664,00",
    status: "Ativo"
  },
  {
    id: 4,
    nome: "Workshop de Vendas Online",
    preco: "R$ 197,00",
    vendas: 95,
    revenue: "R$ 18.715,00",
    status: "Inativo"
  },
  {
    id: 5,
    nome: "Assinatura Premium",
    preco: "R$ 97,00/mês",
    vendas: 203,
    revenue: "R$ 19.691,00",
    status: "Ativo"
  },
  {
    id: 6,
    nome: "Curso Mindset Empreendedor",
    preco: "R$ 297,00",
    vendas: 53,
    revenue: "R$ 15.741,00",
    status: "Em Revisão"
  }
];

const Produtos = () => {
  const { toast } = useToast();
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [pesquisa, setPesquisa] = useState("");
  
  const produtosFiltrados = produtos.filter(produto => {
    // Filtro por status
    if (filtroStatus !== "todos" && produto.status.toLowerCase() !== filtroStatus.toLowerCase()) {
      return false;
    }
    
    // Filtro por pesquisa
    if (pesquisa && !produto.nome.toLowerCase().includes(pesquisa.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  const handleDeleteProduct = (id: number) => {
    toast({
      title: "Produto excluído",
      description: "O produto foi excluído com sucesso.",
    });
  };
  
  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Produtos
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Gerencie seus produtos e serviços digitais</p>
        </div>
        <Link to="/produtos/novo" className="w-full sm:w-auto">
          <Button size="default" className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            <span>Novo Produto</span>
          </Button>
        </Link>
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input 
            type="text" 
            placeholder="Buscar produtos..." 
            className="grok-input pl-10 pr-4 py-2.5 w-full"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2 flex-1 sm:flex-none">
            <Filter className="h-3.5 w-3.5" />
            <span className="text-xs">Filtros</span>
          </Button>
          <select 
            className="grok-input px-3 py-2 text-xs flex-1 sm:flex-none"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
            <option value="em revisão">Revisão</option>
          </select>
          <select className="grok-input px-3 py-2 text-xs flex-1 sm:flex-none">
            <option value="recentes">Recentes</option>
            <option value="vendas">Mais vendidos</option>
            <option value="receita">Maior receita</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {produtosFiltrados.map((produto) => (
          <Card key={produto.id} className="grok-card group overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 flex justify-between items-start border-b border-border/40">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base group-hover:text-foreground/80 transition-colors truncate">{produto.nome}</h3>
                  <p className="text-foreground/90 text-sm font-semibold mt-1.5">{produto.preco}</p>
                </div>
                <Badge className={cn(
                  "ml-2 text-xs flex-shrink-0",
                  produto.status === "Ativo" 
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                    : produto.status === "Inativo"
                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                    : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                )}>
                  {produto.status}
                </Badge>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                <div className="bg-secondary/30 p-3 rounded-lg border border-border/40">
                  <p className="text-muted-foreground text-xs">Vendas</p>
                  <p className="font-semibold text-lg mt-1">{produto.vendas}</p>
                </div>
                <div className="bg-secondary/30 p-3 rounded-lg border border-border/40">
                  <p className="text-muted-foreground text-xs">Receita</p>
                  <p className="font-semibold text-lg mt-1 truncate">{produto.revenue}</p>
                </div>
              </div>
              <div className="p-4 border-t border-border/40 flex flex-col space-y-2">
                <div className="flex justify-between items-center gap-2">
                  <Link to={`/produtos/${produto.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="gap-2 w-full text-xs">
                      <FileText className="h-3.5 w-3.5" />
                      <span>Detalhes</span>
                    </Button>
                  </Link>
                  <div className="flex space-x-1">
                    <Link to={`/produtos/editar/${produto.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-foreground hover:bg-secondary/60">
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 hover:text-red-400 hover:bg-red-400/10"
                      onClick={() => handleDeleteProduct(produto.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <Link to={`/produtos/${produto.id}/checkout-builder`}>
                  <Button variant="outline" size="sm" className="w-full gap-2 text-xs border-border/60 hover:bg-secondary/60">
                    <Layout className="h-3.5 w-3.5" />
                    <span>Checkout Builder</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {produtosFiltrados.length === 0 && (
        <div className="grok-card text-center p-8 md:p-12">
          <p className="text-muted-foreground">Nenhum produto encontrado.</p>
          <Link to="/produtos/novo" className="inline-block mt-4">
            <Button size="default" className="gap-2">
              <Plus className="h-4 w-4" />
              <span>Criar Novo Produto</span>
            </Button>
          </Link>
        </div>
      )}
      
      {produtosFiltrados.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <p className="text-xs text-muted-foreground">Mostrando {produtosFiltrados.length} de {produtos.length} produtos</p>
          <div className="flex space-x-2 justify-center sm:justify-end">
            <Button variant="outline" size="sm" className="text-xs h-8" disabled>Anterior</Button>
            <Button variant="default" size="sm" className="text-xs h-8">1</Button>
            <Button variant="outline" size="sm" className="text-xs h-8" disabled>Próximo</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produtos;
