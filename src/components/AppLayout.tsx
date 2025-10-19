
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import SidebarMenu from "./SidebarMenu";
import { StarryBackground } from "@/components/StarryBackground";
import { X, Menu, Bell, ChevronDown, User, DollarSign, Settings, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Fechar sidebar ao clicar em um link do menu (em dispositivos móveis)
  const handleMenuItemClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fechar sidebar quando a tela é redimensionada para desktop
  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const handleProfileAction = (action: string) => {
    toast.info(`Ação: ${action}`, {
      description: "Funcionalidade em desenvolvimento",
      position: "bottom-right",
      duration: 3000,
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background relative">
      <StarryBackground />
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-sidebar-border bg-sidebar transition-transform duration-200 ease-out",
          isMobile && !sidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-center px-6 border-b border-sidebar-border/50">
          <h1 className="text-lg font-semibold tracking-wide">
            VENDAS HUB
          </h1>
        </div>
        <div className="flex flex-col h-[calc(100%-4rem)] px-3 py-2 overflow-y-auto scrollbar-hide">
          <SidebarMenu onItemClick={handleMenuItemClick} />
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <main 
        className={cn(
          "flex flex-col flex-1 overflow-y-auto transition-all duration-300 ease-in-out relative z-10",
          isMobile ? "w-full" : "ml-64"
        )}
      >
        {/* Top header */}
        <header className={cn(
          "sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/40 px-3 sm:px-4 lg:px-6 transition-all duration-200",
          scrolled ? "bg-background/90 backdrop-blur-xl shadow-sm" : "bg-background/80 backdrop-blur-lg"
        )}>
          <div className="flex items-center gap-2">
            <button 
              className="inline-flex items-center justify-center rounded-lg p-2 text-foreground hover:bg-secondary/60 transition-all duration-200"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            <nav className="hidden lg:flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => handleProfileAction("Home")}
              >
                Home
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => handleProfileAction("Suporte")}
              >
                Suporte
              </Button>
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative h-9 w-9"
                  aria-label="Notificações"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[9px] font-bold text-background">3</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md grok-card">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold">Notificações</DialogTitle>
                  <DialogDescription>
                    Acompanhe suas notificações mais recentes
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto scrollbar-hide">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex items-start gap-3 p-3 rounded-lg bg-secondary/40 border border-border/40 hover:bg-secondary/60 transition-all duration-200 cursor-pointer"
                    >
                      <div className={cn(
                        "p-2 rounded-lg", 
                        i % 2 === 0 
                          ? "bg-primary/20 text-primary" 
                          : "bg-emerald-500/20 text-emerald-400"
                      )}>
                        {i % 2 === 0 ? <DollarSign className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold">
                          {i % 2 === 0 ? "Nova venda realizada" : "Novo afiliado cadastrado"}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {i % 2 === 0 
                            ? `Curso de Marketing Digital - R$ ${(497 + i * 100).toFixed(2)}` 
                            : `${["Maria Silva", "Carlos Santos", "Ana Costa", "Pedro Souza", "Júlia Lima"][i]} ingressou no seu programa de afiliados`}
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          Há {i + 1} {i === 0 ? "hora" : "horas"} atrás
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full bg-secondary/30 border border-border/40 p-0.5 pl-3 hover:bg-secondary/50 transition-all duration-200 outline-none focus:ring-2 focus:ring-foreground/20">
                  <span className="text-xs font-medium hidden md:inline-block truncate max-w-[100px]">João Silva</span>
                  <div className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold">JS</span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 glass-card">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer flex items-center" 
                  onClick={() => handleProfileAction("Perfil")}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer flex items-center" 
                  onClick={() => handleProfileAction("Configurações")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer flex items-center text-red-400 focus:text-red-400"
                  onClick={() => handleProfileAction("Sair")}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Page content */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
