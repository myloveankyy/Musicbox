import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, LayoutGrid, FolderOpen, Settings, LogOut, 
  Search, Bell, CreditCard, ChevronDown, User,
  HardDrive, Activity
} from 'lucide-react';
import MusicBox from '../components/MusicBox';
import { Link } from 'react-router-dom';

// --- CONFIG ---
const USER = { name: "Ankyy Admin", email: "admin@ankyy.com", plan: "PRO" };

// --- SIDEBAR COMPONENT ---
const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`}
  >
    <Icon size={20} />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('converter');

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans flex overflow-hidden">
      
      {/* === SIDEBAR === */}
      <aside className="w-64 bg-[#0f172a]/50 backdrop-blur-xl border-r border-white/5 hidden md:flex flex-col p-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3 mb-10 px-2">
           <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap size={20} className="text-white fill-white"/>
           </div>
           <div>
              <h1 className="font-bold text-lg leading-none">MusicBox</h1>
              <span className="text-[10px] text-blue-400 font-mono tracking-widest uppercase">Console v2.5</span>
           </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
           <SidebarItem icon={LayoutGrid} label="Converter" active={activeTab === 'converter'} onClick={() => setActiveTab('converter')} />
           <SidebarItem icon={FolderOpen} label="Library" active={activeTab === 'library'} onClick={() => setActiveTab('library')} />
           <SidebarItem icon={Activity} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
           <div className="pt-8 pb-2">
              <span className="text-xs font-bold text-gray-600 uppercase px-4">System</span>
           </div>
           <SidebarItem icon={CreditCard} label="Billing & Plan" active={activeTab === 'billing'} onClick={() => setActiveTab('billing')} />
           <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        {/* User Profile */}
        <div className="mt-auto pt-6 border-t border-white/5">
           <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 flex items-center justify-center text-white font-bold">
                 {USER.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                 <h4 className="text-sm font-bold truncate">{USER.name}</h4>
                 <p className="text-xs text-gray-500 truncate">{USER.email}</p>
              </div>
              <Link to="/auth" className="text-gray-500 hover:text-red-400 transition">
                 <LogOut size={18}/>
              </Link>
           </div>
        </div>
      </aside>

      {/* === MAIN CONTENT === */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>

        {/* TOP HEADER */}
        <header className="h-20 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md flex items-center justify-between px-8 z-20">
           <h2 className="text-xl font-bold text-white capitalize">{activeTab}</h2>
           
           <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm text-gray-400">
                 <HardDrive size={14}/>
                 <span>Storage: 4.2GB / 10GB</span>
              </div>
              <button className="relative text-gray-400 hover:text-white transition">
                 <Bell size={20}/>
                 <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
           </div>
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar z-10">
           
           {activeTab === 'converter' && (
              <div className="max-w-5xl mx-auto">
                 {/* Welcome Banner */}
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-8 rounded-3xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 relative overflow-hidden"
                 >
                    <div className="relative z-10 flex justify-between items-center">
                       <div>
                          <h2 className="text-3xl font-bold text-white mb-2">Ready to extract, Admin?</h2>
                          <p className="text-blue-200">Your PRO plan enables 8K downloads and Priority Queue.</p>
                       </div>
                       <div className="hidden md:block">
                          <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition">
                             View Plan
                          </button>
                       </div>
                    </div>
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                 </motion.div>

                 {/* THE REACTOR (MusicBox Component) */}
                 <div className="bg-[#0f172a]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-1 md:p-6 shadow-2xl">
                    {/* We pass a dummy function to bypass the auth wall since we are already logged in */}
                    <MusicBox onDownloadStart={() => console.log("Authorized")} />
                 </div>
              </div>
           )}

           {activeTab === 'library' && (
              <div className="max-w-5xl mx-auto text-center py-20">
                 <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FolderOpen size={48} className="text-gray-600"/>
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2">Library Sync Active</h3>
                 <p className="text-gray-500">Your download history is automatically cached in the Converter tab.</p>
              </div>
           )}

        </div>
      </main>

    </div>
  );
};

export default Dashboard;