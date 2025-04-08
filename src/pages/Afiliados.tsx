
import { Copy, ExternalLink, Plus, Search, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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

const Afiliados = () => {
  const [filtroStatus, setFiltroStatus] = useState("todos");
  
  const copiarLinkAfiliado = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copiado para a área de transferência");
  };

  const filtrarAfiliados = () => {
    if (filtroStatus === "todos") return afiliados;
    return afiliados.filter(afiliado => 
      afiliado.status.toLowerCase() === filtroStatus.toLowerCase()
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Afiliados</h1>
          <p className="text-muted-foreground">Gerencie sua rede de afiliados</p>
        </div>
        <button className="bg-highlight hover:bg-highlight-hover text-white rounded-md px-4 py-2 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Novo Afiliado</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-500/20">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Afiliados</p>
              <p className="text-2xl font-semibold">{afiliados.length}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-green-500/20">
              <ExternalLink className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Vendas por Afiliados</p>
              <p className="text-2xl font-semibold">28</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-purple-500/20">
              <Copy className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Comissões Pagas</p>
              <p className="text-2xl font-semibold">R$ 3.490,00</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar afiliados..." 
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
            <option value="pendente">Pendentes</option>
            <option value="inativo">Inativos</option>
          </select>
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
        </div>
        <button className="mt-4 bg-highlight hover:bg-highlight-hover text-white rounded-md px-4 py-2">
          Salvar Configurações
        </button>
      </div>
    </div>
  );
};

export default Afiliados;
