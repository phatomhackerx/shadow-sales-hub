
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp, Trash2, DollarSign, Percent, MoveUp, ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UpsellItem = ({ index, onRemove }: { index: number; onRemove: () => void }) => {
  const [discountType, setDiscountType] = useState("percentage");
  
  const produtos = [
    { id: 1, nome: "Curso Avançado de Copywriting", preco: "R$ 597,00" },
    { id: 2, nome: "Mentoria de Negócios - Premium", preco: "R$ 1.997,00" },
    { id: 3, nome: "Curso Completo de Tráfego Pago", preco: "R$ 797,00" },
    { id: 4, nome: "Pacote de Templates Premium", preco: "R$ 397,00" },
  ];
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Oferta {index + 1}</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onRemove}
            className="h-8 w-8 text-red-500 hover:text-red-600 icon-interactive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor={`product-select-${index}`}>Selecione o produto para upsell</Label>
          <Select>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Escolha um produto para oferecer" />
            </SelectTrigger>
            <SelectContent>
              {produtos.map((produto) => (
                <SelectItem key={produto.id} value={String(produto.id)}>
                  {produto.nome} - {produto.preco}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Tipo de desconto</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <Button
                type="button"
                variant={discountType === "percentage" ? "default" : "outline"}
                className={discountType === "percentage" ? "bg-highlight hover:bg-highlight-hover" : ""}
                onClick={() => setDiscountType("percentage")}
                size="sm"
              >
                <Percent className="h-4 w-4 mr-2" />
                Percentual
              </Button>
              <Button
                type="button"
                variant={discountType === "fixed" ? "default" : "outline"}
                className={discountType === "fixed" ? "bg-highlight hover:bg-highlight-hover" : ""}
                onClick={() => setDiscountType("fixed")}
                size="sm"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Valor Fixo
              </Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor={`discount-amount-${index}`}>
              {discountType === "percentage" ? "Porcentagem de desconto" : "Valor do desconto (R$)"}
            </Label>
            <Input 
              id={`discount-amount-${index}`} 
              placeholder={discountType === "percentage" ? "Ex: 50" : "Ex: 200,00"} 
              className="mt-1"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor={`upsell-title-${index}`}>Título da oferta</Label>
          <Input 
            id={`upsell-title-${index}`} 
            placeholder="Ex: Aproveite esta oportunidade única!" 
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor={`upsell-description-${index}`}>Descrição persuasiva</Label>
          <Textarea 
            id={`upsell-description-${index}`} 
            placeholder="Descreva por que o cliente deve aproveitar esta oferta especial..." 
            className="mt-1 min-h-[80px]"
          />
        </div>
        
        <div className="bg-secondary/30 border border-border rounded-md p-4">
          <h3 className="text-base font-medium">Preview de Botões</h3>
          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <Button className="bg-green-600 hover:bg-green-700">
              <ArrowRight className="h-4 w-4 mr-2" />
              Sim, quero aproveitar!
            </Button>
            <Button variant="outline">
              Não, obrigado
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProductUpsell = () => {
  const [enabled, setEnabled] = useState(false);
  const [upsells, setUpsells] = useState([{ id: 1 }]);
  
  const addUpsell = () => {
    if (upsells.length < 3) {
      setUpsells([...upsells, { id: Date.now() }]);
    }
  };
  
  const removeUpsell = (index: number) => {
    const newUpsells = [...upsells];
    newUpsells.splice(index, 1);
    setUpsells(newUpsells);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upsell</CardTitle>
              <CardDescription>
                Ofertas adicionais exibidas logo após a compra para aumentar o ticket médio
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="upsell-toggle" 
                checked={enabled} 
                onCheckedChange={setEnabled} 
              />
              <Label htmlFor="upsell-toggle" className="text-sm">
                {enabled ? "Ativado" : "Desativado"}
              </Label>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      {enabled ? (
        <>
          <div className="space-y-4">
            {upsells.map((upsell, index) => (
              <UpsellItem 
                key={upsell.id} 
                index={index} 
                onRemove={() => removeUpsell(index)} 
              />
            ))}
          </div>
          
          {upsells.length < 3 && (
            <Button 
              variant="outline" 
              onClick={addUpsell}
              className="w-full py-6 border-dashed border-2 hover:border-highlight/30 transition-colors"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Adicionar outra oferta de Upsell
            </Button>
          )}
          
          <div className="bg-secondary/30 border border-border rounded-md p-4">
            <h3 className="font-medium flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-highlight" />
              Dicas para Upsell eficiente
            </h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-start">
                <MoveUp className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span>Ofereça um produto de valor maior que complementa a compra inicial</span>
              </li>
              <li className="flex items-start">
                <MoveUp className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span>Use um desconto atrativo que só está disponível naquele momento</span>
              </li>
              <li className="flex items-start">
                <MoveUp className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span>Crie urgência com oferta por tempo limitado ou vagas limitadas</span>
              </li>
              <li className="flex items-start">
                <MoveUp className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span>Destaque os benefícios adicionais que o cliente terá com a oferta</span>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center p-8 border border-dashed border-border rounded-lg">
          <div className="text-center">
            <TrendingUp className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">Ative o Upsell</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Ofereça produtos complementares após a compra para aumentar seu faturamento
            </p>
            <Button 
              variant="default" 
              onClick={() => setEnabled(true)}
              className="bg-highlight hover:bg-highlight-hover"
            >
              Configurar Upsell
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUpsell;
