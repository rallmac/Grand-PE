import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landing";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import PlantsPage from "./pages/plants";
import SolarPage from "./pages/solar";
import TechPage from "./pages/tech";
import TranslatePage from "./pages/translate";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/plants" element={<PlantsPage />} />
        <Route path="/solar" element={<SolarPage />} />
        <Route path="/tech" element={<TechPage />} />
        <Route path="/translate" element={<TranslatePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;