
import { Plus, Search } from "lucide-react";

const produtos = [
  {
    id: 1,
    nome: "Curso de Marketing Digital",
    preco: "R$ 497,00",
    vendas: 145,
    revenue: "R$ 72.065,00",
    status: "Ativo"
  },
  {
    id: 2,
    nome: "Mentoria de Negócios",
    preco: "R$ 997,00",
    vendas: 78,
    revenue: "R$ 77.766,00",
    status: "Ativo"
  },
  {
    id: 3,
    nome: "E-book: Estratégias de Vendas",
    preco: "R$ 47,00",
    vendas: 312,
    revenue: "R$ 14.664,00",
    status: "Ativo"
  },
  {
    id: 4,
    nome: "Workshop de Vendas Online",
    preco: "R$ 197,00",
    vendas: 95,
    revenue: "R$ 18.715,00",
    status: "Inativo"
  },
  {
    id: 5,
    nome: "Assinatura Premium",
    preco: "R$ 97,00/mês",
    vendas: 203,
    revenue: "R$ 19.691,00",
    status: "Ativo"
  }
];

const Produtos = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground">Gerencie seus produtos e serviços</p>
        </div>
        <button className="bg-highlight hover:bg-highlight-hover text-white rounded-md px-4 py-2 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Novo Produto</span>
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar produtos..." 
            className="pl-10 pr-4 py-2 w-full sm:w-80 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight">
            <option value="todos">Todos os status</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
          <select className="px-3 py-2 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight">
            <option value="recentes">Mais recentes</option>
            <option value="vendas">Mais vendidos</option>
            <option value="receita">Maior receita</option>
          </select>
        </div>
      </div>
      
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary/30">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Nome</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Preço</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Vendas</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Receita</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id} className="border-t border-border hover:bg-secondary/10">
                  <td className="p-4">
                    <div className="font-medium">{produto.nome}</div>
                  </td>
                  <td className="p-4 text-sm">{produto.preco}</td>
                  <td className="p-4 text-sm">{produto.vendas}</td>
                  <td className="p-4 text-sm">{produto.revenue}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      produto.status === "Ativo" 
                        ? "bg-green-500/20 text-green-500" 
                        : "bg-red-500/20 text-red-500"
                    }`}>
                      {produto.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-sm text-highlight hover:underline">Editar</button>
                      <button className="text-sm text-red-500 hover:underline">Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Mostrando 1-5 de 5 produtos</p>
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded-md bg-secondary text-foreground" disabled>Anterior</button>
          <button className="px-3 py-1 rounded-md bg-highlight text-white">1</button>
          <button className="px-3 py-1 rounded-md bg-secondary text-foreground" disabled>Próximo</button>
        </div>
      </div>
    </div>
  );
};

export default Produtos;
