
import { Download, Filter, Search, Star, Users, Bookmark, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const produtos = [
  {
    id: 1,
    nome: "Curso de Marketing Digital",
    produtor: "João Silva",
    preco: "R$ 497,00",
    comissao: "50%",
    vendas: 145,
    categoria: "Marketing",
    avaliacao: 4.8,
    imagem: "https://source.unsplash.com/random/300x200?marketing",
    descricao: "Aprenda estratégias avançadas de marketing digital para alavancar seu negócio online."
  },
  {
    id: 2,
    nome: "Mentoria de Negócios",
    produtor: "Maria Oliveira",
    preco: "R$ 997,00",
    comissao: "40%",
    vendas: 78,
    categoria: "Negócios",
    avaliacao: 4.9,
    imagem: "https://source.unsplash.com/random/300x200?business",
    descricao: "Mentoria personalizada para empreendedores que desejam escalar seus negócios rapidamente."
  },
  {
    id: 3,
    nome: "E-book: Estratégias de Vendas",
    produtor: "Pedro Santos",
    preco: "R$ 47,00",
    comissao: "70%",
    vendas: 312,
    categoria: "Vendas",
    avaliacao: 4.5,
    imagem: "https://source.unsplash.com/random/300x200?sales",
    descricao: "Guia completo com as melhores estratégias de vendas utilizadas por grandes empresas."
  },
  {
    id: 4,
    nome: "Workshop de Vendas Online",
    produtor: "Ana Costa",
    preco: "R$ 197,00",
    comissao: "50%",
    vendas: 95,
    categoria: "Vendas",
    avaliacao: 4.7,
    imagem: "https://source.unsplash.com/random/300x200?workshop",
    descricao: "Workshop prático sobre como aumentar suas vendas online utilizando técnicas comprovadas."
  },
  {
    id: 5,
    nome: "Assinatura Premium",
    produtor: "Carlos Ferreira",
    preco: "R$ 97,00/mês",
    comissao: "30%",
    vendas: 203,
    categoria: "Assinatura",
    avaliacao: 4.6,
    imagem: "https://source.unsplash.com/random/300x200?premium",
    descricao: "Acesso ilimitado a todos os cursos e conteúdos exclusivos da plataforma."
  },
  {
    id: 6,
    nome: "Curso Mindset Empreendedor",
    produtor: "Lúcia Martins",
    preco: "R$ 297,00",
    comissao: "45%",
    vendas: 53,
    categoria: "Empreendedorismo",
    avaliacao: 4.7,
    imagem: "https://source.unsplash.com/random/300x200?mindset",
    descricao: "Desenvolva a mentalidade correta para ter sucesso como empreendedor."
  }
];

const Vendas = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [ordenacao, setOrdenacao] = useState("relevancia");
  const [pesquisa, setPesquisa] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("marketplace");
  
  const solicitarAfiliacao = (produtoId: number) => {
    toast.success("Solicitação de afiliação enviada com sucesso!");
  };
  
  const copiarLink = (produtoId: number) => {
    navigator.clipboard.writeText(`https://seusite.com/p/${produtoId}`);
    toast.success("Link de afiliado copiado!");
  };
  
  const filtrarProdutos = () => {
    return produtos.filter(produto => {
      if (categoriaSelecionada !== "Todos" && produto.categoria !== categoriaSelecionada) {
        return false;
      }
      if (pesquisa && !produto.nome.toLowerCase().includes(pesquisa.toLowerCase()) && 
          !produto.produtor.toLowerCase().includes(pesquisa.toLowerCase())) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      switch (ordenacao) {
        case "preco_maior":
          return parseFloat(b.preco.replace(/[^\d,]/g, '').replace(',', '.')) - 
                 parseFloat(a.preco.replace(/[^\d,]/g, '').replace(',', '.'));
        case "preco_menor":
          return parseFloat(a.preco.replace(/[^\d,]/g, '').replace(',', '.')) - 
                 parseFloat(b.preco.replace(/[^\d,]/g, '').replace(',', '.'));
        case "vendas":
          return b.vendas - a.vendas;
        case "avaliacao":
          return b.avaliacao - a.avaliacao;
        case "comissao":
          return parseInt(b.comissao) - parseInt(a.comissao);
        default:
          return 0;
      }
    });
  };
  
  const categorias = ["Todos", ...Array.from(new Set(produtos.map(p => p.categoria)))];
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-gradient">Marketplace</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Descubra produtos para promover e ganhar comissões
          </p>
        </div>
        <Button variant="grok" size="lg" className="gap-2">
          <Download className="h-5 w-5" />
          <span>Exportar Dados</span>
        </Button>
      </div>
      
      <Tabs defaultValue="marketplace" value={abaAtiva} onValueChange={setAbaAtiva} className="w-full">
        <TabsList className="grid grid-cols-2 mb-8 grok-card p-1">
          <TabsTrigger value="marketplace" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl">
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="minhas_vendas" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl">
            Minhas Vendas
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="marketplace" className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar produtos ou produtores..." 
                className="grok-input pl-12 pr-4 py-3 w-full text-base"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <select 
                className="grok-input px-4 py-3"
                value={categoriaSelecionada}
                onChange={(e) => setCategoriaSelecionada(e.target.value)}
              >
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </select>
              <select 
                className="grok-input px-4 py-3"
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
              >
                <option value="relevancia">Relevância</option>
                <option value="preco_maior">Maior Preço</option>
                <option value="preco_menor">Menor Preço</option>
                <option value="vendas">Mais Vendidos</option>
                <option value="avaliacao">Melhor Avaliados</option>
                <option value="comissao">Maior Comissão</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtrarProdutos().map((produto) => (
              <Card key={produto.id} className="grok-card group p-0">
                <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                  <img 
                    src={produto.imagem} 
                    alt={produto.nome} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 font-bold">
                      {produto.comissao} Comissão
                    </Badge>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm hover:bg-background"
                    onClick={() => toast.success("Produto salvo nos favoritos")}
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-5 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{produto.nome}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{produto.descricao}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{produto.produtor}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-border/50">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Preço</div>
                      <div className="text-primary font-bold text-xl">{produto.preco}</div>
                    </div>
                    <div className="flex gap-1 items-center bg-secondary/50 px-3 py-2 rounded-lg">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-bold">{produto.avaliacao}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 pt-2">
                    <Button 
                      variant="grok"
                      className="w-full"
                      onClick={() => solicitarAfiliacao(produto.id)}
                    >
                      Solicitar Afiliação
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copiarLink(produto.id)}
                      >
                        Copiar Link
                      </Button>
                      <Link to={`/produtos/${produto.id}`}>
                        <Button variant="outline" size="sm" className="w-full gap-1">
                          Detalhes
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filtrarProdutos().length === 0 && (
            <div className="grok-card text-center p-12">
              <p className="text-muted-foreground text-lg">Nenhum produto encontrado com os filtros selecionados.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="minhas_vendas" className="space-y-6">
          <div className="grok-card text-center p-12">
            <h3 className="text-2xl font-bold text-gradient mb-4">Em Desenvolvimento</h3>
            <p className="text-muted-foreground text-lg">
              A visualização de vendas estará disponível em breve.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Vendas;
