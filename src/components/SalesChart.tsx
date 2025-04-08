
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
    <div className="rounded-lg border border-border bg-card p-4 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Vendas e Taxas de Aprovação</h3>
        <div className="flex space-x-1 rounded-md border border-border bg-card p-1">
          {chartOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedOption(option.value)}
              className={`px-2.5 py-1 text-xs font-medium rounded-sm ${
                selectedOption === option.value 
                  ? "bg-highlight text-white" 
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis yAxisId="left" stroke="#888" />
            <YAxis yAxisId="right" orientation="right" stroke="#888" />
            <Tooltip contentStyle={{ backgroundColor: "#222", borderColor: "#333" }} />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="vendas"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="aprovacao"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
