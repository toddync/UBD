import CorrelationHeatmap from "../components/healthpage/CorrelationHeatmap";
import HealthSummary from "../components/healthpage/HealthSummary";
import PredictiveModel from "../components/healthpage/PredictiveModel";
import RiskComparison from "../components/healthpage/RiskComparison";

export default function Saude() {
  return (
    <main className="flex flex-col bg-primary px-6 pt-20 pb-10 gap-4 text-primary">
      <h1 className="text-3xl font-bold">Análise de Risco Cardíaco</h1>
      <p className="text-muted mb-4">
        Predição de risco cardíaco baseada em pressão arterial, colesterol e
        idade dos pacientes.
      </p>

      <div className="grid auto-rows-auto gap-6">
        <HealthSummary />
        <CorrelationHeatmap />
        <RiskComparison />
        <PredictiveModel />
      </div>
    </main>
  );
}
