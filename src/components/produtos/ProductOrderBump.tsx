
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PackagePlus, DollarSign, Percent, Check } from "lucide-react";

const ProductOrderBump = () => {
  const [enabled, setEnabled] = useState(false);
  const [discountType, setDiscountType] = useState("percentage");
  
  const produtos = [
    { id: 1, nome: "E-book: Estratégias de Vendas", preco: "R$ 47,00" },
    { id: 2, nome: "Mini-curso: Tráfego Pago", preco: "R$ 97,00" },
    { id: 3, nome: "Planilha de Gestão Financeira", preco: "R$ 37,00" },
    { id: 4, nome: "Templates de Email Marketing", preco: "R$ 27,00" },
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Order Bump</CardTitle>
              <CardDescription>
                Ofereça um produto complementar durante o checkout para aumentar o valor médio do pedido
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="order-bump-toggle" 
                checked={enabled} 
                onCheckedChange={setEnabled} 
              />
              <Label htmlFor="order-bump-toggle" className="text-sm">
                {enabled ? "Ativado" : "Desativado"}
              </Label>
            </div>
          </div>
        </CardHeader>
        
        {enabled && (
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="product-select">Selecione o produto complementar</Label>
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
              <p className="text-xs text-muted-foreground mt-1">
                Escolha um produto de baixo valor que complemente o produto principal.
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
                  placeholder={discountType === "percentage" ? "Ex: 50" : "Ex: 20,00"} 
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {discountType === "percentage" 
                    ? "Desconto percentual sobre o valor original do produto." 
                    : "Desconto em reais sobre o valor original do produto."}
                </p>
              </div>
            </div>
            
            <div>
              <Label htmlFor="order-bump-title">Título da oferta</Label>
              <Input 
                id="order-bump-title" 
                placeholder="Ex: Adicione este e-book exclusivo por apenas R$ 27!" 
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="order-bump-description">Descrição persuasiva</Label>
              <Textarea 
                id="order-bump-description" 
                placeholder="Descreva os benefícios desta oferta e por que o cliente deve adicionar ao pedido..." 
                className="mt-1 min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use uma linguagem persuasiva destacando a economia e os benefícios da oferta.
              </p>
            </div>
            
            <div className="bg-secondary/30 border border-border rounded-md p-4">
              <h3 className="text-lg font-medium flex items-center">
                <Check className="h-5 w-5 mr-2 text-green-500" />
                Preview do Order Bump
              </h3>
              <div className="mt-4 p-4 border border-amber-500/30 bg-amber-500/5 rounded-md">
                <div className="flex items-start gap-4">
                  <div className="flex items-center h-6">
                    <input 
                      id="order-bump-preview" 
                      type="checkbox" 
                      className="w-5 h-5 border-amber-500 rounded focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="order-bump-preview" className="font-medium text-amber-500">
                      OFERTA ESPECIAL: Adicione este e-book exclusivo por apenas R$ 27!
                    </label>
                    <p className="text-sm mt-1">
                      Este material complementa perfeitamente seu curso e vai acelerar seus resultados. Economize 50% adicionando agora ao seu pedido!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      
      {!enabled && (
        <div className="flex items-center justify-center p-8 border border-dashed border-border rounded-lg">
          <div className="text-center">
            <PackagePlus className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">Ative o Order Bump</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Ofereça um produto complementar durante o checkout para aumentar o valor médio do pedido
            </p>
            <Button 
              variant="default" 
              onClick={() => setEnabled(true)}
              className="bg-highlight hover:bg-highlight-hover"
            >
              Configurar Order Bump
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOrderBump;
