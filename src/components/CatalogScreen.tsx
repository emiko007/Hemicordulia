import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Twitter, ChevronLeft, ChevronRight } from 'lucide-react';
import { CheckoutSuccessScreen } from './CheckoutSuccessScreen';

const LIME_GREEN = "#39FF14";

export function CatalogScreen() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [view, setView] = useState<'catalog' | 'success'>('catalog');
  const titles = ["ANGULAR 3D HEAD", "SCULPTING HEAD"];

  useEffect(() => {
    if (view === 'catalog') {
      const timer = setInterval(() => {
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [view]);

  if (view === 'success') {
    return <CheckoutSuccessScreen onBack={() => setView('catalog')} />;
  }

  return (
    <div className="h-full flex flex-col bg-black text-white p-6 font-sans select-none">
      {/* Header */}
      <header className="mt-8 mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold tracking-tight uppercase">Online catalog</h1>
          <div className="flex gap-2">
            <Twitter size={14} className="text-zinc-500" />
            <Instagram size={14} className="text-zinc-500" />
          </div>
        </div>
        <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">
          Use promocodes for discounts
        </p>
      </header>

      {/* Social Media Line */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-[1px] flex-1 bg-zinc-800"></div>
        <span className="text-[8px] text-zinc-600 uppercase tracking-widest whitespace-nowrap">
          We are on social media
        </span>
        <div className="h-[1px] w-4 bg-zinc-800"></div>
      </div>

      {/* Product Display */}
      <div className="relative flex-1 flex flex-col items-center justify-center">
        {/* Navigation Arrows */}
        <button className="absolute left-0 z-10 p-2" style={{ color: LIME_GREEN }}>
          <ChevronLeft size={24} />
        </button>
        <button className="absolute right-0 z-10 p-2" style={{ color: LIME_GREEN }}>
          <ChevronRight size={24} />
        </button>

        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-square mb-6"
        >
          {/* Placeholder for the 3D Head Sculpture */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
          <img 
            src="https://picsum.photos/seed/head-sculpture/800/800" 
            alt="Angular 3D Head"
            className="w-full h-full object-contain grayscale brightness-75 hover:grayscale-0 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
          {/* Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[80px] opacity-20 pointer-events-none" style={{ backgroundColor: LIME_GREEN }}></div>
        </motion.div>

        {/* Product Info */}
        <div className="text-center w-full px-4">
          <div className="h-8 overflow-hidden relative mb-2">
            <AnimatePresence mode="wait">
              <motion.h2
                key={titleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-xl font-black tracking-tighter uppercase leading-none"
              >
                {titles[titleIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>
          <p className="text-2xl font-bold mb-6">$79</p>
        </div>
      </div>

      {/* Action Button */}
      <footer className="mt-auto">
        <button 
          onClick={() => setView('success')}
          className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-black mb-6 hover:scale-[0.98] transition-transform active:scale-95"
          style={{ backgroundColor: LIME_GREEN }}
          id="btn-purchase"
        >
          Purchase
        </button>
        
        <div className="flex justify-between items-center text-[8px] text-zinc-600 uppercase tracking-[0.2em]">
          <span>humbleteam</span>
          <span>All rights reserved. 2025</span>
        </div>
      </footer>
    </div>
  );
}
