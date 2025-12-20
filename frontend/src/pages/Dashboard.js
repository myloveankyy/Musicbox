import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LogOut, LayoutDashboard, HardDrive, 
  Clock, Activity, Zap, ExternalLink, ShieldCheck 
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ totalDownloads: 0 });
  const [loading, setLoading] = useState(true);

  // --- 1. INITIALIZE & FETCH DATA ---
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(storedUser));
    fetchUserData(token);
  }, [navigate]);

  const fetchUserData = async (token) => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    
    try {
      // Parallel Fetch
      const [histRes, statRes] = await Promise.all([
        fetch(`${API_URL}/user/history`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_URL}/user/stats`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      const histData = await histRes.json();
      const statData = await statRes.json();

      if (histData.success) setHistory(histData.history);
      if (statData.totalDownloads) setStats(statData);
      
    } catch (err) {
      console.error("Dashboard Sync Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. ACTIONS ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-pulse text-slate-500 font-mono text-sm">DECRYPTING ARCHIVES...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500/30">
      
      {/* BACKGROUND NOISE */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-[#0a0a0a] -z-10" />

      {/* --- SIDEBAR (Mobile Compatible) --- */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-900/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold tracking-tight hidden sm:block">COMMAND CENTER</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end mr-2">
            <span className="text-xs font-bold text-slate-200">{user?.username}</span>
            <span className="text-[10px] text-indigo-400 font-mono">ENCRYPTION: ACTIVE</span>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-red-400"
            title="Terminate Session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="pt-24 pb-20 max-w-6xl mx-auto px-6">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl font-bold tracking-tighter mb-2">Operational Status</h1>
          <p className="text-slate-400 font-mono text-sm">System Ready. Unlimited Bandwidth Authorized.</p>
        </motion.div>

        {/* STAT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard 
            icon={HardDrive} 
            label="Total Extractions" 
            value={stats.totalDownloads} 
            sub="Lifetime" 
          />
          <StatCard 
            icon={ShieldCheck} 
            label="Security Level" 
            value="CLASS A" 
            sub="Rate Limits: Bypassed" 
            color="text-green-400"
          />
          <StatCard 
            icon={Zap} 
            label="System Latency" 
            value="12ms" 
            sub="Optimal" 
            color="text-yellow-400"
          />
        </div>

        {/* HISTORY FEED */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold tracking-wide">RECENT EXTRACTIONS</h3>
            </div>
            <Link to="/tools/youtube" className="text-[10px] font-bold bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 rounded text-white transition-colors">
              NEW OPERATION
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {history.length > 0 ? (
              history.map((log, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 uppercase shrink-0">
                      {log.platform.substring(0,2)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-200 truncate pr-4">{log.title}</p>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {new Date(log.timestamp).toLocaleDateString()} • {log.type || 'MP4'}
                      </p>
                    </div>
                  </div>
                  <a 
                    href={log.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 text-slate-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-500 font-mono text-sm">
                NO OPERATIONS RECORDED.
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
};

// Sub-component
const StatCard = ({ icon: Icon, label, value, sub, color = "text-white" }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 p-4 opacity-20 ${color}`}>
      <Icon className="w-16 h-16 transform rotate-12 translate-x-4 -translate-y-4" />
    </div>
    <div className="relative z-10">
      <div className="flex items-center gap-2 text-slate-400 mb-2">
        <Icon className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
      </div>
      <div className={`text-3xl font-bold tracking-tight mb-1 ${color}`}>{value}</div>
      <div className="text-[10px] font-mono text-slate-500">{sub}</div>
    </div>
  </motion.div>
);

export default Dashboard;