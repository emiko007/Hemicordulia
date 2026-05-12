import React from 'react';
import { motion } from 'motion/react';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/ai-network/1920/1080" 
          alt="Neural Network"
          className="w-full h-full object-cover opacity-30 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
        
        {/* Dynamic Glows */}
        <div className="absolute top-[30%] right-[20%] w-[500px] h-[500px] bg-neon-lime/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Typography */}
        <div className="lg:col-span-1 flex items-center hidden lg:flex">
          <span className="text-[12px] tracking-[1em] uppercase font-bold text-zinc-600 [writing-mode:vertical-rl] rotate-180">
            TEMPORAL AI AGENT
          </span>
        </div>

        {/* Center Content */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-start gap-4"
          >
            <div className="flex flex-col text-[120px] md:text-[200px] lg:text-[260px] font-black leading-[0.75] tracking-tighter select-none">
              <span className="text-neon-lime">N</span>
              <span>O</span>
              <span>D</span>
              <span>E</span>
            </div>
            
            <div className="mt-8 md:mt-24 max-w-[280px]">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-sm md:text-md uppercase tracking-[0.2em] leading-relaxed mb-8"
              >
                The autonomous intelligence network is here. Experience the future of decentralized temporal simulations.
              </motion.p>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs font-bold tracking-[0.3em] uppercase border-b-2 border-neon-lime pb-2 hover:text-neon-lime transition-colors"
              >
                Initialize Agent
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Showcase Accessory */}
        <div className="lg:col-span-3 flex flex-col items-end justify-center lg:h-full">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-right"
          >
            <span className="text-[140px] md:text-[200px] font-black leading-none tracking-tighter block">X</span>
            <span className="text-xs font-bold tracking-[0.4em] text-zinc-500 uppercase -mt-4 block pr-2">
              System Active
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <span className="text-[8px] uppercase tracking-[0.5em] [writing-mode:vertical-rl]">Scroll</span>
        <div className="w-[1px] h-12 bg-white"></div>
      </div>
    </section>
  );
}
