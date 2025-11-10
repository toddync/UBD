import React from "react";
import "./index.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Energia from "./pages/Energia";
import Saude from "./pages/Saude";
import BottomNavigationBar from "./components/BottomNavigationBar";

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Home />
      <BottomNavigationBar />
    </>
  );
}

export default App;
