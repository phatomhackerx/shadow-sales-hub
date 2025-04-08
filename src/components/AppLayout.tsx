
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import SidebarMenu from "./SidebarMenu";
import { X, Menu, Bell, ChevronDown, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
          <h1 className="text-xl font-bold text-white">VENDAS HUB</h1>
        </div>
        <div className="flex flex-col h-[calc(100%-4rem)] p-4 overflow-y-auto scrollbar-hide">
          <SidebarMenu />
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
          isMobile ? "w-full" : sidebarOpen ? "ml-64" : "ml-64"
        )}
      >
        {/* Top header */}
        <header className={cn(
          "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/40 px-6 transition-all duration-300 ease-in-out",
          scrolled ? "bg-background/95 backdrop-blur-md" : "bg-background"
        )}>
          <div className="flex items-center">
            <button 
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-sidebar-accent mr-2"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle sidebar</span>
            </button>
            
            <nav className="hidden md:flex items-center space-x-4">
              <button className="text-sm font-medium text-muted-foreground hover:text-white">Home</button>
              <button className="text-sm font-medium text-muted-foreground hover:text-white">Suporte</button>
              <button className="text-sm font-medium text-muted-foreground hover:text-white">Documentação</button>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-[1.2rem] w-[1.2rem]" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-highlight text-[10px] text-white">3</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Notificações</DialogTitle>
                  <DialogDescription>
                    Acompanhe suas notificações mais recentes
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-md hover:bg-secondary/30">
                    <div className="p-2 rounded-full bg-highlight/20 text-highlight">
                      <DollarSign className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Nova venda realizada</h4>
                      <p className="text-xs text-muted-foreground mt-1">Curso de Marketing Digital - R$ 497,00</p>
                      <p className="text-xs text-muted-foreground mt-1">Há 20 minutos atrás</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-md hover:bg-secondary/30">
                    <div className="p-2 rounded-full bg-green-500/20 text-green-500">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Novo afiliado cadastrado</h4>
                      <p className="text-xs text-muted-foreground mt-1">Maria Silva ingressou no seu programa de afiliados</p>
                      <p className="text-xs text-muted-foreground mt-1">Há 2 horas atrás</p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <div className="flex items-center gap-2 rounded-full bg-secondary/30 p-1 pl-3 cursor-pointer hover:bg-secondary/50 transition-colors">
              <span className="text-sm font-medium text-white">João Silva</span>
              <div className="h-8 w-8 rounded-full bg-highlight flex items-center justify-center">
                <span className="text-sm font-medium text-white">JS</span>
              </div>
              <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
