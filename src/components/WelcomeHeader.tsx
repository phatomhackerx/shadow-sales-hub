
import { useEffect, useState } from "react";
import { Bell, Calendar, ChevronRight, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function WelcomeHeader() {
  const [greeting, setGreeting] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening">("morning");
  
  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Bom dia");
      setTimeOfDay("morning");
    } else if (hour < 18) {
      setGreeting("Boa tarde");
      setTimeOfDay("afternoon");
    } else {
      setGreeting("Boa noite");
      setTimeOfDay("evening");
    }
    
    // Format current date in Portuguese
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const formattedDate = new Date().toLocaleDateString('pt-BR', options);
    setCurrentDate(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));
  }, []);

  const handleTodoClick = () => {
    toast.info("Recurso de tarefas em desenvolvimento", {
      description: "Esta funcionalidade estará disponível em breve!",
      position: "bottom-right",
      duration: 3000,
    });
  };

  const getTimeBasedGradient = () => {
    switch (timeOfDay) {
      case "morning":
        return "from-blue-500/5 to-blue-600/10";
      case "afternoon":
        return "from-orange-500/5 to-yellow-500/10";
      case "evening":
        return "from-purple-500/5 to-indigo-500/10";
      default:
        return "from-highlight/5 to-highlight/10";
    }
  };

  return (
    <div className="mb-4 md:mb-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-1.5">
            {greeting}, João
          </h1>
          <div className="flex items-center text-muted-foreground text-sm">
            <Calendar className="mr-1.5 h-3.5 w-3.5" />
            <p className="truncate">{currentDate}</p>
          </div>
        </div>
        <div className="mt-3 md:mt-0 flex items-center">
          <Button 
            onClick={handleTodoClick}
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
          >
            <span className="hidden sm:inline">Ver tarefas</span>
            <span className="sm:hidden">Tarefas</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      <Card className="grok-card border-border/50 bg-card/80">
        <div className="flex items-start space-x-3">
          <div className="p-2 md:p-2.5 rounded-lg bg-foreground/10 flex-shrink-0">
            <Bell className="h-4 w-4 md:h-5 md:w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm md:text-base mb-1">Dica do dia</h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Configure integrações com meios de pagamento. Acesse{" "}
              <button 
                className="inline-flex items-center text-foreground hover:underline cursor-pointer group font-medium" 
                onClick={() => window.location.href = '/integracoes'}
              >
                Integrações
                <ArrowRight className="ml-0.5 h-3 w-3 transform transition-transform group-hover:translate-x-0.5" />
              </button>.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
