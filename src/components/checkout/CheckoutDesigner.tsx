
import { useState } from "react";
import { 
  DndContext, 
  closestCenter, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragEndEvent 
} from "@dnd-kit/core";
import { 
  SortableContext, 
  verticalListSortingStrategy, 
  useSortable 
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, Trash2, GripVertical, Video, CreditCard, BadgePercent, Shield, Gift, Timer, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";

interface CheckoutDesignerProps {
  checkout: any;
  setCheckout: (checkout: any) => void;
}

const availableElements = [
  { id: "header", type: "header", label: "Cabeçalho", icon: FileText },
  { id: "video", type: "video", label: "Vídeo", icon: Video },
  { id: "checkout_form", type: "checkout_form", label: "Formulário de Checkout", icon: CreditCard },
  { id: "coupon", type: "coupon", label: "Cupom de Desconto", icon: BadgePercent },
  { id: "guarantee", type: "guarantee", label: "Garantia", icon: Shield },
  { id: "bump_offer", type: "bump_offer", label: "Bump Offer", icon: Gift },
  { id: "timer", type: "timer", label: "Timer de Escassez", icon: Timer },
  { id: "custom_html", type: "custom_html", label: "HTML Personalizado", icon: FileText },
];

interface SortableItemProps {
  id: string;
  type: string;
  onRemove: () => void;
}

const SortableItem = ({ id, type, onRemove }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  const elementConfig = availableElements.find(el => el.type === type);
  const Icon = elementConfig?.icon || FileText;
  
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="bg-secondary rounded-md mb-2 border border-border"
    >
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <div 
            {...attributes} 
            {...listeners}
            className="cursor-grab p-1 rounded-md hover:bg-muted"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span>{elementConfig?.label || type}</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-muted-foreground hover:text-red-500"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const CheckoutDesigner = ({ checkout, setCheckout }: CheckoutDesignerProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>("elements");
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = checkout.elements.findIndex((item: any) => item.id === active.id);
      const newIndex = checkout.elements.findIndex((item: any) => item.id === over.id);
      
      const newElements = [...checkout.elements];
      const [removed] = newElements.splice(oldIndex, 1);
      newElements.splice(newIndex, 0, removed);
      
      setCheckout({
        ...checkout,
        elements: newElements,
      });
    }
  };
  
  const addElement = (type: string) => {
    const newElement = {
      id: `${type}_${Date.now()}`,
      type,
      data: {}
    };
    
    setCheckout({
      ...checkout,
      elements: [...checkout.elements, newElement],
    });
  };
  
  const removeElement = (id: string) => {
    setCheckout({
      ...checkout,
      elements: checkout.elements.filter((item: any) => item.id !== id),
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label>Elementos do Checkout</Label>
        <p className="text-sm text-muted-foreground">Arraste para reordenar os elementos</p>
      </div>
      
      <Accordion
        type="single"
        collapsible
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="space-y-2"
      >
        <AccordionItem value="elements" className="border rounded-md overflow-hidden">
          <AccordionTrigger className="px-3 py-2 hover:no-underline">
            Adicionar Elementos
          </AccordionTrigger>
          <AccordionContent className="p-3 pt-0 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {availableElements.map((element) => (
                <Button
                  key={element.type}
                  variant="outline"
                  className="h-auto py-2 justify-start"
                  onClick={() => addElement(element.type)}
                >
                  <element.icon className="h-4 w-4 mr-2" />
                  <span className="text-sm">{element.label}</span>
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="border rounded-md p-3">
        <p className="text-sm font-medium mb-3">Estrutura do Checkout</p>
        
        {checkout.elements.length === 0 ? (
          <div className="p-8 text-center border border-dashed rounded-md bg-muted/50">
            <p className="text-sm text-muted-foreground mb-4">Nenhum elemento adicionado ao checkout</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveCategory("elements")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar elemento
            </Button>
          </div>
        ) : (
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={checkout.elements.map((item: any) => item.id)} 
              strategy={verticalListSortingStrategy}
            >
              {checkout.elements.map((item: any) => (
                <SortableItem 
                  key={item.id} 
                  id={item.id} 
                  type={item.type} 
                  onRemove={() => removeElement(item.id)} 
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};

export default CheckoutDesigner;
