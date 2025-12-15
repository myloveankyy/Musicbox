import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MusicBoxPage from './pages/MusicBoxPage';
import AuthPages from './pages/AuthPages';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<MusicBoxPage />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<AuthPages />} />
        <Route path="/signup" element={<AuthPages />} />
        
        {/* Private Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Fallback */}
        <Route path="*" element={<MusicBoxPage />} />
      </Routes>
    </Router>
  );
}

export default App;