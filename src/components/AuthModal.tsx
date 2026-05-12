import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Wallet, Shield } from 'lucide-react';

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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-[2rem] overflow-hidden relative shadow-2xl"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-neon-lime/10 blur-[100px] pointer-events-none"></div>

            <div className="p-6 md:p-8 relative z-10">
              <div className="flex justify-end mb-4">
                <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors bg-zinc-900 rounded-full">
                  <X size={16} />
                </button>
              </div>

              <div className="text-center mb-10">
                <div className="text-2xl font-black tracking-tighter uppercase flex items-center justify-center gap-2 mb-4">
                  <span className="text-neon-lime drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">QUANT</span>
                  <span className="text-white">AI</span>
                </div>
                <h2 className="text-xl font-bold mb-2">Initialize Connection</h2>
                <p className="text-xs text-zinc-500 uppercase tracking-widest leading-relaxed">
                  Authenticate to access the temporal engine and community hub.
                </p>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => { onLogin(); onClose(); }}
                  className="w-full flex items-center justify-center gap-3 bg-zinc-900 hover:bg-zinc-800 border border-white/5 hover:border-white/20 text-white p-4 rounded-xl font-bold transition-all group"
                >
                  <Mail size={18} className="text-zinc-400 group-hover:text-white transition-colors" />
                  Continue with Google
                </button>
                
                <div className="flex items-center gap-4 py-2">
                  <div className="flex-1 h-[1px] bg-white/5"></div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-600">Secure Web3</span>
                  <div className="flex-1 h-[1px] bg-white/5"></div>
                </div>

                <button 
                  onClick={() => { onLogin(); onClose(); }}
                  className="w-full flex items-center justify-center gap-3 bg-neon-lime hover:bg-white text-black p-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(57,255,20,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                >
                  <Wallet size={18} />
                  Connect Wallet
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-start gap-3 opacity-50">
                <Shield size={16} className="text-neon-lime shrink-0" />
                <p className="text-[10px] uppercase tracking-widest leading-relaxed">
                  By connecting, you agree to Quant Network's Terms of Service and Privacy Policy. End-to-end encryption active.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
