import React from "react";

export default function HealthHeatMap() {
  return (
    <article className="bg-tertiary p-6 rounded-lg">
      <h3 className="text-xl font-medium">Mapa de calor de correlação</h3>
      <div className="flex flex-col h-full justify-center items-center gap-2 p-4">
        <span className="text-4xl">📊</span>
        <p className="text-muted">
          Mapa de calor de correlação será exibido aqui
        </p>
      </div>
    </article>
  );
}
