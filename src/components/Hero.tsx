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
          className="w-full h-full object-cover opacity-20 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>

        {/* Dynamic Glows */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-cyan-neon/15 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] bg-magenta-neon/10 rounded-full blur-[140px]"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Typography */}
        <div className="lg:col-span-1 flex items-center hidden lg:flex">
          <motion.span
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-[12px] tracking-[1em] uppercase font-bold text-cyan-neon/60 [writing-mode:vertical-rl] rotate-180"
          >
            TEMPORAL AI AGENT
          </motion.span>
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
              <motion.span
                animate={{ color: ['#00D9FF', '#FF006E', '#00D9FF'] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="drop-shadow-[0_0_20px_rgba(0,217,255,0.4)]"
              >
                N
              </motion.span>
              <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">O</span>
              <motion.span
                animate={{ color: ['#FF006E', '#00D9FF', '#FF006E'] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="drop-shadow-[0_0_20px_rgba(255,0,110,0.4)]"
              >
                D
              </motion.span>
              <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">E</span>
            </div>

            <div className="mt-8 md:mt-24 max-w-[280px]">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-sm md:text-md uppercase tracking-[0.2em] leading-relaxed mb-8 text-white"
              >
                The autonomous intelligence network is here. Experience the future of decentralized temporal simulations.
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="text-xs font-bold tracking-[0.3em] uppercase border-b-2 border-cyan-neon pb-2 text-cyan-neon hover:text-magenta-neon hover:border-magenta-neon transition-colors"
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
            <motion.span
              animate={{
                textShadow: [
                  '0 0 10px rgba(0, 217, 255, 0.3)',
                  '0 0 30px rgba(0, 217, 255, 0.6)',
                  '0 0 10px rgba(0, 217, 255, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[140px] md:text-[200px] font-black leading-none tracking-tighter block text-cyan-neon"
            >
              X
            </motion.span>
            <span className="text-xs font-bold tracking-[0.4em] text-cyan-neon/60 uppercase -mt-4 block pr-2">
              System Active
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[8px] uppercase tracking-[0.5em] [writing-mode:vertical-rl] text-cyan-neon/50">Scroll</span>
        <motion.div
          animate={{ height: [30, 50, 30] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] bg-gradient-to-b from-cyan-neon/50 to-magenta-neon/30"
        />
      </motion.div>
    </section>
  );
}
