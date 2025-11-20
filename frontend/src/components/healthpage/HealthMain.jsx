import React from "react";
import HealthCorrelation from "./HealthCorrelation";
import HealthHeatMap from "./HealthHeatMap";
import HealthScatter from "./HealthScatter";

export default function HealthMain() {
  return (
    <section className="grid grid-cols-1 auto-rows-auto bg-secondary p-6 rounded-lg gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Métricas Principais</h2>
        <p className="text-muted text-sm">
          Estatísticas 
        </p>
      </div>

      <div className="health__main gap-4">
        <HealthCorrelation />
        <HealthHeatMap />
        <HealthScatter />
      </div>
    </section>
  );
}
