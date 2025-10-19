
import { useState } from "react";
import { Plus, Search, Filter, FileText, Edit, Trash2, Layout } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

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
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-gradient">Produtos</span>
          </h1>
          <p className="text-muted-foreground mt-2">Gerencie seus produtos e serviços digitais</p>
        </div>
        <Link to="/produtos/novo">
          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            <span>Novo Produto</span>
          </Button>
        </Link>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar produtos..." 
            className="grok-input pl-10 pr-4 py-3 w-full sm:w-96 rounded-xl"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </Button>
          <select 
            className="grok-input px-4 py-2 rounded-xl"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="todos">Todos os status</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
            <option value="em revisão">Em Revisão</option>
          </select>
          <select className="grok-input px-4 py-2 rounded-xl">
            <option value="recentes">Mais recentes</option>
            <option value="vendas">Mais vendidos</option>
            <option value="receita">Maior receita</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtosFiltrados.map((produto) => (
          <Card key={produto.id} className="grok-card group">
            <CardContent className="p-0">
              <div className="p-5 flex justify-between items-start border-b border-border/50">
                <div>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{produto.nome}</h3>
                  <p className="text-primary text-base font-bold mt-2">{produto.preco}</p>
                </div>
                <Badge className={
                  produto.status === "Ativo" 
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                    : produto.status === "Inativo"
                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                    : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                }>
                  {produto.status}
                </Badge>
              </div>
              <div className="p-5 grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 p-3 rounded-lg border border-border/50">
                  <p className="text-muted-foreground text-xs">Vendas</p>
                  <p className="font-bold text-xl mt-1">{produto.vendas}</p>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg border border-border/50">
                  <p className="text-muted-foreground text-xs">Receita</p>
                  <p className="font-bold text-xl mt-1">{produto.revenue}</p>
                </div>
              </div>
              <div className="p-5 border-t border-border/50 flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                  <Link to={`/produtos/${produto.id}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Detalhes</span>
                    </Button>
                  </Link>
                  <div className="flex space-x-2">
                    <Link to={`/produtos/editar/${produto.id}`}>
                      <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:text-red-400 hover:bg-red-400/10"
                      onClick={() => handleDeleteProduct(produto.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Link to={`/produtos/${produto.id}/checkout-builder`}>
                  <Button variant="outline" size="sm" className="w-full gap-2 border-primary/30 hover:bg-primary/10 hover:text-primary">
                    <Layout className="h-4 w-4" />
                    Checkout Builder
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {produtosFiltrados.length === 0 && (
        <div className="grok-card text-center p-12">
          <p className="text-muted-foreground text-lg">Nenhum produto encontrado.</p>
          <Link to="/produtos/novo">
            <Button size="lg" className="mt-6 gap-2">
              <Plus className="h-5 w-5" />
              <span>Criar Novo Produto</span>
            </Button>
          </Link>
        </div>
      )}
      
      {produtosFiltrados.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Mostrando {produtosFiltrados.length} de {produtos.length} produtos</p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>Anterior</Button>
            <Button variant="default" size="sm">1</Button>
            <Button variant="outline" size="sm" disabled>Próximo</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produtos;
