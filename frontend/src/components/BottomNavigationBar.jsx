import React from "react";
import HomeIcon from "../assets/icons/home.svg";
import FlashOnIcons from "../assets/icons/flash_on.svg";
import HeartIcon from "../assets/icons/heart.svg";

export default function BottomNavigationBar() {
  return (
    <nav className="flex justify-center h-16 items-center sticky bottom-0 left-0 w-full bg-gray-800 p-4 text-white md:hidden gap-16">
      <NavigationItem icon={HomeIcon} label="Início" />
      <NavigationItem icon={FlashOnIcons} label="Energia" />
      <NavigationItem icon={HeartIcon} label="Saúde" />
    </nav>
  );
}

function NavigationItem({ icon, label }) {
  return (
    <div className="flex flex-col items-center">
      <img src={icon} alt={label} className="h-6 w-6" />
      <span className="text-sm text-gray-200">{label}</span>
    </div>
  );
}
