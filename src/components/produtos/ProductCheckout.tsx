
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CreditCard, 
  Banknote, 
  Wallet, 
  Tag, 
  Mail, 
  CheckCircle2, 
  PlusCircle,
  Trash2,
  ChevronsUpDown
} from "lucide-react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const ProductCheckout = () => {
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([
    "credit_card", "pix", "boleto"
  ]);
  const [checkoutTab, setCheckoutTab] = useState("payment");
  const [isOpen, setIsOpen] = useState(false);
  const [cupons, setCupons] = useState([{ id: 1, code: "", discount: "", type: "percent" }]);
  
  const togglePaymentMethod = (method: string) => {
    if (selectedPaymentMethods.includes(method)) {
      setSelectedPaymentMethods(selectedPaymentMethods.filter(m => m !== method));
    } else {
      setSelectedPaymentMethods([...selectedPaymentMethods, method]);
    }
  };
  
  const addCoupon = () => {
    setCupons([...cupons, { id: Date.now(), code: "", discount: "", type: "percent" }]);
  };
  
  const removeCoupon = (id: number) => {
    setCupons(cupons.filter(coupon => coupon.id !== id));
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Checkout</CardTitle>
          <CardDescription>
            Configure as opções de pagamento, cupons e confirmação da compra
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={checkoutTab} onValueChange={setCheckoutTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="payment">
                <CreditCard className="h-4 w-4 mr-2" />
                Pagamento
              </TabsTrigger>
              <TabsTrigger value="coupons">
                <Tag className="h-4 w-4 mr-2" />
                Cupons
              </TabsTrigger>
              <TabsTrigger value="thank_you">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Agradecimento
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="payment" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Formas de Pagamento Disponíveis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 border border-border rounded-md p-4 hover:border-highlight/30 transition-colors cursor-pointer">
                    <Checkbox 
                      id="method_credit_card" 
                      checked={selectedPaymentMethods.includes("credit_card")} 
                      onCheckedChange={() => togglePaymentMethod("credit_card")} 
                    />
                    <div>
                      <Label htmlFor="method_credit_card" className="text-base font-medium cursor-pointer">
                        <CreditCard className="h-4 w-4 inline-block mr-2" />
                        Cartão de Crédito
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Pagamento parcelado em até 12x (com juros a partir da 7ª parcela)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 border border-border rounded-md p-4 hover:border-highlight/30 transition-colors cursor-pointer">
                    <Checkbox 
                      id="method_pix" 
                      checked={selectedPaymentMethods.includes("pix")} 
                      onCheckedChange={() => togglePaymentMethod("pix")} 
                    />
                    <div>
                      <Label htmlFor="method_pix" className="text-base font-medium cursor-pointer">
                        <Wallet className="h-4 w-4 inline-block mr-2" />
                        Pix
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Pagamento instantâneo com confirmação imediata
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 border border-border rounded-md p-4 hover:border-highlight/30 transition-colors cursor-pointer">
                    <Checkbox 
                      id="method_boleto" 
                      checked={selectedPaymentMethods.includes("boleto")} 
                      onCheckedChange={() => togglePaymentMethod("boleto")} 
                    />
                    <div>
                      <Label htmlFor="method_boleto" className="text-base font-medium cursor-pointer">
                        <Banknote className="h-4 w-4 inline-block mr-2" />
                        Boleto Bancário
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Pagamento com compensação em até 3 dias úteis
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 border border-border rounded-md p-4 hover:border-highlight/30 transition-colors cursor-pointer">
                    <Checkbox 
                      id="method_paypal" 
                      checked={selectedPaymentMethods.includes("paypal")} 
                      onCheckedChange={() => togglePaymentMethod("paypal")} 
                    />
                    <div>
                      <Label htmlFor="method_paypal" className="text-base font-medium cursor-pointer">
                        <CreditCard className="h-4 w-4 inline-block mr-2" />
                        PayPal
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Pagamento internacional com proteção ao comprador
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Collapsible
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  className="border border-border rounded-md"
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-4 font-medium">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Configurações Avançadas de Pagamento
                    </div>
                    <ChevronsUpDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 pt-0 border-t border-border">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="max_installments">Número máximo de parcelas</Label>
                        <Input 
                          id="max_installments" 
                          type="number" 
                          defaultValue="12" 
                          className="mt-1 w-24"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="interest_rate">Taxa de juros mensal (a partir da 7ª parcela)</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input 
                            id="interest_rate" 
                            type="number" 
                            defaultValue="1.99" 
                            className="w-24"
                          />
                          <span className="text-sm">%</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="min_installment_value">Valor mínimo da parcela</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm">R$</span>
                          <Input 
                            id="min_installment_value" 
                            type="number" 
                            defaultValue="5" 
                            className="w-24"
                          />
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </TabsContent>
            
            <TabsContent value="coupons" className="space-y-4">
              <div className="space-y-4">
                {cupons.map((coupon, index) => (
                  <div key={coupon.id} className="border border-border rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Cupom {index + 1}</h4>
                      {cupons.length > 1 && (
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`coupon-code-${coupon.id}`}>Código do Cupom</Label>
                        <Input 
                          id={`coupon-code-${coupon.id}`} 
                          placeholder="Ex: PROMO50" 
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Código que o cliente usará no checkout
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor={`coupon-discount-${coupon.id}`}>Valor do Desconto</Label>
                        <div className="flex mt-1">
                          <div className="relative flex items-center">
                            <Input 
                              id={`coupon-discount-${coupon.id}`} 
                              placeholder="50" 
                              className="pr-10"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <span className="text-sm text-muted-foreground">%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor={`expiry-date-${coupon.id}`}>Data de Expiração</Label>
                        <Input 
                          id={`expiry-date-${coupon.id}`} 
                          type="date" 
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`usage-limit-${coupon.id}`}>Limite de Usos</Label>
                        <Input 
                          id={`usage-limit-${coupon.id}`} 
                          type="number" 
                          placeholder="Ex: 100" 
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Deixe em branco para usos ilimitados
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
              </div>
            </TabsContent>
            
            <TabsContent value="thank_you" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Página de Agradecimento</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="thank_you_title">Título da Página</Label>
                    <Input 
                      id="thank_you_title" 
                      placeholder="Ex: Obrigado pela sua compra!" 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="thank_you_message">Mensagem de Agradecimento</Label>
                    <Textarea 
                      id="thank_you_message" 
                      placeholder="Escreva uma mensagem de agradecimento e próximos passos para o cliente..." 
                      className="mt-1 min-h-[100px]"
                    />
                  </div>
                  
                  <div className="border border-border rounded-md p-4">
                    <h4 className="font-medium flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Integração com E-mail Marketing
                    </h4>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="send_thank_you_email" />
                        <Label htmlFor="send_thank_you_email" className="text-sm cursor-pointer">
                          Enviar e-mail de confirmação de compra
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="add_to_list" />
                        <Label htmlFor="add_to_list" className="text-sm cursor-pointer">
                          Adicionar à lista de e-mails de "Clientes"
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="start_sequence" />
                        <Label htmlFor="start_sequence" className="text-sm cursor-pointer">
                          Iniciar sequência de ativação automática
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="redirect_url">URL de Redirecionamento (opcional)</Label>
                    <Input 
                      id="redirect_url" 
                      placeholder="Ex: https://meusite.com/area-de-membros" 
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Se definido, o cliente será redirecionado para esta URL após a compra
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCheckout;
