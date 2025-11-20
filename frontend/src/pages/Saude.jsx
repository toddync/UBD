import HealthMain from "../components/healthpage/HealthMain";

export default function Saude() {
  return (
    <main className="flex flex-col bg-primary px-6 pt-20 pb-6 gap-4 text-primary lg:py-6">
      <h1 className="text-3xl font-bold">
        Dashboard | Risco Cardíaco em Pacientes
      </h1>
      <p className="text-muted mb-4">
        Análise de risco cardíaco baseada em pressão arterial, colesterol e
        idade dos pacientes.
      </p>

      <div className="grid gap-6">
        <HealthMain />
      </div>
    </main>
  );
}
