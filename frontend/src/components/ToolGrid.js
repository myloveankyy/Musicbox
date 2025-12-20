import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { TOOLS_DATA } from '../data/tools';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

const ToolGrid = () => {
  // Flatten tools for a clean grid
  const allTools = TOOLS_DATA.flatMap(cat => cat.tools.map(t => ({...t, category: cat.category})));

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 max-w-[1600px] mx-auto pb-24"
    >
      {allTools.map((tool) => {
        const Icon = tool.icon;
        return (
          <motion.div variants={item} key={tool.id}>
            <Link 
              to={`/tools/general/${tool.slug}`}
              className="group relative flex flex-col justify-between h-[200px] bg-white rounded-2xl p-6 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-slate-100"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-[#111] group-hover:text-white transition-colors duration-300">
                  <Icon size={18} strokeWidth={2} />
                </div>
                <ArrowUpRight size={16} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                  {tool.category.split(" ")[0]}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{tool.name}</h3>
                <p className="text-xs text-slate-500 font-medium line-clamp-2">{tool.desc}</p>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ToolGrid;