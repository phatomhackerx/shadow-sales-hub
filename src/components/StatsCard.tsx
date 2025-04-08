
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "rounded-lg border p-4 shadow-sm flex flex-col",
  {
    variants: {
      variant: {
        default: "border-border bg-card",
        accent: "border-highlight/20 bg-card"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

interface StatsCardProps extends VariantProps<typeof cardVariants> {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    positive: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  trend, 
  icon, 
  variant, 
  className 
}: StatsCardProps) {
  return (
    <div className={cn(cardVariants({ variant }), className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold">{value}</p>
        {trend && (
          <span 
            className={cn(
              "ml-2 text-xs font-medium",
              trend.positive ? "text-green-500" : "text-red-500"
            )}
          >
            {trend.positive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
    </div>
  );
}
