
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
    <div className={cn("grok-card", cardVariants({ variant }), className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <p className="text-2xl font-semibold">{value}</p>
        {trend && (
          <span 
            className={cn(
              "text-xs font-medium flex items-center gap-1",
              trend.positive 
                ? "text-emerald-400" 
                : "text-red-400"
            )}
          >
            {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  );
}
