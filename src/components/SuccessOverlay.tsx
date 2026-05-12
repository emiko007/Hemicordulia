import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowLeft, Package, CreditCard, ChevronRight } from 'lucide-react';

const LIME_GREEN = "#39FF14";

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
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black"
        >
          {/* Success Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-lime/5 rounded-full blur-[150px] pointer-events-none"></div>

          <div className="max-w-xl w-full relative z-10 flex flex-col items-center">
            {/* Header / Back */}
            <header className="absolute top-0 left-0 w-full flex items-center justify-between py-8">
              <button 
                onClick={onClose}
                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
              >
                <ArrowLeft size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Back to Hub</span>
              </button>
            </header>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="text-center"
            >
              <div className="inline-block p-6 rounded-[40px] border-2 border-white/5 bg-zinc-900/50 backdrop-blur-xl mb-12 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-neon-lime/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <CheckCircle2 size={80} style={{ color: LIME_GREEN }} className="drop-shadow-[0_0_20px_rgba(57,255,20,0.4)]" />
              </div>

              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-tight">
                Module <br /> Online
              </h2>
              
              <p className="text-zinc-500 uppercase tracking-widest leading-loose text-xs max-w-sm mx-auto mb-12">
                System <span className="text-white">{productTitle}</span> has been initialized and is synchronized with the network.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left mb-12">
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
                  <div className="flex items-center gap-3 mb-4 opacity-50">
                    <Package size={14} />
                    <span className="text-[10px] font-bold uppercase">Agent Status</span>
                  </div>
                  <div className="font-bold text-lg">Synchronized</div>
                  <div className="text-[10px] text-zinc-500 mt-1 uppercase tracking-tight">Node: Active</div>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
                  <div className="flex items-center gap-3 mb-4 opacity-50">
                    <CreditCard size={14} />
                    <span className="text-[10px] font-bold uppercase">Uplink</span>
                  </div>
                  <div className="font-bold text-lg">Established</div>
                  <div className="text-[10px] text-zinc-500 mt-1 uppercase tracking-tight">Powered by Quant Network</div>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="group flex items-center justify-center gap-4 bg-white text-black px-12 py-6 rounded-full font-black uppercase tracking-widest hover:bg-neon-lime transition-all w-full md:w-auto"
              >
                Access Terminal
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </div>

          <footer className="absolute bottom-12 w-full text-center">
            <div className="flex justify-center gap-8 opacity-20 text-[10px] font-bold uppercase tracking-[0.2em]">
              <span>quant.network</span>
              <span>© 2025</span>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
