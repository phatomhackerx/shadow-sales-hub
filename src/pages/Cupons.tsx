
import { Calendar, Copy, Plus, Search, Tag, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const cupons = [
  {
    codigo: "BEMVINDO20",
    tipo: "Percentual",
    valor: "20%",
    usos: "45/100",
    expiracao: "2023-12-31",
    restricoes: "Apenas novos clientes",
    status: "Ativo"
  },
  {
    codigo: "BLACKFRIDAY",
    tipo: "Percentual",
    valor: "30%",
    usos: "78/150",
    expiracao: "2023-11-30",
    restricoes: "Produtos selecionados",
    status: "Ativo"
  },
  {
    codigo: "FRETEGRATIS",
    tipo: "Valor Fixo",
    valor: "R$ 20,00",
    usos: "32/50",
    expiracao: "2023-10-15",
    restricoes: "Pedidos acima de R$ 100",
    status: "Expirado"
  },
  {
    codigo: "PROMO10",
    tipo: "Percentual",
    valor: "10%",
    usos: "65/200",
    expiracao: "2023-12-15",
    restricoes: "Nenhuma",
    status: "Ativo"
  },
  {
    codigo: "DESCONTO50",
    tipo: "Valor Fixo",
    valor: "R$ 50,00",
    usos: "18/30",
    expiracao: "2023-11-15",
    restricoes: "Pedidos acima de R$ 200",
    status: "Inativo"
  }
];

const Cupons = () => {
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [modalAberto, setModalAberto] = useState(false);
  
  const copiarCodigo = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    toast.success("Código copiado para a área de transferência");
  };

  const filtrarCupons = () => {
    if (filtroStatus === "todos") return cupons;
    return cupons.filter(cupom => 
      cupom.status.toLowerCase() === filtroStatus.toLowerCase()
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cupons</h1>
          <p className="text-muted-foreground">Gerencie seus cupons de desconto</p>
        </div>
        <button 
          className="bg-highlight hover:bg-highlight-hover text-white rounded-md px-4 py-2 flex items-center gap-2"
          onClick={() => setModalAberto(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Novo Cupom</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-purple-500/20">
              <Tag className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cupons Ativos</p>
              <p className="text-2xl font-semibold">3</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-500/20">
              <Copy className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Usos</p>
              <p className="text-2xl font-semibold">238</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-green-500/20">
              <Calendar className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Próximos a Expirar</p>
              <p className="text-2xl font-semibold">2</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar cupons..." 
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
            <option value="ativo">Ativos</option>
            <option value="inativo">Inativos</option>
            <option value="expirado">Expirados</option>
          </select>
        </div>
      </div>
      
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary/30">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Código</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Tipo</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Valor</th>
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
                      <button className="text-sm text-red-500 hover:underline flex items-center gap-1">
                        <Trash className="h-3 w-3" />
                        Remover
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
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
                onClick={() => setModalAberto(false)}
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
