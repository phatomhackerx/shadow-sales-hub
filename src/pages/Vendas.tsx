
import { Download, Filter, Search, Star, Users, Calendar, ArrowUp, Tag, Bookmark } from "lucide-react";
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
    toast.success("Link de afiliado copiado para a área de transferência");
  };
  
  const filtrarProdutos = () => {
    return produtos.filter(produto => {
      // Filtro por categoria
      if (categoriaSelecionada !== "Todos" && produto.categoria !== categoriaSelecionada) {
        return false;
      }
      
      // Filtro por pesquisa
      if (pesquisa && !produto.nome.toLowerCase().includes(pesquisa.toLowerCase()) && 
          !produto.produtor.toLowerCase().includes(pesquisa.toLowerCase())) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      // Ordenação
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
  
  const categorias = ["Todos", "Marketing", "Negócios", "Vendas", "Empreendedorismo", "Assinatura"];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Marketplace</h1>
        <p className="text-muted-foreground">Explore produtos e programe de afiliados para aumentar seus ganhos</p>
      </div>
      
      <Tabs defaultValue="marketplace" value={abaAtiva} onValueChange={setAbaAtiva} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="minhas_vendas">Minhas Vendas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="marketplace" className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar produtos ou produtores..." 
                className="pl-10 pr-4 py-2 w-full md:w-80 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select 
                className="px-3 py-2 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight"
                value={categoriaSelecionada}
                onChange={(e) => setCategoriaSelecionada(e.target.value)}
              >
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </select>
              <select 
                className="px-3 py-2 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight"
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
              <Card key={produto.id} className="overflow-hidden border border-border hover:border-highlight/30 transition-all duration-300">
                <div className="relative h-40 w-full overflow-hidden">
                  <img 
                    src={produto.imagem} 
                    alt={produto.nome} 
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-highlight text-white">
                      {produto.comissao} Comissão
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-0">
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg line-clamp-1">{produto.nome}</h3>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-highlight"
                        onClick={() => toast.success("Produto adicionado aos favoritos")}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{produto.descricao}</p>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{produto.produtor}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border-t border-border bg-secondary/30">
                    <div>
                      <div className="text-sm text-muted-foreground">Preço</div>
                      <div className="text-highlight font-medium">{produto.preco}</div>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{produto.avaliacao}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-border flex flex-col space-y-2">
                    <Button 
                      variant="default" 
                      className="w-full bg-highlight hover:bg-highlight-hover"
                      onClick={() => solicitarAfiliacao(produto.id)}
                    >
                      Solicitar Afiliação
                    </Button>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-highlight/50 text-highlight hover:bg-highlight/10"
                        onClick={() => copiarLink(produto.id)}
                      >
                        Copiar Link
                      </Button>
                      <Link to={`/produtos/${produto.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          Detalhes
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filtrarProdutos().length === 0 && (
            <div className="text-center p-8 border border-dashed border-border rounded-lg">
              <p className="text-muted-foreground">Nenhum produto encontrado com os filtros selecionados.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="minhas_vendas" className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar por ID, cliente ou produto..." 
                className="pl-10 pr-4 py-2 w-full md:w-80 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-md border border-border hover:bg-secondary/80">
                <Filter className="h-4 w-4" />
                <span>Filtros</span>
              </button>
              <select className="px-3 py-2 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight">
                <option value="todos">Todos os status</option>
                <option value="aprovado">Aprovado</option>
                <option value="pendente">Pendente</option>
                <option value="processando">Processando</option>
                <option value="recusado">Recusado</option>
              </select>
              <button className="flex items-center gap-2 px-3 py-2 bg-highlight hover:bg-highlight-hover text-white rounded-md">
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </button>
            </div>
          </div>
          
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/30">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">ID</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Cliente</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Produto</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Valor</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Data</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Pagamento</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mantendo os mesmos dados da tabela de vendas original */}
                  <tr className="border-t border-border hover:bg-secondary/10">
                    <td className="p-4 text-sm font-medium">#ORD-7352</td>
                    <td className="p-4 text-sm">João Silva</td>
                    <td className="p-4 text-sm">Curso de Marketing Digital</td>
                    <td className="p-4 text-sm">R$ 497,00</td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date("2023-04-08").toLocaleDateString()}
                    </td>
                    <td className="p-4 text-sm">Cartão de Crédito</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                        Aprovado
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-sm text-highlight hover:underline">Detalhes</button>
                    </td>
                  </tr>
                  {/* ... mais linhas da tabela de vendas original ... */}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-medium">Produtor em Destaque</h2>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/3">
            <img 
              src="https://source.unsplash.com/random/300x300?person" 
              alt="Produtor em Destaque" 
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <h3 className="text-lg font-medium">Maria Oliveira</h3>
            <p className="text-muted-foreground">
              Especialista em estratégias de negócios digitais, Maria já ajudou mais de 1.000 empreendedores a 
              alavancar seus resultados. Seus produtos têm as melhores avaliações na plataforma.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border border-border rounded-md p-3 text-center">
                <p className="text-muted-foreground text-sm">Produtos</p>
                <p className="text-xl font-medium">12</p>
              </div>
              <div className="border border-border rounded-md p-3 text-center">
                <p className="text-muted-foreground text-sm">Vendas</p>
                <p className="text-xl font-medium">1.458</p>
              </div>
              <div className="border border-border rounded-md p-3 text-center">
                <p className="text-muted-foreground text-sm">Avaliação</p>
                <p className="text-xl font-medium">4.9</p>
              </div>
              <div className="border border-border rounded-md p-3 text-center">
                <p className="text-muted-foreground text-sm">Afiliados</p>
                <p className="text-xl font-medium">87</p>
              </div>
            </div>
            <Button className="bg-highlight hover:bg-highlight-hover">Ver Perfil</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendas;
