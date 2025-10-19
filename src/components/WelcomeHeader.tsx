
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
    <div className="mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            {greeting}, João Silva
          </h1>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <p>{currentDate}</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Button 
            onClick={handleTodoClick}
            variant="outline"
            className="gap-2"
          >
            <span>Ver tarefas pendentes</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Card className="grok-card border-border/60 bg-card/80">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-lg bg-foreground/10">
            <Bell className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-base mb-1">Dica do dia</h3>
            <p className="text-sm text-muted-foreground">
              Configure integrações com meios de pagamento para expandir seu alcance. Acesse a página de 
              <button 
                className="inline-flex items-center text-foreground hover:underline cursor-pointer mx-1 group font-medium" 
                onClick={() => window.location.href = '/integracoes'}
              >
                Integrações
                <ArrowRight className="ml-1 h-3 w-3 transform transition-transform group-hover:translate-x-1" />
              </button> 
              para conhecer as opções disponíveis.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
