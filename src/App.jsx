import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import MoneySnapshot from "./pages/MoneySnapshot";
import Tracks from "./pages/Tracks";
import FirstPropertyTrack from "./pages/FirstPropertyTrack";
import SimulationLab from "./pages/SimulationLab";
import PropertyStudio from "./pages/PropertyStudio";
import Library from "./pages/Library";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/money-snapshot" element={<MoneySnapshot />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route
            path="/tracks/first-property"
            element={<FirstPropertyTrack />}
          />
          <Route path="/simulation-lab" element={<SimulationLab />} />
          <Route
            path="/simulation-lab/property-vs-renting"
            element={<PropertyStudio />}
          />
          <Route path="/library" element={<Library />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
