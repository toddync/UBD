import React from "react";

export default function Sidebar() {
  return (
    <aside className="flex-col bg-gray-800 text-white w-64 min-h-screen sticky top-0 left-0 p-4 hidden md:flex">
      <nav className="">
        <h2 className="text-2xl font-bold">Sidebar</h2>
      </nav>
    </aside>
  );
}
