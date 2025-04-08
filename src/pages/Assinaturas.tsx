
import { Search, Plus } from "lucide-react";

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

const Assinaturas = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Assinaturas</h1>
          <p className="text-muted-foreground">Gerencie as assinaturas dos seus clientes</p>
        </div>
        <button className="bg-highlight hover:bg-highlight-hover text-white rounded-md px-4 py-2 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Novo Plano</span>
        </button>
      </div>
      
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
          <select className="px-3 py-2 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight">
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
              {assinaturas.map((assinatura) => (
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
      
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-lg font-medium mb-4">Resumo de Assinaturas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 border border-border rounded-md">
            <div className="text-sm text-muted-foreground">Assinaturas Ativas</div>
            <div className="text-2xl font-semibold mt-1">3</div>
          </div>
          <div className="p-4 border border-border rounded-md">
            <div className="text-sm text-muted-foreground">Receita Mensal</div>
            <div className="text-2xl font-semibold mt-1">R$ 291,00</div>
          </div>
          <div className="p-4 border border-border rounded-md">
            <div className="text-sm text-muted-foreground">Taxa de Retenção</div>
            <div className="text-2xl font-semibold mt-1">85%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assinaturas;
