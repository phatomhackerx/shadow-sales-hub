
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
          <div className="text-primary bg-primary/10 p-2 rounded-lg">
            {icon}
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <p className="text-3xl font-bold text-gradient">{value}</p>
        {trend && (
          <span 
            className={cn(
              "text-sm font-semibold flex items-center gap-1 px-2 py-1 rounded-lg",
              trend.positive 
                ? "text-emerald-400 bg-emerald-400/10" 
                : "text-red-400 bg-red-400/10"
            )}
          >
            {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  );
}
