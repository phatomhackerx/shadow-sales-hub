
import { useState } from "react";
import { Bell, CreditCard, Globe, Lock, User, Wallet, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const Configuracoes = () => {
  const [secaoAtiva, setSecaoAtiva] = useState("conta");
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const handleSaveChanges = () => {
    toast.success("Configurações salvas com sucesso!", {
      description: "Suas alterações foram aplicadas.",
      icon: <Check className="h-4 w-4" />,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gradient mb-1">Configurações</h1>
          <p className="text-muted-foreground">Personalize sua plataforma de vendas</p>
        </div>
        <Button 
          onClick={handleSaveChanges}
          className="mt-3 sm:mt-0 bg-gradient-to-r from-highlight to-highlight-hover hover:from-highlight-hover hover:to-highlight"
        >
          Salvar Alterações
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="overflow-hidden border-border/40 bg-card/80 backdrop-blur-sm">
            <nav className="flex flex-col">
              {[
                { id: "conta", label: "Conta", icon: User },
                { id: "pagamentos", label: "Pagamentos", icon: CreditCard },
                { id: "financeiro", label: "Financeiro", icon: Wallet },
                { id: "notificacoes", label: "Notificações", icon: Bell },
                { id: "dominio", label: "Domínio", icon: Globe },
                { id: "seguranca", label: "Segurança", icon: Lock },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSecaoAtiva(item.id)}
                  className={`flex items-center gap-3 p-3.5 text-sm transition-colors hover:bg-secondary/50 ${
                    secaoAtiva === item.id 
                      ? "bg-secondary/50 font-medium text-highlight" 
                      : "text-muted-foreground"
                  }`}
                >
                  <item.icon className={`h-4 w-4 ${secaoAtiva === item.id ? "text-highlight" : ""}`} />
                  <span>{item.label}</span>
                  
                  {secaoAtiva === item.id && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-highlight"></div>
                  )}
                </button>
              ))}
            </nav>
          </Card>
        </div>
        
        <div className="lg:col-span-3 space-y-6">
          {secaoAtiva === "conta" && (
            <div className="space-y-6">
              <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle>Informações da Conta</CardTitle>
                  <CardDescription>Atualize os detalhes básicos da sua conta e empresa</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Nome da Empresa
                    </label>
                    <input 
                      type="text" 
                      defaultValue="Minha Empresa"
                      className="w-full bg-secondary/40 text-foreground rounded-md border border-border/40 p-2.5 focus:outline-none focus:ring-1 focus:ring-highlight focus:border-highlight transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Email de Contato
                    </label>
                    <input 
                      type="email" 
                      defaultValue="contato@minhaempresa.com"
                      className="w-full bg-secondary/40 text-foreground rounded-md border border-border/40 p-2.5 focus:outline-none focus:ring-1 focus:ring-highlight focus:border-highlight transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Telefone
                    </label>
                    <input 
                      type="tel" 
                      defaultValue="(11) 99999-9999"
                      className="w-full bg-secondary/40 text-foreground rounded-md border border-border/40 p-2.5 focus:outline-none focus:ring-1 focus:ring-highlight focus:border-highlight transition-colors" 
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle>Aparência</CardTitle>
                  <CardDescription>Personalize o visual da sua plataforma</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Tema
                    </label>
                    <Tabs defaultValue="dark" className="w-full max-w-xs">
                      <TabsList className="grid w-full grid-cols-3 bg-secondary/40 p-0.5">
                        <TabsTrigger value="dark" className="text-xs py-1.5">Escuro</TabsTrigger>
                        <TabsTrigger value="light" className="text-xs py-1.5">Claro</TabsTrigger>
                        <TabsTrigger value="system" className="text-xs py-1.5">Sistema</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Cor Principal
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        {["#3B82F6", "#ec4899", "#10b981", "#f97316", "#8b5cf6"].map((color) => (
                          <button
                            key={color}
                            className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${color === "#3B82F6" ? "ring-2 ring-white/40 ring-offset-2 ring-offset-background" : ""}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <input 
                        type="text" 
                        defaultValue="#3B82F6"
                        className="w-32 bg-secondary/40 text-foreground rounded-md border border-border/40 p-2 focus:outline-none focus:ring-1 focus:ring-highlight focus:border-highlight transition-colors" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {secaoAtiva === "pagamentos" && (
            <div className="space-y-6">
              <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle>Métodos de Pagamento</CardTitle>
                  <CardDescription>Configure quais métodos de pagamento sua plataforma irá aceitar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: "credit", label: "Cartão de Crédito", checked: true },
                      { id: "pix", label: "Pix", checked: true },
                      { id: "boleto", label: "Boleto", checked: true },
                      { id: "debit", label: "Cartão de Débito", checked: false }
                    ].map((method) => (
                      <div key={method.id} className="flex items-center space-x-3 p-3 rounded-md bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border/30">
                        <Checkbox id={method.id} defaultChecked={method.checked} className="data-[state=checked]:bg-highlight data-[state=checked]:border-highlight" />
                        <label htmlFor={method.id} className="text-sm cursor-pointer flex-1">
                          {method.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle>Gateway de Pagamento</CardTitle>
                  <CardDescription>Integre sua plataforma com um gateway de pagamento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Integração
                    </label>
                    <select className="w-full max-w-xs bg-secondary/40 text-foreground rounded-md border border-border/40 p-2.5 focus:outline-none focus:ring-1 focus:ring-highlight focus:border-highlight transition-colors">
                      <option value="stripe">Stripe</option>
                      <option value="pagseguro">PagSeguro</option>
                      <option value="mercadopago">MercadoPago</option>
                      <option value="paypal">PayPal</option>
                    </select>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-muted-foreground">
                        Chave de API
                      </label>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-muted-foreground">
                            <AlertCircle className="h-3.5 w-3.5 mr-1" />
                            <span className="text-xs">Ajuda</span>
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold">Chave de API</h4>
                            <p className="text-xs text-muted-foreground">
                              Você pode encontrar sua chave de API no painel de controle do seu gateway de pagamento.
                              Mantenha esta chave em segurança.
                            </p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <div className="relative">
                      <input 
                        type="password" 
                        value="••••••••••••••••••••••••••••••"
                        readOnly
                        className="w-full bg-secondary/40 text-foreground rounded-md border border-border/40 p-2.5 pr-12 focus:outline-none focus:ring-1 focus:ring-highlight focus:border-highlight transition-colors" 
                      />
                      <Button className="absolute right-1 top-1/2 -translate-y-1/2 h-8 text-xs" size="sm">
                        Mostrar
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Modo de Operação
                    </label>
                    <Tabs defaultValue="sandbox" className="w-full max-w-xs">
                      <TabsList className="grid w-full grid-cols-2 bg-secondary/40 p-0.5">
                        <TabsTrigger value="sandbox" className="text-xs py-1.5">Sandbox (Testes)</TabsTrigger>
                        <TabsTrigger value="production" className="text-xs py-1.5">Produção</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {secaoAtiva === "financeiro" && (
            <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle>Configurações Financeiras</CardTitle>
                <CardDescription>Gerencie parâmetros financeiros da sua plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Taxa de Processamento (%)
                    </label>
                    <div className="relative">
                      <input 
                        type="number" 
                        defaultValue="4.99"
                        step="0.01"
                        className="w-full bg-secondary/40 text-foreground rounded-md border border-border/40 p-2.5 focus:outline-none focus:ring-1 focus:ring-highlight focus:border-highlight transition-colors" 
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-muted-foreground">%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Prazo para Saque (dias)
                    </label>
                    <input 
                      type="number" 
                      defaultValue="14"
                      className="w-full bg-secondary/40 text-foreground rounded-md border border-border/40 p-2.5 focus:outline-none focus:ring-1 focus:ring-highlight focus:border-highlight transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Valor Mínimo para Saque (R$)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                        R$
                      </span>
                      <input 
                        type="number" 
                        defaultValue="100"
                        className="w-full pl-10 bg-secondary/40 text-foreground rounded-md border border-border/40 p-2.5 focus:outline-none focus:ring-1 focus:ring-highlight focus:border-highlight transition-colors" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Dia do Mês para Pagamentos Automáticos
                    </label>
                    <select className="w-full bg-secondary/40 text-foreground rounded-md border border-border/40 p-2.5 focus:outline-none focus:ring-1 focus:ring-highlight focus:border-highlight transition-colors">
                      {[...Array(28)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <Collapsible 
                  open={!isCollapsed} 
                  onOpenChange={(open) => setIsCollapsed(!open)}
                  className="mt-6 p-4 rounded-lg border border-border/40 bg-secondary/20"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Opções avançadas de pagamento</h4>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {isCollapsed ? "Expandir" : "Recolher"}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="mt-4 space-y-4">
                    <div>
                      <label className="flex items-center space-x-2">
                        <Checkbox id="allow-installments" defaultChecked className="data-[state=checked]:bg-highlight data-[state=checked]:border-highlight" />
                        <span className="text-sm">Permitir parcelamento de compras</span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center space-x-2">
                        <Checkbox id="allow-discount" defaultChecked className="data-[state=checked]:bg-highlight data-[state=checked]:border-highlight" />
                        <span className="text-sm">Aplicar desconto para pagamento à vista</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Número máximo de parcelas
                      </label>
                      <select className="w-full max-w-xs bg-secondary/40 text-foreground rounded-md border border-border/40 p-2.5 focus:outline-none focus:ring-1 focus:ring-highlight focus:border-highlight transition-colors">
                        {[1, 2, 3, 4, 5, 6, 9, 10, 12].map((num) => (
                          <option key={num} value={num}>
                            {num}x
                          </option>
                        ))}
                      </select>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          )}
          
          {secaoAtiva === "notificacoes" && (
            <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>Personalize como você deseja receber notificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3 text-white/90">Email</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: "email-sales", label: "Novas vendas", checked: true },
                      { id: "email-subscribers", label: "Novos assinantes", checked: true },
                      { id: "email-payments", label: "Pagamentos recebidos", checked: true },
                      { id: "email-canceled", label: "Assinaturas canceladas", checked: true },
                      { id: "email-reports", label: "Relatórios semanais", checked: false }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <Checkbox id={item.id} defaultChecked={item.checked} className="data-[state=checked]:bg-highlight data-[state=checked]:border-highlight" />
                        <label htmlFor={item.id} className="text-sm cursor-pointer">
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-border/30 pt-5">
                  <h3 className="text-sm font-medium mb-3 text-white/90">Notificações no Painel</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: "panel-sales", label: "Novas vendas", checked: true },
                      { id: "panel-comments", label: "Novos comentários ou avaliações", checked: true },
                      { id: "panel-updates", label: "Atualizações do sistema", checked: true }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <Checkbox id={item.id} defaultChecked={item.checked} className="data-[state=checked]:bg-highlight data-[state=checked]:border-highlight" />
                        <label htmlFor={item.id} className="text-sm cursor-pointer">
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-border/30 pt-5">
                  <h3 className="text-sm font-medium mb-3 text-white/90">Dispositivos Conectados</h3>
                  <div className="space-y-3">
                    {[
                      { id: "device-browser", label: "Navegador Web", checked: true },
                      { id: "device-mobile", label: "Aplicativo Móvel", checked: true }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <Checkbox id={item.id} defaultChecked={item.checked} className="data-[state=checked]:bg-highlight data-[state=checked]:border-highlight" />
                        <label htmlFor={item.id} className="text-sm cursor-pointer">
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {secaoAtiva === "dominio" && (
            <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle>Configurações de Domínio</CardTitle>
                <CardDescription>Personalize a URL da sua plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Subdomínio da Plataforma
                  </label>
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      defaultValue="minhaempresa"
                      className="flex-1 bg-secondary/40 text-foreground rounded-l-md border border-border/40 p-2.5 focus:outline-none focus:ring-1 focus:ring-highlight focus:border-highlight transition-colors" 
                    />
                    <span className="bg-secondary/60 border border-l-0 border-border/40 rounded-r-md px-3 py-2.5 text-muted-foreground">
                      .vendashub.com
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-border/30 pt-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Domínio Personalizado</h3>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-highlight/20 text-highlight border border-highlight/30">
                      Recomendado
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Conecte seu próprio domínio para personalizar ainda mais sua plataforma de vendas.
                  </p>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Seu Domínio
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                        https://
                      </span>
                      <input 
                        type="text" 
                        placeholder="Ex: minhaempresa.com.br"
                        className="w-full pl-16 bg-secondary/40 text-foreground rounded-md border border-border/40 p-2.5 focus:outline-none focus:ring-1 focus:ring-highlight focus:border-highlight transition-colors" 
                      />
                    </div>
                  </div>
                  
                  <Button className="mt-4 bg-gradient-to-r from-highlight to-highlight-hover hover:from-highlight-hover hover:to-highlight transition-all duration-300">
                    Conectar Domínio
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {secaoAtiva === "seguranca" && (
            <div className="space-y-6">
              <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle>Alterar Senha</CardTitle>
                  <CardDescription>Atualize sua senha de acesso</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Senha Atual
                    </label>
                    <input 
                      type="password" 
                      className="w-full bg-secondary/40 text-foreground rounded-md border border-border/40 p-2.5 focus:outline-none focus:ring-1 focus:ring-highlight focus:border-highlight transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Nova Senha
                    </label>
                    <input 
                      type="password" 
                      className="w-full bg-secondary/40 text-foreground rounded-md border border-border/40 p-2.5 focus:outline-none focus:ring-1 focus:ring-highlight focus:border-highlight transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Confirmar Nova Senha
                    </label>
                    <input 
                      type="password" 
                      className="w-full bg-secondary/40 text-foreground rounded-md border border-border/40 p-2.5 focus:outline-none focus:ring-1 focus:ring-highlight focus:border-highlight transition-colors" 
                    />
                  </div>
                  <Button className="mt-2 bg-gradient-to-r from-highlight to-highlight-hover hover:from-highlight-hover hover:to-highlight transition-all duration-300">
                    Atualizar Senha
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle>Autenticação de Dois Fatores (2FA)</CardTitle>
                  <CardDescription>Adicione uma camada extra de segurança à sua conta</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-border/40 bg-secondary/20">
                    <div className="mb-3 sm:mb-0">
                      <h4 className="text-sm font-medium mb-1">Status: <span className="text-red-400">Desativado</span></h4>
                      <p className="text-xs text-muted-foreground">
                        A autenticação de dois fatores adiciona uma camada extra de segurança à sua conta.
                      </p>
                    </div>
                    <Button variant="outline" className="border-highlight/30 text-highlight hover:bg-highlight/10 hover:text-highlight">
                      Ativar 2FA
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle>Sessões Ativas</CardTitle>
                  <CardDescription>Monitore os dispositivos conectados à sua conta</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border border-border/40 rounded-md overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-secondary/30">
                            <th className="text-left p-3 text-sm font-medium text-muted-foreground">Dispositivo</th>
                            <th className="text-left p-3 text-sm font-medium text-muted-foreground">Localização</th>
                            <th className="text-left p-3 text-sm font-medium text-muted-foreground">Último Acesso</th>
                            <th className="text-left p-3 text-sm font-medium text-muted-foreground">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-border/40 bg-secondary/10 hover:bg-secondary/20 transition-colors">
                            <td className="p-3 text-sm">
                              <div className="flex items-center gap-2">
                                <span>Chrome em Windows</span>
                                <span className="px-1.5 py-0.5 text-xs bg-green-500/20 text-green-500 rounded-full">
                                  Atual
                                </span>
                              </div>
                            </td>
                            <td className="p-3 text-sm">São Paulo, Brasil</td>
                            <td className="p-3 text-sm text-muted-foreground">Agora</td>
                            <td className="p-3 text-sm">-</td>
                          </tr>
                          <tr className="border-t border-border/40 bg-secondary/10 hover:bg-secondary/20 transition-colors">
                            <td className="p-3 text-sm">Safari em iPhone</td>
                            <td className="p-3 text-sm">São Paulo, Brasil</td>
                            <td className="p-3 text-sm text-muted-foreground">Há 2 dias</td>
                            <td className="p-3 text-sm">
                              <Button variant="ghost" size="sm" className="h-7 px-3 text-red-400 hover:text-red-500 hover:bg-red-500/10">
                                Encerrar
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Button variant="ghost" className="mt-4 text-red-400 hover:text-red-500 hover:bg-red-500/10">
                    Encerrar todas as outras sessões
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
