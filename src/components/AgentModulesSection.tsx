import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Cpu, Sparkles } from 'lucide-react';

interface Module {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const MODULES: Module[] = [
  { id: 1, category: "Predictive Analytics", title: "FORECASTING", image: "https://picsum.photos/seed/analytics-chart/1000/1000", description: "Advanced predictive temporal analytics to model future node states and network behavior." },
  { id: 2, category: "Lineage Tracking", title: "TIME THREAD", image: "https://picsum.photos/seed/network-connection/1000/1000", description: "Immutable timeline tracking of the AI agent's evolutionary lineage and decision history." },
  { id: 3, category: "Sandbox Environment", title: "SIMULATIONS", image: "https://picsum.photos/seed/digital-environment/1000/1000", description: "Isolated execution environments for testing theoretical agent strategies in parallel timelines." },
  { id: 4, category: "Command Center", title: "TEMPORAL HUB", image: "https://picsum.photos/seed/command-center/1000/1000", description: "The central nexus for cross-temporal synchronization and agent state management." },
];

interface AgentModulesSectionProps {
  onPurchase: (module: Module) => void;
}

export function AgentModulesSection({ onPurchase }: AgentModulesSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % MODULES.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + MODULES.length) % MODULES.length);

  const currentModule = MODULES[currentIndex];

  return (
    <section id="modules" className="min-h-screen py-24 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute left-[10%] top-[20%] w-[600px] h-[600px] bg-cyan-neon/20 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="absolute right-[5%] bottom-[10%] w-[500px] h-[500px] bg-magenta-neon/15 rounded-full blur-[140px]"
      />

      {/* Decorative vertical line */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute left-[10%] top-0 h-full w-[1px] bg-gradient-to-b from-cyan-neon via-magenta-neon to-transparent hidden lg:block"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={20} className="text-cyan-neon" />
              <span className="text-xs font-bold text-cyan-neon uppercase tracking-widest">Featured Modules</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight uppercase mb-2 bg-gradient-to-r from-cyan-neon via-white to-magenta-neon bg-clip-text text-transparent">
              Agent Modules
            </h2>
            <p className="text-xs text-zinc-500 uppercase tracking-[0.3em]">Initialize subsystems for full autonomy</p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Gallery Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 glass rounded-[40px] blur-3xl opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden aspect-square rounded-3xl glass border-cyan-neon/30 shadow-[0_0_40px_rgba(0,217,255,0.2)]"
              >
                <img
                  src={currentModule.image}
                  alt={currentModule.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                {/* Module indicator */}
                <div className="absolute bottom-6 left-6 glass rounded-lg px-4 py-2">
                  <p className="text-xs font-bold text-cyan-neon">
                    {currentIndex + 1} / {MODULES.length}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={prev}
                className="p-4 glass border-cyan-neon/30 rounded-full hover:bg-cyan-neon/10 transition-all"
              >
                <ChevronLeft size={24} className="text-cyan-neon" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255, 0, 110, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={next}
                className="p-4 glass border-magenta-neon/30 rounded-full hover:bg-magenta-neon/10 transition-all"
              >
                <ChevronRight size={24} className="text-magenta-neon" />
              </motion.button>
            </div>
          </motion.div>

          {/* Module Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <motion.span
                    animate={{ color: ['#00D9FF', '#FF006E', '#00D9FF'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-[10px] font-bold tracking-[0.4em] uppercase"
                  >
                    {currentModule.category}
                  </motion.span>
                  <h3 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none bg-gradient-to-r from-cyan-neon via-white to-magenta-neon bg-clip-text text-transparent">
                    {currentModule.title}
                  </h3>
                </div>

                <p className="text-zinc-300 text-lg max-w-lg leading-relaxed">
                  {currentModule.description}
                </p>

                <div className="flex items-center gap-8 border-y border-cyan-neon/20 py-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Status</span>
                    <motion.span
                      animate={{ color: ['#FF006E', '#00D9FF', '#FF006E'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-2xl font-bold drop-shadow-[0_0_10px_rgba(255,0,110,0.5)]"
                    >
                      OFFLINE
                    </motion.span>
                  </div>
                  <div className="flex-1"></div>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 217, 255, 0.6)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onPurchase(currentModule)}
                    className="flex items-center gap-3 bg-gradient-to-r from-cyan-neon to-magenta-neon text-black px-12 py-6 rounded-full font-black uppercase tracking-widest transition-all"
                  >
                    <Cpu size={20} />
                    Initialize
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mt-16 flex justify-between items-center uppercase text-[10px] font-bold tracking-[0.2em] text-zinc-600"
            >
              <span>Quant Network Core</span>
              <span>Node ID: {currentModule.id}00X-SYS</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
