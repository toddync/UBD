import React from "react";
import EnergySummary from "../components/energypage/EnergySummary";
import EnergyTempPot from "../components/energypage/EnergyTempPot";
import EnergyEfficiencyByHour from "../components/energypage/EnergyEfficiencyByHour";
import EnergyEvolution from "../components/energypage/EnergyEvolution";

export default function Energia() {
  return (
    <main className="flex flex-col bg-gray-900 px-6 pt-20 pb-10 gap-4">
      <h1 className="text-3xl font-bold text-white">Painéis Solares</h1>
      <p className="text-white/70 mb-4">
        Análise de eficiência energética baseada em temperatura e radiação
        solar.
      </p>

      <div className="grid auto-rows-auto gap-6">
        <EnergySummary />
        <EnergyTempPot />
        <EnergyEfficiencyByHour />
        <EnergyEvolution />
      </div>
    </main>
  );
}
