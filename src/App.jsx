// src/App.jsx
import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import MoneySnapshot from './pages/MoneySnapshot';
import Tracks from './pages/Tracks';
import FirstPropertyTrack from './pages/FirstPropertyTrack';
import SimulationLab from './pages/SimulationLab';
import PropertyStudio from './pages/PropertyStudio';
import Library from './pages/Library';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login page - no layout */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected pages - require login */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/money-snapshot" element={
          <ProtectedRoute>
            <Layout>
              <MoneySnapshot />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/tracks" element={
          <ProtectedRoute>
            <Layout>
              <Tracks />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/tracks/first-property" element={
          <ProtectedRoute>
            <Layout>
              <FirstPropertyTrack />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/simulation-lab" element={
          <ProtectedRoute>
            <Layout>
              <SimulationLab />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/simulation-lab/property-vs-renting" element={
          <ProtectedRoute>
            <Layout>
              <PropertyStudio />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/library" element={
          <ProtectedRoute>
            <Layout>
              <Library />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;