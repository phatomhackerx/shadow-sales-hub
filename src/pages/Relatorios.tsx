
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">Análise detalhada do seu negócio</p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            className="px-3 py-2 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-highlight"
            value={periodoSelecionado}
            onChange={(e) => setPeriodoSelecionado(e.target.value)}
          >
            {periodos.map((periodo) => (
              <option key={periodo.value} value={periodo.value}>
                {periodo.label}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-md border border-border hover:bg-secondary/80">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-highlight hover:bg-highlight-hover text-white rounded-md">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiposRelatorios.map((relatorio) => (
          <button
            key={relatorio.id}
            onClick={() => setRelatorioSelecionado(relatorio.id)}
            className={`flex flex-col h-40 p-4 rounded-lg border border-border ${
              relatorioSelecionado === relatorio.id ? 'bg-sidebar-accent border-highlight' : 'bg-card hover:bg-secondary/50'
            }`}
          >
            <div className={`p-2 rounded-full w-fit ${
              relatorioSelecionado === relatorio.id ? 'bg-highlight/20' : 'bg-secondary'
            }`}>
              <relatorio.icon className={`h-5 w-5 ${
                relatorioSelecionado === relatorio.id ? 'text-highlight' : 'text-foreground'
              }`} />
            </div>
            <h3 className="text-lg font-medium mt-4">{relatorio.titulo}</h3>
            <p className="text-sm text-muted-foreground mt-1">{relatorio.descricao}</p>
          </button>
        ))}
      </div>

      {relatorioSelecionado ? (
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-lg font-medium mb-4">
            {tiposRelatorios.find(r => r.id === relatorioSelecionado)?.titulo}
          </h3>
          <div className="p-8 flex items-center justify-center border border-dashed border-border rounded-md">
            <p className="text-muted-foreground">Selecione os parâmetros acima para gerar seu relatório</p>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="text-center py-10">
            <BarChart2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Selecione um relatório</h3>
            <p className="text-muted-foreground mt-1">
              Escolha um dos tipos de relatório acima para visualizar dados detalhados
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Relatorios;
