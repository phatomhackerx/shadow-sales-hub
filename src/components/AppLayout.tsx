
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import SidebarMenu from "./SidebarMenu";
import { MenuIcon, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-sidebar-border bg-sidebar transition-transform duration-200 ease-in-out",
          isMobile && !sidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-white">VENDAS HUB</h1>
        </div>
        <div className="flex flex-col h-[calc(100%-4rem)] p-4 overflow-y-auto scrollbar-hide">
          <SidebarMenu />
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <main 
        className={cn(
          "flex flex-col flex-1 overflow-y-auto transition-all duration-200 ease-in-out",
          isMobile ? "w-full" : sidebarOpen ? "ml-64" : "ml-64"
        )}
      >
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/40 bg-background/95 px-6 backdrop-blur-sm">
          <button 
            className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-sidebar-accent"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            <span className="sr-only">Toggle sidebar</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-highlight flex items-center justify-center">
              <span className="text-sm font-medium text-white">AB</span>
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
