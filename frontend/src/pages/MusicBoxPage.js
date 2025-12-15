import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Play, Smartphone, Globe, Shield, 
  Zap, ChevronDown, Monitor, Youtube, Instagram, 
  Facebook, Twitter, Lock, X, Menu, Terminal,
  ArrowRight, Star, BarChart, Server, Layers, HelpCircle
} from 'lucide-react';
import MusicBox from '../components/MusicBox';

// --- CONFIG ---
const API_URL = process.env.REACT_APP_API_URL || 'https://musicbox.life';

// --- COMPONENT: BACKGROUND ---
const Background = () => (
  <div className="fixed inset-0 z-0 bg-[#020617]">
    {/* Modern Gradient Orbs */}
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
    {/* Grid Overlay */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
  </div>
);

// --- COMPONENT: LIVE ACTIVITY PULSE (Social Proof Gimmick) ---
const LivePulse = () => (
  <div className="w-full bg-blue-900/10 border-y border-white/5 backdrop-blur-md py-2 overflow-hidden relative z-10">
    <div className="flex animate-marquee whitespace-nowrap gap-12 text-[10px] font-mono text-blue-300 uppercase tracking-widest items-center">
      {Array(5).fill("").map((_, i) => (
        <React.Fragment key={i}>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/> User_84{i} extracted: 4K_Video.mp4 (240MB)</span>
          <span className="text-gray-600">|</span>
          <span className="flex items-center gap-2 text-purple-300"><Zap size={10}/> Speed: 42MB/s</span>
          <span className="text-gray-600">|</span>
        </React.Fragment>
      ))}
    </div>
  </div>
);

// --- COMPONENT: HERO SECTION ---
const Hero = ({ onDownloadClick }) => (
  <section className="relative z-10 pt-24 pb-16 px-4 flex flex-col items-center text-center">
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto mb-10"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6 hover:bg-blue-500/20 transition cursor-default">
        <Star size={12} className="fill-current" />
        <span>Rated #1 Converter in 2025</span>
      </div>

      <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tight mb-6 leading-[1.05]">
        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Fastest</span> Way <br/>
        To Save Video.
      </h1>
      
      <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
        Convert YouTube, TikTok, and Instagram to <span className="text-white font-semibold">MP3/MP4</span> in milliseconds. 
        <br className="hidden md:block" />
        No software installation. No registration. Just pure speed.
      </p>
    </motion.div>

    {/* THE TOOL (Centered & Highlighted) */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
      className="w-full max-w-4xl relative"
    >
      {/* Glow Effect behind the tool */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[2.5rem] blur-xl opacity-20 animate-pulse"></div>
      
      <div onClick={onDownloadClick} className="relative transform hover:scale-[1.005] transition duration-500 z-20">
        <MusicBox />
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-semibold text-gray-500 uppercase tracking-wide">
        <span className="flex items-center gap-2"><Globe size={14} className="text-blue-500"/> Works Globally</span>
        <span className="flex items-center gap-2"><Shield size={14} className="text-green-500"/> SSL Secured</span>
        <span className="flex items-center gap-2"><Zap size={14} className="text-yellow-500"/> Turbo Engine</span>
      </div>
    </motion.div>
  </section>
);

// --- COMPONENT: COMPARISON TABLE (The Marketing Gimmick) ---
const Comparison = () => (
  <section className="relative z-10 py-24 bg-[#03091e] border-y border-white/5">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">Why Pros Choose MusicBox</h2>
        <p className="text-gray-400">Stop risking your device with sketchy sites. Upgrade to the standard.</p>
      </div>

      <div className="bg-[#0f172a] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-3 bg-white/5 p-4 text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-white/10">
          <div className="pl-4">Feature</div>
          <div className="text-center text-red-400">Other Sites</div>
          <div className="text-center text-blue-400">MusicBox</div>
        </div>
        
        {[
          { name: "Download Speed", bad: "Throttled (500kb/s)", good: "Unlimited (1GB/s)" },
          { name: "Video Quality", bad: "Max 720p", good: "Up to 8K HDR" },
          { name: "Audio Bitrate", bad: "128kbps (Compressed)", good: "320kbps (Lossless)" },
          { name: "Ads & Popups", bad: "Everywhere", good: "Zero. None." },
          { name: "Batch Downloading", bad: "❌ No", good: "✅ Yes (ZIP Support)" },
          { name: "Security", bad: "❌ Malware Risk", good: "✅ SSL + Sandboxed" },
        ].map((row, i) => (
          <div key={i} className="grid grid-cols-3 p-4 border-b border-white/5 hover:bg-white/5 transition items-center">
            <div className="font-medium text-white pl-4">{row.name}</div>
            <div className="text-center text-gray-500 text-sm">{row.bad}</div>
            <div className="text-center text-blue-400 font-bold text-sm bg-blue-500/10 py-1 rounded-lg border border-blue-500/20">{row.good}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- COMPONENT: SEO POWER GRID (Ranking Engine) ---
const SEOGrid = () => (
  <section className="relative z-10 py-24">
    <div className="container mx-auto px-4">
      <div className="mb-12 md:text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">The Science Behind the <span className="text-blue-500">Speed</span></h2>
        <p className="text-gray-400">
          We engineered MusicBox to be the most advanced media extraction tool on the web. 
          Optimized for SEO, speed, and creator workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Direct Server Connection", desc: "We don't proxy your downloads through slow middlemen. We create a direct tunnel between you and the content delivery network (CDN).", icon: Server },
          { title: "Smart Metadata Tagging", desc: "MusicBox automatically detects Artist, Album, and Cover Art, embedding them directly into your MP3 files for a clean library.", icon: Layers },
          { title: "Playlist Batching", desc: "Paste a playlist link and our engine will parse every video, allowing you to select and zip them into a single download.", icon: Layers },
          { title: "Cross-Platform API", desc: "Our engine works on iOS, Android, Windows, and Linux. Responsive design adapts to your device instantly.", icon: Smartphone },
          { title: "No Registration Wall", desc: "We believe in an open web. Basic features will always be free and accessible without giving up your email.", icon: Lock },
          { title: "Privacy First", desc: "Logs are wiped every 24 hours. We don't track your history. What you download is your business.", icon: Shield },
        ].map((card, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-blue-500/50 hover:bg-white/10 transition group">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition text-blue-400">
              <card.icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- COMPONENT: RICH FAQ (Google Snippet Bait) ---
const FAQ = () => (
  <section className="relative z-10 py-20 bg-black/40 border-t border-white/5">
    <div className="container mx-auto px-4 max-w-3xl">
      <h2 className="text-3xl font-bold text-white mb-10 text-center">Frequently Asked <span className="text-purple-500">Questions</span></h2>
      <div className="space-y-4">
        {[
          { q: "Is MusicBox completely free to use?", a: "Yes, MusicBox is a free tool. We rely on user support and optional premium features to keep the servers running at high speeds." },
          { q: "How do I download MP3 in 320kbps?", a: "Simply paste your link, select 'Audio' mode, and choose the '320kbps' quality option. Our engine upscales the audio stream for maximum fidelity." },
          { q: "Can I download videos on iPhone/iOS?", a: "Absolutely. MusicBox works perfectly on Safari. For the best experience, you can add our website to your Home Screen." },
          { q: "Is it safe? Do you store my files?", a: "We do not host any files. We act as a bridge. Your downloads are processed in volatile memory and are deleted from our cache shortly after." },
        ].map((item, i) => (
          <details key={i} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden open:bg-white/10 transition">
            <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-white select-none">
              {item.q}
              <ChevronDown className="group-open:rotate-180 transition transform text-gray-500" />
            </summary>
            <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

// --- COMPONENT: CTA FOOTER ---
const Footer = () => (
  <footer className="relative z-10 bg-[#020617] border-t border-white/10 pt-20 pb-10">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to upgrade your library?</h2>
      <p className="text-gray-400 mb-8">Join thousands of creators using MusicBox daily.</p>
      
      <div className="flex justify-center gap-4 mb-16">
         <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition flex items-center gap-2">
            Get Android App <ArrowRight size={16}/>
         </button>
         <button className="bg-transparent border border-white/20 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition">
            Chrome Extension
         </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left border-t border-white/5 pt-12">
        <div>
          <h3 className="text-white font-bold mb-4">MusicBox</h3>
          <p className="text-gray-500 text-xs">The world's most advanced media engine. Fast, free, and secure.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 text-sm">Legal</h4>
          <ul className="space-y-2 text-xs text-gray-500">
            <li className="hover:text-blue-400 cursor-pointer">Terms of Service</li>
            <li className="hover:text-blue-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-blue-400 cursor-pointer">Copyright</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 text-sm">Supported</h4>
          <ul className="space-y-2 text-xs text-gray-500">
            <li className="hover:text-blue-400 cursor-pointer">YouTube</li>
            <li className="hover:text-blue-400 cursor-pointer">Instagram Reels</li>
            <li className="hover:text-blue-400 cursor-pointer">TikTok</li>
          </ul>
        </div>
        <div>
           <h4 className="text-white font-bold mb-4 text-sm">Connect</h4>
           <div className="flex gap-4 opacity-50">
              <Youtube size={20}/>
              <Twitter size={20}/>
              <Instagram size={20}/>
           </div>
        </div>
      </div>
      <div className="text-center text-gray-700 text-[10px] mt-12">
        © 2025 MusicBox.life. All rights reserved. We are not affiliated with YouTube, Google, or ByteDance.
      </div>
    </div>
  </footer>
);

// --- MAIN PAGE ASSEMBLY ---
const MusicBoxPage = () => {
  const [hasConverted, setHasConverted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const usage = localStorage.getItem('musicbox_uses');
    if (usage && parseInt(usage) > 0) setHasConverted(true);
  }, []);

  const handleDownloadClick = () => {
    if (hasConverted && !showAuthModal) setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <Background />
      <LivePulse />

      {/* NAVBAR */}
      <nav className="relative z-50 px-6 py-4 flex justify-between items-center border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap size={18} className="text-white fill-white"/>
           </div>
           <span className="font-bold text-xl tracking-tight">MusicBox</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
           <a href="#" className="hover:text-white transition">Features</a>
           <a href="#" className="hover:text-white transition">Comparison</a>
           <a href="#" className="hover:text-white transition">FAQ</a>
        </div>
        <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition hidden md:block">
           Install App
        </button>
      </nav>

      {/* AUTH MODAL */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-[#0f172a] border border-white/10 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl relative"
            >
              <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X /></button>
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={32} className="text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Free Limit Reached</h2>
              <p className="text-gray-400 mb-6 text-sm">
                To maintain our high-speed 4K servers, we require a free account for heavy usage.
              </p>
              <div className="space-y-3">
                 <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition flex justify-center items-center gap-2">
                    <Globe size={16}/> Continue with Google
                 </button>
                 <button onClick={() => setShowAuthModal(false)} className="text-xs text-gray-500 hover:text-white">
                    I'll come back later
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Hero onDownloadClick={handleDownloadClick} />
      <Comparison />
      <SEOGrid />
      <FAQ />
      <Footer />
    </div>
  );
};

export default MusicBoxPage;