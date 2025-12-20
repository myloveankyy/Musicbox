/* --- frontend/src/pages/Library.js --- */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Disc, Power, Cpu, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import BentoGrid from '../components/BentoGrid'; 

const Library = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: 'GUEST' });
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Init Data & Clock
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser.username) setUser(storedUser);
    } catch (e) { console.error("Identity Corrupted"); }

    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    // "Eject" Animation logic could go here
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="relative min-h-screen w-full bg-[#E5E5E5] text-slate-900 font-sans overflow-hidden selection:bg-black selection:text-white">
      
      {/* --- AMBIENT PHYSICS LAYER --- */}
      {/* Liquid Blobs that float behind the glass */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-slate-300/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-gray-300/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-slate-200/50 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000" />
        {/* Grain Overlay for that "Analog" feel */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* --- HUD HEADER (The "Cockpit") --- */}
      <header className="relative z-50 px-6 py-6 flex items-center justify-between">
        
        {/* Left: System Status */}
        <div className="flex items-center gap-4">
          <div className="group relative flex items-center justify-center w-12 h-12 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl shadow-sm transition-all hover:scale-105 hover:bg-white/60">
            <Disc className="text-slate-900 animate-spin-slow" size={20} />
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">System Status</span>
            <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold tracking-tight text-slate-900">OPERATIONAL</span>
            </div>
          </div>
        </div>

        {/* Center: Time (Hidden on mobile) */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <span className="font-mono text-xs text-slate-400 tracking-widest">{time}</span>
        </div>

        {/* Right: User Identity & Eject */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/50 rounded-full shadow-sm">
             <div className="w-2 h-2 rounded-full bg-slate-900" />
             <span className="text-xs font-bold uppercase tracking-wide text-slate-800">
               {user.username}
             </span>
             <span className="hidden sm:inline text-[10px] font-mono text-slate-400 border-l border-slate-300 pl-3">
               ID: {user._id ? user._id.slice(-4) : 'NULL'}
             </span>
          </div>

          <button 
            onClick={handleLogout}
            className="group relative flex items-center justify-center w-10 h-10 bg-slate-900 rounded-full text-white shadow-lg hover:bg-black transition-all hover:scale-110 active:scale-95"
            title="EJECT SESSION"
          >
            <Power size={16} />
          </button>
        </div>
      </header>

      {/* --- MAIN INTERFACE --- */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24">
        
        {/* Typographic Hero */}
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 md:mb-24"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-900/10 pb-8">
                <div>
                    <span className="block font-mono text-xs text-slate-500 mb-2 uppercase tracking-widest">
                        // Protocol Selection
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                        THE<br />ARSENAL
                    </h1>
                </div>
                
                <div className="flex flex-col items-start md:items-end max-w-sm">
                    <p className="text-sm font-medium text-slate-500 leading-relaxed text-left md:text-right">
                        Deploy extraction modules to process media streams. 
                        <span className="block text-slate-900 font-bold mt-1">
                            Current RAM Usage: <span className="font-mono">LOW</span>
                        </span>
                    </p>
                </div>
            </div>
        </motion.div>
        
        {/* The Grid Container */}
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "circOut" }}
            className="relative"
        >
            {/* Decor Elements */}
            <div className="absolute -top-6 right-0 flex gap-4 text-slate-400">
                <Cpu size={14} />
                <Radio size={14} />
            </div>

            <BentoGrid />
            
        </motion.div>

      </main>

      {/* --- FOOTER DECOR --- */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block">
        <div className="font-mono text-[10px] text-slate-400 vertical-rl transform rotate-180 opacity-50">
            MUSICBOX.LIFE v8.0 [STABLE]
        </div>
      </div>

    </div>
  );
};

export default Library;