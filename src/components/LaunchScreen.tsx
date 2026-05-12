import React from 'react';
import { motion } from 'motion/react';
import { Globe, User } from 'lucide-react';

const LIME_GREEN = "#39FF14";

export function LaunchScreen() {
  return (
    <div className="h-full flex flex-col bg-black text-white relative overflow-hidden font-sans select-none">
      {/* Background Image (Cracked Head Close-up) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/cracked-head/800/1200" 
          alt="Cracked Polygonal Head"
          className="w-full h-full object-cover opacity-60 grayscale brightness-50"
          referrerPolicy="no-referrer"
        />
        {/* Neon Glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
        <div className="absolute top-[40%] right-[10%] w-32 h-32 rounded-full blur-[100px] opacity-30" style={{ backgroundColor: LIME_GREEN }}></div>
      </div>

      {/* Header Content */}
      <div className="relative z-10 flex justify-between items-start p-8 mt-12">
        <div className="text-[10px] tracking-[0.2em] font-medium opacity-80 flex items-center gap-2">
           <Globe size={14} className="opacity-50" />
           <span>IVWA EVENT</span>
        </div>
        <div className="p-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm">
          <User size={18} style={{ color: LIME_GREEN }} />
        </div>
      </div>

      {/* Main Typography Layout */}
      <div className="relative z-10 flex-1 flex">
        {/* Left Vertical Label */}
        <div className="px-4 flex flex-col justify-center">
            <span className="text-[10px] tracking-[0.5em] uppercase font-bold opacity-30 [writing-mode:vertical-rl] rotate-180">
              UNION
            </span>
        </div>

        {/* Center/Main Headline Area */}
        <div className="relative flex-1 flex flex-col justify-center px-4">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex flex-col items-start leading-[0.8] font-black">
             <motion.div 
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 1, delay: 0.2 }}
               className="text-[120px] flex flex-col tracking-tighter uppercase"
             >
               <span style={{ color: LIME_GREEN }}>J</span>
               <span>U</span>
               <span>S</span>
               <span>T</span>
             </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 p-8 flex justify-between items-end">
        <div className="max-w-[140px] space-y-4">
          <p className="text-[11px] leading-relaxed tracking-wider opacity-60 uppercase">
            International annual event is here
          </p>
          <button className="text-[10px] font-bold tracking-[0.2em] uppercase border-b border-zinc-600 pb-1 hover:border-white transition-colors">
            Go to website
          </button>
        </div>

        <div className="flex flex-col items-end">
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-[100px] font-black leading-none tracking-tighter"
          >
            7
          </motion.span>
          <span className="text-[10px] font-bold tracking-[0.1em] opacity-50 uppercase -mt-2">
            on this February
          </span>
        </div>
      </div>
    </div>
  );
}
