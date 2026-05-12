import React from 'react';
import { Map, Milestone, PlayCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface RoadmapItem {
  id: number;
  title: string;
  category: string;
  votes: number;
}

const ROADMAP_DATA = {
  planned: [
    { id: 1, title: 'Solana Network Integration', category: 'Infrastructure', votes: 1204 },
    { id: 2, title: 'Custom AI Prediction Models', category: 'Core Engine', votes: 892 },
  ],
  inProgress: [
    { id: 3, title: 'Automated Airdrop Claiming', category: 'Feature', votes: 2150 },
    { id: 4, title: 'Mobile Companion App', category: 'Platform', votes: 1540 },
  ],
  shipped: [
    { id: 5, title: 'Temporal Reasoning Engine v1.0', category: 'Core Engine', votes: 3400 },
    { id: 6, title: 'Unified Feedback System', category: 'Community', votes: 560 },
    { id: 7, title: 'Real-time News Alerts', category: 'Feature', votes: 1120 },
  ]
};

export function RoadmapView() {
  return (
    <div className="h-full flex flex-col p-6 gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="border-b border-white/10 pb-6 shrink-0">
        <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-3 mb-2">
          <Map className="text-neon-lime" size={32} /> Public Roadmap
        </h1>
        <p className="text-xs text-zinc-500 uppercase tracking-[0.2em]">Transparent Development Pipeline</p>
      </header>

      {/* Kanban Board */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
        
        {/* Planned Column */}
        <div className="flex flex-col bg-[#050505] border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/5 bg-zinc-900/50 flex items-center gap-3">
            <Milestone className="text-blue-400" size={18} />
            <h3 className="font-bold uppercase tracking-widest text-xs text-zinc-300">Planned</h3>
            <span className="ml-auto bg-white/10 px-2 py-0.5 rounded text-[10px] font-mono">{ROADMAP_DATA.planned.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {ROADMAP_DATA.planned.map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                key={item.id} className="bg-zinc-900/40 p-4 rounded-xl border border-white/5 hover:border-blue-400/30 transition-colors"
              >
                <div className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2">{item.category}</div>
                <h4 className="text-sm font-bold text-white leading-tight mb-4">{item.title}</h4>
                <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
                  <span className="text-blue-400">▲</span> {item.votes} votes
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="flex flex-col bg-[#050505] border border-white/5 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(57,255,20,0.05)]">
          <div className="p-4 border-b border-white/5 bg-neon-lime/5 flex items-center gap-3">
            <PlayCircle className="text-neon-lime" size={18} />
            <h3 className="font-bold uppercase tracking-widest text-xs text-neon-lime">In Progress</h3>
            <span className="ml-auto bg-neon-lime/20 text-neon-lime px-2 py-0.5 rounded text-[10px] font-mono">{ROADMAP_DATA.inProgress.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
             <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-neon-lime to-transparent opacity-20"></div>
            {ROADMAP_DATA.inProgress.map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                key={item.id} className="bg-zinc-900/80 p-4 rounded-xl border border-neon-lime/20 shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-neon-lime/5 blur-xl"></div>
                <div className="text-[9px] uppercase tracking-widest text-neon-lime/70 mb-2">{item.category}</div>
                <h4 className="text-sm font-bold text-white leading-tight mb-4 relative z-10">{item.title}</h4>
                <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
                  <span className="text-neon-lime">▲</span> {item.votes} votes
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Shipped Column */}
        <div className="flex flex-col bg-[#050505] border border-white/5 rounded-2xl overflow-hidden opacity-80">
          <div className="p-4 border-b border-white/5 bg-zinc-900/30 flex items-center gap-3">
            <CheckCircle2 className="text-zinc-500" size={18} />
            <h3 className="font-bold uppercase tracking-widest text-xs text-zinc-400">Shipped</h3>
            <span className="ml-auto bg-white/5 px-2 py-0.5 rounded text-[10px] font-mono text-zinc-500">{ROADMAP_DATA.shipped.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {ROADMAP_DATA.shipped.map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                key={item.id} className="bg-zinc-900/20 p-4 rounded-xl border border-white/5"
              >
                <div className="text-[9px] uppercase tracking-widest text-zinc-600 mb-2">{item.category}</div>
                <h4 className="text-sm font-bold text-zinc-300 leading-tight mb-4 line-through decoration-zinc-600">{item.title}</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] text-zinc-600 font-mono">
                    <span>▲</span> {item.votes} votes
                  </div>
                  <span className="text-[10px] bg-white/5 text-zinc-500 px-2 py-0.5 rounded font-bold uppercase">Live</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
