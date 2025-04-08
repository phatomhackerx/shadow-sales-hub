import { Calendar, CreditCard, DollarSign, Download, FileText, Plus, Search } from "lucide-react";
import { useState } from "react";

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

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Financeiro</h1>
        <p className="text-muted-foreground">Gerencie suas finanças e pagamentos</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">Saldo Disponível</span>
            <span className="text-3xl font-bold mt-2">R$ 8.445,00</span>
            <button className="mt-4 bg-highlight hover:bg-highlight-hover text-white rounded-md px-4 py-2 text-sm">
              Solicitar Saque
            </button>
          </div>
        </div>
        
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">Em Análise</span>
            <span className="text-3xl font-bold mt-2">R$ 2.140,00</span>
            <span className="mt-4 text-xs text-muted-foreground">
              Valores que estarão disponíveis em até 14 dias
            </span>
          </div>
        </div>
        
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">Total Faturado (Mês)</span>
            <span className="text-3xl font-bold mt-2">R$ 12.856,00</span>
            <div className="mt-4 flex items-center text-green-500 text-sm">
              <span>+15% em relação ao mês anterior</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar transações..." 
            className="pl-10 pr-4 py-2 w-full md:w-80 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select 
            className="px-3 py-2 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight"
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
          <button className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-md border border-border hover:bg-secondary/80">
            <Calendar className="h-4 w-4" />
            <span>Datas</span>
          </button>
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
      </div>
      
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-lg font-medium mb-4">Contas Bancárias</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-md bg-secondary/20">
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
          
          <div className="p-4 border border-dashed border-border rounded-md flex flex-col items-center justify-center">
            <button className="flex items-center gap-2 text-highlight">
              <Plus className="h-5 w-5" />
              <span>Adicionar Conta Bancária</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financeiro;
