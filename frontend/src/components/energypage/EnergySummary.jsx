export default function EnergySummary() {
  const metrics = [
    {
      id: 0,
      title: "Rendimento Médio Total",
      value: "44.29%",
      color: "text-blue-500",
    },
    {
      id: 1,
      title: "Rendimento Máximo",
      value: "47.06%",
      color: "text-green-400",
    },
    {
      id: 2,
      title: "Rendimento Mínimo",
      value: "41.38%",
      color: "text-orange-400",
    },
    {
      id: 3,
      title: "Potência Máxima",
      value: "4.1kW",
      color: "text-red-400",
    },
  ];

  return (
    <section className="grid grid-cols-1 auto-rows-auto bg-gray-800 text-white p-6 rounded-lg gap-4">
      <h2 className="text-xl font-semibold">Métricas Principais</h2>

      <div className="grid grid-cols-1 gap-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            color={metric.color}
          />
        ))}
      </div>
    </section>
  );
}

function MetricCard({ title, value, color }) {
  return (
    <article
      className={`p-4 rounded-lg text-white flex justify-between gap-2 bg-gray-700 items-center`}
    >
      <h3 className="text-white/70">{title}</h3>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </article>
  );
}
