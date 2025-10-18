
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
    <div className="flex flex-col space-y-1">
      {menuItems.map((item, index) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-300",
              isActive 
                ? "bg-primary text-primary-foreground font-medium shadow-[0_0_20px_hsl(217_91%_60%/0.3)]" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground",
              item.highlight && !isActive && "text-primary font-medium"
            )}
            style={{ 
              animationDelay: `${index * 0.05}s`,
              transform: isActive ? 'translateX(4px)' : 'translateX(0)',
            }}
          >
            <item.icon className={cn(
              "h-5 w-5 transition-transform",
              isActive && "subtle-bounce-animation"
            )} />
            <span>{item.title}</span>
            {item.highlight && !isActive && (
              <span className="ml-auto bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full font-semibold">
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
