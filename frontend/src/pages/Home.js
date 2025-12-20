import React, { useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useMotionTemplate, 
  useMotionValue
} from 'framer-motion';
import { 
  Zap, ArrowRight, Check, Activity, 
  ShieldAlert, Server, Database, Globe, 
  Copy, Code2, Github
} from 'lucide-react';

// --- IMPORTS ---
import Hero from '../components/Hero';
import BentoGrid from '../components/BentoGrid';

// --- 0. UTILS & HOOKS ---
function useMousePosition() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return { mouseX, mouseY, handleMouseMove };
}

// --- 1. GLOBAL ATMOSPHERE ---
const GlobalOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
    {/* Noise Grain */}
    <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)"/>
      </svg>
    </div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)]" />
  </div>
);

const BackgroundGrid = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
     <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
     <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
  </div>
);

// --- 2. COMMAND HEADER ---
const FloatingCommand = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const prev = scrollY.getPrevious();
      setVisible(!(latest > prev && latest > 150));
    });
  }, [scrollY]);

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 }
      }}
      animate={visible ? "visible" : "hidden"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-6 inset-x-0 mx-auto max-w-fit z-50"
    >
      <div className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-full ring-1 ring-black/5">
        <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
           <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white shadow-lg">
              <Zap size={14} fill="currentColor" />
           </div>
           <span className="hidden md:block font-bold text-sm tracking-tight text-slate-900">MusicBox</span>
        </div>
        <nav className="flex items-center gap-1 md:gap-2 px-2">
           {['Specs', 'Engine', 'API'].map((item) => (
              <button key={item} className="px-3 py-1.5 text-[11px] font-bold text-slate-500 hover:text-black hover:bg-slate-100 rounded-full transition-all uppercase tracking-widest">
                {item}
              </button>
           ))}
        </nav>
        <div className="pl-2 border-l border-slate-200">
           <button className="group relative px-5 py-2 bg-black text-white text-[11px] font-bold rounded-full overflow-hidden shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative z-10 flex items-center gap-2">
                 Launch <ArrowRight size={12} />
              </span>
           </button>
        </div>
      </div>
    </motion.header>
  );
};

// --- 3. SPEC SHEET 2.0 ---
const SpecCard = ({ label, value, sub, delay }) => {
  const { mouseX, mouseY, handleMouseMove } = useMousePosition();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className="group relative border-r border-b border-slate-200/60 py-16 px-8 overflow-hidden bg-white/40 backdrop-blur-sm cursor-crosshair hover:bg-white/80 transition-colors duration-500"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.08), transparent 80%)`,
        }}
      />
      <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
        <div className="flex justify-between items-start">
           <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest border border-slate-200 px-2 py-1 rounded-md">{label}</span>
           <Activity size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
        </div>
        <div>
           <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2 group-hover:translate-x-2 transition-transform duration-300">
             {value}
           </h3>
           <p className="text-xs font-medium text-slate-400 group-hover:text-blue-600 transition-colors uppercase tracking-widest flex items-center gap-2">
             <div className="w-1 h-1 bg-current rounded-full" /> {sub}
           </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out" />
    </motion.div>
  );
};

const SpecSheet = ({ totalDownloads }) => {
  return (
    <div className="w-full border-y border-slate-200 bg-white/50 relative z-10">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-slate-200">
        <SpecCard label="Bitrate" value="320kbps" sub="Studio Quality" delay={0} />
        <SpecCard label="Resolution" value="4K HDR" sub="Lossless Pixel Density" delay={0.1} />
        {/* DYNAMIC DATA INJECTED HERE */}
        <SpecCard label="Processed" value={totalDownloads > 0 ? `${(totalDownloads/1000).toFixed(1)}k+` : "1.2k+"} sub="Files Extracted" delay={0.2} />
        <SpecCard label="Privacy" value="Zero Log" sub="RAM-Only Processing" delay={0.3} />
      </div>
    </div>
  );
};

// --- 4. PHYSICS OF SPEED ---
const PhysicsOfSpeed = () => {
  return (
    <section className="py-40 px-6 max-w-[1400px] mx-auto relative overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative z-10">
          <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 shadow-2xl"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>Benchmark_v4.2</span>
          </motion.div>
          <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">
            We are <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-gradient-x">
              Unreasonably
            </span> <br/>
            Fast.
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed max-w-lg mb-12 font-medium">
            Most downloaders screen-record the video. It's slow and loses quality.
            <br/><br/>
            <span className="text-slate-900 font-bold">We don't do that.</span> We surgically extract the raw stream directly from the CDN. No encoding. Just pure speed.
          </p>
          <div className="grid grid-cols-2 gap-4">
             {['No Popups', 'No Malware', 'No Waiting'].map((txt, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                   <div className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                      <ShieldAlert size={12} strokeWidth={3}/>
                   </div>
                   <span className="font-bold text-sm text-slate-700">{txt}</span>
                </div>
             ))}
          </div>
        </div>

        <div className="relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full" />
           <motion.div 
             initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
             whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative bg-white/60 backdrop-blur-2xl rounded-[3rem] p-10 border border-white shadow-[0_50px_100px_-20px_rgba(50,50,93,0.15)] overflow-hidden"
           >
              <div className="flex justify-between items-start mb-20 border-b border-slate-200/50 pb-6">
                 <div>
                    <h4 className="text-lg font-black text-slate-900 tracking-tighter">LATENCY TEST</h4>
                    <p className="text-xs text-slate-400 font-mono uppercase tracking-widest mt-1">Region: US-East-1</p>
                 </div>
                 <div className="text-right">
                    <div className="text-5xl font-mono font-black text-slate-900 tracking-tighter">0.1s</div>
                    <div className="text-[10px] font-bold text-green-600 uppercase tracking-widest bg-green-50 px-2 py-1 rounded inline-block mt-1">Turbo Mode Active</div>
                 </div>
              </div>

              <div className="h-80 flex items-end gap-12 relative px-4">
                 <div className="w-1/2 flex flex-col items-center justify-end h-full gap-4 group">
                    <div className="w-full relative h-full flex items-end">
                      <motion.div 
                          animate={{ height: ["35%", "37%", "34%", "35%"] }}
                          transition={{ repeat: Infinity, duration: 0.1, ease: "linear" }}
                          className="w-full bg-slate-200 rounded-t-2xl relative overflow-hidden"
                      >
                         <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000000_3px)] opacity-10 mix-blend-overlay"></div>
                      </motion.div>
                      <div className="absolute top-[60%] left-[-10%] bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 -rotate-12 opacity-0 group-hover:opacity-100 transition-opacity">ERROR_404</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Others</div>
                        <div className="font-mono text-[10px] text-red-400 mt-1">Buffering...</div>
                    </div>
                 </div>

                 <div className="w-1/2 flex flex-col items-center justify-end h-full gap-4">
                    <div className="w-full relative h-full flex items-end">
                      <motion.div 
                          initial={{ height: "0%" }}
                          whileInView={{ height: "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, type: "spring", bounce: 0.2 }}
                          className="w-full bg-slate-900 rounded-t-2xl relative shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden"
                      >
                          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)] z-20"></div>
                          <motion.div 
                             animate={{ top: ["100%", "-20%"] }}
                             transition={{ repeat: Infinity, duration: 2, ease: "circIn" }}
                             className="absolute left-0 w-full h-32 bg-gradient-to-t from-transparent via-blue-500/20 to-transparent skew-y-6"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
                      </motion.div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs font-bold text-slate-900 uppercase tracking-widest">MusicBox</div>
                        <div className="font-mono text-[10px] text-green-600 mt-1">Done.</div>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- 5. LOGIC PIPELINE ---
const LogicPipeline = () => {
  return (
    <section className="py-32 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">
            The <span className="text-blue-600">Engine</span> Room.
          </h2>
          <p className="text-slate-500 max-w-md mx-auto font-medium">
            Visualizing the extraction pipeline. Pure engineering, no magic.
          </p>
        </div>
        <div className="relative grid md:grid-cols-3 gap-12">
           <div className="absolute top-[40px] left-[10%] w-[80%] hidden md:block z-0">
              <div className="h-[2px] bg-slate-200 w-full absolute top-0"></div>
              <motion.div 
                animate={{ x: ["0%", "100%"], opacity: [0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="h-[4px] w-[100px] bg-gradient-to-r from-transparent via-blue-600 to-transparent absolute -top-[1px] blur-[2px]"
              />
           </div>
           {[
             { title: "Link Parsing", icon: Globe, desc: "We strip tracking params and validate the origin." },
             { title: "Bitrate Hunting", icon: Server, desc: "Scanning manifest files for the highest audio stream." },
             { title: "Metadata Injection", icon: Database, desc: "ID3 tagging artist, cover art, and album data." },
           ].map((step, i) => (
             <motion.div 
               key={i}
               whileHover={{ y: -5 }}
               className="relative z-10 bg-white p-8 rounded-2xl border border-slate-200 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] text-center group"
             >
                <div className="w-20 h-20 mx-auto bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 mb-8 group-hover:bg-black group-hover:border-black group-hover:text-white transition-all duration-300 shadow-inner">
                   <step.icon size={32} strokeWidth={1.5} />
                </div>
                <div className="absolute top-8 right-8 text-xs font-mono text-slate-300">0{i+1}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{step.title}</h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">{step.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

// --- 6. DEVELOPER TERMINAL ---
const TerminalSection = () => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <section className="py-32 px-4 max-w-[1280px] mx-auto">
      <div className="bg-[#0A0A0A] rounded-[40px] overflow-hidden relative border border-white/10 shadow-2xl group">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] pointer-events-none rounded-full" />
        <div className="grid lg:grid-cols-2 gap-0">
          <div className="p-12 md:p-20 flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center gap-2 mb-6">
               <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
               <span className="text-blue-500 font-mono text-xs uppercase tracking-widest">API v1.0 Public</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
              Steal our <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Technology.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md font-medium">
              Building a scraper is a nightmare. Cloudflare bans, CAPTCHAs, IP rotation...
              <br/><br/>
              Skip the headache. Use our API.
            </p>
            <button className="w-fit px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-3">
               <Code2 size={20} /> Read Documentation
            </button>
          </div>

          <div className="bg-[#050505] border-l border-white/5 relative flex flex-col h-full min-h-[500px]">
             <div className="flex items-center bg-[#0A0A0A] border-b border-white/5 px-4">
                <div className="px-4 py-3 bg-[#050505] border-t-2 border-blue-500 text-xs text-slate-300 font-mono flex items-center gap-2">
                   <div className="text-blue-400">JS</div> example.js
                </div>
                <div className="px-4 py-3 text-xs text-slate-600 font-mono">response.json</div>
             </div>
             <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto">
                <div className="flex justify-between items-start mb-4">
                   <span className="text-slate-500">// Extract audio in 3 lines of code</span>
                   <button onClick={handleCopy} className="text-xs flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
                      {copied ? <Check size={14} className="text-green-500"/> : <Copy size={14}/>} {copied ? "Copied" : "Copy"}
                   </button>
                </div>
                <div className="text-slate-300">
                   <div><span className="text-purple-400">const</span> response <span className="text-purple-400">=</span> <span className="text-purple-400">await</span> fetch<span className="text-yellow-300">(</span><span className="text-green-400">'https://api.musicbox.life/v1/extract'</span>, <span className="text-yellow-300">{'{'}</span></div>
                   <div className="pl-4"><span className="text-blue-400">method:</span> <span className="text-green-400">'POST'</span>,</div>
                   <div className="pl-4"><span className="text-blue-400">body:</span> JSON.<span className="text-yellow-200">stringify</span><span className="text-purple-300">(</span><span className="text-purple-300">{'{'}</span></div>
                   <div className="pl-8"><span className="text-blue-400">url:</span> <span className="text-green-400">'https://youtu.be/dQw4w9WgXcQ'</span>,</div>
                   <div className="pl-8"><span className="text-blue-400">format:</span> <span className="text-green-400">'mp3'</span></div>
                   <div className="pl-4"><span className="text-purple-300">{'}'}</span><span className="text-purple-300">)</span></div>
                   <div><span className="text-yellow-300">{'}'}</span><span className="text-yellow-300">)</span>;</div>
                   <br/>
                   <div><span className="text-purple-400">const</span> data <span className="text-purple-400">=</span> <span className="text-purple-400">await</span> response.<span className="text-yellow-200">json</span><span className="text-yellow-300">()</span>;</div>
                   <div>console.<span className="text-yellow-200">log</span><span className="text-yellow-300">(</span>data.download_url<span className="text-yellow-300">)</span>;</div>
                </div>
                <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-4 bg-blue-500 inline-block align-middle ml-1"/>
             </div>
             <div className="mt-auto bg-blue-600 text-white text-[10px] font-bold px-4 py-1 flex justify-between items-center">
                <span>NORMAL</span><span>Ln 12, Col 44</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 7. MONOLITH FOOTER ---
const MonolithFooter = () => (
  <footer className="bg-white pt-40 pb-12 border-t border-slate-200 relative overflow-hidden">
    <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
       <h1 className="text-[20vw] font-black text-slate-900 leading-none tracking-tighter text-center select-none">SYSTEM</h1>
    </div>
    <div className="max-w-[1280px] mx-auto px-6 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
         <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white shadow-xl">
                  <Zap size={20} fill="currentColor"/>
               </div>
               <span className="font-black text-2xl tracking-tighter text-slate-900">MusicBox.</span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed font-bold">Engineered by Ankyy Empire. <br/>Serving 1M+ tracks since 2025.</p>
         </div>
         {[ { head: "Modules", links: ["Instagram Reels", "TikTok No-Watermark", "YouTube 4K"] }, { head: "Legal", links: ["Privacy Policy", "Terms of Service", "DMCA"] } ].map((section, i) => (
            <div key={i}>
              <h5 className="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">{section.head}</h5>
              <ul className="space-y-4 text-sm font-bold text-slate-400">
                 {section.links.map(link => (<li key={link} className="hover:text-black hover:translate-x-1 transition-all cursor-pointer">{link}</li>))}
              </ul>
            </div>
         ))}
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 gap-6">
         <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">© 2025 ANKYY EMPIRE. ALL RIGHTS RESERVED.</span>
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
               <span className="text-[10px] font-bold tracking-wide uppercase text-slate-500">System Operational</span>
            </div>
            <Github size={16} className="text-slate-400 hover:text-black cursor-pointer transition-colors"/>
         </div>
      </div>
    </div>
  </footer>
);

// --- MAIN PAGE ---
const Home = () => {
  const [stats, setStats] = useState({ totalDownloads: 0 });

  useEffect(() => {
    // --- CONNECT TO BRAIN ---
    fetch('http://localhost:5000/api/stats')
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          setStats({ totalDownloads: data.totalDownloads });
        }
      })
      .catch(err => {
        // Silent failure (Stats module offline)
        // We keep defaults
      });
  }, []);

  return (
    <div className="min-h-screen relative bg-[#F8FAFC] selection:bg-blue-500 selection:text-white font-sans overflow-x-hidden">
      <GlobalOverlay />
      <BackgroundGrid />
      <FloatingCommand />
      <main className="relative z-10 pt-32">
        <div className="mb-12"><Hero /></div>
        <div className="relative z-20 mb-20"><BentoGrid /></div>
        
        {/* Pass Stats to SpecSheet */}
        <SpecSheet totalDownloads={stats.totalDownloads} />
        
        <PhysicsOfSpeed />
        <LogicPipeline />
        <TerminalSection />
        <MonolithFooter />
      </main>
    </div>
  );
};

export default Home;