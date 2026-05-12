import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowLeft, Package, CreditCard } from 'lucide-react';

const LIME_GREEN = "#39FF14";

interface CheckoutSuccessScreenProps {
  onBack: () => void;
}

export function CheckoutSuccessScreen({ onBack }: CheckoutSuccessScreenProps) {
  return (
    <div className="h-full flex flex-col bg-black text-white p-8 font-sans select-none relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[120px] opacity-10 pointer-events-none" style={{ backgroundColor: LIME_GREEN }}></div>

      {/* Header */}
      <header className="mt-8 mb-12 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-50">Order Status</span>
        <div className="w-8"></div> {/* Spacer */}
      </header>

      {/* Success Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1 
          }}
          className="mb-8"
        >
          <div className="p-4 rounded-3xl border-2 border-dashed border-zinc-800 relative">
             <CheckCircle2 size={64} style={{ color: LIME_GREEN }} className="drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]" />
          </div>
        </motion.div>

        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-black tracking-tighter uppercase mb-4"
        >
          Payment <br /> Confirmed
        </motion.h2>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs text-zinc-500 uppercase tracking-widest leading-relaxed px-4"
        >
          Your polygonal head sculpture is being prepared for delivery.
        </motion.p>
      </div>

      {/* Order Info */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-zinc-900/50 backdrop-blur-md rounded-2xl p-4 border border-white/5 mb-8"
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Package size={14} className="text-zinc-500" />
            <span className="text-[10px] font-bold uppercase tracking-tight">Order #88219</span>
          </div>
          <span className="text-[10px] font-bold text-zinc-500">$79.00</span>
        </div>
        <div className="flex items-center gap-2">
           <CreditCard size={14} className="text-zinc-500" />
           <span className="text-[10px] uppercase tracking-tight opacity-50">Paid via Apple Pay</span>
        </div>
      </motion.div>

      {/* Footer Actions */}
      <motion.footer 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-auto"
      >
        <button 
          onClick={onBack}
          className="w-full py-4 rounded-xl font-black uppercase tracking-widest bg-white text-black mb-12 hover:bg-zinc-200 transition-colors"
        >
          Back to Catalog
        </button>
      </motion.footer>
    </div>
  );
}
