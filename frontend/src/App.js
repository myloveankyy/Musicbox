/* --- frontend/src/App.js (MusicBox Standalone) --- */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MusicBoxPage from './pages/MusicBoxPage';

// We removed HomePage, Blog, and Articles. 
// This domain does ONE thing: MusicBox.

function App() {
  return (
    <Router>
      <Routes>
        {/* ROOT PATH now loads the Tool directly */}
        <Route path="/" element={<MusicBoxPage />} />
        
        {/* Redirect any unknown paths back to the tool */}
        <Route path="*" element={<MusicBoxPage />} />
      </Routes>
    </Router>
  );
}

export default App;