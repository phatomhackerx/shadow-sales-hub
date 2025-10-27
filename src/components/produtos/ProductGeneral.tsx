
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useState } from "react";

interface ProductGeneralProps {
  form: UseFormReturn<any>;
}

const CATEGORIAS = [
  { value: "educacao", label: "Educação" },
  { value: "saude-esportes", label: "Saúde e Esportes" },
  { value: "negocios", label: "Negócios e Empreendedorismo" },
  { value: "tecnologia", label: "Tecnologia" },
  { value: "desenvolvimento-pessoal", label: "Desenvolvimento Pessoal" },
  { value: "artes-hobbies", label: "Artes e Hobbies" },
];

const ProductGeneral = ({ form }: ProductGeneralProps) => {
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  
  const handleImagemUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Verificar tamanho e formato
      const validFormats = ['image/jpeg', 'image/png'];
      if (!validFormats.includes(file.type)) {
        alert("Por favor, selecione uma imagem nos formatos JPG ou PNG.");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagemPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removerImagem = () => {
    setImagemPreview(null);
  };
  
  return (
    <div className="space-y-6">
      <Card className="grok-card">
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl sm:text-2xl">Informações Principais</CardTitle>
          <CardDescription className="text-sm">
            Defina as informações básicas do seu produto digital
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Produto</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ex: Curso Completo de Marketing Digital" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Este nome será exibido publicamente na página de vendas e no checkout.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Descreva seu produto em detalhes..." 
                    className="min-h-[120px] resize-y"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Descreva as principais características e benefícios do seu produto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="categoria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIAS.map((categoria) => (
                        <SelectItem key={categoria.value} value={categoria.value}>
                          {categoria.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Escolha a categoria que melhor descreve seu produto.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tipoPagamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Pagamento</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="unico">Pagamento Único</SelectItem>
                      <SelectItem value="assinatura">Assinatura Recorrente</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Defina se o produto será vendido uma única vez ou por assinatura.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="preco"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ex: 497,00" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Defina o preço do seu produto em reais (R$).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div>
            <FormLabel htmlFor="imagem" className="text-sm font-medium">Imagem do Produto</FormLabel>
            <div className="mt-3">
              {!imagemPreview ? (
                <div className="border-2 border-dashed border-border/50 rounded-lg p-8 sm:p-12 text-center hover:border-primary/50 hover:bg-secondary/20 transition-all cursor-pointer">
                  <input 
                    type="file" 
                    id="imagem" 
                    className="hidden" 
                    onChange={handleImagemUpload}
                    accept="image/jpeg,image/png"
                  />
                  <label htmlFor="imagem" className="cursor-pointer block">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Clique para fazer upload ou arraste a imagem aqui
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JPG ou PNG, tamanho recomendado: 300x250px
                    </p>
                  </label>
                </div>
              ) : (
                <div className="relative inline-block max-w-full">
                  <img 
                    src={imagemPreview} 
                    alt="Preview" 
                    className="max-h-[250px] sm:max-h-[300px] rounded-lg object-contain border-2 border-border shadow-sm"
                  />
                  <Button 
                    variant="destructive" 
                    size="icon"
                    className="absolute -top-2 -right-2 h-8 w-8 rounded-full shadow-lg"
                    onClick={removerImagem}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductGeneral;
