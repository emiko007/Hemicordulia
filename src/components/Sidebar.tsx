import React from 'react';
import { Activity, Globe, Users, Wrench, Map, CheckCircle, Gift, Coins } from 'lucide-react';
import { motion } from 'motion/react';

export type ViewState = 'modules' | 'temporal_engine' | 'network' | 'community' | 'builders' | 'roadmap' | 'tasks' | 'airdrops' | 'tokenomics';

interface SidebarProps {
  activeView: ViewState;
  setActiveView: (view: ViewState) => void;
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const mainNavItems: { id: ViewState; label: string; icon: React.ReactNode; category: string }[] = [
    // Dashboard & Studio
    { id: 'modules', label: 'Dashboard', icon: <Activity size={18} />, category: 'Core' },
    { id: 'temporal_engine', label: 'Temporal Hub', icon: <Globe size={18} />, category: 'Core' },

    // Analytics & Data
    { id: 'tasks', label: 'Tasks', icon: <CheckCircle size={18} />, category: 'Analytics' },
    { id: 'tokenomics', label: 'Tokenomics', icon: <Coins size={18} />, category: 'Analytics' },

    // Community & Collaboration
    { id: 'community', label: 'Community', icon: <Users size={18} />, category: 'Collab' },
    { id: 'builders', label: 'Builders', icon: <Wrench size={18} />, category: 'Collab' },

    // Rewards & Growth
    { id: 'airdrops', label: 'Airdrops', icon: <Gift size={18} />, category: 'Growth' },
    { id: 'roadmap', label: 'Roadmap', icon: <Map size={18} />, category: 'Growth' },
    { id: 'network', label: 'Network', icon: <Globe size={18} />, category: 'Growth' },
  ];

  const categories = ['Core', 'Analytics', 'Collab', 'Growth'];

  return (
    <aside className="w-64 h-screen glass border-r border-cyan-neon/10 relative flex flex-col shrink-0 overflow-hidden">
      {/* Animated glow border */}
      <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-cyan-neon/30 via-magenta-neon/10 to-transparent shadow-[2px_0_20px_rgba(0,217,255,0.2)]"></div>

      <div className="p-6 pb-4 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2 group cursor-pointer">
            <span className="text-cyan-neon drop-shadow-[0_0_15px_rgba(0,217,255,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(0,217,255,0.8)]">
              QUANT
            </span>
            <span className="text-white group-hover:text-magenta-neon transition-colors">AI</span>
          </div>
          <p className="text-[9px] text-zinc-500 uppercase tracking-[0.15em] mt-1 font-medium">Neural Intelligence</p>
        </motion.div>

        {/* Navigation with categories */}
        <nav className="flex flex-col gap-6">
          {categories.map((category) => {
            const itemsInCategory = mainNavItems.filter(item => item.category === category);
            if (itemsInCategory.length === 0) return null;

            return (
              <div key={category} className="flex flex-col gap-2">
                {/* Category label */}
                <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-600 px-4">
                  {category === 'Core' && '⚡ Core'}
                  {category === 'Analytics' && '📊 Analytics'}
                  {category === 'Collab' && '👥 Collaboration'}
                  {category === 'Growth' && '🚀 Growth'}
                </p>

                {/* Items */}
                {itemsInCategory.map((item) => {
                  const isActive = activeView === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveView(item.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-widest transition-all relative overflow-hidden group ${
                        isActive
                          ? 'text-black bg-gradient-to-r from-cyan-neon to-magenta-neon shadow-[0_0_20px_rgba(0,217,255,0.4)]'
                          : 'text-zinc-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-cyan-neon to-magenta-neon"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      <div className={`relative z-10 flex items-center gap-3 ${isActive ? 'text-black' : ''}`}>
                        <span className={isActive ? 'text-black' : 'text-zinc-500 group-hover:text-cyan-neon'}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom status indicator */}
      <div className="mt-auto p-6 border-t border-white/10 relative z-10">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-3"
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-neon to-magenta-neon shadow-[0_0_10px_rgba(0,217,255,0.8)]"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">System Online</span>
        </motion.div>
      </div>
    </aside>
  );
}
