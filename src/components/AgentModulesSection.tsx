import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Cpu } from 'lucide-react';

const LIME_GREEN = "#39FF14";

interface Module {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const MODULES: Module[] = [
  { id: 1, category: "Predictive Analytics", title: "FORECASTING", image: "https://picsum.photos/seed/forecast/1000/1000", description: "Advanced predictive temporal analytics to model future node states and network behavior." },
  { id: 2, category: "Lineage Tracking", title: "TIME THREAD", image: "https://picsum.photos/seed/time/1000/1000", description: "Immutable timeline tracking of the AI agent's evolutionary lineage and decision history." },
  { id: 3, category: "Sandbox Environment", title: "SIMULATIONS", image: "https://picsum.photos/seed/simulations/1000/1000", description: "Isolated execution environments for testing theoretical agent strategies in parallel timelines." },
  { id: 4, category: "Command Center", title: "TEMPORAL HUB", image: "https://picsum.photos/seed/hub/1000/1000", description: "The central nexus for cross-temporal synchronization and agent state management." },
  { id: 5, category: "Mission Logs", title: "TASK", image: "https://picsum.photos/seed/task/1000/1000", description: "Execution logs and objective queues governing the autonomous actions of the agent cluster." },
  { id: 6, category: "Reward Mechanics", title: "AIRDROP", image: "https://picsum.photos/seed/airdrop/1000/1000", description: "Automated distribution mechanics for network participation and temporal compute contributions." },
  { id: 7, category: "Network Economy", title: "TOKENOMICS", image: "https://picsum.photos/seed/token/1000/1000", description: "The mathematical architecture of the agent economy, ensuring sustainable incentive alignment." },
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
    <section id="modules" className="min-h-screen py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative vertical line */}
      <div className="absolute left-[10%] top-0 h-full w-[1px] bg-white opacity-5 hidden lg:block"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <header className="mb-16">
          <h2 className="text-4xl font-black tracking-tight uppercase mb-2">Agent Modules</h2>
          <p className="text-xs text-zinc-500 uppercase tracking-[0.3em]">Initialize subsystems for full autonomy</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Gallery Sidebar */}
          <div className="relative group">
            <div className="absolute inset-0 bg-neon-lime/5 rounded-[40px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                 key={currentIndex}
                 initial={{ opacity: 0, x: -50 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 50 }}
                 className="relative overflow-hidden aspect-square rounded-3xl border border-white/10 bg-black shadow-2xl"
              >
                <img 
                  src={currentModule.image} 
                  alt={currentModule.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex gap-4 mt-8">
              <button 
                onClick={prev}
                className="p-4 bg-zinc-900 rounded-full hover:bg-neon-lime hover:text-black transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={next}
                className="p-4 bg-zinc-900 rounded-full hover:bg-neon-lime hover:text-black transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Module Details */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-neon-lime tracking-[0.4em] uppercase">{currentModule.category}</span>
                  <h3 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">{currentModule.title}</h3>
                </div>

                <p className="text-zinc-400 text-lg max-w-lg leading-relaxed">
                  {currentModule.description}
                </p>

                <div className="flex items-center gap-8 border-y border-white/5 py-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Status</span>
                    <span className="text-2xl font-bold text-neon-lime">OFFLINE</span>
                  </div>
                  <div className="flex-1"></div>
                  <button 
                    onClick={() => onPurchase(currentModule)}
                    className="flex items-center gap-3 bg-neon-lime text-black px-12 py-6 rounded-full font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(57,255,20,0.3)]"
                  >
                    <Cpu size={20} />
                    Initialize
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-16 flex justify-between items-center opacity-20 uppercase text-[10px] font-bold tracking-[0.2em]">
              <span>Quant Network Core</span>
              <span>Node ID: {currentModule.id}00X-SYS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
