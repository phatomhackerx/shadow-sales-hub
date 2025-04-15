
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, Mail, PlusCircle, Trash2, FileWarning, Info, AlertCircle } from "lucide-react";

const ProductCoProduction = () => {
  const [enabled, setEnabled] = useState(false);
  const [producers, setProducers] = useState([
    { id: 1, name: "", email: "", percentage: "" }
  ]);
  
  const addProducer = () => {
    setProducers([...producers, { id: Date.now(), name: "", email: "", percentage: "" }]);
  };
  
  const removeProducer = (id: number) => {
    if (producers.length > 1) {
      setProducers(producers.filter(producer => producer.id !== id));
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Co-Produção</CardTitle>
              <CardDescription>
                Adicione co-produtores que receberão uma porcentagem das vendas
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="coproduction-toggle" 
                checked={enabled} 
                onCheckedChange={setEnabled} 
              />
              <Label htmlFor="coproduction-toggle" className="text-sm">
                {enabled ? "Ativado" : "Desativado"}
              </Label>
            </div>
          </div>
        </CardHeader>
        
        {enabled && (
          <CardContent className="space-y-6">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-500">Informação Importante</h4>
                  <p className="text-sm mt-1">
                    Os co-produtores receberão automaticamente o percentual definido de cada venda. Eles precisam ter uma conta na plataforma Cakto para receber os pagamentos. O total de percentual não pode ultrapassar 100%.
                  </p>
                </div>
              </div>
            </div>
            
            {producers.map((producer, index) => (
              <div key={producer.id} className="border border-border rounded-md p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Co-Produtor {index + 1}
                  </h4>
                  {producers.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProducer(producer.id)}
                      className="h-8 w-8 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`producer-name-${producer.id}`}>Nome</Label>
                    <Input 
                      id={`producer-name-${producer.id}`} 
                      placeholder="Nome do co-produtor" 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`producer-email-${producer.id}`} className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Label>
                    <Input 
                      id={`producer-email-${producer.id}`} 
                      placeholder="email@exemplo.com" 
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Deve ser o email cadastrado na plataforma
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor={`producer-percentage-${producer.id}`}>Porcentagem (%)</Label>
                    <div className="relative mt-1">
                      <Input 
                        id={`producer-percentage-${producer.id}`} 
                        placeholder="Ex: 30" 
                        type="number"
                        min="1"
                        max="100"
                        className="pr-8"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              onClick={addProducer}
              className="w-full"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Co-Produtor
            </Button>
            
            <div className="flex justify-between items-center bg-secondary/20 rounded-md p-4">
              <div className="flex items-center">
                <FileWarning className="h-5 w-5 text-highlight mr-2" />
                <span className="font-medium">Split de Pagamentos</span>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Sua parte: </span>
                <span className="font-bold">70%</span>
                <span className="text-sm text-muted-foreground"> | Co-Produtores: </span>
                <span className="font-bold">30%</span>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      
      {!enabled && (
        <div className="flex items-center justify-center p-8 border border-dashed border-border rounded-lg">
          <div className="text-center">
            <Users className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">Configure Co-Produtores</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Adicione parceiros que receberão uma porcentagem das vendas deste produto
            </p>
            <Button 
              variant="default" 
              onClick={() => setEnabled(true)}
              className="bg-highlight hover:bg-highlight-hover"
            >
              Configurar Co-Produção
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCoProduction;
