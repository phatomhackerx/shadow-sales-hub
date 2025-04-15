
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyIcon, ExternalLink, Smartphone, Tablet, Download, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductLinks = () => {
  const [copied, setCopied] = useState<string | null>(null);
  
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Links do Produto</CardTitle>
          <CardDescription>Copie e compartilhe os links do seu produto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="sales">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sales">Página de Vendas</TabsTrigger>
              <TabsTrigger value="checkout">Checkout</TabsTrigger>
              <TabsTrigger value="thankyou">Página de Agradecimento</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sales" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sales-page">Link da Página de Vendas</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="sales-page" 
                    readOnly 
                    value="https://seudominio.com.br/vendas/curso-marketing-digital" 
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => handleCopy("https://seudominio.com.br/vendas/curso-marketing-digital", "sales")}
                  >
                    {copied === "sales" ? <span className="text-green-500">Copiado!</span> : <CopyIcon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-3 mt-4">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Visualizar no Mobile</p>
                    <p className="text-sm text-muted-foreground">Veja como a página fica em dispositivos móveis</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Abrir
                </Button>
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <Tablet className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Visualizar no Tablet</p>
                    <p className="text-sm text-muted-foreground">Veja como a página fica em tablets</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Abrir
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="checkout" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="checkout-page">Link Direto para Checkout</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="checkout-page" 
                    readOnly 
                    value="https://seudominio.com.br/checkout/curso-marketing-digital" 
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => handleCopy("https://seudominio.com.br/checkout/curso-marketing-digital", "checkout")}
                  >
                    {copied === "checkout" ? <span className="text-green-500">Copiado!</span> : <CopyIcon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Button variant="outline" className="h-auto py-3 justify-start space-x-3">
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">Gerar QR Code</p>
                    <p className="text-xs text-muted-foreground">Para usar em materiais impressos</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto py-3 justify-start space-x-3">
                  <Share2 className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">Compartilhar</p>
                    <p className="text-xs text-muted-foreground">Enviar para redes sociais</p>
                  </div>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="thankyou" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="thankyou-page">Link da Página de Agradecimento</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="thankyou-page" 
                    readOnly 
                    value="https://seudominio.com.br/obrigado/curso-marketing-digital" 
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => handleCopy("https://seudominio.com.br/obrigado/curso-marketing-digital", "thankyou")}
                  >
                    {copied === "thankyou" ? <span className="text-green-500">Copiado!</span> : <CopyIcon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductLinks;
