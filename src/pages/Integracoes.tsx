
import { Globe, Link, Plus, Settings, ZapOff } from "lucide-react";
import { useState } from "react";

const integracoes = [
  {
    id: "analytics",
    nome: "Google Analytics",
    descricao: "Monitore métricas de tráfego e conversão do seu site",
    icone: Globe,
    status: "Conectado",
    detalhes: "Conectado como analytics@seudominio.com"
  },
  {
    id: "zapier",
    nome: "Zapier",
    descricao: "Automatize tarefas entre mais de 5.000 apps",
    icone: ZapOff,
    status: "Não conectado",
    detalhes: ""
  },
  {
    id: "shopify",
    nome: "Shopify",
    descricao: "Integre sua loja Shopify com nossa plataforma",
    icone: Link,
    status: "Não conectado",
    detalhes: ""
  },
  {
    id: "instagram",
    nome: "Instagram",
    descricao: "Conecte sua conta do Instagram para compartilhar produtos",
    icone: Globe,
    status: "Conectado",
    detalhes: "Conectado como @suaconta"
  }
];

const Integracoes = () => {
  const [activeTab, setActiveTab] = useState("apps");

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Integrações</h1>
        <p className="text-muted-foreground">Conecte sua plataforma com outras ferramentas</p>
      </div>
      
      <div className="flex border-b border-border">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "apps" 
              ? "border-b-2 border-highlight text-highlight" 
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("apps")}
        >
          Apps e Serviços
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "api" 
              ? "border-b-2 border-highlight text-highlight" 
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("api")}
        >
          API e Webhooks
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "pixels" 
              ? "border-b-2 border-highlight text-highlight" 
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("pixels")}
        >
          Pixels de Rastreamento
        </button>
      </div>
      
      {activeTab === "apps" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integracoes.map((integracao) => (
            <div key={integracao.id} className="p-4 rounded-lg border border-border bg-card">
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <div className="bg-secondary p-2 rounded-md h-fit">
                    <integracao.icone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{integracao.nome}</h3>
                    <p className="text-sm text-muted-foreground">
                      {integracao.descricao}
                    </p>
                    {integracao.status === "Conectado" && (
                      <p className="text-xs text-green-500 mt-2">
                        {integracao.detalhes}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  {integracao.status === "Conectado" ? (
                    <div className="flex flex-col items-end gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                        {integracao.status}
                      </span>
                      <button className="text-sm text-highlight hover:underline flex items-center gap-1">
                        <Settings className="h-3 w-3" />
                        Configurar
                      </button>
                    </div>
                  ) : (
                    <button className="px-3 py-1 text-sm bg-highlight hover:bg-highlight-hover text-white rounded-md">
                      Conectar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <div className="p-4 rounded-lg border border-dashed border-border flex flex-col items-center justify-center h-32">
            <button className="flex items-center gap-2 text-highlight">
              <Plus className="h-5 w-5" />
              <span>Adicionar Nova Integração</span>
            </button>
          </div>
        </div>
      )}
      
      {activeTab === "api" && (
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-lg font-medium mb-4">Chaves de API</h3>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                Use essas chaves para integrar sua plataforma com sistemas externos.
                Mantenha suas chaves seguras e não compartilhe com terceiros.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Chave de API
                  </label>
                  <div className="flex">
                    <input 
                      type="password" 
                      value="••••••••••••••••••••••••••••••"
                      readOnly
                      className="flex-1 bg-secondary text-foreground rounded-l-md border border-border p-2 focus:outline-none"
                    />
                    <button className="bg-secondary border border-l-0 border-border rounded-r-md px-4">
                      Mostrar
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Ações
                  </label>
                  <button className="bg-highlight hover:bg-highlight-hover text-white rounded-md px-4 py-2">
                    Gerar Nova Chave
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-lg font-medium mb-4">Webhooks</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Configure URLs para receber notificações automáticas quando eventos específicos ocorrerem na sua plataforma.
            </p>
            
            <button className="flex items-center gap-2 px-3 py-2 bg-highlight hover:bg-highlight-hover text-white rounded-md">
              <Plus className="h-4 w-4" />
              <span>Adicionar Webhook</span>
            </button>
            
            <div className="mt-4 border border-border rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/30">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Evento</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">URL</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 text-sm">Nova Venda</td>
                    <td className="p-3 text-sm text-muted-foreground truncate max-w-xs">
                      https://exemplo.com/webhooks/nova-venda
                    </td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                        Ativo
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <button className="text-sm text-highlight hover:underline">Editar</button>
                        <button className="text-sm text-red-500 hover:underline">Excluir</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === "pixels" && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-lg font-medium mb-4">Pixels de Rastreamento</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Adicione pixels de rastreamento para acompanhar conversões e comportamento do usuário.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Facebook Pixel</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Rastreie conversões e comportamento para campanhas do Facebook Ads
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                    Ativo
                  </span>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-xs text-muted-foreground mb-1">
                  ID do Pixel
                </label>
                <div className="flex">
                  <input 
                    type="text" 
                    value="1234567890123456" 
                    className="flex-1 bg-secondary text-foreground rounded-md border border-border p-2 text-sm focus:outline-none focus:ring-1 focus:ring-highlight" 
                  />
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-border rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Google Ads</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Rastreie conversões para suas campanhas do Google Ads
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-500">
                    Inativo
                  </span>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-xs text-muted-foreground mb-1">
                  ID de Conversão
                </label>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Ex: AW-123456789"
                    className="flex-1 bg-secondary text-foreground rounded-md border border-border p-2 text-sm focus:outline-none focus:ring-1 focus:ring-highlight" 
                  />
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-dashed border-border rounded-md flex flex-col items-center justify-center h-32">
              <button className="flex items-center gap-2 text-highlight">
                <Plus className="h-5 w-5" />
                <span>Adicionar Novo Pixel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Integracoes;
