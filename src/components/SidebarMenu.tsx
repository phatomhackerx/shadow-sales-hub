
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Package, 
  ShoppingCart, 
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
    path: "/produtos" 
  },
  { 
    title: "Minhas Vendas", 
    icon: ShoppingCart, 
    path: "/vendas" 
  },
  {
    title: "BotsAI",
    icon: Bot,
    path: "/botsai",
    highlight: true
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
    <div className="flex flex-col space-y-1">
      {menuItems.map((item, index) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-300",
              isActive 
                ? "bg-sidebar-accent text-highlight font-medium glow-effect" 
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              item.highlight && !isActive && "text-highlight/90 font-medium"
            )}
            style={{ 
              animationDelay: `${index * 0.05}s`,
              transform: isActive ? 'translateX(4px)' : 'translateX(0)',
            }}
          >
            <item.icon className={cn(
              "h-5 w-5 transition-transform",
              isActive && "text-highlight subtle-bounce-animation",
              item.highlight && !isActive && "text-highlight/90"
            )} />
            <span>{item.title}</span>
            {item.highlight && !isActive && (
              <span className="ml-auto bg-highlight/20 text-highlight text-xs px-1.5 py-0.5 rounded-full">
                Novo
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarMenu;
