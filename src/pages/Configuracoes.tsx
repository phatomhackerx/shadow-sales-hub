
import { useState } from "react";
import { Bell, CreditCard, Globe, Lock, User, Wallet } from "lucide-react";

const Configuracoes = () => {
  const [secaoAtiva, setSecaoAtiva] = useState("conta");

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Personalize sua plataforma de vendas</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <nav className="flex flex-col">
              <button
                onClick={() => setSecaoAtiva("conta")}
                className={`flex items-center gap-3 p-3 text-sm transition-colors hover:bg-secondary/50 ${
                  secaoAtiva === "conta" ? "bg-secondary/50 font-medium" : "text-muted-foreground"
                }`}
              >
                <User className="h-4 w-4" />
                <span>Conta</span>
              </button>
              <button
                onClick={() => setSecaoAtiva("pagamentos")}
                className={`flex items-center gap-3 p-3 text-sm transition-colors hover:bg-secondary/50 ${
                  secaoAtiva === "pagamentos" ? "bg-secondary/50 font-medium" : "text-muted-foreground"
                }`}
              >
                <CreditCard className="h-4 w-4" />
                <span>Pagamentos</span>
              </button>
              <button
                onClick={() => setSecaoAtiva("financeiro")}
                className={`flex items-center gap-3 p-3 text-sm transition-colors hover:bg-secondary/50 ${
                  secaoAtiva === "financeiro" ? "bg-secondary/50 font-medium" : "text-muted-foreground"
                }`}
              >
                <Wallet className="h-4 w-4" />
                <span>Financeiro</span>
              </button>
              <button
                onClick={() => setSecaoAtiva("notificacoes")}
                className={`flex items-center gap-3 p-3 text-sm transition-colors hover:bg-secondary/50 ${
                  secaoAtiva === "notificacoes" ? "bg-secondary/50 font-medium" : "text-muted-foreground"
                }`}
              >
                <Bell className="h-4 w-4" />
                <span>Notificações</span>
              </button>
              <button
                onClick={() => setSecaoAtiva("dominio")}
                className={`flex items-center gap-3 p-3 text-sm transition-colors hover:bg-secondary/50 ${
                  secaoAtiva === "dominio" ? "bg-secondary/50 font-medium" : "text-muted-foreground"
                }`}
              >
                <Globe className="h-4 w-4" />
                <span>Domínio</span>
              </button>
              <button
                onClick={() => setSecaoAtiva("seguranca")}
                className={`flex items-center gap-3 p-3 text-sm transition-colors hover:bg-secondary/50 ${
                  secaoAtiva === "seguranca" ? "bg-secondary/50 font-medium" : "text-muted-foreground"
                }`}
              >
                <Lock className="h-4 w-4" />
                <span>Segurança</span>
              </button>
            </nav>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          {secaoAtiva === "conta" && (
            <div className="space-y-6">
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-lg font-medium mb-4">Informações da Conta</h2>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Nome da Empresa
                    </label>
                    <input 
                      type="text" 
                      defaultValue="Minha Empresa"
                      className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Email de Contato
                    </label>
                    <input 
                      type="email" 
                      defaultValue="contato@minhaempresa.com"
                      className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Telefone
                    </label>
                    <input 
                      type="tel" 
                      defaultValue="(11) 99999-9999"
                      className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-lg font-medium mb-4">Aparência</h2>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Tema
                    </label>
                    <select className="w-full max-w-xs bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight">
                      <option value="dark">Escuro (Dark)</option>
                      <option value="light">Claro (Light)</option>
                      <option value="system">Seguir Sistema</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Cor Principal
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="bg-highlight w-8 h-8 rounded-full"></div>
                      <input 
                        type="text" 
                        defaultValue="#3B82F6"
                        className="w-32 bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {secaoAtiva === "pagamentos" && (
            <div className="space-y-6">
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-lg font-medium mb-4">Métodos de Pagamento</h2>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span>Aceitar pagamentos via Cartão de Crédito</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span>Aceitar pagamentos via Pix</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span>Aceitar pagamentos via Boleto</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Aceitar pagamentos via Cartão de Débito</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-lg font-medium mb-4">Gateway de Pagamento</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Integração
                    </label>
                    <select className="w-full max-w-xs bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight">
                      <option value="stripe">Stripe</option>
                      <option value="pagseguro">PagSeguro</option>
                      <option value="mercadopago">MercadoPago</option>
                      <option value="paypal">PayPal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Chave de API
                    </label>
                    <input 
                      type="password" 
                      value="••••••••••••••••••••••••••••••"
                      readOnly
                      className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Modo de Operação
                    </label>
                    <select className="w-full max-w-xs bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight">
                      <option value="sandbox">Sandbox (Testes)</option>
                      <option value="production">Produção</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {secaoAtiva === "financeiro" && (
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-medium mb-4">Configurações Financeiras</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Taxa de Processamento (%)
                  </label>
                  <input 
                    type="number" 
                    defaultValue="4.99"
                    step="0.01"
                    className="w-full max-w-xs bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Prazo para Saque (dias)
                  </label>
                  <input 
                    type="number" 
                    defaultValue="14"
                    className="w-full max-w-xs bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Valor Mínimo para Saque (R$)
                  </label>
                  <input 
                    type="number" 
                    defaultValue="100"
                    className="w-full max-w-xs bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Dia do Mês para Pagamentos Automáticos
                  </label>
                  <select className="w-full max-w-xs bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight">
                    {[...Array(28)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {secaoAtiva === "notificacoes" && (
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-medium mb-4">Preferências de Notificação</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-3">Email</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-sm">Novas vendas</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-sm">Novos assinantes</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-sm">Pagamentos recebidos</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-sm">Assinaturas canceladas</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Relatórios semanais</span>
                    </label>
                  </div>
                </div>
                
                <div className="pt-2">
                  <label className="block text-sm font-medium mb-3">Notificações no Painel</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-sm">Novas vendas</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-sm">Novos comentários ou avaliações</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-sm">Atualizações do sistema</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {secaoAtiva === "dominio" && (
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-medium mb-4">Configurações de Domínio</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Subdomínio da Plataforma
                  </label>
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      defaultValue="minhaempresa"
                      className="flex-1 bg-secondary text-foreground rounded-l-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
                    />
                    <span className="bg-secondary border border-l-0 border-border rounded-r-md px-3 py-2 text-muted-foreground">
                      .vendashub.com
                    </span>
                  </div>
                </div>
                
                <div className="pt-3">
                  <h3 className="font-medium mb-2">Domínio Personalizado</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Conecte seu próprio domínio para personalizar ainda mais sua plataforma de vendas.
                  </p>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Seu Domínio
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ex: minhaempresa.com.br"
                      className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
                    />
                  </div>
                  
                  <button className="mt-4 bg-highlight hover:bg-highlight-hover text-white rounded-md px-4 py-2">
                    Conectar Domínio
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {secaoAtiva === "seguranca" && (
            <div className="space-y-6">
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-lg font-medium mb-4">Alterar Senha</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Senha Atual
                    </label>
                    <input 
                      type="password" 
                      className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Nova Senha
                    </label>
                    <input 
                      type="password" 
                      className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Confirmar Nova Senha
                    </label>
                    <input 
                      type="password" 
                      className="w-full bg-secondary text-foreground rounded-md border border-border p-2 focus:outline-none focus:ring-1 focus:ring-highlight" 
                    />
                  </div>
                  <button className="mt-2 bg-highlight hover:bg-highlight-hover text-white rounded-md px-4 py-2">
                    Atualizar Senha
                  </button>
                </div>
              </div>
              
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-lg font-medium mb-4">Autenticação de Dois Fatores (2FA)</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Adicione uma camada extra de segurança à sua conta ativando a autenticação de dois fatores.
                </p>
                <button className="bg-secondary hover:bg-secondary/80 border border-border rounded-md px-4 py-2">
                  Ativar 2FA
                </button>
              </div>
              
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-lg font-medium mb-4">Sessões Ativas</h2>
                <div className="border border-border rounded-md overflow-hidden">
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
                      <tr className="border-t border-border">
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
                      <tr className="border-t border-border">
                        <td className="p-3 text-sm">Safari em iPhone</td>
                        <td className="p-3 text-sm">São Paulo, Brasil</td>
                        <td className="p-3 text-sm text-muted-foreground">Há 2 dias</td>
                        <td className="p-3 text-sm">
                          <button className="text-sm text-red-500 hover:underline">
                            Encerrar
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button className="mt-4 text-red-500 hover:text-red-400 text-sm font-medium">
                  Encerrar todas as outras sessões
                </button>
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-highlight hover:bg-highlight-hover text-white rounded-md">
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
