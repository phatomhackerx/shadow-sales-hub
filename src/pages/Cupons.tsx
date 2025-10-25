import { 
  Calendar, Copy, Plus, Search, Tag, Ticket, BadgePercent, BarChart2, RefreshCcw, 
  Package, TicketCheck, ExternalLink, Filter
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const cupons = [
  {
    codigo: "BEMVINDO20",
    tipo: "Percentual",
    valor: "20%",
    produto: "Todos os produtos",
    usos: "45/100",
    expiracao: "2023-12-31",
    restricoes: "Apenas novos clientes",
    status: "Ativo"
  },
  {
    codigo: "BLACKFRIDAY",
    tipo: "Percentual",
    valor: "30%",
    produto: "Curso de Marketing Digital",
    usos: "78/150",
    expiracao: "2023-11-30",
    restricoes: "Produtos selecionados",
    status: "Ativo"
  },
  {
    codigo: "FRETEGRATIS",
    tipo: "Valor Fixo",
    valor: "R$ 20,00",
    produto: "Todos os produtos",
    usos: "32/50",
    expiracao: "2023-10-15",
    restricoes: "Pedidos acima de R$ 100",
    status: "Expirado"
  },
  {
    codigo: "PROMO10",
    tipo: "Percentual",
    valor: "10%",
    produto: "E-book: Estratégias de Vendas",
    usos: "65/200",
    expiracao: "2023-12-15",
    restricoes: "Nenhuma",
    status: "Ativo"
  },
  {
    codigo: "DESCONTO50",
    tipo: "Valor Fixo",
    valor: "R$ 50,00",
    produto: "Mentoria de Negócios",
    usos: "18/30",
    expiracao: "2023-11-15",
    restricoes: "Pedidos acima de R$ 200",
    status: "Inativo"
  }
];

// Produtos disponíveis para aplicar cupons
const produtos = [
  {
    id: 1,
    nome: "Curso de Marketing Digital",
    preco: "R$ 497,00",
    imagem: "https://source.unsplash.com/random/300x200?marketing"
  },
  {
    id: 2,
    nome: "Mentoria de Negócios",
    preco: "R$ 997,00",
    imagem: "https://source.unsplash.com/random/300x200?mentoring"
  },
  {
    id: 3,
    nome: "E-book: Estratégias de Vendas",
    preco: "R$ 47,00",
    imagem: "https://source.unsplash.com/random/300x200?ebook"
  },
  {
    id: 4,
    nome: "Workshop de Vendas Online",
    preco: "R$ 197,00",
    imagem: "https://source.unsplash.com/random/300x200?workshop"
  }
];

// Dados para relatórios de cupons
const estatisticasCupons = [
  { 
    codigo: "BEMVINDO20", 
    usos: 45, 
    conversao: "32%", 
    valor_descontado: "R$ 4.473,00", 
    receita_gerada: "R$ 17.892,00" 
  },
  { 
    codigo: "BLACKFRIDAY", 
    usos: 78, 
    conversao: "45%", 
    valor_descontado: "R$ 11.651,00", 
    receita_gerada: "R$ 27.183,00" 
  },
  { 
    codigo: "PROMO10", 
    usos: 65, 
    conversao: "28%", 
    valor_descontado: "R$ 305,50", 
    receita_gerada: "R$ 2.749,50" 
  }
];

const Cupons = () => {
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [modalAberto, setModalAberto] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState("meus_cupons");
  const [pesquisa, setPesquisa] = useState("");
  const [tipoCupomSelecionado, setTipoCupomSelecionado] = useState("todos");
  const { toast } = useToast();
  
  const copiarCodigo = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    toast({
      title: "Código copiado",
      description: "Código copiado para a área de transferência",
    });
  };

  const filtrarCupons = () => {
    let filtered = cupons;
    
    // Filtro por status
    if (filtroStatus !== "todos") {
      filtered = filtered.filter(cupom => 
        cupom.status.toLowerCase() === filtroStatus.toLowerCase()
      );
    }
    
    // Filtro por tipo de cupom
    if (tipoCupomSelecionado !== "todos") {
      filtered = filtered.filter(cupom => 
        cupom.tipo.toLowerCase() === tipoCupomSelecionado.toLowerCase()
      );
    }
    
    // Filtro por pesquisa
    if (pesquisa) {
      filtered = filtered.filter(cupom => 
        cupom.codigo.toLowerCase().includes(pesquisa.toLowerCase()) ||
        cupom.produto.toLowerCase().includes(pesquisa.toLowerCase())
      );
    }
    
    return filtered;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Cupons</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">Gerencie seus cupons de desconto e campanhas promocionais</p>
        </div>
        <button 
          className="grok-button w-full sm:w-auto"
          onClick={() => setModalAberto(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Novo Cupom</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="grok-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-500/20">
                <Tag className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cupons Ativos</p>
                <p className="text-2xl font-semibold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="grok-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-500/20">
                <Ticket className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Usos</p>
                <p className="text-2xl font-semibold">238</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="grok-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-500/20">
                <BarChart2 className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Economia Gerada</p>
                <p className="text-2xl font-semibold">R$ 16.429,50</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="grok-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-yellow-500/20">
                <Calendar className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Próximos a Expirar</p>
                <p className="text-2xl font-semibold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="meus_cupons" value={abaAtiva} onValueChange={setAbaAtiva} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="meus_cupons">Meus Cupons</TabsTrigger>
          <TabsTrigger value="aplicar_cupom">Aplicar a Produtos</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="meus_cupons" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar cupons..." 
                className="grok-input pl-10 w-full sm:w-80"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 px-3 py-2 grok-input cursor-pointer hover:bg-secondary/60">
                <Filter className="h-4 w-4" />
                <span className="text-sm">Filtros</span>
              </div>
              <select 
                className="grok-input"
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
              >
                <option value="todos">Todos os status</option>
                <option value="ativo">Ativos</option>
                <option value="inativo">Inativos</option>
                <option value="expirado">Expirados</option>
              </select>
              <select 
                className="grok-input"
                value={tipoCupomSelecionado}
                onChange={(e) => setTipoCupomSelecionado(e.target.value)}
              >
                <option value="todos">Todos os tipos</option>
                <option value="percentual">Percentual</option>
                <option value="valor fixo">Valor Fixo</option>
              </select>
            </div>
          </div>
          
          <div className="grok-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/30">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Código</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Tipo</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Valor</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Produto</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Usos</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Expiração</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Restrições</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrarCupons().map((cupom, index) => (
                    <tr key={index} className="border-t border-border hover:bg-secondary/10">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm">{cupom.codigo}</span>
                          <button 
                            onClick={() => copiarCodigo(cupom.codigo)}
                            className="text-muted-foreground hover:text-foreground"
                            title="Copiar código"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-sm">{cupom.tipo}</td>
                      <td className="p-4 text-sm">{cupom.valor}</td>
                      <td className="p-4 text-sm">{cupom.produto}</td>
                      <td className="p-4 text-sm">{cupom.usos}</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(cupom.expiracao).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-sm">{cupom.restricoes}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          cupom.status === "Ativo" 
                            ? "bg-green-500/20 text-green-500" 
                            : cupom.status === "Expirado"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-red-500/20 text-red-500"
                        }`}>
                          {cupom.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button className="text-sm text-highlight hover:underline">Editar</button>
                          {cupom.status === "Ativo" && (
                            <button className="text-sm text-red-500 hover:underline flex items-center gap-1">
                              Desativar
                            </button>
                          )}
                          {cupom.status !== "Ativo" && (
                            <button className="text-sm text-green-500 hover:underline flex items-center gap-1">
                              <RefreshCcw className="h-3 w-3" />
                              Ativar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {filtrarCupons().length === 0 && (
            <div className="text-center p-8 border border-dashed border-border rounded-lg">
              <p className="text-muted-foreground">Nenhum cupom encontrado com os filtros selecionados.</p>
              <Button
                className="mt-4 bg-highlight hover:bg-highlight-hover text-white rounded-md px-4 py-2 flex items-center gap-2 mx-auto"
                onClick={() => setModalAberto(true)}
              >
                <Plus className="h-4 w-4" />
                <span>Criar Novo Cupom</span>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="aplicar_cupom" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {produtos.map((produto) => (
              <Card key={produto.id} className="overflow-hidden border border-border hover:border-highlight/30 transition-all duration-300">
                <div className="relative h-40 w-full overflow-hidden">
                  <img 
                    src={produto.imagem} 
                    alt={produto.nome} 
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-0">
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium text-lg">{produto.nome}</h3>
                    <p className="text-highlight font-medium">{produto.preco}</p>
                  </div>
                  
                  <div className="p-4 border-t border-border">
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Aplicar cupom
                    </label>
                    <div className="flex gap-2">
                      <select className="w-full px-3 py-2 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight">
                        <option value="">Selecione um cupom</option>
                        {cupons.filter(c => c.status === "Ativo").map((cupom, index) => (
                          <option key={index} value={cupom.codigo}>
                            {cupom.codigo} ({cupom.valor})
                          </option>
                        ))}
                      </select>
                      <Button 
                        variant="default" 
                        size="icon"
                        className="bg-highlight hover:bg-highlight-hover"
                        onClick={() => toast({
                          title: "Cupom aplicado",
                          description: "Cupom aplicado ao produto com sucesso",
                        })}
                      >
                        <BadgePercent className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-border">
                    <h4 className="text-sm font-medium mb-2">Cupons ativos:</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-purple-500/20 text-purple-500 flex items-center gap-1">
                        <TicketCheck className="h-3 w-3" />
                        PROMO10
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="relatorios" className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-medium mb-4">Desempenho dos Cupons</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">Código</th>
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">Usos</th>
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">Taxa de Conversão</th>
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">Valor Descontado</th>
                    <th className="text-left p-2 text-sm font-medium text-muted-foreground">Receita Gerada</th>
                  </tr>
                </thead>
                <tbody>
                  {estatisticasCupons.map((estatistica, index) => (
                    <tr key={index} className="border-b border-border">
                      <td className="p-2 text-sm font-medium">{estatistica.codigo}</td>
                      <td className="p-2 text-sm">{estatistica.usos}</td>
                      <td className="p-2 text-sm">{estatistica.conversao}</td>
                      <td className="p-2 text-sm">{estatistica.valor_descontado}</td>
                      <td className="p-2 text-sm">{estatistica.receita_gerada}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Melhores Cupons</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-highlight/20 text-highlight">BLACKFRIDAY</Badge>
                      <span className="text-sm text-muted-foreground">30% de desconto</span>
                    </div>
                    <span className="text-sm font-medium">78 usos</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-highlight/20 text-highlight">PROMO10</Badge>
                      <span className="text-sm text-muted-foreground">10% de desconto</span>
                    </div>
                    <span className="text-sm font-medium">65 usos</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-highlight/20 text-highlight">BEMVINDO20</Badge>
                      <span className="text-sm text-muted-foreground">20% de desconto</span>
                    </div>
                    <span className="text-sm font-medium">45 usos</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Recomendações</h3>
                <div className="space-y-4">
                  <div className="border border-dashed border-border rounded-md p-3 space-y-2">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-500" />
                      Criar cupom exclusivo para "Workshop de Vendas Online"
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Este produto tem alta taxa de visualização mas baixa conversão
                    </p>
                    <Button variant="outline" size="sm" className="w-full mt-2">Criar Cupom</Button>
                  </div>
                  <div className="border border-dashed border-border rounded-md p-3 space-y-2">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <BarChart2 className="h-4 w-4 text-green-500" />
                      Aumentar o desconto do "PROMO10" para 15%
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Este cupom tem alta taxa de uso, porém baixo valor médio de compra
                    </p>
                    <Button variant="outline" size="sm" className="w-full mt-2">Ajustar Desconto</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Modal para criar novo cupom (simplified version) */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-card border border-border rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-medium mb-4">Criar Novo Cupom</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Código do Cupom
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: DESCONTO20"
                  className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Tipo de Desconto
                  </label>
                  <select className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight">
                    <option value="percentual">Percentual (%)</option>
                    <option value="fixo">Valor Fixo (R$)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Valor do Desconto
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ex: 20"
                    className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Aplicar a Produto
                </label>
                <select className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight">
                  <option value="todos">Todos os produtos</option>
                  {produtos.map((produto) => (
                    <option key={produto.id} value={produto.id}>{produto.nome}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Limite de Usos
                  </label>
                  <input 
                    type="number" 
                    placeholder="Ex: 100"
                    className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Data de Expiração
                  </label>
                  <input 
                    type="date" 
                    className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Restrições
                </label>
                <select className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight">
                  <option value="nenhuma">Nenhuma</option>
                  <option value="novos">Apenas novos clientes</option>
                  <option value="valor_minimo">Valor mínimo de compra</option>
                  <option value="produtos">Produtos específicos</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button 
                className="px-4 py-2 border border-border rounded-md hover:bg-secondary"
                onClick={() => setModalAberto(false)}
              >
                Cancelar
              </button>
              <button 
                className="px-4 py-2 bg-highlight hover:bg-highlight-hover text-white rounded-md"
                onClick={() => {
                  toast({
                    title: "Cupom criado",
                    description: "Cupom criado com sucesso!",
                  });
                  setModalAberto(false);
                }}
              >
                Criar Cupom
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cupons;
