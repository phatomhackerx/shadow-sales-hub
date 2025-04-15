
import { Copy, ExternalLink, Plus, Search, Users, Clipboard, BarChart2, Award, Tag, Settings } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const afiliados = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@email.com",
    link: "https://meusite.com/afiliado/joaosilva",
    vendas: 12,
    comissao: "R$ 1.450,00",
    status: "Ativo"
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    email: "maria.oliveira@email.com",
    link: "https://meusite.com/afiliado/mariaoliveira",
    vendas: 8,
    comissao: "R$ 960,00",
    status: "Ativo"
  },
  {
    id: 3,
    nome: "Carlos Santos",
    email: "carlos.santos@email.com",
    link: "https://meusite.com/afiliado/carlossantos",
    vendas: 0,
    comissao: "R$ 0,00",
    status: "Pendente"
  },
  {
    id: 4,
    nome: "Ana Ferreira",
    email: "ana.ferreira@email.com",
    link: "https://meusite.com/afiliado/anaferreira",
    vendas: 5,
    comissao: "R$ 670,00",
    status: "Ativo"
  },
  {
    id: 5,
    nome: "Roberto Alves",
    email: "roberto.alves@email.com",
    link: "https://meusite.com/afiliado/robertoalves",
    vendas: 3,
    comissao: "R$ 410,00",
    status: "Inativo"
  }
];

const afiliacoes = [
  {
    id: 1,
    produtor: "Maria Oliveira",
    produto: "Mentoria de Negócios",
    preco: "R$ 997,00",
    comissao: "40%",
    vendas: 3,
    ganhos: "R$ 1.194,00",
    status: "Aprovado",
    imagem: "https://source.unsplash.com/random/300x200?business",
  },
  {
    id: 2,
    produtor: "Pedro Santos",
    produto: "E-book: Estratégias de Vendas",
    preco: "R$ 47,00",
    comissao: "70%",
    vendas: 15,
    ganhos: "R$ 492,00",
    status: "Aprovado",
    imagem: "https://source.unsplash.com/random/300x200?ebook",
  },
  {
    id: 3,
    produtor: "Ana Costa",
    produto: "Workshop de Vendas Online",
    preco: "R$ 197,00",
    comissao: "50%",
    vendas: 8,
    ganhos: "R$ 788,00",
    status: "Aprovado",
    imagem: "https://source.unsplash.com/random/300x200?workshop",
  },
  {
    id: 4,
    produtor: "Carlos Ferreira",
    produto: "Assinatura Premium",
    preco: "R$ 97,00/mês",
    comissao: "30%",
    vendas: 5,
    ganhos: "R$ 145,50/mês",
    status: "Pendente",
    imagem: "https://source.unsplash.com/random/300x200?subscription",
  }
];

const produtosAfiliacao = [
  {
    id: 1,
    nome: "Curso de Marketing Digital",
    afiliados: 28,
    comissao: "50%",
    vendas_afiliados: 87,
    receita_afiliados: "R$ 21.640,00",
    status: "Ativo"
  },
  {
    id: 2,
    nome: "Mentoria de Negócios",
    afiliados: 15,
    comissao: "40%",
    vendas_afiliados: 42,
    receita_afiliados: "R$ 16.750,00",
    status: "Ativo"
  },
  {
    id: 3,
    nome: "E-book: Estratégias de Vendas",
    afiliados: 45,
    comissao: "70%",
    vendas_afiliados: 157,
    receita_afiliados: "R$ 5.160,00",
    status: "Ativo"
  }
];

const Afiliados = () => {
  const [abaAtiva, setAbaAtiva] = useState("meus_afiliados");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [pesquisa, setPesquisa] = useState("");
  
  const copiarLinkAfiliado = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copiado para a área de transferência");
  };

  const filtrarAfiliados = () => {
    let filtered = afiliados;
    
    if (filtroStatus !== "todos") {
      filtered = filtered.filter(afiliado => 
        afiliado.status.toLowerCase() === filtroStatus.toLowerCase()
      );
    }
    
    if (pesquisa) {
      filtered = filtered.filter(afiliado => 
        afiliado.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        afiliado.email.toLowerCase().includes(pesquisa.toLowerCase())
      );
    }
    
    return filtered;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Afiliados</h1>
          <p className="text-muted-foreground">Gerencie sua rede de afiliados e programas de afiliação</p>
        </div>
        <div className="flex gap-2">
          <Link to="/afiliados/solicitacoes">
            <Button variant="outline" className="flex items-center gap-2">
              <Clipboard className="h-4 w-4" />
              <span>Solicitações</span>
              <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-highlight text-white">3</Badge>
            </Button>
          </Link>
          <Button className="bg-highlight hover:bg-highlight-hover text-white rounded-md px-4 py-2 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Novo Afiliado</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="border border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-500/20">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Afiliados</p>
                <p className="text-2xl font-semibold">{afiliados.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-500/20">
                <BarChart2 className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vendas por Afiliados</p>
                <p className="text-2xl font-semibold">28</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-500/20">
                <Award className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Afiliado do Mês</p>
                <p className="text-2xl font-semibold">João Silva</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-yellow-500/20">
                <Tag className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Comissões Pagas</p>
                <p className="text-2xl font-semibold">R$ 3.490,00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="meus_afiliados" value={abaAtiva} onValueChange={setAbaAtiva} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="meus_afiliados">Meus Afiliados</TabsTrigger>
          <TabsTrigger value="minhas_afiliacoes">Minhas Afiliações</TabsTrigger>
          <TabsTrigger value="produtos_afiliacao">Produtos com Afiliados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="meus_afiliados" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar afiliados..." 
                className="pl-10 pr-4 py-2 w-full sm:w-80 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select 
                className="px-3 py-2 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight"
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
              >
                <option value="todos">Todos os status</option>
                <option value="ativo">Ativos</option>
                <option value="pendente">Pendentes</option>
                <option value="inativo">Inativos</option>
              </select>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Configurações</span>
              </Button>
            </div>
          </div>
          
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/30">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Nome</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Email</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Link de Afiliado</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Vendas</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Comissão</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrarAfiliados().map((afiliado) => (
                    <tr key={afiliado.id} className="border-t border-border hover:bg-secondary/10">
                      <td className="p-4 text-sm font-medium">{afiliado.nome}</td>
                      <td className="p-4 text-sm">{afiliado.email}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <input 
                            type="text" 
                            value={afiliado.link} 
                            readOnly
                            className="bg-secondary/50 text-sm p-1 rounded-md border border-border w-full max-w-xs"
                          />
                          <button 
                            onClick={() => copiarLinkAfiliado(afiliado.link)}
                            className="p-1 rounded-md hover:bg-secondary"
                            title="Copiar link"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-sm">{afiliado.vendas}</td>
                      <td className="p-4 text-sm">{afiliado.comissao}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          afiliado.status === "Ativo" 
                            ? "bg-green-500/20 text-green-500" 
                            : afiliado.status === "Pendente"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-red-500/20 text-red-500"
                        }`}>
                          {afiliado.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button className="text-sm text-highlight hover:underline">Editar</button>
                          <button className="text-sm text-blue-500 hover:underline">Análise</button>
                          {afiliado.status !== "Inativo" && (
                            <button className="text-sm text-red-500 hover:underline">Desativar</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="minhas_afiliacoes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {afiliacoes.map((afiliacao) => (
              <Card key={afiliacao.id} className="overflow-hidden border border-border hover:border-highlight/30 transition-all duration-300">
                <div className="relative h-40 w-full overflow-hidden">
                  <img 
                    src={afiliacao.imagem} 
                    alt={afiliacao.produto} 
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={afiliacao.status === "Aprovado" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"}>
                      {afiliacao.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-0">
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium text-lg">{afiliacao.produto}</h3>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{afiliacao.produtor}</span>
                    </div>
                    <div className="text-highlight font-medium">{afiliacao.preco}</div>
                  </div>
                  
                  <div className="grid grid-cols-3 p-4 border-t border-border bg-secondary/30">
                    <div>
                      <div className="text-sm text-muted-foreground">Comissão</div>
                      <div className="font-medium">{afiliacao.comissao}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Vendas</div>
                      <div className="font-medium">{afiliacao.vendas}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Ganhos</div>
                      <div className="font-medium">{afiliacao.ganhos}</div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-border flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-highlight/50 text-highlight hover:bg-highlight/10"
                      onClick={() => copiarLinkAfiliado(`https://meusite.com/afiliado/produto/${afiliacao.id}`)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Link de Afiliado
                    </Button>
                    <Button variant="default" className="flex-1 bg-highlight hover:bg-highlight-hover">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Promover
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="produtos_afiliacao" className="space-y-6">
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/30">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Produto</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Afiliados</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Comissão</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Vendas por Afiliados</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Receita gerada</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {produtosAfiliacao.map((produto) => (
                    <tr key={produto.id} className="border-t border-border hover:bg-secondary/10">
                      <td className="p-4 text-sm font-medium">{produto.nome}</td>
                      <td className="p-4 text-sm">{produto.afiliados}</td>
                      <td className="p-4 text-sm">{produto.comissao}</td>
                      <td className="p-4 text-sm">{produto.vendas_afiliados}</td>
                      <td className="p-4 text-sm">{produto.receita_afiliados}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                          {produto.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Link to={`/produtos/${produto.id}/afiliados`}>
                            <button className="text-sm text-highlight hover:underline">Gerenciar</button>
                          </Link>
                          <button className="text-sm text-blue-500 hover:underline">Relatório</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-lg font-medium mb-4">Configurações do Programa de Afiliados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Comissão padrão (%)
            </label>
            <input 
              type="number" 
              className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
              defaultValue="10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Período de cookies (dias)
            </label>
            <input 
              type="number" 
              className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
              defaultValue="30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Aprovação de afiliados
            </label>
            <select className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight">
              <option value="automatica">Automática</option>
              <option value="manual" selected>Manual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Prazo para pagamento (dias)
            </label>
            <input 
              type="number" 
              className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
              defaultValue="30"
            />
          </div>
        </div>
        <button className="mt-4 bg-highlight hover:bg-highlight-hover text-white rounded-md px-4 py-2">
          Salvar Configurações
        </button>
      </div>
    </div>
  );
};

export default Afiliados;
