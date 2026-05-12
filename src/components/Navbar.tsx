import React from 'react';
import { Twitter, Instagram, Globe, User } from 'lucide-react';
import { motion } from 'motion/react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-8 backdrop-blur-md bg-black/20 border-b border-white/5">
      <div className="flex items-center gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-black tracking-tighter uppercase flex items-center gap-2"
        >
          <span className="text-neon-lime">Quant</span>
          <span>AI</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-6 text-[10px] font-bold tracking-[0.2em] uppercase opacity-50">
          <a href="#modules" className="hover:text-neon-lime transition-colors">Modules</a>
          <a href="#hub" className="hover:text-neon-lime transition-colors">Temporal Hub</a>
          <a href="#network" className="hover:text-neon-lime transition-colors">Network</a>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-4 text-zinc-500">
          <a href="#" className="hover:text-white transition-colors"><Twitter size={16} /></a>
          <a href="#" className="hover:text-white transition-colors"><Instagram size={16} /></a>
        </div>
        
        <div className="h-6 w-[1px] bg-white/10 hidden sm:block"></div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest opacity-80 border-r border-white/10 pr-4 mr-2">
            <Globe size={14} className="text-neon-lime" />
            <span className="hidden xs:inline">SYSTEM ONLINE</span>
          </div>
          <button className="p-2 rounded-full border border-white/10 hover:border-neon-lime transition-colors">
            <User size={18} className="text-neon-lime" />
          </button>
        </div>
      </div>
    </nav>
  );
}
