import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowLeft, Package, CreditCard, ChevronRight } from 'lucide-react';

interface SuccessOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
}

export function SuccessOverlay({ isOpen, onClose, productTitle }: SuccessOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
        >
          {/* Success Glow - animated between cyan and magenta */}
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle, rgba(0, 217, 255, 0.1), transparent)',
                'radial-gradient(circle, rgba(255, 0, 110, 0.1), transparent)',
                'radial-gradient(circle, rgba(0, 217, 255, 0.1), transparent)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none"
          />

          <div className="max-w-xl w-full relative z-10 flex flex-col items-center">
            {/* Header / Back */}
            <header className="absolute top-0 left-0 w-full flex items-center justify-between py-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="flex items-center gap-2 text-zinc-500 hover:text-cyan-neon transition-colors"
              >
                <ArrowLeft size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Back to Hub</span>
              </motion.button>
            </header>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block p-6 rounded-[40px] glass border-cyan-neon/30 mb-12 relative overflow-hidden group shadow-[0_0_40px_rgba(0,217,255,0.3)]"
              >
                <motion.div
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-cyan-neon/10"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <CheckCircle2
                    size={80}
                    className="text-cyan-neon drop-shadow-[0_0_20px_rgba(0,217,255,0.6)] relative z-10"
                  />
                </motion.div>
              </motion.div>

              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-tight bg-gradient-to-r from-cyan-neon via-white to-magenta-neon bg-clip-text text-transparent">
                Module <br /> Online
              </h2>

              <p className="text-zinc-500 uppercase tracking-widest leading-loose text-xs max-w-sm mx-auto mb-12">
                System <span className="text-cyan-neon drop-shadow-[0_0_5px_rgba(0,217,255,0.5)]">{productTitle}</span> has been initialized and is synchronized with the network.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left mb-12">
                <motion.div
                  whileHover={{ scale: 1.05, borderColor: 'rgba(0, 217, 255, 0.5)' }}
                  className="p-6 rounded-2xl glass border-cyan-neon/20 hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]"
                >
                  <div className="flex items-center gap-3 mb-4 opacity-50">
                    <Package size={14} className="text-cyan-neon" />
                    <span className="text-[10px] font-bold uppercase text-cyan-neon">Agent Status</span>
                  </div>
                  <div className="font-bold text-lg">Synchronized</div>
                  <div className="text-[10px] text-zinc-500 mt-1 uppercase tracking-tight">Node: Active</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, borderColor: 'rgba(255, 0, 110, 0.5)' }}
                  className="p-6 rounded-2xl glass border-magenta-neon/20 hover:shadow-[0_0_20px_rgba(255,0,110,0.3)]"
                >
                  <div className="flex items-center gap-3 mb-4 opacity-50">
                    <CreditCard size={14} className="text-magenta-neon" />
                    <span className="text-[10px] font-bold uppercase text-magenta-neon">Uplink</span>
                  </div>
                  <div className="font-bold text-lg">Established</div>
                  <div className="text-[10px] text-zinc-500 mt-1 uppercase tracking-tight">Powered by Quant Network</div>
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="group flex items-center justify-center gap-4 bg-gradient-to-r from-cyan-neon to-magenta-neon text-black px-12 py-6 rounded-full font-black uppercase tracking-widest transition-all w-full md:w-auto"
              >
                Access Terminal
                <ChevronRight size={20} />
              </motion.button>
            </motion.div>
          </div>

          <footer className="absolute bottom-12 w-full text-center">
            <motion.div
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex justify-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600"
            >
              <span>quant.network</span>
              <span>© 2025</span>
            </motion.div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
