import React, { useState } from 'react';
import { Bell, User, Wallet, LogOut, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TopBarProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
}

export function TopBar({ isLoggedIn, onLoginClick, onLogout }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, type: 'Suggestion', title: 'Your feature request was shipped!', time: '2h ago', unread: true },
    { id: 2, type: 'AMA', title: 'Live AMA with Vitalik starts in 10 mins', time: '10m ago', unread: true },
    { id: 3, type: 'Bug', title: 'Bug report #402 resolved.', time: '1d ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-20 glass border-b border-cyan-neon/10 flex items-center justify-between px-8 sticky top-0 z-40">
      {/* Animated border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-neon/30 to-transparent"></div>

      {/* Left: User Auth / Wallet Connection */}
      <div className="flex items-center gap-8">
        {/* User Auth */}
        {isLoggedIn ? (
          <motion.div
            layout
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-neon via-magenta-neon to-purple-accent flex items-center justify-center border border-cyan-neon/30 shadow-[0_0_15px_rgba(0,217,255,0.3)]"
              >
                <User size={14} className="text-black" />
              </motion.div>
              <div className="hidden md:block">
                <div className="text-xs font-bold">0x71C...9A2</div>
                <div className="text-[10px] text-cyan-neon uppercase tracking-widest">Level 4 Builder</div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="p-2 text-zinc-500 hover:text-magenta-neon transition-colors"
            >
              <LogOut size={16} />
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLoginClick}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-neon to-magenta-neon text-black hover:shadow-[0_0_25px_rgba(0,217,255,0.5)] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
          >
            <Wallet size={14} /> Connect
          </motion.button>
        )}
      </div>

      <div className="flex-1" />

      {/* Right: Notifications */}
      <div className="flex items-center gap-8">
        <div className="w-[1px] h-6 bg-gradient-to-b from-cyan-neon/20 to-magenta-neon/20"></div>

        {/* Notifications */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-zinc-400 hover:text-magenta-neon transition-colors relative group"
          >
            <Bell size={20} className="group-hover:drop-shadow-[0_0_10px_rgba(255,0,110,0.5)]" />
            {unreadCount > 0 && (
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1 right-1 w-2 h-2 bg-magenta-neon rounded-full shadow-[0_0_12px_rgba(255,0,110,0.8)]"
              />
            )}
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-4 w-96 glass rounded-2xl overflow-hidden shadow-2xl border-magenta-neon/20"
              >
                <div className="p-4 border-b border-magenta-neon/20 flex items-center justify-between bg-white/5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-magenta-neon">Notifications</h4>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 hover:bg-magenta-neon/10 rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <motion.div
                      key={n.id}
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                      className={`p-4 border-b border-magenta-neon/10 cursor-pointer ${
                        n.unread ? 'bg-magenta-neon/5' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-magenta-neon">
                          {n.type}
                        </span>
                        <span className="text-[10px] text-zinc-500">{n.time}</span>
                      </div>
                      <p className="text-sm text-zinc-200">{n.title}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
