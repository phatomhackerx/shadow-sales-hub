
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import SidebarMenu from "./SidebarMenu";
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
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-sidebar-border bg-sidebar transition-transform duration-300 ease-in-out",
          isMobile && !sidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center px-6 border-b border-sidebar-border bg-sidebar">
          <h1 className="text-2xl font-bold">
            <span className="text-gradient-accent">VENDAS HUB</span>
          </h1>
        </div>
        <div className="flex flex-col h-[calc(100%-4rem)] p-4 overflow-y-auto scrollbar-hide">
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
          "flex flex-col flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
          isMobile ? "w-full" : "ml-64"
        )}
      >
        {/* Top header */}
        <header className={cn(
          "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/40 px-4 sm:px-6 transition-all duration-300 ease-in-out",
          scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background"
        )}>
          <div className="flex items-center">
            <button 
              className="inline-flex items-center justify-center rounded-xl p-2 text-foreground hover:bg-secondary/80 hover:text-primary mr-2 transition-all duration-300"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            <nav className="hidden md:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleProfileAction("Home")}
              >
                Home
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleProfileAction("Suporte")}
              >
                Suporte
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleProfileAction("Documentação")}
              >
                Documentação
              </Button>
            </nav>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="relative"
                  aria-label="Notificações"
                >
                  <Bell className="h-[1.2rem] w-[1.2rem]" />
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">3</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md grok-card">
                <DialogHeader>
                  <DialogTitle className="text-gradient">Notificações</DialogTitle>
                  <DialogDescription>
                    Acompanhe suas notificações mais recentes
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto scrollbar-hide">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/30 hover:bg-secondary/70 transition-all duration-300 cursor-pointer"
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
                <div className="flex items-center gap-2 rounded-full bg-secondary/50 border border-border/50 p-1 pl-4 cursor-pointer hover:bg-secondary/70 hover:border-primary/30 transition-all duration-300">
                  <span className="text-sm font-semibold hidden sm:inline-block">João Silva</span>
                  <div className="h-9 w-9 rounded-full button-gradient flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-foreground">JS</span>
                  </div>
                  <ChevronDown className="h-4 w-4 mr-1 text-muted-foreground sm:inline-block hidden" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 dropdown-content">
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
        <div className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          <div className="slide-up-animation">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
