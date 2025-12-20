/* --- frontend/src/pages/AuthPages.js --- */
/* THEME: BOLD MINIMALIST (V3.0) */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

// --- BACKGROUND VISUALS (Subtle Liquid) ---
const LiquidFilter = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0 }}>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
      <feComposite in="SourceGraphic" in2="goo" operator="atop" />
    </filter>
  </svg>
);

const ChromeBlob = ({ className }) => (
  <motion.div 
    animate={{ 
      borderRadius: ["60% 40% 30% 70%/60% 30% 70% 40%", "30% 60% 70% 40%/50% 60% 30% 60%", "60% 40% 30% 70%/60% 30% 70% 40%"],
      rotate: [0, 180, 360]
    }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    className={`absolute bg-gradient-to-br from-gray-100 to-gray-300 blur-2xl opacity-50 ${className}`} 
  />
);

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000/api' 
    : (process.env.REACT_APP_API_URL || 'https://musicbox.life/api');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server connection failed.");
      }

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Action Failed');

      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/tools');
      } else {
        setIsLogin(true);
        setError('Account created successfully. Please sign in.');
        setLoading(false);
      }

    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex items-center justify-center p-6 relative overflow-hidden font-sans text-slate-900">
      <LiquidFilter />
      
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none gooey-wrapper">
        <ChromeBlob className="w-[60vw] h-[60vw] top-[-20%] left-[-20%]" />
        <ChromeBlob className="w-[50vw] h-[50vw] bottom-[-20%] right-[-20%]" />
      </div>

      {/* Back Link */}
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-black transition-colors z-50">
        <ArrowLeft size={18} /> Back
      </Link>

      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-[420px]"
      >
        {/* THE BOLD CARD */}
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)]">
          
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-3 text-slate-900">
              {isLogin ? 'Hello.' : 'Join.'}
            </h1>
            <p className="text-slate-500 font-medium text-base">
              {isLogin ? 'Welcome back. Sign in to continue.' : 'Create an account to start downloading.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} 
                  animate={{ height: 'auto', opacity: 1 }} 
                  exit={{ height: 0, opacity: 0 }} 
                  className="overflow-hidden"
                >
                  <SmoothInput name="username" placeholder="Username" onChange={handleChange} />
                </motion.div>
              )}
            </AnimatePresence>
            
            <SmoothInput name="email" type="email" placeholder="Email address" onChange={handleChange} />
            <SmoothInput name="password" type="password" placeholder="Password" onChange={handleChange} />
            
            {error && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 rounded-xl flex items-center gap-3 text-red-600 text-sm font-semibold">
                <AlertCircle size={18} /> {error}
              </motion.div>
            )}

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading} 
              className="w-full bg-black text-white font-bold text-lg py-4 rounded-xl hover:bg-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-black/20 mt-4"
            >
              {loading ? <Loader2 className="animate-spin mx-auto" /> : (isLogin ? 'Sign In' : 'Create Account')}
            </motion.button>
          </form>

          {/* Toggle */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 font-medium">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => { setIsLogin(!isLogin); setError(''); }} 
                className="text-black font-bold underline underline-offset-4 hover:text-slate-600 transition-colors"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

// --- SMOOTH INPUT COMPONENT ---
const SmoothInput = ({ ...props }) => (
  <motion.div className="relative group">
    <input 
      {...props} 
      required 
      className="w-full bg-[#F0F2F5] border-2 border-transparent rounded-xl px-5 py-4 text-slate-900 placeholder-slate-400 font-medium text-base outline-none transition-all duration-300 focus:bg-white focus:border-black/10 focus:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]" 
    />
  </motion.div>
);

export default AuthPages;