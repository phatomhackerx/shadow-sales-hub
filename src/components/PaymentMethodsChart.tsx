
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "Cartão de Crédito", value: 65 },
  { name: "Pix", value: 25 },
  { name: "Boleto", value: 8 },
  { name: "Cartão de Débito", value: 2 }
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

export function PaymentMethodsChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 h-full">
      <h3 className="text-lg font-medium mb-6">Meios de Pagamento</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `${value}%`}
              contentStyle={{ backgroundColor: "#222", borderColor: "#333" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
