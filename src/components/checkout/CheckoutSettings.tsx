
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Upload, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CheckoutSettingsProps {
  checkout: any;
  setCheckout: (checkout: any) => void;
}

const CheckoutSettings = ({ checkout, setCheckout }: CheckoutSettingsProps) => {
  const [activeTab, setActiveTab] = useState("appearance");
  const [date, setDate] = useState<Date | undefined>(
    checkout.settings.timerEndDate ? new Date(checkout.settings.timerEndDate) : undefined
  );

  const updateSettings = (key: string, value: any) => {
    setCheckout({
      ...checkout,
      settings: {
        ...checkout.settings,
        [key]: value
      }
    });
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    if (date) {
      updateSettings('timerEndDate', date.toISOString());
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="form">Formulário</TabsTrigger>
          <TabsTrigger value="payment">Pagamento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Cor Primária</Label>
            <div className="flex space-x-2">
              <div 
                className="w-10 h-10 rounded-md border"
                style={{ backgroundColor: checkout.settings.primaryColor }}
              />
              <Input
                id="primaryColor"
                type="color"
                value={checkout.settings.primaryColor}
                onChange={(e) => updateSettings('primaryColor', e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Cor Secundária</Label>
            <div className="flex space-x-2">
              <div 
                className="w-10 h-10 rounded-md border"
                style={{ backgroundColor: checkout.settings.secondaryColor }}
              />
              <Input
                id="secondaryColor"
                type="color"
                value={checkout.settings.secondaryColor}
                onChange={(e) => updateSettings('secondaryColor', e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="font">Fonte Principal</Label>
            <select
              id="font"
              value={checkout.settings.font}
              onChange={(e) => updateSettings('font', e.target.value)}
              className="w-full p-2 border rounded-md bg-background"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Poppins">Poppins</option>
              <option value="Open Sans">Open Sans</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="background">Cor de Fundo</Label>
            <div className="flex space-x-2">
              <div 
                className="w-10 h-10 rounded-md border"
                style={{ backgroundColor: checkout.settings.background }}
              />
              <Input
                id="background"
                type="color"
                value={checkout.settings.background}
                onChange={(e) => updateSettings('background', e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="logo">Logo</Label>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="w-full justify-start">
                <Upload className="h-4 w-4 mr-2" />
                Enviar Logo
              </Button>
            </div>
            {checkout.settings.logo && (
              <div className="mt-2 p-2 border rounded-md">
                <img 
                  src={checkout.settings.logo} 
                  alt="Logo" 
                  className="max-h-20 mx-auto" 
                />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="showTimer" className="cursor-pointer">Timer de Escassez</Label>
              <Switch 
                id="showTimer"
                checked={checkout.settings.showTimer}
                onCheckedChange={(checked) => updateSettings('showTimer', checked)}
              />
            </div>
            
            {checkout.settings.showTimer && (
              <div className="space-y-2 pt-2">
                <Label>Data de término</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="form" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="headerText">Título do Checkout</Label>
            <Input
              id="headerText"
              value={checkout.settings.headerText}
              onChange={(e) => updateSettings('headerText', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subheaderText">Subtítulo</Label>
            <Input
              id="subheaderText"
              value={checkout.settings.subheaderText}
              onChange={(e) => updateSettings('subheaderText', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="buttonText">Texto do Botão de Compra</Label>
            <Input
              id="buttonText"
              value={checkout.settings.buttonText}
              onChange={(e) => updateSettings('buttonText', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Campos do Formulário</p>
            <div className="space-y-2">
              {["Nome", "Email", "CPF", "Telefone", "Endereço"].map((field) => (
                <div key={field} className="flex items-center space-x-2 border p-2 rounded-md">
                  <div className="bg-green-500/20 text-green-500 p-1 rounded">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>{field}</span>
                  <span className="text-xs text-muted-foreground ml-auto">Obrigatório</span>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              Configurar Campos
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Gateways de Pagamento</p>
            <div className="space-y-2">
              {["Stripe", "Mercado Pago", "PIX"].map((gateway) => (
                <div key={gateway} className="flex items-center space-x-2 border p-2 rounded-md">
                  <Switch id={`gateway-${gateway}`} />
                  <Label htmlFor={`gateway-${gateway}`} className="cursor-pointer">
                    {gateway}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Parcelamento</p>
            <div className="flex items-center space-x-2">
              <Switch id="enableInstallments" />
              <Label htmlFor="enableInstallments" className="cursor-pointer">
                Habilitar parcelamento
              </Label>
            </div>
            <Input
              type="number"
              placeholder="Número máximo de parcelas"
              min="1"
              max="12"
              defaultValue="12"
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Após o pagamento</p>
            <Input
              placeholder="URL de redirecionamento após o pagamento"
              defaultValue="https://seudominio.com.br/obrigado"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CheckoutSettings;
