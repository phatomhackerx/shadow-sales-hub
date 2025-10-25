
import { Calendar, CreditCard, DollarSign, Download, FileText, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const transacoes = [
  {
    id: "#TRX-7352",
    tipo: "Venda",
    descricao: "Curso de Marketing Digital",
    valor: "R$ 497,00",
    data: "2023-04-08",
    status: "Concluído"
  },
  {
    id: "#TRX-7353",
    tipo: "Saque",
    descricao: "Transferência para Conta Bancária",
    valor: "- R$ 1.500,00",
    data: "2023-04-05",
    status: "Concluído"
  },
  {
    id: "#TRX-7354",
    tipo: "Venda",
    descricao: "Mentoria de Negócios",
    valor: "R$ 997,00",
    data: "2023-04-03",
    status: "Concluído"
  },
  {
    id: "#TRX-7355",
    tipo: "Estorno",
    descricao: "E-book: Estratégias de Vendas - Reembolso",
    valor: "- R$ 47,00",
    data: "2023-04-02",
    status: "Concluído"
  },
  {
    id: "#TRX-7356",
    tipo: "Venda",
    descricao: "Workshop de Vendas Online",
    valor: "R$ 197,00",
    data: "2023-04-01",
    status: "Concluído"
  },
  {
    id: "#TRX-7357",
    tipo: "Taxa",
    descricao: "Taxa de Processamento - Cartão de Crédito",
    valor: "- R$ 25,00",
    data: "2023-04-01",
    status: "Concluído"
  }
];

const Financeiro = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("este_mes");
  const [showSaqueDialog, setShowSaqueDialog] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Financeiro</h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-1">Gerencie suas finanças e pagamentos</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="grok-card overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-muted-foreground">Saldo Disponível</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-3xl font-bold mt-1">R$ 8.445,00</span>
              <Dialog open={showSaqueDialog} onOpenChange={setShowSaqueDialog}>
                <DialogTrigger asChild>
                  <Button className="grok-button mt-4 w-full">
                    Solicitar Saque
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Solicitar Saque</DialogTitle>
                    <DialogDescription>
                      Escolha a conta bancária e o valor para realizar seu saque.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Conta Bancária</label>
                      <select className="w-full p-2 rounded-md border border-border bg-secondary text-foreground">
                        <option>Banco Itaú - Ag: 1234 | CC: 56789-0</option>
                        <option>Adicionar Nova Conta</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Valor (R$)</label>
                      <input 
                        type="text" 
                        placeholder="0,00" 
                        className="w-full p-2 rounded-md border border-border bg-secondary text-foreground"
                      />
                      <p className="text-xs text-muted-foreground">Saldo disponível: R$ 8.445,00</p>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" onClick={() => setShowSaqueDialog(false)}>Cancelar</Button>
                      <Button className="bg-highlight hover:bg-highlight-hover text-white">Confirmar Saque</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        
        <Card className="grok-card overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-muted-foreground">Em Análise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-3xl font-bold mt-1">R$ 2.140,00</span>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <span className="mt-4 text-xs text-muted-foreground cursor-help inline-flex items-center">
                    Valores que estarão disponíveis em até 14 dias
                    <FileText className="h-3 w-3 ml-1" />
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Detalhes dos valores em análise</h4>
                    <ul className="text-xs space-y-1">
                      <li className="flex justify-between">
                        <span>Curso de Marketing Digital</span>
                        <span>R$ 1.491,00</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Workshop de Vendas</span>
                        <span>R$ 649,00</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground">Valores já aprovados, mas ainda em período de segurança contra chargebacks.</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </CardContent>
        </Card>
        
        <Card className="grok-card overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-muted-foreground">Total Faturado (Mês)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-3xl font-bold mt-1">R$ 12.856,00</span>
              <div className="mt-4 flex items-center text-green-500 text-xs">
                <span className="flex items-center gap-1">
                  +15% em relação ao mês anterior
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar transações..." 
            className="grok-input pl-10 w-full md:w-80"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select 
            className="grok-input"
            value={periodoSelecionado}
            onChange={(e) => setPeriodoSelecionado(e.target.value)}
          >
            <option value="hoje">Hoje</option>
            <option value="esta_semana">Esta Semana</option>
            <option value="este_mes">Este Mês</option>
            <option value="ultimo_mes">Último Mês</option>
            <option value="ultimos_3_meses">Últimos 3 Meses</option>
            <option value="personalizado">Período Personalizado</option>
          </select>
          <Button variant="outline" className="h-10">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Datas</span>
          </Button>
          <Button className="grok-button h-10">
            <Download className="h-4 w-4 mr-2" />
            <span>Exportar</span>
          </Button>
        </div>
      </div>
      
      <Card className="grok-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary/30">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">ID</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Tipo</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Descrição</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Valor</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Data</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.map((transacao) => (
                <tr key={transacao.id} className="border-t border-border hover:bg-secondary/10">
                  <td className="p-4 text-sm font-medium">{transacao.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {transacao.tipo === "Venda" && <DollarSign className="h-4 w-4 text-green-500" />}
                      {transacao.tipo === "Saque" && <CreditCard className="h-4 w-4 text-orange-500" />}
                      {transacao.tipo === "Estorno" && <FileText className="h-4 w-4 text-red-500" />}
                      {transacao.tipo === "Taxa" && <FileText className="h-4 w-4 text-blue-500" />}
                      <span className="text-sm">{transacao.tipo}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{transacao.descricao}</td>
                  <td className={`p-4 text-sm font-medium ${
                    transacao.valor.includes('-') ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {transacao.valor}
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(transacao.data).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                      {transacao.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-sm text-highlight hover:underline">Detalhes</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <Card className="grok-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Contas Bancárias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-md bg-secondary/20 hover:bg-secondary/30 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Banco Itaú</p>
                  <p className="text-sm text-muted-foreground mt-1">Agência: 1234 | Conta: 56789-0</p>
                  <p className="text-sm text-muted-foreground">João da Silva</p>
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                    Principal
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-dashed border-border rounded-md flex flex-col items-center justify-center hover:bg-secondary/10 transition-colors">
              <button className="flex items-center gap-2 text-highlight">
                <Plus className="h-5 w-5" />
                <span>Adicionar Conta Bancária</span>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Financeiro;
