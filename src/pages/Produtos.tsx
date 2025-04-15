
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
          <h1 className="text-2xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground">Gerencie seus produtos e serviços digitais</p>
        </div>
        <Link to="/produtos/novo">
          <Button className="bg-highlight hover:bg-highlight-hover text-white rounded-md px-4 py-2 flex items-center gap-2 interactive-element">
            <Plus className="h-4 w-4" />
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
            className="pl-10 pr-4 py-2 w-full sm:w-80 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-md border border-border hover:bg-secondary/80">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </div>
          <select 
            className="px-3 py-2 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="todos">Todos os status</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
            <option value="em revisão">Em Revisão</option>
          </select>
          <select className="px-3 py-2 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight">
            <option value="recentes">Mais recentes</option>
            <option value="vendas">Mais vendidos</option>
            <option value="receita">Maior receita</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {produtosFiltrados.map((produto) => (
          <Card key={produto.id} className="border border-border hover:border-highlight/30 transition-all duration-300 depth-card">
            <CardContent className="p-0">
              <div className="p-4 flex justify-between items-start border-b border-border">
                <div>
                  <h3 className="font-medium text-lg">{produto.nome}</h3>
                  <p className="text-highlight text-sm font-medium mt-1">{produto.preco}</p>
                </div>
                <Badge className={
                  produto.status === "Ativo" 
                    ? "bg-green-500/20 text-green-500 hover:bg-green-500/30" 
                    : produto.status === "Inativo"
                    ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                    : "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                }>
                  {produto.status}
                </Badge>
              </div>
              <div className="p-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Vendas</p>
                  <p className="font-medium">{produto.vendas}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Receita</p>
                  <p className="font-medium">{produto.revenue}</p>
                </div>
              </div>
              <div className="p-4 border-t border-border flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <Link to={`/produtos/${produto.id}`}>
                    <Button variant="outline" size="sm" className="h-9 px-3 icon-interactive">
                      <FileText className="h-4 w-4" />
                      <span className="ml-2">Detalhes</span>
                    </Button>
                  </Link>
                  <div className="flex space-x-2">
                    <Link to={`/produtos/editar/${produto.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-highlight icon-interactive">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-500 hover:text-red-600 icon-interactive"
                      onClick={() => handleDeleteProduct(produto.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Link to={`/produtos/${produto.id}/checkout-builder`}>
                  <Button variant="outline" size="sm" className="w-full h-9 border-highlight/50 text-highlight hover:bg-highlight/10 icon-interactive">
                    <Layout className="h-4 w-4 mr-2" />
                    Checkout Builder
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {produtosFiltrados.length === 0 && (
        <div className="text-center p-8 border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground">Nenhum produto encontrado.</p>
          <Link to="/produtos/novo">
            <Button className="mt-4 bg-highlight hover:bg-highlight-hover text-white rounded-md px-4 py-2 flex items-center gap-2 mx-auto interactive-element">
              <Plus className="h-4 w-4" />
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
            <Button variant="default" size="sm" className="bg-highlight hover:bg-highlight-hover">1</Button>
            <Button variant="outline" size="sm" disabled>Próximo</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produtos;
