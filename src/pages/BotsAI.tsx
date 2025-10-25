
import { useState } from "react";
import { Bot, Link as LinkIcon, MessageSquare, BarChart, Settings as SettingsIcon, Plus, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const BotsAI = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleCreateNew = (type: string) => {
    toast.info(`Criando novo ${type}`, {
      description: "Esta funcionalidade está em desenvolvimento.",
    });
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">BotsAI</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Gerencie seus links inteligentes, bots personalizados e automações de atendimento
        </p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span className="hidden sm:inline">Visão Geral</span>
          </TabsTrigger>
          <TabsTrigger value="smart-links" className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Smart Links</span>
          </TabsTrigger>
          <TabsTrigger value="bots" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">Bots & Agentes</span>
          </TabsTrigger>
          <TabsTrigger value="channels" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Canais</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="grok-card hover:border-foreground/10 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-md bg-primary/10">
                    <LinkIcon className="h-5 w-5 text-primary" />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setActiveTab("smart-links")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-xl mt-4">Smart Links</CardTitle>
                <CardDescription>
                  Crie páginas personalizadas para links na bio com estatísticas avançadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Links ativos</span>
                  <span className="font-medium">0/5</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full mt-2">
                  <div className="bg-primary h-2 rounded-full w-0"></div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="grok-button w-full" 
                  onClick={() => handleCreateNew("smart link")}
                >
                  <Plus className="mr-2 h-4 w-4" /> Criar Smart Link
                </Button>
              </CardFooter>
            </Card>

            <Card className="grok-card hover:border-foreground/10 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-md bg-blue-500/10">
                    <Bot className="h-5 w-5 text-blue-500" />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setActiveTab("bots")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-xl mt-4">Bots & Agentes</CardTitle>
                <CardDescription>
                  Automatize seu atendimento com bots personalizados e agentes de IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Bots ativos</span>
                  <span className="font-medium">0/3</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full mt-2">
                  <div className="bg-blue-500 h-2 rounded-full w-0"></div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleCreateNew("bot")}
                >
                  <Plus className="mr-2 h-4 w-4" /> Criar Bot
                </Button>
              </CardFooter>
            </Card>

            <Card className="grok-card hover:border-foreground/10 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-md bg-green-500/10">
                    <MessageSquare className="h-5 w-5 text-green-500" />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setActiveTab("channels")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-xl mt-4">Canais</CardTitle>
                <CardDescription>
                  Conecte suas redes sociais e canais de atendimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Canais conectados</span>
                  <span className="font-medium">0/5</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full mt-2">
                  <div className="bg-green-500 h-2 rounded-full w-0"></div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleCreateNew("canal")}
                >
                  <Plus className="mr-2 h-4 w-4" /> Conectar Canal
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8">
            <Card className="grok-card hover:border-foreground/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Comece a usar o BotsAI</CardTitle>
                <CardDescription>
                  Siga os passos abaixo para configurar sua primeira automação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg border border-border/50">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      1
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-medium">Crie seu primeiro Smart Link</h3>
                      <p className="text-sm text-muted-foreground">
                        Crie uma página personalizada para compartilhar em suas redes sociais
                      </p>
                      <Button 
                        variant="link" 
                        className="px-0 text-primary"
                        onClick={() => {
                          setActiveTab("smart-links");
                          toast.info("Redirecionando para Smart Links", {
                            description: "Esta funcionalidade está em desenvolvimento."
                          });
                        }}
                      >
                        Começar agora <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg border border-border/50">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      2
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-medium">Configure seu primeiro Bot</h3>
                      <p className="text-sm text-muted-foreground">
                        Crie um bot personalizado com fluxos de atendimento automatizados
                      </p>
                      <Button 
                        variant="link" 
                        className="px-0 text-primary"
                        onClick={() => {
                          setActiveTab("bots");
                          toast.info("Redirecionando para Bots & Agentes", {
                            description: "Esta funcionalidade está em desenvolvimento."
                          });
                        }}
                      >
                        Começar agora <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg border border-border/50">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      3
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-medium">Conecte seus canais</h3>
                      <p className="text-sm text-muted-foreground">
                        Integre o WhatsApp, Instagram, Telegram e outros canais
                      </p>
                      <Button 
                        variant="link" 
                        className="px-0 text-primary"
                        onClick={() => {
                          setActiveTab("channels");
                          toast.info("Redirecionando para Canais", {
                            description: "Esta funcionalidade está em desenvolvimento."
                          });
                        }}
                      >
                        Começar agora <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="smart-links" className="mt-6">
          <Card className="grok-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Smart Links</CardTitle>
                <Button onClick={() => handleCreateNew("smart link")}>
                  <Plus className="mr-2 h-4 w-4" /> Novo Link
                </Button>
              </div>
              <CardDescription>
                Crie e gerencie suas páginas de links inteligentes para compartilhar em redes sociais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <LinkIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Nenhum Smart Link criado</h3>
                <p className="text-sm text-muted-foreground max-w-md mb-6">
                  Crie seu primeiro Smart Link para compartilhar todos os seus links em uma única página personalizada.
                </p>
                <Button onClick={() => handleCreateNew("smart link")}>
                  <Plus className="mr-2 h-4 w-4" /> Criar Smart Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bots" className="mt-6">
          <Card className="grok-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Bots & Agentes</CardTitle>
                <Button onClick={() => handleCreateNew("bot")}>
                  <Plus className="mr-2 h-4 w-4" /> Novo Bot
                </Button>
              </div>
              <CardDescription>
                Crie bots personalizados e agentes de IA para automatizar seu atendimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-blue-500/10 p-3 mb-4">
                  <Bot className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">Nenhum Bot criado</h3>
                <p className="text-sm text-muted-foreground max-w-md mb-6">
                  Crie seu primeiro Bot para automatizar seu atendimento e oferecer respostas rápidas aos seus clientes.
                </p>
                <Button onClick={() => handleCreateNew("bot")}>
                  <Plus className="mr-2 h-4 w-4" /> Criar Bot
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="mt-6">
          <Card className="grok-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Canais</CardTitle>
                <Button onClick={() => handleCreateNew("canal")}>
                  <Plus className="mr-2 h-4 w-4" /> Conectar Canal
                </Button>
              </div>
              <CardDescription>
                Conecte e gerencie seus canais de atendimento e redes sociais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-green-500/10 p-3 mb-4">
                  <MessageSquare className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">Nenhum Canal conectado</h3>
                <p className="text-sm text-muted-foreground max-w-md mb-6">
                  Conecte seus canais de atendimento como WhatsApp, Instagram Direct e outros para integrar com seus bots.
                </p>
                <Button onClick={() => handleCreateNew("canal")}>
                  <Plus className="mr-2 h-4 w-4" /> Conectar Canal
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BotsAI;
