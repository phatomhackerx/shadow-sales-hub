
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Copy, ArrowUpRight, ExternalLink, FileBarChart, Eye, Clock, MapPin, DeviceTablet, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface LinkItem {
  id: number;
  name: string;
  url: string;
  clicks: number;
  lastUsed: string;
}

const ProductLinks = () => {
  const { toast } = useToast();
  const [isSmartLinkOpen, setIsSmartLinkOpen] = useState(false);
  
  const links: LinkItem[] = [
    {
      id: 1,
      name: "Página de Vendas",
      url: "https://cakto.com.br/produto/curso-marketing-digital",
      clicks: 347,
      lastUsed: "2023-04-12"
    },
    {
      id: 2,
      name: "Checkout Direto",
      url: "https://cakto.com.br/checkout/curso-marketing-digital",
      clicks: 129,
      lastUsed: "2023-04-11"
    },
    {
      id: 3,
      name: "Upsell",
      url: "https://cakto.com.br/upsell/curso-marketing-digital",
      clicks: 86,
      lastUsed: "2023-04-10"
    },
    {
      id: 4,
      name: "Link de Afiliado",
      url: "https://cakto.com.br/produto/curso-marketing-digital?ref=seu-codigo",
      clicks: 204,
      lastUsed: "2023-04-12"
    },
    {
      id: 5,
      name: "Link para Desconto (50%)",
      url: "https://cakto.com.br/produto/curso-marketing-digital?cupom=PROMO50",
      clicks: 63,
      lastUsed: "2023-04-09"
    }
  ];
  
  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    
    toast({
      title: "Link copiado",
      description: "Link copiado para a área de transferência.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Links do Produto</CardTitle>
          <CardDescription>
            Todos os links relacionados ao seu produto para compartilhar e promover
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {links.map((link) => (
              <div key={link.id} className="border border-border rounded-md p-4 hover:border-highlight/30 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium flex items-center text-highlight">
                      <Link2 className="h-4 w-4 mr-2" />
                      {link.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 truncate w-44">
                      {link.url}
                    </p>
                  </div>
                  <div className="flex">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyLink(link.url)}
                      className="h-8 w-8 text-muted-foreground"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(link.url, "_blank")}
                      className="h-8 w-8 text-muted-foreground"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                  <div>{link.clicks} cliques</div>
                  <div>Usado em: {new Date(link.lastUsed).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
          
          <Collapsible
            open={isSmartLinkOpen}
            onOpenChange={setIsSmartLinkOpen}
            className="border border-border rounded-md overflow-hidden"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
              <div className="flex items-center">
                <ExternalLink className="h-5 w-5 mr-2 text-highlight" />
                <div>
                  <h3 className="font-medium">Smart Links</h3>
                  <p className="text-xs text-muted-foreground">
                    Links inteligentes com redirecionamento baseado em condições
                  </p>
                </div>
              </div>
              {isSmartLinkOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 pt-0 border-t border-border space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Links de Redirecionamento Inteligente
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-secondary/30 rounded-md p-3">
                      <div className="flex items-center">
                        <DeviceTablet className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Redirecionamento por Dispositivo</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Link2 className="h-3 w-3 mr-1" />
                        Criar Link
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between bg-secondary/30 rounded-md p-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Redirecionamento por Localização</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Link2 className="h-3 w-3 mr-1" />
                        Criar Link
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between bg-secondary/30 rounded-md p-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Redirecionamento por Horário</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Link2 className="h-3 w-3 mr-1" />
                        Criar Link
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium flex items-center mb-2">
                    <FileBarChart className="h-4 w-4 mr-1" />
                    Estatísticas Avançadas
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Os smart links fornecem estatísticas detalhadas de conversão e comportamento dos usuários
                  </p>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Analytics
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="bg-secondary/30 border border-border rounded-md p-4">
            <h3 className="font-medium">Parâmetros de UTM</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Adicione parâmetros UTM aos seus links para rastrear suas campanhas
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>UTM Source</span>
                <code className="text-xs bg-secondary py-1 px-2 rounded">utm_source=instagram</code>
              </div>
              <div className="flex items-center justify-between">
                <span>UTM Medium</span>
                <code className="text-xs bg-secondary py-1 px-2 rounded">utm_medium=social</code>
              </div>
              <div className="flex items-center justify-between">
                <span>UTM Campaign</span>
                <code className="text-xs bg-secondary py-1 px-2 rounded">utm_campaign=spring_sale</code>
              </div>
              <div className="flex items-center justify-between">
                <span>UTM Content</span>
                <code className="text-xs bg-secondary py-1 px-2 rounded">utm_content=story</code>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              Exemplo: https://cakto.com.br/produto/curso-marketing-digital?utm_source=instagram&utm_medium=social
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductLinks;
