import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, Mail, Lock, User, ArrowRight, Github, Chrome, 
  ChevronLeft, Globe, Shield, Star 
} from 'lucide-react';

// --- SEO HEAD INJECTION (Simulated) ---
const SEOHead = ({ title }) => (
  <div className="sr-only">
    <h1>{title} - MusicBox Secure Gateway</h1>
    <p>Login to MusicBox to manage 4K video downloads, access the API, and sync your library across devices.</p>
  </div>
);

// --- COMPONENT: MOUSE SPOTLIGHT CARD ---
// This creates the "Glowing Border" that follows your cursor
const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-3xl bg-[#0f172a]/40 border border-white/10 backdrop-blur-xl ${className}`}
    >
      {/* The Moving Spotlight Gradient */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />
      {/* The Content */}
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// --- COMPONENT: ANIMATED INPUT ---
const Input = ({ icon: Icon, type, placeholder, id }) => (
  <div className="group relative">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-focus-within:opacity-20 transition duration-500 blur-md"></div>
    <div className="relative flex items-center bg-[#020617]/50 border border-white/10 rounded-xl px-4 py-3.5 transition-all duration-300 group-focus-within:border-blue-500/50 group-focus-within:bg-[#020617]/80">
      <Icon className="text-gray-500 group-focus-within:text-blue-400 transition-colors duration-300" size={18} />
      <input 
        id={id}
        name={id}
        type={type} 
        placeholder={placeholder} 
        className="w-full bg-transparent outline-none ml-3 text-white placeholder-gray-600 font-medium text-sm"
        required
      />
    </div>
  </div>
);

// --- BACKGROUND EFFECTS ---
const NebulaBackground = () => (
  <div className="fixed inset-0 z-0 bg-[#020617] overflow-hidden">
    <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-purple-900/20 rounded-full blur-[120px] animate-pulse"></div>
    <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]"></div>
    {/* Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
  </div>
);

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const toggleVariant = {
    initial: { opacity: 0, x: isLogin ? -20 : 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isLogin ? 20 : -20 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative font-sans text-white p-4">
      <SEOHead title={isLogin ? "Sign In" : "Create Account"} />
      <NebulaBackground />

      {/* BACK BUTTON */}
      <Link to="/" className="absolute top-8 left-8 z-20 flex items-center gap-2 text-gray-500 hover:text-white transition group">
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10">
           <ChevronLeft size={16} />
        </div>
        <span className="text-sm font-medium">Back to Signal</span>
      </Link>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 w-full max-w-[420px]">
        
        {/* LOGO */}
        <div className="flex justify-center mb-8">
           <motion.div 
             initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
             className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]"
           >
              <Zap size={32} className="text-white fill-white"/>
           </motion.div>
        </div>

        {/* GLASS CARD */}
        <SpotlightCard className="shadow-2xl">
          <div className="p-8 md:p-10">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "signup"}
                variants={toggleVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-2">
                    {isLogin ? "Welcome back" : "Join the Network"}
                  </h1>
                  <p className="text-gray-500 text-sm">
                    {isLogin ? "Enter your credentials to access the vault." : "Create your decentralized identity."}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && <Input id="name" icon={User} type="text" placeholder="Username" />}
                  <Input id="email" icon={Mail} type="email" placeholder="Email Address" />
                  <Input id="password" icon={Lock} type="password" placeholder="Password" />

                  {isLogin && (
                    <div className="flex justify-end">
                      <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition">Forgot password?</a>
                    </div>
                  )}

                  <button className="w-full py-3.5 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 mt-2 group relative overflow-hidden">
                    <span className="relative z-10">{isLogin ? "Authenticate" : "Initialize Account"}</span>
                    <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-black/10 to-transparent z-0"></div>
                  </button>
                </form>
              </motion.div>
            </AnimatePresence>

            {/* DIVIDER */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0f172a] px-2 text-gray-500">Or continue with</span></div>
            </div>

            {/* SOCIALS */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#020617]/50 border border-white/10 hover:bg-white/5 hover:border-white/20 transition text-sm font-medium text-gray-300 hover:text-white">
                <Chrome size={16} /> Google
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#020617]/50 border border-white/10 hover:bg-white/5 hover:border-white/20 transition text-sm font-medium text-gray-300 hover:text-white">
                <Github size={16} /> GitHub
              </button>
            </div>

          </div>
          
          {/* BOTTOM TOGGLE BAR */}
          <div className="p-4 bg-black/20 border-t border-white/5 text-center">
            <p className="text-sm text-gray-500">
              {isLogin ? "New to MusicBox?" : "Already have an ID?"}{" "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-blue-400 font-bold hover:text-blue-300 transition ml-1">
                {isLogin ? "Create Account" : "Sign In"}
              </button>
            </p>
          </div>
        </SpotlightCard>

        {/* SEO FOOTER (TRUST SIGNALS) */}
        <div className="mt-8 flex justify-center gap-6 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
           <span className="flex items-center gap-1.5"><Shield size={10} className="text-green-500"/> SSL Encrypted</span>
           <span className="flex items-center gap-1.5"><Globe size={10} className="text-blue-500"/> Global CDN</span>
           <span className="flex items-center gap-1.5"><Star size={10} className="text-yellow-500"/> 5/5 Rating</span>
        </div>

      </div>
    </div>
  );
};

export default AuthPages;