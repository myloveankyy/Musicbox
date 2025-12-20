import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Video, Music, Instagram, Youtube } from 'lucide-react';

const Hero = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="relative pt-32 pb-12 px-4 flex flex-col items-center text-center">
      
      {/* BADGE */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-white/60 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] mb-8 backdrop-blur-sm"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">V5.0 Engine Live</span>
      </motion.div>

      {/* HEADLINE */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6 text-balance max-w-4xl"
      >
        The <span className="shine-text">Operating System</span> <br/>
        for your media.
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg md:text-xl text-slate-500 font-medium max-w-xl mx-auto mb-12 leading-relaxed"
      >
        Extract audio, video, and metadata from any platform. <br className="hidden md:block"/>
        Beautifully simple. Completely free.
      </motion.p>

      {/* THE MAGNETIC INPUT */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        className="relative w-full max-w-2xl group z-20"
      >
        {/* Glowing Halo on Focus */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 rounded-3xl blur opacity-20 transition duration-1000 group-hover:opacity-40 ${isFocused ? 'opacity-60 duration-200' : ''}`}></div>
        
        <div className="relative flex items-center bg-white/80 backdrop-blur-xl p-2 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 transition-transform duration-300 hover:scale-[1.01]">
          
          <div className="pl-4 pr-3 text-slate-400">
            <Search size={22} strokeWidth={2.5} />
          </div>
          
          <input 
            type="text" 
            placeholder="Paste a link from anywhere..." 
            className="flex-1 h-14 bg-transparent outline-none text-lg font-medium text-slate-900 placeholder:text-slate-400/80"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          
          <button className="h-12 px-6 bg-[#0a0a0a] text-white rounded-2xl font-semibold hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-slate-900/10">
            Get <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>

      {/* PLATFORM ICONS (Minimal) */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="mt-10 flex items-center gap-6"
      >
        {[
            { icon: Youtube, label: "YouTube" }, 
            { icon: Instagram, label: "Instagram" }, 
            { icon: Video, label: "TikTok" },
            { icon: Music, label: "Spotify" }
        ].map((p, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-transparent hover:border-slate-200 hover:bg-white/50 transition-all cursor-default group">
                <p.icon size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors"/>
                <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600 transition-colors">{p.label}</span>
            </div>
        ))}
      </motion.div>

    </section>
  );
};

export default Hero;