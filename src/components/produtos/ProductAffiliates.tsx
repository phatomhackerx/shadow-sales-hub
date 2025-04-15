
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, Percent, Copy, Link2, CheckCircle2, Settings, Clock, Info, BarChart2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductAffiliates = () => {
  const { toast } = useToast();
  const [enabled, setEnabled] = useState(false);
  const [commissionType, setCommissionType] = useState<"standard" | "tiered">("standard");
  const [commission, setCommission] = useState("30");
  const [approvalType, setApprovalType] = useState<"auto" | "manual">("auto");
  const [cookieDays, setCookieDays] = useState("30");
  
  const copyAffiliateLink = () => {
    navigator.clipboard.writeText("https://cakto.com.br/seu-produto?ref=afiliado");
    
    toast({
      title: "Link copiado",
      description: "Link de afiliado copiado para a área de transferência.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Programa de Afiliados</CardTitle>
              <CardDescription>
                Configure comissões para parceiros que divulgarem seu produto
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="affiliates-toggle" 
                checked={enabled} 
                onCheckedChange={setEnabled} 
              />
              <Label htmlFor="affiliates-toggle" className="text-sm">
                {enabled ? "Ativado" : "Desativado"}
              </Label>
            </div>
          </div>
        </CardHeader>
        
        {enabled && (
          <CardContent className="space-y-6">
            <Tabs defaultValue="settings" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações
                </TabsTrigger>
                <TabsTrigger value="links">
                  <Link2 className="h-4 w-4 mr-2" />
                  Links
                </TabsTrigger>
                <TabsTrigger value="affiliates">
                  <Users className="h-4 w-4 mr-2" />
                  Afiliados
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="settings" className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Configurações de Comissão</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <Label>Tipo de Comissão</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className={`border ${commissionType === "standard" ? "border-highlight" : "border-border"} rounded-md p-4 cursor-pointer`} onClick={() => setCommissionType("standard")}>
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Comissão Padrão</h4>
                            {commissionType === "standard" && <CheckCircle2 className="h-5 w-5 text-highlight" />}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Mesmo percentual para todos os afiliados
                          </p>
                        </div>
                        
                        <div className={`border ${commissionType === "tiered" ? "border-highlight" : "border-border"} rounded-md p-4 cursor-pointer`} onClick={() => setCommissionType("tiered")}>
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Comissão Multinível</h4>
                            {commissionType === "tiered" && <CheckCircle2 className="h-5 w-5 text-highlight" />}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Percentuais diferentes baseados em performance
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {commissionType === "standard" ? (
                      <div>
                        <Label htmlFor="commission">Percentual de Comissão</Label>
                        <div className="relative mt-1">
                          <Input
                            id="commission"
                            value={commission}
                            onChange={(e) => setCommission(e.target.value)}
                            className="pr-8"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Comissão padrão paga para todos os afiliados
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <Label>Níveis de Comissão</Label>
                          <div className="grid grid-cols-1 gap-3 mt-2">
                            <div className="border border-border rounded-md p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Nível Iniciante (até 5 vendas)</span>
                                <div className="flex items-center">
                                  <Input
                                    value="20"
                                    className="w-16 text-center h-8"
                                  />
                                  <span className="text-sm text-muted-foreground ml-1">%</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="border border-border rounded-md p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Nível Intermediário (6-20 vendas)</span>
                                <div className="flex items-center">
                                  <Input
                                    value="30"
                                    className="w-16 text-center h-8"
                                  />
                                  <span className="text-sm text-muted-foreground ml-1">%</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="border border-border rounded-md p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Nível Expert (21+ vendas)</span>
                                <div className="flex items-center">
                                  <Input
                                    value="40"
                                    className="w-16 text-center h-8"
                                  />
                                  <span className="text-sm text-muted-foreground ml-1">%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <Label>Aprovação de Comissões</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className={`border ${approvalType === "auto" ? "border-highlight" : "border-border"} rounded-md p-4 cursor-pointer`} onClick={() => setApprovalType("auto")}>
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Automática</h4>
                            {approvalType === "auto" && <CheckCircle2 className="h-5 w-5 text-highlight" />}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Comissões são aprovadas automaticamente após o período de garantia
                          </p>
                        </div>
                        
                        <div className={`border ${approvalType === "manual" ? "border-highlight" : "border-border"} rounded-md p-4 cursor-pointer`} onClick={() => setApprovalType("manual")}>
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Manual</h4>
                            {approvalType === "manual" && <CheckCircle2 className="h-5 w-5 text-highlight" />}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Você aprova cada comissão manualmente
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="cookie-days" className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Duração do Cookie (dias)
                      </Label>
                      <Input
                        id="cookie-days"
                        type="number"
                        min="1"
                        max="365"
                        value={cookieDays}
                        onChange={(e) => setCookieDays(e.target.value)}
                        className="mt-1 w-24"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Por quantos dias o afiliado receberá crédito pela venda após o clique
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="links" className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Links de Afiliado</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Link para Página de Vendas</Label>
                      <div className="flex mt-1 gap-2">
                        <Input
                          value="https://cakto.com.br/produto/seu-produto?ref=afiliado"
                          readOnly
                          className="bg-secondary/50"
                        />
                        <Button
                          variant="outline"
                          onClick={copyAffiliateLink}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Link para Checkout Direto</Label>
                      <div className="flex mt-1 gap-2">
                        <Input
                          value="https://cakto.com.br/checkout/seu-produto?ref=afiliado"
                          readOnly
                          className="bg-secondary/50"
                        />
                        <Button
                          variant="outline"
                          onClick={copyAffiliateLink}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/30 border border-border rounded-md p-4">
                      <h4 className="font-medium flex items-center">
                        <Info className="h-5 w-5 mr-2 text-highlight" />
                        Materiais para Afiliados
                      </h4>
                      <div className="mt-3 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Banner Promocional 728x90</span>
                          <Button variant="outline" size="sm">
                            <Link2 className="h-3 w-3 mr-1" /> Obter Link
                          </Button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Banner Lateral 300x250</span>
                          <Button variant="outline" size="sm">
                            <Link2 className="h-3 w-3 mr-1" /> Obter Link
                          </Button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Email Swipe (texto pronto)</span>
                          <Button variant="outline" size="sm">
                            <Copy className="h-3 w-3 mr-1" /> Copiar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="affiliates" className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Top Afiliados</h3>
                    <Button variant="outline" size="sm">
                      <BarChart2 className="h-4 w-4 mr-2" />
                      Ver Relatório Completo
                    </Button>
                  </div>
                  
                  <div className="border border-border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-secondary/30">
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Afiliado</th>
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Cliques</th>
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Vendas</th>
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Taxa Conv.</th>
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Comissão</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-border">
                          <td className="p-3 text-sm">João Silva</td>
                          <td className="p-3 text-sm">432</td>
                          <td className="p-3 text-sm">18</td>
                          <td className="p-3 text-sm">4.2%</td>
                          <td className="p-3 text-sm font-medium text-highlight">R$ 2.693,40</td>
                        </tr>
                        <tr className="border-t border-border">
                          <td className="p-3 text-sm">Maria Oliveira</td>
                          <td className="p-3 text-sm">287</td>
                          <td className="p-3 text-sm">9</td>
                          <td className="p-3 text-sm">3.1%</td>
                          <td className="p-3 text-sm font-medium text-highlight">R$ 1.346,70</td>
                        </tr>
                        <tr className="border-t border-border">
                          <td className="p-3 text-sm">Carlos Mendes</td>
                          <td className="p-3 text-sm">156</td>
                          <td className="p-3 text-sm">5</td>
                          <td className="p-3 text-sm">3.2%</td>
                          <td className="p-3 text-sm font-medium text-highlight">R$ 748,50</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 bg-secondary/30 border border-border rounded-md p-4">
                    <h4 className="font-medium">Estatísticas Gerais</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Total de Afiliados</p>
                        <p className="text-xl font-medium">12</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cliques Totais</p>
                        <p className="text-xl font-medium">1,245</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Vendas por Afiliados</p>
                        <p className="text-xl font-medium">42</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Comissões Pagas</p>
                        <p className="text-xl font-medium text-highlight">R$ 6.285,30</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        )}
      </Card>
      
      {!enabled && (
        <div className="flex items-center justify-center p-8 border border-dashed border-border rounded-lg">
          <div className="text-center">
            <Users className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">Ative o Programa de Afiliados</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Permita que parceiros divulguem seu produto e recebam comissão pelas vendas
            </p>
            <Button 
              variant="default" 
              onClick={() => setEnabled(true)}
              className="bg-highlight hover:bg-highlight-hover"
            >
              Configurar Afiliados
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAffiliates;
