
import { useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { name: "Jan", vendas: 4000, aprovacao: 85 },
  { name: "Fev", vendas: 3000, aprovacao: 82 },
  { name: "Mar", vendas: 2000, aprovacao: 88 },
  { name: "Abr", vendas: 2780, aprovacao: 87 },
  { name: "Mai", vendas: 1890, aprovacao: 89 },
  { name: "Jun", vendas: 2390, aprovacao: 86 },
  { name: "Jul", vendas: 3490, aprovacao: 91 }
];

const chartOptions = [
  { value: "7dias", label: "7 dias" },
  { value: "30dias", label: "30 dias" },
  { value: "3meses", label: "3 meses" },
  { value: "6meses", label: "6 meses" }
];

export function SalesChart() {
  const [selectedOption, setSelectedOption] = useState("30dias");

  return (
    <div className="grok-card p-4 sm:p-6 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h3 className="text-base sm:text-lg font-medium">Vendas e Taxas de Aprovação</h3>
        <div className="flex space-x-1 rounded-lg border border-border/50 bg-background/50 p-1">
          {chartOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedOption(option.value)}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                selectedOption === option.value 
                  ? "bg-foreground text-background shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} opacity={0.3} />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              yAxisId="left" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                borderColor: "hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend 
              wrapperStyle={{ fontSize: "12px" }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="vendas"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ r: 3, fill: "hsl(var(--primary))" }}
              activeDot={{ r: 5 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="aprovacao"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ r: 3, fill: "#10B981" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
