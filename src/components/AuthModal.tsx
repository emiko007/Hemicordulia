import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Wallet, Shield, Twitter, Send, Lock } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-md glass border-cyan-neon/30 rounded-3xl overflow-hidden relative shadow-2xl"
          >
            {/* Animated gradient background glow */}
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle at 50% 0%, rgba(0, 217, 255, 0.3), transparent)',
                  'radial-gradient(circle at 50% 0%, rgba(255, 0, 110, 0.3), transparent)',
                  'radial-gradient(circle at 50% 0%, rgba(0, 217, 255, 0.3), transparent)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none blur-[100px]"
            />

            <div className="p-6 md:p-8 relative z-10">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="flex ml-auto p-2 text-zinc-400 hover:text-cyan-neon transition-colors glass rounded-full mb-4"
              >
                <X size={16} />
              </motion.button>

              <div className="text-center mb-10">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl font-black tracking-tighter uppercase flex items-center justify-center gap-2 mb-4"
                >
                  <span className="text-cyan-neon drop-shadow-[0_0_15px_rgba(0,217,255,0.6)]">QUANT</span>
                  <span className="text-magenta-neon drop-shadow-[0_0_15px_rgba(255,0,110,0.6)]">AI</span>
                </motion.div>
                <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-cyan-neon to-magenta-neon bg-clip-text text-transparent">
                  Initialize Connection
                </h2>
                <p className="text-xs text-zinc-400 uppercase tracking-widest leading-relaxed">
                  Authenticate to access the temporal engine and community hub.
                </p>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { onLogin(); onClose(); }}
                    className="flex items-center justify-center gap-2 glass border-cyan-neon/20 hover:border-cyan-neon/50 text-white p-4 rounded-xl font-bold transition-all group"
                  >
                    <Twitter size={18} className="text-cyan-neon" />
                    <span className="text-sm">X</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 0, 110, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { onLogin(); onClose(); }}
                    className="flex items-center justify-center gap-2 glass border-magenta-neon/20 hover:border-magenta-neon/50 text-white p-4 rounded-xl font-bold transition-all group"
                  >
                    <Send size={18} className="text-magenta-neon" />
                    <span className="text-sm">TG</span>
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { onLogin(); onClose(); }}
                  className="w-full flex items-center justify-center gap-3 glass border-cyan-neon/20 hover:border-cyan-neon/50 text-white p-4 rounded-xl font-bold transition-all group"
                >
                  <Mail size={18} className="text-cyan-neon" />
                  Continue with Google
                </motion.button>

                <div className="flex items-center gap-4 py-2">
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-cyan-neon/30 to-transparent"></div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500">Or Web3</span>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-magenta-neon/30 to-transparent"></div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { onLogin(); onClose(); }}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-neon to-magenta-neon hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] text-black p-4 rounded-xl font-black uppercase tracking-widest transition-all"
                >
                  <Wallet size={18} />
                  Connect Wallet
                </motion.button>
              </div>

              <motion.div
                animate={{ opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mt-8 pt-6 border-t border-cyan-neon/10 flex items-start gap-3"
              >
                <Lock size={16} className="text-cyan-neon shrink-0 mt-0.5" />
                <p className="text-[10px] uppercase tracking-widest leading-relaxed text-zinc-400">
                  By connecting, you agree to Quant Network's Terms. End-to-end encryption active.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
