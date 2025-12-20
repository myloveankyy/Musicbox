import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Menu, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center text-white shadow-lg group-hover:shadow-indigo-500/30 transition-all">
              <Box size={20} strokeWidth={3} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              MusicBox<span className="text-indigo-600">.life</span>
            </span>
          </Link>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex space-x-8">
            <Link to="/tools" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">All Tools</Link>
            <Link to="/pricing" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Pricing</Link>
            <Link to="/blog" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Blog</Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/login" className="hidden md:flex text-sm font-medium text-slate-600 hover:text-slate-900">
              Log in
            </Link>
            <Link to="/signup" className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
              <span>Get Started</span>
              <User size={16} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;