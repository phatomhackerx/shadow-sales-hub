
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
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
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

  return (
    <div className="space-y-6">
      <WelcomeHeader />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            icon={stat.icon}
            className={cn("hover:shadow-md transition-all duration-300", stat.className)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/40 bg-card/80 backdrop-blur-sm hover:border-highlight/20 transition-colors duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-highlight" />
                  Desempenho de Vendas
                </CardTitle>
                <CardDescription>
                  Análise do desempenho de vendas dos últimos 30 dias
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-secondary/40 hover:bg-secondary/60">
                Ver Relatório
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/80 backdrop-blur-sm hover:border-highlight/20 transition-colors duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-highlight" />
              Meios de Pagamento
            </CardTitle>
            <CardDescription>
              Distribuição das formas de pagamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaymentMethodsChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border/40 bg-card/80 backdrop-blur-sm hover:border-highlight/20 transition-colors duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Zap className="mr-2 h-5 w-5 text-highlight" />
              Produtos Mais Vendidos
            </CardTitle>
            <CardDescription>
              Produtos com melhor desempenho este mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Curso de Marketing Digital", sales: 487, value: "R$ 97.400,00" },
                { name: "Mentoria Premium", sales: 218, value: "R$ 65.400,00" },
                { name: "E-book Copywriting", sales: 152, value: "R$ 15.200,00" },
                { name: "Assinatura Platinum", sales: 89, value: "R$ 44.500,00" }
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-md bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">{product.sales} vendas</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/80 backdrop-blur-sm hover:border-highlight/20 transition-colors duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="mr-2 h-5 w-5 text-highlight" />
              Atividades Recentes
            </CardTitle>
            <CardDescription>
              Últimas transações e eventos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Venda", description: "Curso de Marketing Digital", time: "Há 12 minutos", value: "R$ 497,00" },
                { type: "Novo Afiliado", description: "Maria Silva ingressou no programa", time: "Há 45 minutos", value: null },
                { type: "Comissão", description: "Comissão paga a Carlos Souza", time: "Há 2 horas", value: "R$ 149,10" },
                { type: "Reembolso", description: "Reembolso para Pedro Santos", time: "Há 5 horas", value: "R$ 997,00" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-md bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div>
                    <h4 className="font-medium">{activity.type}</h4>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                  {activity.value && (
                    <div className="text-right">
                      <p className={cn(
                        "font-medium",
                        activity.type === "Reembolso" ? "text-red-400" : "text-green-400"
                      )}>
                        {activity.type === "Reembolso" ? `-${activity.value}` : activity.value}
                      </p>
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
