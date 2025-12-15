import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { 
  Zap, Download, Disc, Activity, Layers, 
  Wifi, Search, Command, Check, X, Play, 
  Trash2, Package, Music, Video, HardDrive, List
} from 'lucide-react';

// --- CONFIG ---
const API_URL = process.env.REACT_APP_API_URL || 'https://musicbox.life'; 
const MAX_CONCURRENT = 2;

// --- COMPONENT: GLOW INPUT ---
const GlowInput = ({ value, onChange, disabled, placeholder, isProcessing }) => (
  <div className="relative group w-full">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-pink rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-focus-within:opacity-100"></div>
    <div className="relative flex items-center bg-[#050505] rounded-xl border border-white/10 p-1">
      <div className="pl-4 text-gray-500">
        <Wifi size={20} className={clsx("transition-colors", (value || isProcessing) ? "text-neon-blue animate-pulse" : "")} />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full bg-transparent text-white p-4 outline-none font-mono text-sm placeholder:text-gray-600"
      />
      <div className="pr-2">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-[10px] text-gray-500 font-mono uppercase tracking-widest">
          <Command size={10} /> Enter
        </div>
      </div>
    </div>
  </div>
);

// --- COMPONENT: FILTER PILL ---
const FilterPill = ({ label, active, onClick, icon: Icon }) => (
  <button
    onClick={onClick}
    className={clsx(
      "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 border whitespace-nowrap",
      active 
        ? "bg-neon-purple/10 border-neon-purple text-neon-purple shadow-[0_0_15px_-3px_rgba(168,85,247,0.4)]" 
        : "bg-white/5 border-white/5 text-gray-500 hover:bg-white/10 hover:text-white"
    )}
  >
    {Icon && <Icon size={12} />}
    {label}
  </button>
);

// --- MAIN ENGINE COMPONENT ---
const MusicBox = ({ onDownloadStart }) => {
  // STATE: INPUT & SETTINGS
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp3');
  const [quality, setQuality] = useState('max');
  const [effect, setEffect] = useState('none');
  const [activeTab, setActiveTab] = useState('library'); // 'library' or 'settings' (mobile)

  // STATE: DATA
  const [activeDownloads, setActiveDownloads] = useState([]);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ songs: 0, videos: 0, disk: '0.0' });
  
  // STATE: SELECTION MODE
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isProcessingPlaylist, setIsProcessingPlaylist] = useState(false);

  // --- INIT & LOGIC ---
  useEffect(() => { fetchHistory(); }, []);

  // QUEUE PROCESSOR
  useEffect(() => {
    const running = activeDownloads.filter(item => item.status.includes('Processing') || item.status.includes('Downloading'));
    const queued = activeDownloads.filter(item => item.status === 'Queued...');
    
    if (running.length < MAX_CONCURRENT && queued.length > 0) {
      const nextItem = queued[0];
      processDownload(nextItem);
    }
  }, [activeDownloads]);

  // AUTO PASTE LISTENER
  useEffect(() => {
    const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (ytRegex.test(url)) {
        const cleanLink = url;
        setUrl('');
        if(onDownloadStart) onDownloadStart(); // Trigger Auth Wall if needed
        if (cleanLink.includes('list=')) handlePlaylist(cleanLink);
        else addSingleToQueue(cleanLink);
    }
  }, [url]);

  // --- API CALLS ---
  const fetchHistory = async () => {
    try {
        const res = await fetch(`${API_URL}/api/history`);
        const data = await res.json();
        if(data.success) {
            setHistory(data.data);
            // Calculate Stats
            const songs = data.data.filter(i => i.type === 'mp3').length;
            const videos = data.data.filter(i => i.type === 'mp4').length;
            setStats({ songs, videos, disk: data.storage || '0.0' });
        }
    } catch (err) {}
  };

  const handlePlaylist = async (playlistUrl) => {
      setIsProcessingPlaylist(true);
      try {
          const res = await fetch(`${API_URL}/api/playlist`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url: playlistUrl })
          });
          const data = await res.json();
          if (data.success && data.videos.length > 0) {
              const newItems = data.videos.map((vid, idx) => ({
                  id: Date.now() + idx, url: vid.url, title: vid.title, 
                  format, quality, effect, progress: 0, status: 'Queued...'
              }));
              setActiveDownloads(prev => [...newItems, ...prev]);
          } 
      } catch (e) { console.error("Playlist Error", e); }
      setIsProcessingPlaylist(false);
  };

  const addSingleToQueue = (targetUrl) => {
      const newDownload = { 
          id: Date.now(), url: targetUrl, format, quality, effect, 
          progress: 0, status: 'Queued...' 
      };
      setActiveDownloads(prev => [newDownload, ...prev]);
  };

  const processDownload = async (item) => {
    updateItemStatus(item.id, 'Downloading...', 5);
    
    // Simulate Progress (Real progress requires Socket.io, implementing fake visual feedback for now)
    const interval = setInterval(() => {
        setActiveDownloads(prev => prev.map(d => {
            if(d.id === item.id && d.progress < 90) {
                return { ...d, progress: d.progress + (d.progress < 60 ? 2 : 0.5) };
            }
            return d;
        }));
    }, 200);

    try {
        const response = await fetch(`${API_URL}/api/convert`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: item.url, type: item.format, quality: item.quality, effect: item.effect }),
        });
        
        clearInterval(interval);
        const data = await response.json();

        if (data.success) {
            updateItemStatus(item.id, 'Finalizing...', 100);
            setTimeout(() => {
                setActiveDownloads(prev => prev.filter(d => d.id !== item.id));
                fetchHistory();
            }, 800);
        } else { throw new Error("Failed"); }
    } catch (error) {
        clearInterval(interval);
        updateItemStatus(item.id, 'Failed', 0);
    }
  };

  const updateItemStatus = (id, status, progress) => {
      setActiveDownloads(prev => prev.map(item => item.id === id ? { ...item, status, ...(progress !== undefined && { progress }) } : item));
  };

  const handleDelete = async (id) => {
      if(!window.confirm("Purge file from cache?")) return;
      try {
          await fetch(`${API_URL}/api/files/${id}`, { method: 'DELETE' });
          setHistory(prev => prev.filter(item => item.id !== id));
          setSelectedIds(prev => prev.filter(sid => sid !== id));
      } catch (err) {}
  };

  const handleBulkZip = async () => {
      if(selectedIds.length === 0) return;
      try {
          const response = await fetch(`${API_URL}/api/zip`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ fileIds: selectedIds })
          });
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `MusicBox_Bundle_${selectedIds.length}.zip`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          setSelectedIds([]);
          setIsSelectMode(false);
      } catch(e) { alert("Zip Error"); }
  };

  const toggleSelection = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // --- FILTERING ---
  const filteredHistory = history.filter(item => item.type === format);
  const filteredActive = activeDownloads.filter(item => item.format === format);

  return (
    <div className="w-full bg-[#080808]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row h-[85vh] md:h-[700px]">
      
      {/* === DECORATIVE TOP LINE === */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple via-neon-blue to-transparent opacity-50 z-50"></div>

      {/* === SIDEBAR (DESKTOP) / BOTTOM BAR (MOBILE) === */}
      <div className="order-2 md:order-1 w-full md:w-20 bg-black/40 border-t md:border-t-0 md:border-r border-white/5 flex flex-row md:flex-col items-center justify-around md:justify-start py-2 md:py-6 gap-2 md:gap-6 z-40">
         {/* Logo (Desktop Only) */}
         <div className="hidden md:flex w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-blue items-center justify-center shadow-glow mb-4">
            <Zap className="text-white fill-white" size={20} />
         </div>

         {/* Nav Items */}
         <NavButton icon={Music} label="Music" active={format === 'mp3'} onClick={() => setFormat('mp3')} />
         <NavButton icon={Video} label="Video" active={format === 'mp4'} onClick={() => setFormat('mp4')} />
         <div className="w-8 h-[1px] bg-white/10 hidden md:block my-2"></div>
         <NavButton icon={Check} label="Select" active={isSelectMode} onClick={() => setIsSelectMode(!isSelectMode)} />
      </div>

      {/* === MAIN CONTENT === */}
      <div className="order-1 md:order-2 flex-1 flex flex-col relative overflow-hidden">
         
         {/* HEADER */}
         <div className="p-6 md:p-8 flex-shrink-0 border-b border-white/5 bg-[#080808]/90 backdrop-blur-xl z-30">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
               <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                     {format === 'mp3' ? 'Sonic Vault' : 'Visual Archive'}
                     <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-gray-400 font-mono">v2.4</span>
                  </h2>
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mt-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                     SYSTEM ONLINE
                  </div>
               </div>

               {/* STATS */}
               <div className="flex bg-white/5 rounded-lg border border-white/5 p-1 gap-4 px-4">
                  <StatItem label="Audio" value={stats.songs} />
                  <div className="w-[1px] bg-white/10"></div>
                  <StatItem label="Video" value={stats.videos} />
                  <div className="w-[1px] bg-white/10"></div>
                  <StatItem label="Cache" value={`${stats.disk} MB`} />
               </div>
            </div>

            {/* INPUT & SETTINGS */}
            <div className="space-y-4">
               <GlowInput 
                  value={url} 
                  onChange={(e) => setUrl(e.target.value)} 
                  disabled={isProcessingPlaylist}
                  isProcessing={isProcessingPlaylist}
                  placeholder={isProcessingPlaylist ? "Scanning Matrix..." : `Initialize ${format.toUpperCase()} Stream...`}
               />
               
               {/* FILTERS ROW */}
               <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                  {format === 'mp3' ? (
                     <>
                        <FilterPill label="Standard" active={effect === 'none'} onClick={() => setEffect('none')} />
                        <FilterPill label="Slowed + Reverb" active={effect === 'slowed'} onClick={() => setEffect('slowed')} icon={Activity} />
                        <FilterPill label="Nightcore" active={effect === 'nightcore'} onClick={() => setEffect('nightcore')} icon={Zap} />
                        <FilterPill label="Bass Boost" active={effect === 'bassboost'} onClick={() => setEffect('bassboost')} icon={Disc} />
                     </>
                  ) : (
                     <>
                        <FilterPill label="MAX Res" active={quality === 'max'} onClick={() => setQuality('max')} />
                        <FilterPill label="1080p" active={quality === '1080'} onClick={() => setQuality('1080')} />
                        <FilterPill label="720p" active={quality === '720'} onClick={() => setQuality('720')} />
                     </>
                  )}
               </div>
            </div>
         </div>

         {/* LIST VIEW (SCROLLABLE) */}
         <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 custom-scrollbar">
            <AnimatePresence>
               {/* ACTIVE DOWNLOADS */}
               {filteredActive.map((item) => (
                  <motion.div 
                     key={item.id}
                     initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                     className="bg-[#111] border border-neon-blue/30 rounded-xl p-4 relative overflow-hidden"
                  >
                     <div className="flex justify-between text-xs font-bold text-white mb-2 relative z-10">
                        <span className="truncate w-3/4">{item.url}</span>
                        <span className="text-neon-blue">{Math.round(item.progress)}%</span>
                     </div>
                     {/* Progress Bar Background */}
                     <div className="absolute bottom-0 left-0 h-1 bg-neon-blue/20 w-full">
                        <motion.div 
                           className="h-full bg-neon-blue shadow-[0_0_10px_#3B82F6]" 
                           animate={{ width: `${item.progress}%` }} 
                        />
                     </div>
                     <div className="text-[10px] text-gray-500 font-mono uppercase mt-2">{item.status}</div>
                  </motion.div>
               ))}

               {/* HISTORY ITEMS */}
               {filteredHistory.map((file) => (
                  <motion.div 
                     layout
                     key={file.id}
                     onClick={() => isSelectMode && toggleSelection(file.id)}
                     className={clsx(
                        "group flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 cursor-pointer",
                        selectedIds.includes(file.id) 
                           ? "bg-neon-purple/10 border-neon-purple/50" 
                           : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
                     )}
                  >
                     {/* THUMBNAIL */}
                     <div className="relative w-12 h-12 rounded-lg bg-black overflow-hidden shrink-0">
                        {file.thumbnail ? (
                           <img src={file.thumbnail} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" alt="" />
                        ) : (
                           <div className="flex items-center justify-center h-full"><Music size={16} className="text-gray-600"/></div>
                        )}
                        {/* Play Overlay */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                           <Play size={16} className="fill-white text-white"/>
                        </div>
                     </div>

                     {/* INFO */}
                     <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">{file.title}</h4>
                        <div className="flex items-center gap-3 text-[10px] font-mono text-gray-500 mt-1 uppercase">
                           <span className={file.type === 'mp4' ? 'text-blue-400' : 'text-emerald-400'}>{file.type}</span>
                           <span>{file.size} MB</span>
                           {file.effect !== 'none' && <span className="text-neon-purple">{file.effect}</span>}
                        </div>
                     </div>

                     {/* ACTIONS */}
                     {!isSelectMode ? (
                        <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition">
                           <button 
                              onClick={(e) => { e.stopPropagation(); handleDelete(file.id); }} 
                              className="p-2 text-gray-600 hover:text-red-500 transition"
                           >
                              <Trash2 size={16}/>
                           </button>
                           <a 
                              href={`${API_URL}/downloads/${file.filename}`} 
                              download
                              className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition shadow-glow"
                           >
                              <Download size={16} />
                           </a>
                        </div>
                     ) : (
                        <div className={clsx("w-5 h-5 rounded-full border flex items-center justify-center", selectedIds.includes(file.id) ? "bg-neon-purple border-neon-purple" : "border-gray-600")}>
                           {selectedIds.includes(file.id) && <Check size={12} className="text-white"/>}
                        </div>
                     )}
                  </motion.div>
               ))}
            </AnimatePresence>

            {/* EMPTY STATE */}
            {filteredHistory.length === 0 && filteredActive.length === 0 && (
               <div className="h-40 flex flex-col items-center justify-center opacity-30">
                  <div className="w-16 h-16 border border-dashed border-white rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                     {format === 'mp3' ? <Disc size={30}/> : <Activity size={30}/>}
                  </div>
                  <p className="mt-4 font-mono text-xs tracking-widest">VAULT EMPTY</p>
               </div>
            )}
         </div>

         {/* BULK ACTION BAR */}
         <AnimatePresence>
            {isSelectMode && selectedIds.length > 0 && (
               <motion.div 
                  initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#111] border border-neon-purple/50 rounded-full px-6 py-3 flex items-center gap-6 shadow-[0_0_30px_-10px_rgba(168,85,247,0.5)] z-50 whitespace-nowrap"
               >
                  <span className="text-xs font-bold text-white font-mono">{selectedIds.length} FILES SELECTED</span>
                  <button onClick={handleBulkZip} className="flex items-center gap-2 text-neon-purple hover:text-white transition font-bold text-xs">
                     <Package size={14} /> ARCHIVE (.ZIP)
                  </button>
               </motion.div>
            )}
         </AnimatePresence>

      </div>
    </div>
  );
};

// --- SUB COMPONENTS ---

const NavButton = ({ icon: Icon, label, active, onClick }) => (
   <button 
      onClick={onClick}
      className={clsx(
         "w-10 h-10 md:w-12 md:h-12 rounded-xl flex flex-col md:flex-row items-center justify-center transition-all duration-300",
         active ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]" : "text-gray-600 hover:text-white"
      )}
   >
      <Icon size={20} />
      {/* Label only visible on mobile if needed, or tooltip */}
   </button>
);

const StatItem = ({ label, value }) => (
   <div className="flex flex-col items-center md:items-start">
      <span className="text-xs font-bold text-white font-mono">{value}</span>
      <span className="text-[8px] text-gray-500 uppercase tracking-widest">{label}</span>
   </div>
);

export default MusicBox;