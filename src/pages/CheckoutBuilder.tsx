
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Smartphone, Monitor, Paintbrush, Save, Eye, Code, Layout, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import CheckoutDesigner from "@/components/checkout/CheckoutDesigner";
import CheckoutPreview from "@/components/checkout/CheckoutPreview";
import CheckoutSettings from "@/components/checkout/CheckoutSettings";
import CheckoutCode from "@/components/checkout/CheckoutCode";
import CheckoutTemplates from "@/components/checkout/CheckoutTemplates";

const CheckoutBuilder = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("designer");
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [checkout, setCheckout] = useState({
    name: "Checkout Padrão",
    productId: id,
    template: "default",
    elements: [],
    settings: {
      primaryColor: "#9b87f5",
      secondaryColor: "#6E59A5",
      font: "Inter",
      background: "#ffffff",
      logo: "",
      showTimer: true,
      timerEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      buttonText: "Comprar agora",
      headerText: "Complete sua compra",
      subheaderText: "Você está a um passo de garantir seu acesso"
    }
  });

  // Simulação de carregamento de dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    
    // Simulação de salvamento
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Checkout salvo com sucesso!",
      description: "Suas alterações foram aplicadas."
    });
    
    setSaving(false);
  };

  const handlePublish = () => {
    toast({
      title: "Checkout publicado!",
      description: "Seu checkout está disponível ao público agora."
    });
  };

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Carregando o construtor de checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link to={`/produtos/${id}`}>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Construtor de Checkout</h1>
            <p className="text-muted-foreground">Personalização visual do checkout para seu produto</p>
          </div>
        </div>
        
        <div className="flex space-x-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="flex-1 sm:flex-initial"
            onClick={handlePublish}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Publicar
          </Button>
          <Button 
            onClick={handleSave}
            disabled={saving}
            className="bg-highlight hover:bg-highlight-hover text-white flex-1 sm:flex-initial"
          >
            {saving ? (
              <>Salvando...</>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 h-auto">
              <TabsTrigger value="designer" className="data-[state=active]:border-highlight data-[state=active]:text-highlight data-[state=active]:font-medium border border-border">
                <Layout className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:border-highlight data-[state=active]:text-highlight data-[state=active]:font-medium border border-border">
                <Paintbrush className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="preview" className="data-[state=active]:border-highlight data-[state=active]:text-highlight data-[state=active]:font-medium border border-border">
                <Eye className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="code" className="data-[state=active]:border-highlight data-[state=active]:text-highlight data-[state=active]:font-medium border border-border">
                <Code className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="templates" className="data-[state=active]:border-highlight data-[state=active]:text-highlight data-[state=active]:font-medium border border-border">
                <Layout className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Card>
            <CardContent className="p-4">
              {activeTab === "designer" && <CheckoutDesigner checkout={checkout} setCheckout={setCheckout} />}
              {activeTab === "settings" && <CheckoutSettings checkout={checkout} setCheckout={setCheckout} />}
              {activeTab === "code" && <CheckoutCode checkout={checkout} />}
              {activeTab === "templates" && <CheckoutTemplates checkout={checkout} setCheckout={setCheckout} />}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-9">
          <Card className="border border-border overflow-hidden">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h3 className="font-medium">Preview do Checkout</h3>
              <div className="flex bg-secondary rounded-md">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`rounded-r-none ${viewMode === 'desktop' ? 'bg-muted' : ''}`}
                  onClick={() => setViewMode('desktop')}
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  Desktop
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`rounded-l-none ${viewMode === 'mobile' ? 'bg-muted' : ''}`}
                  onClick={() => setViewMode('mobile')}
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile
                </Button>
              </div>
            </div>
            <div className={`w-full overflow-auto bg-background/50 p-4 flex items-center justify-center min-h-[70vh]`}>
              <div 
                className={`transition-all duration-300 bg-white rounded-lg shadow-md border border-border ${
                  viewMode === 'mobile' ? 'w-[375px]' : 'w-full max-w-4xl'
                }`}
              >
                <CheckoutPreview checkout={checkout} viewMode={viewMode} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBuilder;
