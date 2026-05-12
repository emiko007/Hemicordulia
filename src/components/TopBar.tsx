import React, { useState } from 'react';
import { Bell, Search, User, Wallet, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TopBarProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
}

export function TopBar({ isLoggedIn, onLoginClick, onLogout }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications
  const notifications = [
    { id: 1, type: 'Suggestion', title: 'Your feature request was shipped!', time: '2h ago', unread: true },
    { id: 2, type: 'AMA', title: 'Live AMA with Vitalik starts in 10 mins', time: '10m ago', unread: true },
    { id: 3, type: 'Bug', title: 'Bug report #402 resolved.', time: '1d ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-20 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40">
      
      {/* Search */}
      <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 rounded-full px-4 py-2 w-64 focus-within:border-neon-lime/50 transition-colors">
        <Search size={16} className="text-zinc-500" />
        <input 
          type="text" 
          placeholder="Search modules, data..." 
          className="bg-transparent border-none outline-none text-xs text-white placeholder-zinc-600 w-full font-sans"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-zinc-400 hover:text-white transition-colors relative"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-neon-lime rounded-full shadow-[0_0_8px_rgba(57,255,20,0.8)]"></span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-4 w-80 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="p-4 border-b border-white/5 bg-black/50 flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-widest">Notifications</h4>
                  <span className="text-[10px] text-neon-lime cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${n.unread ? 'bg-neon-lime/5' : ''}`}>
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{n.type}</span>
                        <span className="text-[10px] text-zinc-600">{n.time}</span>
                      </div>
                      <p className="text-sm text-zinc-200">{n.title}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-[1px] h-6 bg-white/10"></div>

        {/* User Auth */}
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neon-lime to-emerald-600 flex items-center justify-center border border-white/10">
                <User size={14} className="text-black" />
              </div>
              <div className="hidden md:block">
                <div className="text-xs font-bold">0x71C...9A2</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Level 4 Builder</div>
              </div>
            </div>
            <button onClick={onLogout} className="p-2 text-zinc-500 hover:text-red-400 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button 
            onClick={onLoginClick}
            className="flex items-center gap-2 bg-white text-black hover:bg-neon-lime px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(57,255,20,0.3)]"
          >
            <Wallet size={14} /> Connect
          </button>
        )}

      </div>
    </header>
  );
}
