
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileVideo, Upload, Check, Palette, Clock } from "lucide-react";

const ProductConfigurations = () => {
  const [deliveryType, setDeliveryType] = useState("immediate");
  const [templateType, setTemplateType] = useState("predefined");
  const [videoUrl, setVideoUrl] = useState("");
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Produto</CardTitle>
          <CardDescription>
            Configure detalhes como acesso e personalização da página de vendas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Acesso ao Produto</h3>
            <RadioGroup value={deliveryType} onValueChange={setDeliveryType} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3 border border-border rounded-md p-4 hover:border-highlight/30 transition-colors cursor-pointer">
                <RadioGroupItem value="immediate" id="immediate" className="mt-1" />
                <div>
                  <Label htmlFor="immediate" className="text-base font-medium">Entrega Imediata</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    O comprador terá acesso ao produto imediatamente após a confirmação do pagamento.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 border border-border rounded-md p-4 hover:border-highlight/30 transition-colors cursor-pointer">
                <RadioGroupItem value="drip" id="drip" className="mt-1" />
                <div>
                  <Label htmlFor="drip" className="text-base font-medium">Drip Content</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    O conteúdo será liberado gradativamente, conforme programação definida.
                  </p>
                  
                  {deliveryType === "drip" && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor="drip-days" className="text-sm">Dias para liberação</Label>
                        <Input 
                          id="drip-days" 
                          type="number" 
                          placeholder="Ex: 7" 
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Número de dias após a compra para liberar o conteúdo.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-medium mb-4">Personalização da Página de Vendas</h3>
            <Tabs value={templateType} onValueChange={setTemplateType} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="predefined">Templates Prontos</TabsTrigger>
                <TabsTrigger value="custom">Personalizado</TabsTrigger>
              </TabsList>
              
              <TabsContent value="predefined" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((template) => (
                    <div key={template} className="relative border border-border rounded-md overflow-hidden group cursor-pointer hover:border-highlight/50 transition-colors">
                      <img 
                        src={`https://placehold.co/400x250/1f1f23/ffffff?text=Template+${template}`}
                        alt={`Template ${template}`}
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="default">
                          <Check className="h-4 w-4 mr-2" />
                          Selecionar
                        </Button>
                      </div>
                      <div className="p-3 border-t border-border">
                        <h4 className="font-medium">Template {template}</h4>
                        <p className="text-xs text-muted-foreground">Conversão alta, design moderno</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="custom" className="mt-0 space-y-6">
                <div>
                  <Label htmlFor="banner">Banner Promocional</Label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-md p-6 text-center hover:border-highlight/50 transition-colors cursor-pointer">
                    <input type="file" id="banner" className="hidden" />
                    <label htmlFor="banner" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm font-medium text-foreground">
                        Upload de Banner Promocional
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Tamanho recomendado: 1200x300px
                      </p>
                    </label>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="video">Vídeo de Vendas</Label>
                  <div className="flex items-center mt-2 space-x-2">
                    <FileVideo className="h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="video" 
                      placeholder="Link do YouTube ou Vimeo" 
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Cole o link do seu vídeo no YouTube ou Vimeo.
                  </p>
                </div>
                
                <div>
                  <Label>Cores da Página</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                    <div>
                      <Label htmlFor="primary-color" className="text-xs">Cor Primária</Label>
                      <div className="flex mt-1">
                        <div className="w-10 h-10 rounded-l-md bg-blue-600 border border-border"></div>
                        <Input 
                          id="primary-color" 
                          defaultValue="#3B82F6"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="secondary-color" className="text-xs">Cor Secundária</Label>
                      <div className="flex mt-1">
                        <div className="w-10 h-10 rounded-l-md bg-indigo-600 border border-border"></div>
                        <Input 
                          id="secondary-color" 
                          defaultValue="#4F46E5"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="accent-color" className="text-xs">Cor de Destaque</Label>
                      <div className="flex mt-1">
                        <div className="w-10 h-10 rounded-l-md bg-amber-500 border border-border"></div>
                        <Input 
                          id="accent-color" 
                          defaultValue="#F59E0B"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductConfigurations;
