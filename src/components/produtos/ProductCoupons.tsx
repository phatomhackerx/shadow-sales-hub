
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tag, PlusCircle, Trash2, Calendar, Hash, Percent, DollarSign, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type CouponType = "percentage" | "fixed";

interface Coupon {
  id: number;
  code: string;
  type: CouponType;
  value: string;
  usageLimit: string;
  expiryDate: string;
}

const ProductCoupons = () => {
  const { toast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>([
    { 
      id: 1, 
      code: "", 
      type: "percentage", 
      value: "", 
      usageLimit: "", 
      expiryDate: "" 
    }
  ]);
  
  const addCoupon = () => {
    setCoupons([
      ...coupons, 
      { 
        id: Date.now(), 
        code: "", 
        type: "percentage", 
        value: "", 
        usageLimit: "", 
        expiryDate: "" 
      }
    ]);
  };
  
  const removeCoupon = (id: number) => {
    if (coupons.length > 1) {
      setCoupons(coupons.filter(coupon => coupon.id !== id));
    }
  };
  
  const updateCoupon = (id: number, field: keyof Coupon, value: string) => {
    setCoupons(coupons.map(coupon => 
      coupon.id === id ? { ...coupon, [field]: value } : coupon
    ));
  };
  
  const toggleCouponType = (id: number) => {
    setCoupons(coupons.map(coupon => 
      coupon.id === id ? { 
        ...coupon, 
        type: coupon.type === "percentage" ? "fixed" : "percentage" 
      } : coupon
    ));
  };
  
  const generateRandomCode = (id: number) => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    updateCoupon(id, 'code', result);
    
    toast({
      title: "Código gerado",
      description: `Código "${result}" gerado com sucesso.`,
    });
  };
  
  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    
    toast({
      title: "Código copiado",
      description: "Código copiado para a área de transferência.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cupons de Desconto</CardTitle>
          <CardDescription>
            Crie cupons de desconto para promover e impulsionar as vendas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {coupons.map((coupon, index) => (
            <div key={coupon.id} className="border border-border rounded-md p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Cupom {index + 1}
                </h4>
                {coupons.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCoupon(coupon.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`coupon-code-${coupon.id}`} className="flex items-center">
                    <Hash className="h-4 w-4 mr-1" />
                    Código do Cupom
                  </Label>
                  <div className="flex mt-1 gap-2">
                    <div className="relative flex-1">
                      <Input
                        id={`coupon-code-${coupon.id}`}
                        placeholder="Ex: PROMO50"
                        value={coupon.code}
                        onChange={e => updateCoupon(coupon.id, 'code', e.target.value)}
                        className="uppercase"
                      />
                      {coupon.code && (
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                          onClick={() => copyCouponCode(coupon.code)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => generateRandomCode(coupon.id)}
                    >
                      Gerar
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`coupon-type-${coupon.id}`}>Tipo de Desconto</Label>
                    <div className="flex mt-1">
                      <Button
                        type="button"
                        variant={coupon.type === "percentage" ? "default" : "outline"}
                        onClick={() => updateCoupon(coupon.id, 'type', 'percentage')}
                        className={`flex-1 rounded-r-none ${coupon.type === "percentage" ? "bg-highlight hover:bg-highlight-hover" : ""}`}
                      >
                        <Percent className="h-4 w-4 mr-2" />
                        Percentual
                      </Button>
                      <Button
                        type="button"
                        variant={coupon.type === "fixed" ? "default" : "outline"}
                        onClick={() => updateCoupon(coupon.id, 'type', 'fixed')}
                        className={`flex-1 rounded-l-none ${coupon.type === "fixed" ? "bg-highlight hover:bg-highlight-hover" : ""}`}
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Valor Fixo
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor={`coupon-value-${coupon.id}`}>
                      {coupon.type === "percentage" ? "Percentual de Desconto (%)" : "Valor de Desconto (R$)"}
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id={`coupon-value-${coupon.id}`}
                        placeholder={coupon.type === "percentage" ? "Ex: 20" : "Ex: 50,00"}
                        value={coupon.value}
                        onChange={e => updateCoupon(coupon.id, 'value', e.target.value)}
                        className="pr-8"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-sm text-muted-foreground">
                          {coupon.type === "percentage" ? "%" : "R$"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor={`coupon-usage-${coupon.id}`}>Limite de Usos</Label>
                    <Input
                      id={`coupon-usage-${coupon.id}`}
                      placeholder="Ex: 100 (vazio para ilimitado)"
                      value={coupon.usageLimit}
                      onChange={e => updateCoupon(coupon.id, 'usageLimit', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor={`coupon-expiry-${coupon.id}`} className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Data de Expiração
                  </Label>
                  <Input
                    id={`coupon-expiry-${coupon.id}`}
                    type="date"
                    value={coupon.expiryDate}
                    onChange={e => updateCoupon(coupon.id, 'expiryDate', e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Deixe em branco para o cupom não expirar
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          <Button
            variant="outline"
            onClick={addCoupon}
            className="w-full"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Adicionar Novo Cupom
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCoupons;
