import React from 'react';
import { Cpu, Activity, Globe, Users, Wrench, Map } from 'lucide-react';
import { motion } from 'motion/react';

export type ViewState = 'modules' | 'temporal_engine' | 'network' | 'community' | 'builders' | 'roadmap';

interface SidebarProps {
  activeView: ViewState;
  setActiveView: (view: ViewState) => void;
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const navItems: { id: ViewState; label: string; icon: React.ReactNode } = [
    { id: 'modules', label: 'MODULES', icon: <Cpu size={18} /> },
    { id: 'temporal_engine', label: 'TEMPORAL HUB', icon: <Activity size={18} /> },
    { id: 'network', label: 'NETWORK', icon: <Globe size={18} /> },
    { id: 'community', label: 'COMMUNITY', icon: <Users size={18} /> },
    { id: 'builders', label: 'BUILDERS', icon: <Wrench size={18} /> },
    { id: 'roadmap', label: 'ROADMAP', icon: <Map size={18} /> },
  ];

  return (
    <aside className="w-64 h-screen bg-[#050505] border-r border-white/5 relative flex flex-col shrink-0">
      {/* Right side subtle glow */}
      <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-neon-lime/20 to-transparent shadow-[2px_0_15px_rgba(57,255,20,0.15)]"></div>

      <div className="p-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2 mb-12"
        >
          <span className="text-neon-lime drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">QUANT</span>
          <span className="text-white">AI</span>
        </motion.div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg text-xs font-bold tracking-widest transition-all relative overflow-hidden group ${
                  isActive 
                    ? 'text-black bg-neon-lime shadow-[0_0_15px_rgba(57,255,20,0.2)]' 
                    : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-neon-lime"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`relative z-10 flex items-center gap-4 ${isActive ? 'text-black' : ''}`}>
                  <span className={isActive ? 'text-black' : 'text-zinc-500 group-hover:text-neon-lime transition-colors'}>
                    {item.icon}
                  </span>
                  {item.label}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-white/5">
        <div className="flex items-center gap-3 opacity-50">
           <div className="w-2 h-2 rounded-full bg-neon-lime animate-pulse shadow-[0_0_10px_rgba(57,255,20,0.8)]"></div>
           <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">System Online</span>
        </div>
      </div>
    </aside>
  );
}
