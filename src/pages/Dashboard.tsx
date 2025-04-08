
import { CreditCard, DollarSign, Package, ShoppingCart } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { SalesChart } from "@/components/SalesChart";
import { PaymentMethodsChart } from "@/components/PaymentMethodsChart";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral das suas vendas e métricas</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Vendas Totais" 
          value="R$ 45.690,00" 
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 12, positive: true }}
          variant="accent"
        />
        <StatsCard 
          title="Quantidade de Vendas" 
          value="289" 
          icon={<ShoppingCart className="h-4 w-4" />}
          trend={{ value: 8, positive: true }}
        />
        <StatsCard 
          title="Taxa de Aprovação" 
          value="88%" 
          icon={<CreditCard className="h-4 w-4" />}
          trend={{ value: 2, positive: true }}
        />
        <StatsCard 
          title="Chargeback" 
          value="1.2%" 
          icon={<Package className="h-4 w-4" />}
          trend={{ value: 0.3, positive: false }}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <SalesChart />
        </div>
        <div>
          <PaymentMethodsChart />
        </div>
      </div>
      
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-lg font-medium mb-4">Vendas Recentes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2 text-sm font-medium text-muted-foreground">ID</th>
                <th className="text-left p-2 text-sm font-medium text-muted-foreground">Produto</th>
                <th className="text-left p-2 text-sm font-medium text-muted-foreground">Cliente</th>
                <th className="text-left p-2 text-sm font-medium text-muted-foreground">Valor</th>
                <th className="text-left p-2 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-2 text-sm font-medium text-muted-foreground">Data</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-border hover:bg-secondary/50">
                  <td className="p-2 text-sm">#ORD-{1000 + i}</td>
                  <td className="p-2 text-sm">Curso de Marketing Digital</td>
                  <td className="p-2 text-sm">Cliente {i + 1}</td>
                  <td className="p-2 text-sm">R$ {(Math.random() * 1000).toFixed(2)}</td>
                  <td className="p-2 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      i % 3 === 0 ? "bg-green-500/20 text-green-500" : 
                      i % 3 === 1 ? "bg-yellow-500/20 text-yellow-500" : 
                      "bg-blue-500/20 text-blue-500"
                    }`}>
                      {i % 3 === 0 ? "Aprovado" : i % 3 === 1 ? "Pendente" : "Processando"}
                    </span>
                  </td>
                  <td className="p-2 text-sm text-muted-foreground">
                    {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
