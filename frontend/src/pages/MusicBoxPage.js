import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, Globe, Shield, Zap, ChevronDown, Monitor, 
  Lock, X, ArrowRight, Star, BarChart, Server, Layers, HelpCircle,
  Twitter, Instagram
} from 'lucide-react';
import MusicBox from '../components/MusicBox';

// --- CONFIG ---
const API_URL = process.env.REACT_APP_API_URL || 'https://musicbox.life';

// --- HELPER: SPOTLIGHT CARD (Adaptive: Dark & Light Mode) ---
const SpotlightCard = ({ children, className = "", isDark }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => setOpacity(0);

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl backdrop-blur-sm transition-all duration-[2000ms]
        ${isDark 
          ? 'border-white/10 bg-[#0f172a]/50 hover:bg-[#0f172a]/80' 
          : 'border-slate-200 bg-white shadow-xl shadow-slate-200/50 hover:bg-slate-50'
        } border ${className}`}
    >
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{ 
          opacity, 
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)'}, transparent 40%)` 
        }}
      />
      <div className="relative h-full z-10">{children}</div>
    </div>
  );
};

// --- COMPONENT: BACKGROUND (Adaptive) ---
const Background = ({ isDark }) => (
  <div className={`fixed inset-0 z-0 transition-colors duration-[2000ms] ease-in-out ${isDark ? 'bg-[#020617]' : 'bg-[#f8fafc]'}`}>
    {/* Modern Gradient Orbs */}
    <div className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] animate-pulse transition-colors duration-[2000ms] ${isDark ? 'bg-blue-600/20' : 'bg-blue-400/20'}`}></div>
    <div className={`absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] animate-pulse transition-colors duration-[2000ms] ${isDark ? 'bg-purple-600/20' : 'bg-purple-400/20'}`} style={{ animationDelay: '2s' }}></div>
    
    {/* Grid Overlay - Inverts on light mode */}
    <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] transition-opacity duration-[2000ms] ${isDark ? 'opacity-[0.03]' : 'opacity-[0.05] invert'}`}></div>
    <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] transition-opacity duration-[2000ms] ${isDark ? 'opacity-100' : 'opacity-50'}`}></div>
  </div>
);

// --- COMPONENT: LIVE ACTIVITY PULSE ---
const LivePulse = ({ isDark }) => (
  <div className={`w-full border-y backdrop-blur-md py-2 overflow-hidden relative z-10 transition-colors duration-[2000ms]
    ${isDark ? 'bg-blue-900/10 border-white/5' : 'bg-blue-50/50 border-slate-200'}`}>
    <div className="flex animate-marquee whitespace-nowrap gap-12 text-[10px] font-mono uppercase tracking-widest items-center">
      {Array(5).fill("").map((_, i) => (
        <React.Fragment key={i}>
          <span className={`flex items-center gap-2 transition-colors duration-[2000ms] ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/> Session_84{i}: Stream analysis complete • Metadata parsed
          </span>
          <span className={isDark ? "text-gray-600" : "text-gray-300"}>|</span>
          <span className={`flex items-center gap-2 transition-colors duration-[2000ms] ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
            <Zap size={10}/> Latency: 12ms
          </span>
          <span className={isDark ? "text-gray-600" : "text-gray-300"}>|</span>
        </React.Fragment>
      ))}
    </div>
  </div>
);

// --- COMPONENT: HERO SECTION ---
const Hero = ({ onDownloadClick, isDark }) => (
  <section className="relative z-10 pt-24 pb-16 px-4 flex flex-col items-center text-center">
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto mb-10"
    >
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-6 transition-colors duration-[2000ms] cursor-default
        ${isDark 
          ? 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20' 
          : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
        }`}>
        <Star size={12} className="fill-current" />
        <span>Voted #1 Media Utility 2025</span>
      </div>

      <h1 className={`text-5xl md:text-8xl font-bold tracking-tight mb-6 leading-[1.05] transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900'}`}>
        A <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Fast, Private</span> <br/>
        Media Tool.
      </h1>
      
      <p className={`text-lg max-w-2xl mx-auto leading-relaxed mb-8 transition-colors duration-[2000ms] ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
        Process publicly available video links into <span className={`font-semibold transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900'}`}>personal-use media formats</span>.
        <br className="hidden md:block" />
        Designed for personal, educational, and fair-use scenarios.
      </p>
    </motion.div>

    {/* THE TOOL (Centered & Highlighted) */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
      className="w-full max-w-4xl relative"
    >
      {/* Glow Effect behind the tool */}
      <div className={`absolute -inset-1 bg-gradient-to-r rounded-[2.5rem] blur-xl opacity-20 animate-pulse transition-colors duration-[2000ms]
        ${isDark ? 'from-blue-500 to-purple-600' : 'from-blue-400 to-purple-400'}`}></div>
      
      <div onClick={onDownloadClick} className="relative transform hover:scale-[1.005] transition duration-500 z-20">
        {/* We keep the MusicBox itself in Dark Mode style (Cinema Mode) or let it inherit. 
            For best contrast, a dark tool on a light background looks PRO (Vercel style). */}
        <div className={!isDark ? "shadow-2xl shadow-blue-900/10 rounded-3xl" : ""}>
            <MusicBox />
        </div>
      </div>

      {/* Legal Micro-Copy */}
      <div className={`mt-4 text-[10px] max-w-lg mx-auto transition-colors duration-[2000ms] ${isDark ? 'text-gray-600' : 'text-slate-400'}`}>
        By using this tool, you confirm you have rights or permission to process this content. 
        MusicBox acts as a neutral technology provider.
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase tracking-wide">
        <span className={`flex items-center gap-2 transition-colors duration-[2000ms] ${isDark ? 'text-gray-500' : 'text-slate-500'}`}><Globe size={14} className="text-blue-500"/> Global CDN</span>
        <span className={`flex items-center gap-2 transition-colors duration-[2000ms] ${isDark ? 'text-gray-500' : 'text-slate-500'}`}><Shield size={14} className="text-green-500"/> SSL Encrypted</span>
        <span className={`flex items-center gap-2 transition-colors duration-[2000ms] ${isDark ? 'text-gray-500' : 'text-slate-500'}`}><Zap size={14} className="text-yellow-500"/> Optimized</span>
      </div>
    </motion.div>
  </section>
);

// --- COMPONENT: COMPARISON (Adaptive Glass Stack) ---
const Comparison = ({ isDark }) => (
  <section className={`relative z-10 py-32 border-y transition-colors duration-[2000ms]
    ${isDark ? 'bg-[#03091e] border-white/5' : 'bg-white border-slate-100'}`}>
    
    {/* Ambient Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

    <div className="container mx-auto px-4 max-w-5xl relative">
      <div className="text-center mb-20">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider mb-6 transition-colors duration-[2000ms]
          ${isDark 
            ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' 
            : 'bg-purple-50 border-purple-200 text-purple-700'}`}>
          <BarChart size={12} />
          <span>Performance Benchmark</span>
        </div>
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Why Professionals <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Upgrade Their Workflow</span>
        </h2>
        <p className={`max-w-2xl mx-auto text-lg transition-colors duration-[2000ms] ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
          Generic sites rely on ad-heavy, throttled relays. MusicBox utilizes a 
          <span className={`transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900 font-semibold'}`}> direct-stream architecture</span> for maximum fidelity and privacy.
        </p>
      </div>

      {/* The Glass Stack Table */}
      <div className="relative">
        {/* Header Row (Desktop) */}
        <div className={`hidden md:grid grid-cols-12 pb-6 px-6 text-xs font-bold uppercase tracking-widest border-b transition-colors duration-[2000ms]
           ${isDark ? 'text-gray-500 border-white/5' : 'text-slate-400 border-slate-200'}`}>
          <div className="col-span-4">Metric</div>
          <div className="col-span-4 text-center">Standard Web Tools</div>
          <div className="col-span-4 text-center text-blue-400">MusicBox Engine</div>
        </div>

        {/* Rows */}
        <div className="space-y-4 mt-6">
          {[
            { 
              icon: Zap, 
              title: "Throughput Velocity", 
              desc: "Time to first byte",
              bad: "Throttled (Shared Node)", 
              good: "Optimized (Dedicated)", 
              color: "text-blue-400",
              lightColor: "text-blue-600",
              bg: "bg-blue-500/10",
              lightBg: "bg-blue-50"
            },
            { 
              icon: Layers, 
              title: "Stream Fidelity", 
              desc: "Audio/Video bitrate retention",
              bad: "Compressed / Lossy", 
              good: "Source Original (Passthrough)", 
              color: "text-purple-400",
              lightColor: "text-purple-600",
              bg: "bg-purple-500/10",
              lightBg: "bg-purple-50"
            },
            { 
              icon: Shield, 
              title: "Data Retention", 
              desc: "Server-side logging policy",
              bad: "Persistent Logs", 
              good: "Ephemeral (RAM Only)", 
              color: "text-green-400",
              lightColor: "text-green-600",
              bg: "bg-green-500/10",
              lightBg: "bg-green-50"
            },
            { 
              icon: Monitor, 
              title: "User Experience", 
              desc: "Interface interference",
              bad: "Popups & Redirects", 
              good: "Clean Workspace", 
              color: "text-yellow-400",
              lightColor: "text-yellow-600",
              bg: "bg-yellow-500/10",
              lightBg: "bg-yellow-50"
            },
          ].map((item, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              key={i} 
              className={`group relative md:grid md:grid-cols-12 items-center p-6 rounded-2xl border transition-all duration-[2000ms]
                ${isDark 
                  ? 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/[0.07]' 
                  : 'bg-white border-slate-100 shadow-sm hover:border-slate-200 hover:shadow-md'}`}
            >
              {/* Metric Name */}
              <div className="col-span-4 flex items-center gap-4 mb-4 md:mb-0">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors duration-[2000ms] 
                    ${isDark 
                      ? `bg-[#0f172a] border-white/10 ${item.color}` 
                      : `${item.lightBg} border-transparent ${item.lightColor}`}`}>
                  <item.icon size={20} />
                </div>
                <div>
                  <h4 className={`font-bold text-base transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                  <p className={`text-xs mt-1 transition-colors duration-[2000ms] ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>{item.desc}</p>
                </div>
              </div>

              {/* Bad Column */}
              <div className="col-span-4 text-center md:mb-0 mb-2 flex md:block justify-between items-center">
                <span className={`md:hidden text-xs uppercase font-bold ${isDark ? 'text-gray-600' : 'text-slate-400'}`}>Standard:</span>
                <span className={`text-sm font-medium line-through decoration-red-500/50 transition-colors duration-[2000ms] ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{item.bad}</span>
              </div>

              {/* Good Column */}
              <div className="col-span-4 text-center flex md:block justify-between items-center">
                <span className={`md:hidden text-xs uppercase font-bold ${isDark ? 'text-gray-600' : 'text-slate-400'}`}>MusicBox:</span>
                <span className={`text-sm font-bold px-3 py-1 rounded-full border shadow-lg transition-all duration-[2000ms]
                  ${isDark
                     ? `${item.color} bg-white/5 border-white/5 shadow-black/20`
                     : `${item.lightColor} bg-white border-slate-100 shadow-slate-200/50`
                  }`}>
                  {item.good}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// --- COMPONENT: TECH SPECS (Adaptive Bento Grid) ---
const SEOGrid = ({ isDark }) => (
  <section className="relative z-10 py-32">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Engineered for <span className="text-blue-500">Speed</span> & Privacy.
          </h2>
          <p className={`text-lg leading-relaxed transition-colors duration-[2000ms] ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            A breakdown of the architecture that makes MusicBox the safest parsing tool on the web. 
            Zero persistence. Maximum efficiency.
          </p>
        </div>
        <div className="flex gap-2">
            <div className={`px-4 py-2 border rounded-lg text-xs font-bold flex items-center gap-2 transition-colors duration-[2000ms]
               ${isDark ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-green-50 border-green-200 text-green-700'}`}>
                <Shield size={14}/> Verified Safe
            </div>
            <div className={`px-4 py-2 border rounded-lg text-xs font-bold flex items-center gap-2 transition-colors duration-[2000ms]
               ${isDark ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
                <Server size={14}/> AES-256
            </div>
        </div>
      </div>

      {/* THE BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
        
        {/* Large Card 1 */}
        <SpotlightCard isDark={isDark} className="md:col-span-2 p-8 flex flex-col justify-between group">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition duration-500">
            <Server size={120} className="text-blue-500 rotate-12" />
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-[2000ms] 
             ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
            <Zap size={24} />
          </div>
          <div>
            <h3 className={`text-2xl font-bold mb-2 transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900'}`}>Non-Persistent Buffer Analysis</h3>
            <p className={`transition-colors duration-[2000ms] ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              Unlike legacy tools, we do not write media to disk. Files are processed in <span className={`font-mono transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900'}`}>volatile RAM</span> and piped directly to your client.
            </p>
          </div>
        </SpotlightCard>

        {/* Small Card 1 */}
        <SpotlightCard isDark={isDark} className="p-8 flex flex-col justify-between">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors duration-[2000ms]
             ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
            <Layers size={20} />
          </div>
          <div>
            <h3 className={`text-xl font-bold mb-2 transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900'}`}>Metadata Injection</h3>
            <p className={`text-sm transition-colors duration-[2000ms] ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              Automatic ID3 tagging. We parse the source to apply correct Artist, Title, and Cover Art.
            </p>
          </div>
        </SpotlightCard>

        {/* Small Card 2 */}
        <SpotlightCard isDark={isDark} className="p-8 flex flex-col justify-between">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors duration-[2000ms]
             ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'}`}>
            <Shield size={20} />
          </div>
          <div>
            <h3 className={`text-xl font-bold mb-2 transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900'}`}>Client Sovereignty</h3>
            <p className={`text-sm transition-colors duration-[2000ms] ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              You own the session. No user tracking logs. No download history. Just a secure tunnel.
            </p>
          </div>
        </SpotlightCard>

        {/* Large Card 2 */}
        <SpotlightCard isDark={isDark} className="md:col-span-2 p-8 flex flex-col justify-between group">
           <div className={`absolute -bottom-10 -right-10 w-64 h-64 rounded-full blur-[80px] transition-colors duration-[2000ms]
              ${isDark ? 'bg-purple-500/20' : 'bg-purple-200/50'}`}></div>
           <div className="relative z-10">
              <div className="flex gap-4 mb-6">
                {[Smartphone, Monitor, Globe].map((Icon, i) => (
                    <div key={i} className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors duration-[2000ms]
                      ${isDark ? 'bg-white/5 text-white border-white/10' : 'bg-white text-slate-900 border-slate-100 shadow-sm'}`}>
                      <Icon size={24}/>
                    </div>
                ))}
              </div>
              <h3 className={`text-2xl font-bold mb-2 transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900'}`}>Universal Platform Compatibility</h3>
              <p className={`max-w-lg transition-colors duration-[2000ms] ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                Built on React 19 and Node.js. Our Progressive Web App (PWA) architecture ensures native-like performance on all devices.
              </p>
           </div>
        </SpotlightCard>
      </div>
    </div>
  </section>
);

// --- COMPONENT: LEGAL DISCLAIMER (Adaptive) ---
const LegalDisclaimer = ({ isDark }) => (
    <section className={`relative z-10 py-8 border-t transition-colors duration-[2000ms]
       ${isDark ? 'border-white/5 bg-[#020617]' : 'border-slate-200 bg-[#f8fafc]'}`}>
        <div className="container mx-auto px-4">
            <div className={`border rounded-lg p-6 max-w-4xl mx-auto flex items-start gap-4 transition-colors duration-[2000ms]
               ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="min-w-[24px] mt-1 text-gray-500">
                    <HelpCircle size={24} />
                </div>
                <div>
                    <h4 className={`text-sm font-bold mb-1 transition-colors duration-[2000ms] ${isDark ? 'text-gray-300' : 'text-slate-900'}`}>Compliance & Fair Use Notice</h4>
                    <p className={`text-xs leading-relaxed transition-colors duration-[2000ms] ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                        MusicBox is a technical demonstration of real-time stream processing and metadata parsing. 
                        It is intended solely for personal, non-commercial use, such as archiving content you own or content that is in the public domain. 
                        Users are strictly prohibited from using this tool to infringe on copyright laws. 
                        MusicBox does not bypass DRM (Digital Rights Management) protections.
                    </p>
                </div>
            </div>
        </div>
    </section>
);

// --- COMPONENT: RICH FAQ (Adaptive) ---
const FAQ = ({ isDark }) => (
  <section className={`relative z-10 py-20 border-t transition-colors duration-[2000ms]
     ${isDark ? 'bg-black/40 border-white/5' : 'bg-white border-slate-200'}`}>
    <div className="container mx-auto px-4 max-w-3xl">
      <h2 className={`text-3xl font-bold mb-10 text-center transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Frequently Asked <span className="text-purple-500">Questions</span>
      </h2>
      <div className="space-y-4">
        {[
          { q: "Is this service legal?", a: "MusicBox is a neutral technology provider. We do not host or distribute media content. Users are responsible for ensuring their usage complies with local laws and terms of service." },
          { q: "Is MusicBox free to use?", a: "Yes, MusicBox is a free utility. We rely on user support and optional premium features to keep the infrastructure running." },
          { q: "How do I process high-quality audio?", a: "Simply paste your link and select the 'Audio' mode. Our engine attempts to retrieve the highest fidelity stream available from the source." },
          { q: "Can I use this on mobile?", a: "Absolutely. MusicBox works perfectly on modern mobile browsers. For the best experience, add our website to your Home Screen." },
          { q: "Do you store my files?", a: "We do not host files. We act as a bridge. Your data is processed in volatile memory and is deleted from our cache immediately after the session." },
        ].map((item, i) => (
          <details key={i} className={`group border rounded-xl overflow-hidden transition-all duration-[2000ms]
             ${isDark 
               ? 'bg-white/5 border-white/10 open:bg-white/10' 
               : 'bg-slate-50 border-slate-200 open:bg-white open:shadow-md'}`}>
            <summary className={`flex justify-between items-center p-6 cursor-pointer font-bold select-none transition-colors duration-[2000ms]
               ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {item.q}
              <ChevronDown className="group-open:rotate-180 transition transform text-gray-500" />
            </summary>
            <div className={`px-6 pb-6 text-sm leading-relaxed transition-colors duration-[2000ms] ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

// --- COMPONENT: CTA FOOTER (Adaptive) ---
const Footer = ({ isDark }) => (
  <footer className={`relative z-10 border-t pt-20 pb-10 transition-colors duration-[2000ms]
     ${isDark ? 'bg-[#020617] border-white/10' : 'bg-[#f8fafc] border-slate-200'}`}>
    <div className="container mx-auto px-4 text-center">
      <h2 className={`text-3xl md:text-5xl font-bold mb-6 transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900'}`}>Ready to upgrade your workflow?</h2>
      <p className={`mb-8 transition-colors duration-[2000ms] ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Join thousands of creators using MusicBox daily.</p>
      
      <div className="flex justify-center gap-4 mb-16">
         <button className={`px-8 py-3 rounded-full font-bold transition flex items-center gap-2 transition-colors duration-[2000ms]
             ${isDark 
               ? 'bg-white text-black hover:bg-gray-200' 
               : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'}`}>
            Get Android App <ArrowRight size={16}/>
         </button>
         <button className={`border px-8 py-3 rounded-full font-bold transition transition-colors duration-[2000ms]
             ${isDark 
               ? 'bg-transparent border-white/20 text-white hover:bg-white/10' 
               : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
            Chrome Extension
         </button>
      </div>

      <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 text-left border-t pt-12 transition-colors duration-[2000ms]
         ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
        <div>
          <h3 className={`font-bold mb-4 transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900'}`}>MusicBox</h3>
          <p className="text-gray-500 text-xs">The world's most advanced media engine. Fast, free, and secure.</p>
        </div>
        <div>
          <h4 className={`font-bold mb-4 text-sm transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900'}`}>Legal</h4>
          <ul className="space-y-2 text-xs text-gray-500">
            <li className="hover:text-blue-400 cursor-pointer">Terms of Service</li>
            <li className="hover:text-blue-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-blue-400 cursor-pointer">DMCA</li>
            <li className="hover:text-blue-400 cursor-pointer">Disclaimer</li>
          </ul>
        </div>
        <div>
          <h4 className={`font-bold mb-4 text-sm transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900'}`}>Supported</h4>
          <ul className="space-y-2 text-xs text-gray-500">
            <li className="hover:text-blue-400 cursor-pointer">Public Video Platforms</li>
            <li className="hover:text-blue-400 cursor-pointer">Social Media Streams</li>
            <li className="hover:text-blue-400 cursor-pointer">Audio Archives</li>
          </ul>
        </div>
        <div>
           <h4 className={`font-bold mb-4 text-sm transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900'}`}>Connect</h4>
           <div className="flex gap-4 opacity-50 text-gray-500">
              <Twitter size={20}/>
              <Instagram size={20}/>
           </div>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto mt-12 text-center">
        <p className="text-[10px] text-gray-500 mb-2">
            MusicBox is a neutral technology platform and does not encourage copyright infringement. 
            All trademarks are property of their respective owners.
        </p>
        <div className="text-[10px] text-gray-500">
            © 2025 MusicBox.life. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
);

// --- MAIN PAGE ASSEMBLY ---
const MusicBoxPage = () => {
  const [hasConverted, setHasConverted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // THEME STATE: Start 'true' (Dark Mode), switch to 'false' (Light Mode)
  const [isDark, setIsDark] = useState(true);

  // AUTOMATIC THEME SWITCHER
  useEffect(() => {
    // Wait 5 seconds, then transition to Light Mode
    const timer = setTimeout(() => {
      setIsDark(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const usage = localStorage.getItem('musicbox_uses');
    if (usage && parseInt(usage) > 0) setHasConverted(true);
  }, []);

  const handleDownloadClick = () => {
    if (hasConverted && !showAuthModal) setShowAuthModal(true);
  };

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-[2000ms] ease-in-out
      ${isDark 
        ? 'text-white selection:bg-blue-500 selection:text-white' 
        : 'text-slate-900 selection:bg-blue-200 selection:text-blue-900'}`}>
      
      <Background isDark={isDark} />
      <LivePulse isDark={isDark} />

      {/* NAVBAR */}
      <nav className={`relative z-50 px-6 py-4 flex justify-between items-center border-b backdrop-blur-md transition-colors duration-[2000ms]
        ${isDark ? 'border-white/5 bg-black/20' : 'border-slate-200 bg-white/70'}`}>
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap size={18} className="text-white fill-white"/>
           </div>
           <span className={`font-bold text-xl tracking-tight transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900'}`}>MusicBox</span>
        </div>
        <div className={`hidden md:flex gap-8 text-sm font-medium transition-colors duration-[2000ms] ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
           <a href="#" className="hover:text-blue-500 transition">Features</a>
           <a href="#" className="hover:text-blue-500 transition">Comparison</a>
           <a href="#" className="hover:text-blue-500 transition">FAQ</a>
        </div>
        <button className={`px-5 py-2 rounded-full text-sm font-bold transition hidden md:block transition-colors duration-[2000ms]
            ${isDark 
              ? 'bg-white text-black hover:bg-gray-200' 
              : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
           Install App
        </button>
      </nav>

      {/* AUTH MODAL */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md p-4 bg-black/50"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
              className={`border p-8 rounded-2xl max-w-md w-full text-center shadow-2xl relative transition-colors duration-[2000ms]
                 ${isDark ? 'bg-[#0f172a] border-white/10' : 'bg-white border-slate-200'}`}
            >
              <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-blue-500"><X /></button>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-[2000ms]
                 ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                <Lock size={32} className="text-blue-500" />
              </div>
              <h2 className={`text-2xl font-bold mb-2 transition-colors duration-[2000ms] ${isDark ? 'text-white' : 'text-slate-900'}`}>Usage Limit Reached</h2>
              <p className={`mb-6 text-sm transition-colors duration-[2000ms] ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                To prevent abuse and maintain server performance, we require an account for continued usage.
              </p>
              <div className="space-y-3">
                 <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition flex justify-center items-center gap-2">
                    <Globe size={16}/> Continue with Google
                 </button>
                 <button onClick={() => setShowAuthModal(false)} className="text-xs text-gray-500 hover:text-blue-500">
                    I'll come back later
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Hero onDownloadClick={handleDownloadClick} isDark={isDark} />
      <Comparison isDark={isDark} />
      <SEOGrid isDark={isDark} />
      <LegalDisclaimer isDark={isDark} />
      <FAQ isDark={isDark} />
      <Footer isDark={isDark} />
    </div>
  );
};

export default MusicBoxPage;