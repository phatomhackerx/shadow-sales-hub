
import { Download, Filter, Search } from "lucide-react";

const vendas = [
  {
    id: "#ORD-7352",
    cliente: "João Silva",
    produto: "Curso de Marketing Digital",
    valor: "R$ 497,00",
    data: "2023-04-08",
    pagamento: "Cartão de Crédito",
    status: "Aprovado"
  },
  {
    id: "#ORD-7353",
    cliente: "Maria Oliveira",
    produto: "Mentoria de Negócios",
    valor: "R$ 997,00",
    data: "2023-04-07",
    pagamento: "Pix",
    status: "Aprovado"
  },
  {
    id: "#ORD-7354",
    cliente: "Pedro Santos",
    produto: "E-book: Estratégias de Vendas",
    valor: "R$ 47,00",
    data: "2023-04-07",
    pagamento: "Cartão de Crédito",
    status: "Pendente"
  },
  {
    id: "#ORD-7355",
    cliente: "Ana Costa",
    produto: "Workshop de Vendas Online",
    valor: "R$ 197,00",
    data: "2023-04-06",
    pagamento: "Boleto",
    status: "Pendente"
  },
  {
    id: "#ORD-7356",
    cliente: "Carlos Ferreira",
    produto: "Assinatura Premium",
    valor: "R$ 97,00",
    data: "2023-04-06",
    pagamento: "Cartão de Crédito",
    status: "Processando"
  },
  {
    id: "#ORD-7357",
    cliente: "Lúcia Martins",
    produto: "Curso de Marketing Digital",
    valor: "R$ 497,00",
    data: "2023-04-05",
    pagamento: "Pix",
    status: "Aprovado"
  },
  {
    id: "#ORD-7358",
    cliente: "Roberto Alves",
    produto: "E-book: Estratégias de Vendas",
    valor: "R$ 47,00",
    data: "2023-04-05",
    pagamento: "Cartão de Crédito",
    status: "Recusado"
  }
];

const Vendas = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Minhas Vendas</h1>
        <p className="text-muted-foreground">Histórico e detalhes de todas as suas vendas</p>
      </div>
      
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
              {vendas.map((venda) => (
                <tr key={venda.id} className="border-t border-border hover:bg-secondary/10">
                  <td className="p-4 text-sm font-medium">{venda.id}</td>
                  <td className="p-4 text-sm">{venda.cliente}</td>
                  <td className="p-4 text-sm">{venda.produto}</td>
                  <td className="p-4 text-sm">{venda.valor}</td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(venda.data).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-sm">{venda.pagamento}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      venda.status === "Aprovado" 
                        ? "bg-green-500/20 text-green-500" 
                        : venda.status === "Pendente"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : venda.status === "Recusado"
                        ? "bg-red-500/20 text-red-500"
                        : "bg-blue-500/20 text-blue-500"
                    }`}>
                      {venda.status}
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
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Mostrando 1-7 de 7 vendas</p>
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded-md bg-secondary text-foreground" disabled>Anterior</button>
          <button className="px-3 py-1 rounded-md bg-highlight text-white">1</button>
          <button className="px-3 py-1 rounded-md bg-secondary text-foreground" disabled>Próximo</button>
        </div>
      </div>
    </div>
  );
};

export default Vendas;
