
import { SalesChart } from "@/components/SalesChart";
import { StatsCard } from "@/components/StatsCard";
import { PaymentMethodsChart } from "@/components/PaymentMethodsChart";
import { WelcomeHeader } from "@/components/WelcomeHeader";
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  ArrowUpRight,
  Zap,
  TrendingUp,
  Clock,
  BarChart3,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Dashboard = () => {
  const [chartPeriod, setChartPeriod] = useState("30dias");
  
  const statCards = [
    {
      title: "Receita Total",
      value: "R$ 154.837,42",
      trend: { value: 12.5, positive: true },
      icon: <DollarSign className="h-4 w-4" />,
      className: "bg-gradient-to-br from-secondary/30 to-secondary/10"
    },
    {
      title: "Vendas",
      value: "1.342",
      trend: { value: 8.2, positive: true },
      icon: <ShoppingCart className="h-4 w-4" />,
      className: "bg-gradient-to-br from-secondary/30 to-secondary/10"
    },
    {
      title: "Novos Clientes",
      value: "342",
      trend: { value: 5.1, positive: true },
      icon: <Users className="h-4 w-4" />,
      className: "bg-gradient-to-br from-secondary/30 to-secondary/10"
    },
    {
      title: "Taxa de Conversão",
      value: "3.6%",
      trend: { value: 1.2, positive: true },
      icon: <ArrowUpRight className="h-4 w-4" />,
      className: "bg-gradient-to-br from-secondary/30 to-secondary/10"
    }
  ];

  const handlePeriodChange = (period: string) => {
    setChartPeriod(period);
  };

  return (
    <div className="space-y-6">
      <WelcomeHeader />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="slide-up-animation" style={{ animationDelay: `${index * 0.05}s` }}>
            <StatsCard
              title={stat.title}
              value={stat.value}
              trend={stat.trend}
              icon={stat.icon}
              className={cn("interactive-element depth-card", stat.className)}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 grok-card">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-3">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-gradient">Desempenho de Vendas</span>
                </CardTitle>
                <CardDescription className="mt-2">
                  Análise do desempenho de vendas dos últimos {
                    chartPeriod === "7dias" ? "7 dias" : 
                    chartPeriod === "30dias" ? "30 dias" : 
                    chartPeriod === "90dias" ? "90 dias" : "30 dias"
                  }
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={chartPeriod === "7dias" ? "default" : "outline"}
                  size="sm" 
                  className="h-9"
                  onClick={() => handlePeriodChange("7dias")}
                >
                  7 dias
                </Button>
                <Button 
                  variant={chartPeriod === "30dias" ? "default" : "outline"}
                  size="sm" 
                  className="h-9"
                  onClick={() => handlePeriodChange("30dias")}
                >
                  30 dias
                </Button>
                <Button 
                  variant={chartPeriod === "90dias" ? "default" : "outline"}
                  size="sm" 
                  className="h-9"
                  onClick={() => handlePeriodChange("90dias")}
                >
                  90 dias
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>

        <Card className="grok-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <span className="text-gradient">Meios de Pagamento</span>
            </CardTitle>
            <CardDescription className="mt-2">
              Distribuição das formas de pagamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaymentMethodsChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="grok-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <span className="text-gradient">Produtos Mais Vendidos</span>
            </CardTitle>
            <CardDescription className="mt-2">
              Produtos com melhor desempenho este mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Curso de Marketing Digital", sales: 487, value: "R$ 97.400,00" },
                { name: "Mentoria Premium", sales: 218, value: "R$ 65.400,00" },
                { name: "E-book Copywriting", sales: 152, value: "R$ 15.200,00" },
                { name: "Assinatura Platinum", sales: 89, value: "R$ 44.500,00" }
              ].map((product, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/30 hover:bg-secondary/70 transition-all duration-300 group cursor-pointer"
                >
                  <div>
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{product.sales} vendas</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{product.value}</p>
                    <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-1">
                      Ver detalhes
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="grok-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <span className="text-gradient">Atividades Recentes</span>
            </CardTitle>
            <CardDescription className="mt-2">
              Últimas transações e eventos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: "Venda", description: "Curso de Marketing Digital", time: "Há 12 minutos", value: "R$ 497,00" },
                { type: "Novo Afiliado", description: "Maria Silva ingressou no programa", time: "Há 45 minutos", value: null },
                { type: "Comissão", description: "Comissão paga a Carlos Souza", time: "Há 2 horas", value: "R$ 149,10" },
                { type: "Reembolso", description: "Reembolso para Pedro Santos", time: "Há 5 horas", value: "R$ 997,00" }
              ].map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/30 hover:bg-secondary/70 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold">{activity.type}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">{activity.time}</p>
                  </div>
                  {activity.value && (
                    <div className="text-right ml-4">
                      <p className={cn(
                        "font-bold text-lg",
                        activity.type === "Reembolso" ? "text-red-400" : "text-emerald-400"
                      )}>
                        {activity.type === "Reembolso" ? `-${activity.value}` : activity.value}
                      </p>
                      <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-1 justify-end">
                        Detalhes
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
