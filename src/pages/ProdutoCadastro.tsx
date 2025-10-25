
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  Check, 
  Tags, 
  Settings, 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Users, 
  Tag, 
  Link2, 
  Info
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import ProductGeneral from "@/components/produtos/ProductGeneral";
import ProductConfigurations from "@/components/produtos/ProductConfigurations";
import ProductOrderBump from "@/components/produtos/ProductOrderBump";
import ProductUpsell from "@/components/produtos/ProductUpsell";
import ProductDownsell from "@/components/produtos/ProductDownsell";
import ProductCheckout from "@/components/produtos/ProductCheckout";
import ProductCoProduction from "@/components/produtos/ProductCoProduction";
import ProductCoupons from "@/components/produtos/ProductCoupons";
import ProductAffiliates from "@/components/produtos/ProductAffiliates";
import ProductLinks from "@/components/produtos/ProductLinks";

const formSchema = z.object({
  nome: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  descricao: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
  categoria: z.string().min(1, { message: "Selecione uma categoria" }),
  tipoPagamento: z.string().min(1, { message: "Selecione um tipo de pagamento" }),
  preco: z.string().min(1, { message: "Defina um preço para o produto" }),
});

const ProdutoCadastro = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("geral");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      categoria: "",
      tipoPagamento: "unico",
      preco: "",
    },
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Simulação de envio para API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Dados do produto:", values);
      
      toast({
        title: "Produto criado com sucesso!",
        description: "O produto foi cadastrado na plataforma",
      });
      
      navigate("/produtos");
    } catch (error) {
      toast({
        title: "Erro ao criar produto",
        description: "Ocorreu um erro ao cadastrar o produto. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate("/produtos")}
            className="h-8 w-8 hover:bg-secondary/60 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Novo Produto</h1>
        </div>
        <Button 
          onClick={form.handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="grok-button w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>Salvando...</>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Salvar Produto</span>
            </>
          )}
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 h-auto gap-2 bg-transparent mb-6">
          <TabsTrigger 
            value="geral"
            className="data-[state=active]:border-highlight data-[state=active]:text-highlight data-[state=active]:font-medium border border-border"
          >
            <Tags className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Geral</span>
          </TabsTrigger>
          <TabsTrigger 
            value="configuracoes"
            className="data-[state=active]:border-highlight data-[state=active]:text-highlight data-[state=active]:font-medium border border-border"
          >
            <Settings className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Configurações</span>
          </TabsTrigger>
          <TabsTrigger 
            value="order-bump"
            className="data-[state=active]:border-highlight data-[state=active]:text-highlight data-[state=active]:font-medium border border-border"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Order Bump</span>
          </TabsTrigger>
          <TabsTrigger 
            value="upsell"
            className="data-[state=active]:border-highlight data-[state=active]:text-highlight data-[state=active]:font-medium border border-border"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Upsell</span>
          </TabsTrigger>
          <TabsTrigger 
            value="downsell"
            className="data-[state=active]:border-highlight data-[state=active]:text-highlight data-[state=active]:font-medium border border-border"
          >
            <TrendingDown className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Downsell</span>
          </TabsTrigger>
          <TabsTrigger 
            value="checkout"
            className="data-[state=active]:border-highlight data-[state=active]:text-highlight data-[state=active]:font-medium border border-border"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Checkout</span>
          </TabsTrigger>
          <TabsTrigger 
            value="coproducao"
            className="data-[state=active]:border-highlight data-[state=active]:text-highlight data-[state=active]:font-medium border border-border"
          >
            <Users className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Co-Produção</span>
          </TabsTrigger>
          <TabsTrigger 
            value="cupons"
            className="data-[state=active]:border-highlight data-[state=active]:text-highlight data-[state=active]:font-medium border border-border"
          >
            <Tag className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Cupons</span>
          </TabsTrigger>
          <TabsTrigger 
            value="afiliados"
            className="data-[state=active]:border-highlight data-[state=active]:text-highlight data-[state=active]:font-medium border border-border"
          >
            <Users className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Afiliados</span>
          </TabsTrigger>
          <TabsTrigger 
            value="links"
            className="data-[state=active]:border-highlight data-[state=active]:text-highlight data-[state=active]:font-medium border border-border"
          >
            <Link2 className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Links</span>
          </TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TabsContent value="geral" className="mt-0">
              <ProductGeneral form={form} />
            </TabsContent>
            
            <TabsContent value="configuracoes" className="mt-0">
              <ProductConfigurations />
            </TabsContent>
            
            <TabsContent value="order-bump" className="mt-0">
              <ProductOrderBump />
            </TabsContent>
            
            <TabsContent value="upsell" className="mt-0">
              <ProductUpsell />
            </TabsContent>
            
            <TabsContent value="downsell" className="mt-0">
              <ProductDownsell />
            </TabsContent>
            
            <TabsContent value="checkout" className="mt-0">
              <ProductCheckout />
            </TabsContent>
            
            <TabsContent value="coproducao" className="mt-0">
              <ProductCoProduction />
            </TabsContent>
            
            <TabsContent value="cupons" className="mt-0">
              <ProductCoupons />
            </TabsContent>
            
            <TabsContent value="afiliados" className="mt-0">
              <ProductAffiliates />
            </TabsContent>
            
            <TabsContent value="links" className="mt-0">
              <ProductLinks />
            </TabsContent>
          </form>
        </Form>
      </Tabs>
      
      <div className="flex justify-end">
        <Button 
          onClick={form.handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="grok-button"
        >
          {isSubmitting ? (
            <>Salvando...</>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Salvar Produto</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProdutoCadastro;
