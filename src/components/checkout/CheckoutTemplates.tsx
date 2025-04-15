
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface CheckoutTemplatesProps {
  checkout: any;
  setCheckout: (checkout: any) => void;
}

const templates = [
  {
    id: "default",
    name: "Padrão",
    description: "Layout clássico de checkout com formulário simples",
    image: "https://via.placeholder.com/120x80?text=Default",
    colors: {
      primaryColor: "#9b87f5",
      secondaryColor: "#6E59A5"
    }
  },
  {
    id: "minimalist",
    name: "Minimalista",
    description: "Design limpo e moderno com foco na conversão",
    image: "https://via.placeholder.com/120x80?text=Minimalist",
    colors: {
      primaryColor: "#38BDF8",
      secondaryColor: "#0284C7"
    }
  },
  {
    id: "dark",
    name: "Dark Mode",
    description: "Estilo escuro para menor fadiga visual",
    image: "https://via.placeholder.com/120x80?text=Dark",
    colors: {
      primaryColor: "#6366F1",
      secondaryColor: "#4F46E5",
      background: "#121212"
    }
  },
  {
    id: "sales",
    name: "Vendas",
    description: "Otimizado para conversões com elementos persuasivos",
    image: "https://via.placeholder.com/120x80?text=Sales",
    colors: {
      primaryColor: "#F59E0B",
      secondaryColor: "#D97706"
    }
  },
  {
    id: "premium",
    name: "Premium",
    description: "Design sofisticado para produtos de alto valor",
    image: "https://via.placeholder.com/120x80?text=Premium",
    colors: {
      primaryColor: "#3B82F6",
      secondaryColor: "#1D4ED8"
    }
  },
  {
    id: "clean",
    name: "Clean",
    description: "Interface simplificada com foco na experiência do usuário",
    image: "https://via.placeholder.com/120x80?text=Clean",
    colors: {
      primaryColor: "#10B981",
      secondaryColor: "#059669"
    }
  }
];

const CheckoutTemplates = ({ checkout, setCheckout }: CheckoutTemplatesProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState(checkout.template);
  
  const applyTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    
    const template = templates.find(t => t.id === templateId);
    if (!template) return;
    
    // Update checkout with template settings
    setCheckout({
      ...checkout,
      template: templateId,
      settings: {
        ...checkout.settings,
        ...template.colors
      }
    });
  };
  
  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">Templates de Checkout</p>
      <p className="text-xs text-muted-foreground mb-4">
        Escolha um design pré-configurado e personalize conforme necessário
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className={`cursor-pointer hover:border-highlight transition-all overflow-hidden ${
              selectedTemplate === template.id ? 'ring-2 ring-highlight' : ''
            }`}
            onClick={() => applyTemplate(template.id)}
          >
            <div className="relative">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-20 object-cover"
              />
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-highlight rounded-full p-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
              <div 
                className="h-1" 
                style={{ backgroundColor: template.colors.primaryColor }}
              ></div>
            </div>
            <CardContent className="p-2">
              <p className="text-xs font-medium">{template.name}</p>
              <p className="text-[10px] text-muted-foreground line-clamp-1">
                {template.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full mt-2"
        onClick={() => applyTemplate(selectedTemplate)}
      >
        Aplicar Template
      </Button>
    </div>
  );
};

export default CheckoutTemplates;
