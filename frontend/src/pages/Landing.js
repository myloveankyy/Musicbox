/* --- frontend/src/pages/Landing.js --- */
/* THEME: WHITE MONOLITH V8.1 - MASS MARKET EDITION */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, Disc, Mic, Zap, Shield, Globe, 
  AlertTriangle, FileAudio, FileVideo, Terminal 
} from 'lucide-react';

// --- PHYSICS COMPONENT: MAGNETIC LIQUID BUTTON ---
const MagneticButton = ({ children, onClick, variant = "black" }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 }); 
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const baseClass = "relative overflow-hidden px-10 py-4 rounded-lg font-bold uppercase tracking-widest text-xs transition-transform ease-out duration-100 flex items-center gap-3 border z-10";
  
  const variants = {
    black: "bg-mono-black text-white border-transparent hover:text-white group",
    white: "bg-white text-mono-black border-gray-200 hover:border-mono-black group"
  };

  return (
    <motion.button
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      className={`${baseClass} ${variants[variant]}`}
    >
      <span className="relative z-20 flex items-center gap-2">{children}</span>
      <div className={`absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-10 ${variant === 'black' ? 'bg-mono-accent' : 'bg-mono-black text-white'}`} />
    </motion.button>
  );
};

// --- 3D CUBE HERO COMPONENT (QUAD POSTER CONFIG) ---
const MusicCube = ({ scrollY }) => {
  const rotateX = useTransform(scrollY, [0, 800], [15, 360]);
  const rotateY = useTransform(scrollY, [0, 800], [-15, 360]);
  
  return (
    <div className="scene">
      <motion.div className="cube" style={{ rotateX, rotateY }}>
        <div className="cube-face face-front overflow-hidden p-0 border-0"><img src="https://cdn.displate.com/artwork/857x1200/2025-01-10/b5c0c67d-81d0-43e0-a45d-72712eaa8a67.jpg" alt="Art 1" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"/></div>
        <div className="cube-face face-right overflow-hidden p-0 border-0"><img src="https://media.indulgexpress.com/indulgexpress%2F2025-07-17%2Fcptmy20j%2FYo-Yo-Honey-Singh" alt="Art 2" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"/></div>
        <div className="cube-face face-back overflow-hidden p-0 border-0"><img src="https://w0.peakpx.com/wallpaper/948/276/HD-wallpaper-starboy-edit-aesthetic-berry-berrykuda-iphone-music-the-weeknd.jpg" alt="Art 3" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"/></div>
        <div className="cube-face face-left overflow-hidden p-0 border-0"><img src="https://wallpapers.com/images/hd/yo-yo-honey-singh-satan-song-8yd5l7xi20di2110.jpg" alt="Art 4" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"/></div>
        <div className="cube-face face-top flex items-center justify-center"><div className="w-16 h-16 bg-mono-accent rounded-full animate-pulse"></div></div>
        <div className="cube-face face-bottom bg-mono-black text-white text-xs font-mono flex items-center justify-center">ANKYY</div>
      </motion.div>
    </div>
  );
};

// --- COMPONENTS ---
const Ticker = ({ text, reverse }) => (
  <div className="overflow-hidden py-4 bg-mono-black text-white border-y border-white/10">
    <div className={`flex whitespace-nowrap gap-12 font-mono text-sm uppercase font-bold tracking-widest ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
      {[...Array(10)].map((_, i) => (
        <span key={i} className="flex items-center gap-4">
          <span className="text-mono-accent">///</span> {text}
        </span>
      ))}
    </div>
  </div>
);

const TerminalWindow = () => {
  const [lines, setLines] = useState(["> CONNECTING...", "> BYPASSING REGION LOCK...", "> EXTRACTING AUDIO..."]);
  useEffect(() => {
    const interval = setInterval(() => {
      const newLines = ["> REMOVING ADS...", "> INJECTING METADATA...", "> TRACKERS REMOVED...", "> READY."];
      setLines(prev => [...prev.slice(-4), newLines[Math.floor(Math.random() * newLines.length)]]);
    }, 800);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full max-w-lg bg-mono-black rounded-xl p-6 font-mono text-xs text-mono-code shadow-2xl relative overflow-hidden border border-gray-800">
       <div className="absolute inset-0 scanline opacity-20 pointer-events-none"></div>
       <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
       </div>
       <div className="space-y-2">
          {lines.map((line, i) => <div key={i} className="opacity-80">{line}</div>)}
          <div className="animate-pulse">_</div>
       </div>
    </div>
  );
};

const ReceiptCard = () => (
  <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-8 w-[280px] shadow-xl border border-gray-200 font-mono text-xs relative">
     <div className="text-center border-b-2 border-dashed border-gray-300 pb-4 mb-4">
        <h3 className="font-bold text-lg uppercase">Stream Service</h3><p>Monthly Invoice</p>
     </div>
     <div className="space-y-2 mb-4">
        <div className="flex justify-between"><span>Subscription</span><span>$12.99</span></div>
        <div className="flex justify-between"><span>Ad-Free</span><span>$5.00</span></div>
     </div>
     <div className="border-t-2 border-gray-900 pt-4 flex justify-between font-bold text-lg"><span>TOTAL</span><span>$17.99/mo</span></div>
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 border-4 border-red-600 text-red-600 px-4 py-2 text-2xl font-black opacity-80">RENT</div>
  </motion.div>
);

const MusicBoxCard = () => (
  <motion.div whileHover={{ scale: 1.05 }} className="bg-mono-black text-white p-8 w-[280px] shadow-2xl font-mono text-xs relative z-10">
     <div className="text-center border-b-2 border-dashed border-gray-700 pb-4 mb-4">
        <h3 className="font-bold text-lg uppercase text-mono-accent">MusicBox OS</h3><p>Extraction</p>
     </div>
     <div className="space-y-2 mb-4 text-gray-400">
        <div className="flex justify-between"><span>Quality</span><span>MAX</span></div>
        <div className="flex justify-between"><span>Ads</span><span>NONE</span></div>
     </div>
     <div className="border-t-2 border-white pt-4 flex justify-between font-bold text-lg"><span>TOTAL</span><span className="text-mono-code">$0.00</span></div>
  </motion.div>
);

// --- HERO SECTION ---
const Hero = ({ navigate, scrollY }) => (
  <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 pt-20 relative overflow-hidden">
    
    {/* TEXT SIDE */}
    <div className="flex-1 z-10">
      <div className="inline-block px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-8">
         <span className="text-[10px] font-bold uppercase tracking-[0.2em]">MusicBox OS v8.1</span>
      </div>

      <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-mono-text">
        THE BLACK BOX<br/>
        <span className="text-mono-silver">FOR AUDIO.</span>
      </h1>
      
      <p className="text-xl font-medium text-gray-500 max-w-lg mb-12 leading-tight">
        Streaming is renting. Downloading is owning.<br/> 
        Don't let the algorithm be your DJ. <br/>
        <span className="text-mono-accent">Take back your library.</span>
      </p>

      {/* FIXED BUTTONS: Direct to Tools */}
      <div className="flex flex-col md:flex-row gap-4">
         <MagneticButton variant="black" onClick={() => navigate('/tools')}>
            Start Downloading <ArrowRight size={14}/>
         </MagneticButton>
         
         <MagneticButton variant="white" onClick={() => navigate('/login')}>
             My Account
         </MagneticButton>
      </div>
    </div>

    {/* CUBE SIDE */}
    <div className="flex-1 flex justify-center items-center h-[500px]">
       <MusicCube scrollY={scrollY} />
    </div>

    <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
  </section>
);

// --- REALITY CHECK ---
const RealityCheck = () => {
   const ref = useRef(null);
   const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
   
   const xLeft = useTransform(scrollYProgress, [0, 1], [-200, 0]);
   const xRight = useTransform(scrollYProgress, [0, 1], [200, 0]);
   const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
   const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
 
   return (
     <section ref={ref} className="py-40 bg-gray-100 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="text-center mb-20 relative z-10">
           <motion.div style={{ opacity }} className="inline-block px-3 py-1 border border-black/10 rounded-full mb-4 bg-white">
             <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">System Comparison</span>
           </motion.div>
           <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-mono-text">The Reality Check</h2>
           <p className="font-mono text-xs uppercase tracking-widest text-gray-500">Stop Renting. Start Owning.</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12 relative">
           <motion.div style={{ x: xLeft, opacity, scale }}><ReceiptCard /></motion.div>
           <motion.div style={{ scale: scrollYProgress, opacity }} className="text-6xl font-black text-mono-accent z-20 md:mx-4 my-8 md:my-0 shadow-xl bg-white w-24 h-24 rounded-full flex items-center justify-center border-4 border-gray-100">VS</motion.div>
           <motion.div style={{ x: xRight, opacity, scale }}><MusicBoxCard /></motion.div>
        </div>
     </section>
   );
 };

// --- OTHER SECTIONS ---
const GraveyardSection = () => (
  <section className="py-32 px-6 bg-mono-black text-white text-center relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
    <div className="max-w-4xl mx-auto relative z-10">
      <AlertTriangle size={64} className="mx-auto mb-8 text-mono-accent animate-pulse" />
      <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 uppercase leading-none">"Video Not<br/>Available."</h2>
      <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-12">Every day, millions of songs and videos are deleted. <span className="text-white font-bold">If you don't save it, you lose it.</span></p>
      <div className="inline-block border border-mono-accent text-mono-accent px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest">404 ERROR: FUTURE NOT FOUND</div>
    </div>
  </section>
);

const LiveExtraction = () => (
  <section className="py-32 px-6 bg-white flex flex-col items-center">
     <div className="mb-12 text-center">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Under The Hood</h2>
        <p className="font-mono text-xs uppercase tracking-widest text-gray-500">Direct Stream Extraction. Zero Quality Loss.</p>
     </div>
     <div className="flex flex-col md:flex-row items-center gap-12">
        <TerminalWindow />
        <div className="space-y-6 max-w-xs">
           <p className="text-lg font-bold leading-tight">We deliver the raw file directly from the source server.</p>
           <p className="text-sm text-gray-500">No re-encoding. Just the bits.</p>
        </div>
     </div>
  </section>
);

const AISection = ({ navigate }) => (
  <section className="py-32 px-6 bg-mono-black text-white relative overflow-hidden">
     <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
     <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
           <div className="inline-block px-3 py-1 border border-white/20 rounded mb-6 text-[10px] font-mono uppercase text-mono-code">New Feature</div>
           <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">IT LISTENS<br/>SO YOU DON'T<br/>HAVE TO.</h2>
           <p className="text-gray-400 text-lg mb-8 leading-relaxed">Our <strong>Whisper AI</strong> engine listens to podcasts and lectures for you. Get a full transcript in seconds.</p>
           <button onClick={() => navigate('/tools/ai')} className="border border-white px-8 py-3 font-bold uppercase text-xs hover:bg-white hover:text-black transition-colors">Try AI Tools</button>
        </div>
        <div className="relative h-[400px] border border-white/20 rounded-xl bg-white/5 backdrop-blur flex items-center justify-center p-8">
           <div className="space-y-4 w-full">
              <div className="flex gap-4"><div className="w-8 h-8 rounded-full bg-mono-accent flex items-center justify-center"><Mic size={14}/></div><div className="flex-1 bg-white/10 rounded p-4 text-xs font-mono text-gray-300">"Welcome to the future of audio..."</div></div>
              <div className="flex justify-center"><ArrowRight className="rotate-90 text-gray-600"/></div>
              <div className="flex gap-4"><div className="w-8 h-8 rounded-full bg-mono-code flex items-center justify-center text-black"><Terminal size={14}/></div><div className="flex-1 bg-mono-code/10 border border-mono-code/20 rounded p-4 text-xs font-mono text-mono-code">> TRANSCRIPT GENERATED<br/>> SUMMARY READY.</div></div>
           </div>
        </div>
     </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 bg-white border-t border-gray-200 text-center">
     <h2 className="text-9xl font-black tracking-tighter text-gray-100 uppercase select-none">MusicBox</h2>
     <div className="mt-[-40px] relative z-10">
        <p className="text-sm font-bold uppercase tracking-widest mb-8">Part of Ankyy Empire</p>
        <div className="flex justify-center gap-8 text-xs font-mono text-gray-500 uppercase">
           <a href="#" className="hover:text-black">Terms</a>
           <a href="#" className="hover:text-black">Privacy</a>
           <a href="#" className="hover:text-black">Status</a>
        </div>
     </div>
  </footer>
);

const Landing = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans selection:bg-mono-accent selection:text-white">
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-[#F5F5F7]/80 backdrop-blur-md">
         <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Disc size={20} className="text-mono-black animate-spin-slow" />
            <span className="font-bold text-sm tracking-tight uppercase">MusicBox</span>
         </div>
         <button onClick={() => navigate('/login')} className="text-xs font-bold uppercase tracking-widest border border-mono-black px-4 py-2 rounded hover:bg-mono-black hover:text-white transition-colors">
            Login / Register
         </button>
      </nav>

      <Hero navigate={navigate} scrollY={scrollY} />
      <Ticker text="NO ADS // 320KBPS // 4K VIDEO // NO LOGS //" />
      <RealityCheck />
      <GraveyardSection />
      <LiveExtraction />
      <AISection navigate={navigate} />
      <Ticker text="YOUR DATA // YOUR RULES // YOUR FILES //" reverse />
      <Footer />
    </div>
  );
};

export default Landing;