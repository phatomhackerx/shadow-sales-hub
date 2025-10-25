
import { BarChart2, Download, Filter, Share2 } from "lucide-react";
import { useState } from "react";

const tiposRelatorios = [
  {
    id: "vendas",
    titulo: "Relatório de Vendas",
    descricao: "Análise completa de todas as suas vendas",
    icon: BarChart2,
  },
  {
    id: "conversao",
    titulo: "Taxa de Conversão",
    descricao: "Acompanhe quanto do seu tráfego se converte em vendas",
    icon: Share2,
  },
  {
    id: "financeiro",
    titulo: "Relatório Financeiro",
    descricao: "Visão geral do seu desempenho financeiro",
    icon: BarChart2,
  },
  {
    id: "afiliados",
    titulo: "Desempenho de Afiliados",
    descricao: "Acompanhe o desempenho da sua rede de afiliados",
    icon: Share2,
  }
];

const periodos = [
  { value: "hoje", label: "Hoje" },
  { value: "7dias", label: "Últimos 7 dias" },
  { value: "30dias", label: "Últimos 30 dias" },
  { value: "90dias", label: "Últimos 90 dias" },
  { value: "anual", label: "Este ano" },
  { value: "personalizado", label: "Personalizado" }
];

const Relatorios = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("30dias");
  const [relatorioSelecionado, setRelatorioSelecionado] = useState("");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">Análise detalhada do seu negócio</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select 
            className="grok-input flex-1 sm:flex-initial min-w-[140px]"
            value={periodoSelecionado}
            onChange={(e) => setPeriodoSelecionado(e.target.value)}
          >
            {periodos.map((periodo) => (
              <option key={periodo.value} value={periodo.value}>
                {periodo.label}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 px-3 sm:px-4 py-2 grok-input hover:bg-secondary/60 transition-all">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filtros</span>
          </button>
          <button className="flex items-center gap-2 px-3 sm:px-4 py-2 grok-button">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiposRelatorios.map((relatorio) => (
          <button
            key={relatorio.id}
            onClick={() => setRelatorioSelecionado(relatorio.id)}
            className={`grok-card flex flex-col h-40 p-5 transition-all duration-200 ${
              relatorioSelecionado === relatorio.id ? 'border-foreground/20 bg-secondary/30' : 'hover:border-foreground/10'
            }`}
          >
            <div className={`p-2.5 rounded-lg w-fit transition-all ${
              relatorioSelecionado === relatorio.id ? 'bg-foreground/10' : 'bg-secondary/50'
            }`}>
              <relatorio.icon className={`h-5 w-5 ${
                relatorioSelecionado === relatorio.id ? 'text-foreground' : 'text-muted-foreground'
              }`} />
            </div>
            <h3 className="text-base font-semibold mt-4 text-left">{relatorio.titulo}</h3>
            <p className="text-xs text-muted-foreground mt-1.5 text-left">{relatorio.descricao}</p>
          </button>
        ))}
      </div>

      {relatorioSelecionado ? (
        <div className="grok-card p-6">
          <h3 className="text-lg font-semibold mb-6">
            {tiposRelatorios.find(r => r.id === relatorioSelecionado)?.titulo}
          </h3>
          <div className="p-12 flex items-center justify-center border border-dashed border-border/40 rounded-lg bg-secondary/20">
            <p className="text-muted-foreground text-sm">Selecione os parâmetros acima para gerar seu relatório</p>
          </div>
        </div>
      ) : (
        <div className="grok-card p-8">
          <div className="text-center py-12">
            <BarChart2 className="h-14 w-14 mx-auto text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-semibold">Selecione um relatório</h3>
            <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
              Escolha um dos tipos de relatório acima para visualizar dados detalhados
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Relatorios;
