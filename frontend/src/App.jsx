import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app.css";

/* Layout */
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import BottomNavigationBar from "./components/layout/BottomNavigationBar";

/* Páginas */
import Home from "./pages/Home";
import Energia from "./pages/Energia";
import Saude from "./pages/Saude";

function App() {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/energia" element={<Energia />} />
          <Route path="/saude" element={<Saude />} />
        </Routes>

        <BottomNavigationBar />
      </Router>
    </>
  );
}

export default App;
