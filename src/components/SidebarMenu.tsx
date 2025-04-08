
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
  Settings
} from "lucide-react";

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

const SidebarMenu = () => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col space-y-1">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              isActive 
                ? "bg-sidebar-accent text-highlight font-medium" 
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarMenu;
