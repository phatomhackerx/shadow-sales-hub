
import { Search, Plus, Download, Filter, Calendar, ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Dados de assinaturas ativas
const assinaturas = [
  {
    id: "#SUB-1234",
    cliente: "Carlos Ferreira",
    plano: "Plano Premium",
    valor: "R$ 97,00/mês",
    inicio: "2023-01-15",
    renovacao: "2023-05-15",
    status: "Ativa"
  },
  {
    id: "#SUB-1235",
    cliente: "Márcia Santos",
    plano: "Plano Básico",
    valor: "R$ 47,00/mês",
    inicio: "2023-02-10",
    renovacao: "2023-05-10",
    status: "Ativa"
  },
  {
    id: "#SUB-1236",
    cliente: "Rafael Costa",
    plano: "Plano Pro",
    valor: "R$ 147,00/mês",
    inicio: "2023-02-23",
    renovacao: "2023-05-23",
    status: "Ativa"
  },
  {
    id: "#SUB-1237",
    cliente: "Fernanda Lima",
    plano: "Plano Premium",
    valor: "R$ 97,00/mês",
    inicio: "2023-03-05",
    renovacao: "2023-04-05",
    status: "Cancelada"
  },
  {
    id: "#SUB-1238",
    cliente: "Ricardo Oliveira",
    plano: "Plano Pro",
    valor: "R$ 147,00/mês",
    inicio: "2023-03-12",
    renovacao: "2023-04-12",
    status: "Atrasada"
  }
];

// Dados de produtos de assinatura
const produtosAssinatura = [
  {
    id: 1,
    nome: "Assinatura Premium",
    descricao: "Acesso completo a todos os cursos da plataforma",
    valor: "R$ 97,00/mês",
    assinantes: 203,
    receita: "R$ 19.691,00/mês",
    status: "Ativo",
    beneficios: [
      "Acesso ilimitado a todos os cursos",
      "Atualizações semanais de conteúdo",
      "Suporte prioritário",
      "Certificados exclusivos"
    ],
    imagem: "https://source.unsplash.com/random/300x200?subscription"
  },
  {
    id: 2,
    nome: "Plano Pro",
    descricao: "Para profissionais que querem se especializar",
    valor: "R$ 147,00/mês",
    assinantes: 156,
    receita: "R$ 22.932,00/mês",
    status: "Ativo",
    beneficios: [
      "Acesso a cursos avançados",
      "Mentorias mensais",
      "Networking com especialistas",
      "Ferramentas exclusivas"
    ],
    imagem: "https://source.unsplash.com/random/300x200?premium"
  },
  {
    id: 3,
    nome: "Plano Básico",
    descricao: "Ideal para iniciantes no mercado digital",
    valor: "R$ 47,00/mês",
    assinantes: 342,
    receita: "R$ 16.074,00/mês",
    status: "Ativo",
    beneficios: [
      "Acesso a cursos introdutórios",
      "Materiais complementares",
      "Suporte por email",
      "Comunidade de alunos"
    ],
    imagem: "https://source.unsplash.com/random/300x200?basic"
  },
  {
    id: 4,
    nome: "Assinatura Corporativa",
    descricao: "Solução completa para empresas",
    valor: "R$ 997,00/mês",
    assinantes: 12,
    receita: "R$ 11.964,00/mês",
    status: "Ativo",
    beneficios: [
      "Acesso para até 10 usuários",
      "Treinamentos personalizados",
      "Relatórios de progresso",
      "Consultorias exclusivas"
    ],
    imagem: "https://source.unsplash.com/random/300x200?corporate"
  }
];

const Assinaturas = () => {
  const [abaAtiva, setAbaAtiva] = useState("meus_produtos");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [pesquisa, setPesquisa] = useState("");
  
  const filtrarAssinaturas = () => {
    if (filtroStatus === "todos") return assinaturas;
    return assinaturas.filter(assinatura => 
      assinatura.status.toLowerCase() === filtroStatus.toLowerCase()
    );
  };
  
  const filtrarProdutos = () => {
    if (!pesquisa) return produtosAssinatura;
    return produtosAssinatura.filter(produto => 
      produto.nome.toLowerCase().includes(pesquisa.toLowerCase()) || 
      produto.descricao.toLowerCase().includes(pesquisa.toLowerCase())
    );
  };
  
  const editarProduto = (id: number) => {
    toast.success("Redirecionando para edição do produto");
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Assinaturas</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">Gerencie seus produtos por assinatura e assinantes</p>
        </div>
        <Link to="/produtos/novo" className="w-full sm:w-auto">
          <Button className="grok-button w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            <span>Novo Plano</span>
          </Button>
        </Link>
      </div>
      
      <Tabs defaultValue="meus_produtos" value={abaAtiva} onValueChange={setAbaAtiva} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="meus_produtos">Meus Produtos</TabsTrigger>
          <TabsTrigger value="assinantes">Assinantes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="meus_produtos" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar produtos..." 
                className="grok-input pl-10 w-full sm:w-80"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2 hover:bg-secondary/60 transition-all">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filtrar</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 hover:bg-secondary/60 transition-all">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Exportar</span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtrarProdutos().map((produto) => (
              <Card key={produto.id} className="grok-card overflow-hidden hover:border-foreground/10 transition-all duration-300">
                <div className="relative h-40 w-full overflow-hidden">
                  <img 
                    src={produto.imagem} 
                    alt={produto.nome} 
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-500/20 text-green-500">
                      {produto.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-0">
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium text-lg">{produto.nome}</h3>
                    <p className="text-sm text-muted-foreground">{produto.descricao}</p>
                    <div className="text-highlight font-medium">{produto.valor}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 p-4 border-t border-border bg-secondary/30">
                    <div>
                      <div className="text-sm text-muted-foreground">Assinantes</div>
                      <div className="font-medium">{produto.assinantes}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Receita</div>
                      <div className="font-medium">{produto.receita}</div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-border">
                    <h4 className="text-sm font-medium mb-2">Benefícios:</h4>
                    <ul className="space-y-1">
                      {produto.beneficios.map((beneficio, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <ArrowUp className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{beneficio}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 border-t border-border flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 hover:bg-secondary/60 transition-all"
                      onClick={() => editarProduto(produto.id)}
                    >
                      Editar
                    </Button>
                    <Link to={`/produtos/${produto.id}/checkout-builder`} className="flex-1">
                      <Button className="grok-button w-full">
                        Checkout Builder
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filtrarProdutos().length === 0 && (
            <div className="text-center p-8 border border-dashed border-border rounded-lg">
              <p className="text-muted-foreground">Nenhum produto por assinatura encontrado.</p>
              <Link to="/produtos/novo">
                <Button className="mt-4 bg-highlight hover:bg-highlight-hover text-white rounded-md px-4 py-2 flex items-center gap-2 mx-auto">
                  <Plus className="h-4 w-4" />
                  <span>Criar Novo Plano</span>
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="assinantes" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar assinaturas..." 
                className="pl-10 pr-4 py-2 w-full sm:w-80 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight"
              />
            </div>
            <div>
              <select 
                className="px-3 py-2 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight"
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
              >
                <option value="todos">Todos os status</option>
                <option value="ativa">Ativa</option>
                <option value="atrasada">Atrasada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>
          
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/30">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">ID</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Cliente</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Plano</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Valor</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Início</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Próxima Renovação</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrarAssinaturas().map((assinatura) => (
                    <tr key={assinatura.id} className="border-t border-border hover:bg-secondary/10">
                      <td className="p-4 text-sm font-medium">{assinatura.id}</td>
                      <td className="p-4 text-sm">{assinatura.cliente}</td>
                      <td className="p-4 text-sm">{assinatura.plano}</td>
                      <td className="p-4 text-sm">{assinatura.valor}</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(assinatura.inicio).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(assinatura.renovacao).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          assinatura.status === "Ativa" 
                            ? "bg-green-500/20 text-green-500" 
                            : assinatura.status === "Atrasada"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-red-500/20 text-red-500"
                        }`}>
                          {assinatura.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button className="text-sm text-highlight hover:underline">Editar</button>
                          {assinatura.status !== "Cancelada" && (
                            <button className="text-sm text-red-500 hover:underline">Cancelar</button>
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
      </Tabs>
      
      <div className="grok-card p-6">
        <h3 className="text-lg font-semibold mb-6">Resumo de Assinaturas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 border border-border/40 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-all">
            <div className="text-sm text-muted-foreground">Assinaturas Ativas</div>
            <div className="text-2xl font-bold mt-2">3</div>
          </div>
          <div className="p-5 border border-border/40 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-all">
            <div className="text-sm text-muted-foreground">Receita Mensal</div>
            <div className="text-2xl font-bold mt-2">R$ 291,00</div>
          </div>
          <div className="p-5 border border-border/40 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-all">
            <div className="text-sm text-muted-foreground">Taxa de Retenção</div>
            <div className="text-2xl font-bold mt-2">85%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assinaturas;
