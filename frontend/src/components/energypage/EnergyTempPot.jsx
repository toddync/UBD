export default function EnergyTempPot() {
  return (
    <section className="grid auto-rows-auto text-white p-6 bg-secondary rounded-lg gap-4">
      <h2 className="text-xl font-semibold">Temperatura × Potência</h2>

      <div className="bg-tertiary p-4 rounded-lg h-64 flex flex-col items-center justify-center text-center gap-2">
        <span className="text-4xl">📊</span>
        <p className="text-sm text-muted">Gráfico será exibido aqui.</p>
      </div>
    </section>
  );
}
