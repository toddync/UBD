import React from "react";
import ContrastIcon from "../assets/icons/contrast.svg";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-gray-800 px-6 py-4 h-16 sticky top-0 left-0 w-full md:hidden">
      <h1 className="font-bold text-xl text-white">Atividade AV2</h1>
      <button className="text-white">
        <img src={ContrastIcon} alt="Toggle Contrast" className="h-6 w-6" />
      </button>
    </header>
  );
}
