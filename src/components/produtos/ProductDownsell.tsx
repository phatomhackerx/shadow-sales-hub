
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TrendingDown, DollarSign, Percent, Hourglass, Zap, AlertTriangle, ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProductDownsell = () => {
  const [enabled, setEnabled] = useState(false);
  const [discountType, setDiscountType] = useState("percentage");
  
  const produtos = [
    { id: 1, nome: "Mini Curso de Copywriting", preco: "R$ 97,00" },
    { id: 2, nome: "E-book: Segredos do Marketing Digital", preco: "R$ 47,00" },
    { id: 3, nome: "Pacote de Templates Básicos", preco: "R$ 67,00" },
    { id: 4, nome: "Acesso à Comunidade (1 mês)", preco: "R$ 37,00" },
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Downsell</CardTitle>
              <CardDescription>
                Oferta alternativa caso o cliente recuse o upsell, com um preço mais acessível
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="downsell-toggle" 
                checked={enabled} 
                onCheckedChange={setEnabled} 
              />
              <Label htmlFor="downsell-toggle" className="text-sm">
                {enabled ? "Ativado" : "Desativado"}
              </Label>
            </div>
          </div>
        </CardHeader>
        
        {enabled && (
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="product-select">Selecione o produto para downsell</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Escolha um produto de menor valor" />
                </SelectTrigger>
                <SelectContent>
                  {produtos.map((produto) => (
                    <SelectItem key={produto.id} value={String(produto.id)}>
                      {produto.nome} - {produto.preco}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Escolha um produto de valor mais baixo que seja uma alternativa atraente.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Tipo de desconto</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Button
                    type="button"
                    variant={discountType === "percentage" ? "default" : "outline"}
                    className={discountType === "percentage" ? "bg-highlight hover:bg-highlight-hover" : ""}
                    onClick={() => setDiscountType("percentage")}
                  >
                    <Percent className="h-4 w-4 mr-2" />
                    Percentual
                  </Button>
                  <Button
                    type="button"
                    variant={discountType === "fixed" ? "default" : "outline"}
                    className={discountType === "fixed" ? "bg-highlight hover:bg-highlight-hover" : ""}
                    onClick={() => setDiscountType("fixed")}
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Valor Fixo
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="discount-amount">
                  {discountType === "percentage" ? "Porcentagem de desconto" : "Valor do desconto (R$)"}
                </Label>
                <Input 
                  id="discount-amount" 
                  placeholder={discountType === "percentage" ? "Ex: 70" : "Ex: 30,00"} 
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  O desconto para o downsell deve ser maior que o do upsell para ser atrativo.
                </p>
              </div>
            </div>
            
            <div>
              <Label htmlFor="downsell-title">Título da oferta</Label>
              <Input 
                id="downsell-title" 
                placeholder="Ex: Espere! Temos uma oferta especial para você!" 
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="downsell-description">Descrição persuasiva</Label>
              <Textarea 
                id="downsell-description" 
                placeholder="Descreva a oferta alternativa e por que é uma boa oportunidade mesmo sendo mais simples..." 
                className="mt-1 min-h-[100px]"
              />
            </div>
            
            <div className="bg-secondary/30 border border-border rounded-md p-4">
              <h3 className="text-base font-medium flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                Elementos de urgência
              </h3>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="countdown" className="text-sm">Contador regressivo</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Hourglass className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="countdown" 
                      type="number" 
                      placeholder="15" 
                      className="w-24"
                    />
                    <span className="text-sm">minutos</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 h-full mt-6">
                  <Switch id="scarcity-toggle" />
                  <Label htmlFor="scarcity-toggle" className="text-sm cursor-pointer">
                    Mostrar indicador de vagas limitadas
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="border border-border rounded-md p-4">
              <h3 className="text-base font-medium">Preview da Oferta</h3>
              <div className="mt-4 space-y-4">
                <div className="text-center">
                  <h4 className="text-xl font-bold text-amber-500">ESPERE! Temos uma última oferta para você!</h4>
                  <p className="text-sm mt-2">
                    Entendemos que o pacote completo pode não ser o ideal para você agora. Por isso, preparamos uma alternativa especial com um desconto ainda maior!
                  </p>
                  
                  <div className="inline-block bg-amber-500/20 text-amber-600 font-medium px-3 py-1 rounded-full text-sm mt-3">
                    <Hourglass className="h-4 w-4 inline-block mr-1 animate-pulse" />
                    Oferta válida por 15:00 minutos
                  </div>
                  
                  <div className="mt-4">
                    <span className="text-muted-foreground line-through">De R$ 97,00</span>
                    <span className="text-3xl font-bold text-green-500 ml-2">Por R$ 29,00</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Sim, quero aproveitar este desconto especial!
                    </Button>
                    <Button variant="outline">
                      Não, obrigado
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary/30 border border-border rounded-md p-4">
              <h3 className="font-medium flex items-center">
                <Zap className="h-5 w-5 mr-2 text-amber-500" />
                Dicas para um Downsell eficiente
              </h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Ofereça um produto mais simples, mas ainda valioso</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>O desconto do downsell deve ser maior que o do upsell</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Use elementos de urgência (contadores, vagas limitadas)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Explique que esta é a "última chance" para aproveitar uma oferta especial</span>
                </li>
              </ul>
            </div>
          </CardContent>
        )}
      </Card>
      
      {!enabled && (
        <div className="flex items-center justify-center p-8 border border-dashed border-border rounded-lg">
          <div className="text-center">
            <TrendingDown className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">Ative o Downsell</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Ofereça uma alternativa mais acessível caso o cliente recuse o upsell
            </p>
            <Button 
              variant="default" 
              onClick={() => setEnabled(true)}
              className="bg-highlight hover:bg-highlight-hover"
            >
              Configurar Downsell
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDownsell;
