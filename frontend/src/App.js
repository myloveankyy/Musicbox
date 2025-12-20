/* --- frontend/src/App.js --- */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- PAGE IMPORTS ---
import Landing from './pages/Landing'; 
import Library from './pages/Library'; // Now Public-facing
import ToolPage from './pages/ToolPage'; // Now Public-facing
import AuthPages from './pages/AuthPages';
import Dashboard from './pages/Dashboard'; 

// --- PROTECTED ROUTE LOGIC ---
// Only strict User Data (Dashboard/Settings) remains locked
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC: Marketing */}
        <Route path="/" element={<Landing />} />

        {/* PUBLIC: Authentication */}
        <Route path="/login" element={<AuthPages />} />

        {/* PUBLIC: The Arsenal (Bento Grid) 
            Logic inside Library.js handles Guest vs User view 
        */}
        <Route path="/tools" element={<Library />} />

        {/* PUBLIC (Freemium): The Extraction Engine 
            Logic inside ToolPage.js handles the 1-File Limit
        */}
        <Route path="/tools/:slug" element={<ToolPage />} />

        {/* PROTECTED: User History & Account */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;