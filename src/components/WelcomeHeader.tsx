
import { useEffect, useState } from "react";
import { Bell, Calendar, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export function WelcomeHeader() {
  const [greeting, setGreeting] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  
  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Bom dia");
    else if (hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");
    
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
      description: "Esta funcionalidade estará disponível em breve!"
    });
  };

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient mb-1">
            {greeting}, João Silva
          </h1>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <p>{currentDate}</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <button onClick={handleTodoClick} className="flex items-center px-3 py-2 rounded-md bg-secondary/40 hover:bg-secondary/60 transition-colors text-sm">
            <span>Ver tarefas pendentes</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
      
      <Card className="p-4 border-highlight/20 bg-gradient-to-r from-highlight/5 to-highlight/10 hover:from-highlight/10 hover:to-highlight/15 transition-all duration-300">
        <div className="flex items-start space-x-4">
          <div className="p-2 rounded-full bg-highlight/20 text-highlight">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Dica do dia</h3>
            <p className="text-sm text-muted-foreground">
              Configure integrações com meios de pagamento para expandir seu alcance. Acesse a página de 
              <span className="text-highlight hover:underline cursor-pointer ml-1">Integrações</span> 
              para conhecer as opções disponíveis.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
