/* --- frontend/src/pages/ToolPage.js --- */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Instagram, FileVideo, Zap, 
  Download, Trash2, CheckCircle, Clock, 
  ArrowRight, Copy, Link as LinkIcon, HardDrive, 
  AlertCircle, Lock, ShieldAlert // Added Security Icons
} from 'lucide-react';

// --- CONFIGURATION ---
// (Kept your existing TOOL_CONFIG exactly as is, omitted here for brevity)
const TOOL_CONFIG = {
  instagram: {
    id: 'instagram',
    title: "Instagram Heist",
    metaTitle: "Instagram Downloader",
    placeholder: "Paste that viral Reel here...",
    loadingPhrases: ["Bypassing firewall...", "Distracting algorithms...", "Stealing pixels..."],
    color: "text-pink-600",
    gradient: "from-purple-500 via-pink-500 to-orange-500",
    icon: <Instagram className="w-5 h-5" />
  },
  tiktok: {
    id: 'tiktok',
    title: "TikTok Liberator",
    metaTitle: "TikTok Downloader",
    placeholder: "Paste TikTok link here...",
    loadingPhrases: ["Scrubbing watermark...", "Confusing AI...", "Extracting cringe..."],
    color: "text-cyan-500",
    gradient: "from-cyan-400 via-teal-500 to-green-500",
    icon: <FileVideo className="w-5 h-5" />
  },
  default: {
    id: 'universal',
    title: "Media Extractor",
    metaTitle: "Universal Media Downloader",
    placeholder: "Feed me a link...",
    loadingPhrases: ["Waking hamsters...", "Doing math...", "Yoink!"],
    color: "text-slate-900",
    gradient: "from-slate-900 to-slate-700",
    icon: <Zap className="w-5 h-5" />
  }
};

// --- MEDIA CARD (Unchanged Visuals) ---
const MediaCard = ({ file, onDelete, onSelect, config }) => {
  const [phrase, setPhrase] = useState(config.loadingPhrases[0]);

  useEffect(() => {
    if (file.status === 'loading') {
      let i = 0;
      const interval = setInterval(() => {
        i = (i + 1) % config.loadingPhrases.length;
        setPhrase(config.loadingPhrases[i]);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [file.status, config.loadingPhrases]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className={`group relative overflow-hidden rounded-[24px] bg-white border transition-all duration-300 h-[320px] flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 ${
        file.status === 'error' || file.status === 'limit' ? 'border-red-200 ring-1 ring-red-100' : 
        file.selected ? 'border-slate-900 ring-1 ring-slate-900' : 'border-slate-100'
      }`}
      onClick={() => file.status === 'ready' && onSelect(file.id)}
    >
      {/* LOADING STATE */}
      {file.status === 'loading' && (
        <div className="absolute inset-0 z-30 bg-white flex flex-col items-center justify-center p-6 text-center">
          <div className="relative w-16 h-16 mb-6">
            <div className={`absolute inset-0 rounded-full border-4 border-slate-100`}></div>
            <div className={`absolute inset-0 rounded-full border-4 border-t-transparent animate-spin border-slate-900`}></div>
          </div>
          <h4 className="text-sm font-bold text-slate-900 animate-pulse">{phrase}</h4>
          <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2.5, ease: "linear" }} className={`absolute bottom-0 left-0 h-1.5 bg-gradient-to-r ${config.gradient}`} />
        </div>
      )}

      {/* ERROR STATE */}
      {(file.status === 'error') && (
        <div className="absolute inset-0 z-30 bg-red-50 flex flex-col items-center justify-center p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h4 className="text-slate-900 font-bold mb-1">Mission Failed</h4>
            <p className="text-xs text-red-600 mb-4">Link is private or invalid.</p>
            <button onClick={(e) => {e.stopPropagation(); onDelete(file.id)}} className="px-4 py-2 bg-white border border-red-200 text-red-600 text-xs font-bold rounded-full hover:bg-red-100">Dismiss</button>
        </div>
      )}

      {/* READY STATE */}
      <div className="relative h-[70%] bg-slate-50 overflow-hidden group-hover:brightness-[1.02] transition-all">
         {file.thumbnail ? (
            <img src={file.thumbnail} alt="Content" className="w-full h-full object-cover" />
         ) : (
            <div className="w-full h-full bg-slate-100" />
         )}

         {/* Checkbox */}
         {file.status === 'ready' && (
             <div className={`absolute top-4 left-4 z-20 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${file.selected ? 'bg-slate-900 border-slate-900 scale-110' : 'bg-white/90 border-slate-200 hover:scale-110'}`}>
                {file.selected && <CheckCircle className="w-3.5 h-3.5 text-white" />}
             </div>
         )}
         
         <div className="absolute bottom-3 left-4 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-bold text-slate-900 shadow-sm uppercase tracking-wider">
           {file.type || 'MP4'}
         </div>
      </div>

      <div className="p-5 bg-white flex-1 flex flex-col justify-between relative">
        <div>
           <h4 className="text-sm font-bold text-slate-900 truncate leading-tight">{file.title || 'Processing...'}</h4>
           <p className="text-slate-400 text-[10px] font-mono mt-1 truncate">@{file.author || 'unknown'}</p>
        </div>
        
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-50">
          <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded-md text-slate-500">{file.size || 'HD'}</span>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-500">
             <Clock className="w-3 h-3" />
             <span>Ready</span>
          </div>
        </div>
        
        {/* Guest can delete, but only one file anyway */}
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(file.id); }}
          className="absolute -top-5 right-4 w-10 h-10 rounded-full bg-white text-red-500 shadow-lg border border-slate-50 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

// --- MAIN PAGE ---
const ToolPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const activeToolId = Object.keys(TOOL_CONFIG).find(k => (slug || '').includes(k)) || 'default'; 
  const config = TOOL_CONFIG[activeToolId];
  
  const [inputUrl, setInputUrl] = useState('');
  const [sessionFiles, setSessionFiles] = useState([]);
  const [user, setUser] = useState(null);
  const [shake, setShake] = useState(false); // Physics for denial

  useEffect(() => { 
    document.title = `${config.metaTitle} | MusicBox Life`;
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [config]);

  // --- CORE LOGIC: THE GUEST GATE ---
  const isGuest = !user;

  const handleExtract = async () => {
    if (!inputUrl) return;

    // ⛔ GUEST LIMITATION: SINGLE THREAD MODE
    if (isGuest && sessionFiles.length >= 1) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        return; // BLOCK EXECUTION
    }

    const tempId = Date.now();
    const loadingFile = {
      id: tempId,
      status: 'loading',
      url: inputUrl,
      selected: false, // Don't auto-select for guests maybe?
    };
    
    setSessionFiles(prev => [loadingFile, ...prev]);
    setInputUrl('');

    try {
        const token = localStorage.getItem('token');
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        
        const response = await fetch(`${API_URL}/extract`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }) 
            },
            body: JSON.stringify({ url: loadingFile.url })
        });

        if (response.status === 429) throw new Error("LIMIT_REACHED");
        const result = await response.json();
        if (!result.success) throw new Error(result.error || "Extraction failed");

        setSessionFiles(prev => prev.map(f => {
            if (f.id === tempId) {
                return {
                    ...f,
                    status: 'ready',
                    selected: true, // Auto-select for convenience
                    title: result.data.title,
                    author: result.data.author,
                    thumbnail: result.data.thumbnail,
                    url: result.data.url, 
                    type: result.data.type,
                    size: result.data.size
                };
            }
            return f;
        }));

    } catch (error) {
        setSessionFiles(prev => prev.map(f => {
            if (f.id === tempId) return { ...f, status: 'error' };
            return f;
        }));
    }
  };

  const handleDownloadAll = () => {
    sessionFiles.filter(f => f.selected && f.status === 'ready').forEach(file => {
        window.open(file.url, '_blank');
    });
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleExtract(); };
  const deleteFile = (id) => setSessionFiles(prev => prev.filter(f => f.id !== id));
  const toggleSelect = (id) => setSessionFiles(prev => prev.map(f => f.id === id ? { ...f, selected: !f.selected } : f));
  
  // Logic for the Floating Dock
  const selectedCount = sessionFiles.filter(f => f.selected && f.status === 'ready').length;

  return (
    <article className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-slate-900 selection:text-white pb-32 relative overflow-x-hidden">
      <div className="fixed inset-0 bg-grain opacity-[0.03] pointer-events-none z-0"></div>

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/40 transition-all">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/tools" className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> ARSENAL
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
               <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-bold text-slate-900">{user.username}</span>
               </div>
            ) : (
               <Link to="/login" className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-full hover:bg-black transition-all shadow-lg hover:scale-105">
                 INITIALIZE
               </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-16 relative z-10">
        
        {/* --- HERO --- */}
        <section className="max-w-3xl mx-auto text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex flex-col items-center">
            <div className={`mb-6 p-4 rounded-[2rem] bg-slate-50 border border-slate-100 shadow-sm ${config.color}`}>{React.cloneElement(config.icon, { className: "w-8 h-8" })}</div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 mb-6 leading-[0.9]">{config.title}</h1>
            <p className="text-slate-500 text-xl font-medium max-w-lg leading-relaxed">
              {isGuest ? "Free Mode Active. Single Stream Protocol." : "System Unlocked. Batch Mode Ready."}
            </p>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1, x: shake ? [0, -10, 10, -10, 10, 0] : 0 }} 
            transition={{ delay: 0.1, duration: 0.4 }} 
            className="relative group z-30 max-w-xl mx-auto"
          >
            {/* The Input Field */}
            <div className={`relative flex items-center bg-white p-1.5 rounded-full shadow-2xl shadow-slate-200/50 border transition-all focus-within:ring-2 focus-within:ring-slate-900/5 ${shake ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-100 ring-1 ring-slate-100'}`}>
              <input 
                value={inputUrl} 
                onChange={(e) => setInputUrl(e.target.value)} 
                onKeyDown={handleKeyDown} 
                placeholder={isGuest && sessionFiles.length >= 1 ? "MEMORY FULL. LOGIN TO ADD MORE." : config.placeholder} 
                className={`flex-1 bg-transparent px-6 py-4 outline-none text-lg font-medium placeholder:text-slate-300 ${shake ? 'text-red-500 placeholder:text-red-300' : 'text-slate-800'}`}
                disabled={isGuest && sessionFiles.length >= 1}
                autoFocus 
              />
              <button 
                onClick={handleExtract} 
                disabled={isGuest && sessionFiles.length >= 1}
                className={`px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2 shadow-lg ${
                    isGuest && sessionFiles.length >= 1 
                    ? 'bg-red-50 text-red-500 cursor-not-allowed' 
                    : 'bg-[#0A0A0A] text-white hover:scale-105 active:scale-95'
                }`}
              >
                {isGuest && sessionFiles.length >= 1 ? <Lock className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                <span className="hidden sm:inline">
                    {isGuest && sessionFiles.length >= 1 ? "Locked" : "Get It"}
                </span>
              </button>
            </div>

            {/* ERROR MESSAGE FOR GUESTS */}
            {shake && (
                <div className="absolute -bottom-12 left-0 right-0 flex justify-center">
                    <div className="bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
                        <ShieldAlert size={14} />
                        <span>PROTOCOL RESTRICTED: Login to extract more.</span>
                    </div>
                </div>
            )}
          </motion.div>
        </section>

        {/* --- CANVAS --- */}
        <section className="w-full mb-40 min-h-[400px]">
             {sessionFiles.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-8 px-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {isGuest ? "Single Stream Buffer" : `Active Batch (${sessionFiles.length})`}
                    </h3>
                    <button onClick={() => setSessionFiles([])} className="text-xs font-bold text-red-500 hover:text-red-600">Clear All</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">{sessionFiles.map((file) => (<MediaCard key={file.id} file={file} onDelete={deleteFile} onSelect={toggleSelect} config={config} />))}</AnimatePresence>
                  </div>
                </>
             ) : (
               <div className="border border-dashed border-slate-200 rounded-[3rem] p-12 text-center bg-slate-50/50">
                  <p className="text-slate-400 font-medium">Your canvas is clean.</p>
                  <p className="text-slate-300 text-sm mt-2">Paste a link to dirty it up.</p>
               </div>
             )}
        </section>

      </main>

      {/* --- GHOST UI: FLOATING ACTION DOCK --- */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
            {isGuest ? (
                // 🔒 LOCKED STATE (For Guests)
                <div className="pointer-events-auto bg-[#0A0A0A]/90 backdrop-blur-md text-slate-400 rounded-full shadow-2xl p-2 pl-6 pr-2 flex items-center gap-4 border border-white/10 ring-1 ring-black/5">
                    <span className="font-bold text-sm text-slate-500">Batch Mode Locked</span>
                    <button onClick={() => navigate('/login')} className="px-6 py-3 rounded-full bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm shadow-inner group">
                        <Lock className="w-3.5 h-3.5 group-hover:text-yellow-400 transition-colors" />
                        <span>Unlock Download</span>
                    </button>
                </div>
            ) : (
                // 🔓 UNLOCKED STATE (For Users)
                <div className="pointer-events-auto bg-[#0A0A0A] text-white rounded-full shadow-2xl p-2 pl-8 pr-2 flex items-center gap-6 border border-white/10 ring-1 ring-black/5">
                    <span className="font-bold text-sm">{selectedCount} Files Ready</span>
                    <button onClick={handleDownloadAll} className="px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-slate-200 transition-colors flex items-center gap-2 text-sm">
                        <Download className="w-4 h-4" />
                        <span>Download ZIP</span>
                    </button>
                </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default ToolPage;