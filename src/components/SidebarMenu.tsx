
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Package, 
  ShoppingBag, 
  CreditCard, 
  BarChart2,
  Users,
  Wallet, 
  Share2, 
  Tag,
  Settings,
  Bot
} from "lucide-react";

interface SidebarMenuProps {
  onItemClick?: () => void;
}

const menuItems = [
  { 
    title: "Dashboard", 
    icon: Home, 
    path: "/" 
  },
  { 
    title: "Produtos", 
    icon: Package, 
    path: "/produtos",
    highlight: true
  },
  { 
    title: "Marketplace", 
    icon: ShoppingBag, 
    path: "/vendas" 
  },
  {
    title: "BotsAI",
    icon: Bot,
    path: "/botsai"
  },
  { 
    title: "Assinaturas", 
    icon: CreditCard, 
    path: "/assinaturas" 
  },
  { 
    title: "Relatórios", 
    icon: BarChart2, 
    path: "/relatorios" 
  },
  { 
    title: "Afiliados", 
    icon: Users, 
    path: "/afiliados" 
  },
  { 
    title: "Financeiro", 
    icon: Wallet, 
    path: "/financeiro" 
  },
  { 
    title: "Integrações", 
    icon: Share2, 
    path: "/integracoes" 
  },
  { 
    title: "Cupons", 
    icon: Tag, 
    path: "/cupons" 
  },
  { 
    title: "Configurações", 
    icon: Settings, 
    path: "/configuracoes" 
  }
];

const SidebarMenu = ({ onItemClick }: SidebarMenuProps) => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col space-y-1 py-2">
      {menuItems.map((item, index) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 relative overflow-hidden group",
              isActive 
                ? "bg-foreground text-background" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
            )}
          >
            <item.icon className={cn(
              "h-4 w-4 transition-transform flex-shrink-0",
              isActive && "scale-110"
            )} />
            <span className="truncate">{item.title}</span>
            {item.highlight && !isActive && (
              <span className="ml-auto bg-foreground/10 text-foreground text-xs px-1.5 py-0.5 rounded-md font-medium flex-shrink-0">
                New
              </span>
            )}
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-background rounded-r-full" />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarMenu;
