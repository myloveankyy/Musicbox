import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, Youtube, Instagram, Music, 
  Image, Mic, Scissors, Type, CloudLightning,
  Play, Zap, Wand2, Layers
} from 'lucide-react';

// --- COMPONENTS ---

const Card = ({ children, className, to, delay = 0, variant = "glass" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`relative group overflow-hidden rounded-[40px] transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/40 ${className} ${
      variant === 'dark' 
        ? 'bg-[#0A0A0A] border border-white/10 text-white' 
        : 'bg-white border border-slate-100'
    }`}
  >
    <Link to={to || '#'} className="block h-full w-full p-8 relative z-20">
      {children}
    </Link>
    
    {/* Texture Overlay */}
    <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none z-10"></div>
    
    {/* Hover Glow */}
    <div className={`absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none ${variant === 'dark' ? 'via-white/5' : 'via-blue-500/5'}`} />
  </motion.div>
);

const IconBadge = ({ children, color = "bg-slate-900", textColor="text-white", size = "md" }) => (
  <div className={`${size === "sm" ? "w-12 h-12" : "w-16 h-16"} rounded-2xl flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] shadow-black/5 ${color} ${textColor} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out`}>
    {children}
  </div>
);

// --- BENTO LAYOUT ---

const BentoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[auto] gap-6 max-w-[1280px] mx-auto px-6 pb-32">
      
      {/* 1. YOUTUBE (Hero - 2x2) */}
      <Card to="/tools/youtube" className="md:col-span-2 md:row-span-2 min-h-[420px] relative overflow-hidden bg-gradient-to-br from-white to-slate-50">
        <div className="flex flex-col h-full justify-between relative z-20">
          <div className="flex justify-between items-start">
            <IconBadge color="bg-[#FF0000]">
              <Youtube size={32} fill="currentColor" />
            </IconBadge>
            <div className="px-4 py-1.5 bg-white/60 backdrop-blur-md border border-white/60 rounded-full text-[11px] font-bold text-slate-500 uppercase tracking-widest shadow-sm">
               Flagship V5
            </div>
          </div>
          
          <div className="space-y-4 max-w-md mt-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tighter leading-[0.9]">
              YouTube <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Studio.</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              The industry standard. 4K Video, Shorts & High-Fidelity Audio extraction in milliseconds.
            </p>
          </div>
        </div>
        
        {/* Cinematic Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-red-500/10 to-transparent blur-[100px] pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
        <Play size={300} className="absolute -bottom-12 -right-12 text-slate-900/[0.03] rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-1000 ease-out" fill="currentColor" />
      </Card>

      {/* 2. AI ENGINE (Dark Mode - 1x1) */}
      <Card to="/tools/ai" delay={0.1} variant="dark" className="md:col-span-1 md:row-span-1 min-h-[240px] bg-[#0A0A0A]">
         <div className="h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <IconBadge color="bg-white/10" textColor="text-white" size="sm">
                <Wand2 size={22} />
              </IconBadge>
              <ArrowUpRight className="text-white/40 group-hover:text-white transition-colors" size={22}/>
            </div>
            <div>
               <h3 className="text-2xl font-bold text-white mb-1">AI Engine</h3>
               <p className="text-sm text-gray-400 font-medium">Auto-Captions & Smart Metadata.</p>
            </div>
         </div>
         {/* Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/30 rounded-full blur-[50px] group-hover:bg-indigo-500/50 transition-colors"></div>
      </Card>

      {/* 3. UTILITIES DECK (Technical Look - 1x1) */}
      <Card to="/tools/utils" delay={0.15} className="md:col-span-1 md:row-span-1 bg-slate-50 border-slate-200">
         <div className="h-full flex flex-col justify-between">
             <div className="grid grid-cols-2 gap-3">
                {[Image, Mic, Scissors, Type].map((Icon, i) => (
                    <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-black group-hover:scale-105 transition-all">
                        <Icon size={18} />
                    </div>
                ))}
             </div>
             <div>
               <h3 className="text-xl font-bold text-slate-900 mt-4">Toolkit</h3>
               <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Edit & Enhance</p>
            </div>
         </div>
      </Card>

      {/* 4. INSTAGRAM (Vibrant - 1x1) */}
      <Card to="/tools/instagram" delay={0.2} className="md:col-span-1 md:row-span-1 min-h-[240px]">
         <div className="h-full flex flex-col justify-between">
            <IconBadge color="bg-gradient-to-tr from-purple-600 to-pink-500" size="sm">
              <Instagram size={22} />
            </IconBadge>
            <div>
               <h3 className="text-2xl font-bold text-slate-900">Reels</h3>
               <p className="text-sm text-slate-500 font-medium">Downloader</p>
            </div>
         </div>
      </Card>

      {/* 5. TIKTOK (Clean - 1x1) */}
      <Card to="/tools/tiktok" delay={0.25} className="md:col-span-1 md:row-span-1 min-h-[240px]">
         <div className="h-full flex flex-col justify-between">
            <IconBadge color="bg-black" size="sm">
              <Music size={22} />
            </IconBadge>
            <div>
               <h3 className="text-2xl font-bold text-slate-900">TikTok</h3>
               <p className="text-sm text-slate-500 font-medium">No Watermark</p>
            </div>
         </div>
      </Card>

      {/* 6. SPOTIFY (Wide - 2x1) */}
      <Card to="/tools/spotify" delay={0.3} className="md:col-span-2 md:row-span-1 bg-gradient-to-r from-[#1DB954]/10 to-transparent">
         <div className="h-full flex items-center justify-between px-2">
            <div className="flex items-center gap-6">
                <IconBadge color="bg-[#1DB954]" size="md">
                  <CloudLightning size={28} />
                </IconBadge>
                <div>
                   <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Spotify</h3>
                   <p className="text-slate-500 font-medium">320kbps MP3 Converter</p>
                </div>
            </div>
            <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300">
               <ArrowUpRight size={20} />
            </div>
         </div>
      </Card>

    </div>
  );
};

export default BentoGrid;