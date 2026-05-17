import React, { useState } from 'react';
import { Sparkles, Mic } from 'lucide-react';
import { motion } from 'motion/react';

export function AISearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleFocus = () => {
    setIsFocused(true);
    // Generate particle effects on focus
    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Glow background */}
        <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
          isFocused
            ? 'bg-gradient-to-r from-cyan-neon/20 via-magenta-neon/20 to-cyan-neon/20 blur-2xl'
            : 'bg-gradient-to-r from-cyan-neon/10 via-transparent to-cyan-neon/10 blur-xl'
        }`} />

        {/* Main search container */}
        <div className={`relative glass-light rounded-2xl px-6 py-5 flex items-center gap-4 ${
          isFocused
            ? 'border-cyan-neon/50 shadow-[0_0_30px_rgba(0,217,255,0.4)]'
            : 'border-white/10 shadow-[0_0_15px_rgba(0,217,255,0.15)]'
        }`}>
          {/* Icon with glow */}
          <motion.div
            animate={{ scale: isFocused ? 1.1 : 1 }}
            className="text-cyan-neon flex-shrink-0"
          >
            <Sparkles size={20} />
          </motion.div>

          {/* Input field */}
          <input
            type="text"
            placeholder="Ask AI anything… (projects, modules, insights, generate report, etc.)"
            onFocus={handleFocus}
            onBlur={() => {
              setIsFocused(false);
              setParticles([]);
            }}
            className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-zinc-400 font-medium"
          />

          {/* Right actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-zinc-400 hover:text-cyan-neon rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Voice search"
            >
              <Mic size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-cyan-neon to-magenta-neon text-black rounded-lg font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,217,255,0.5)]"
            >
              Search
            </motion.button>
          </div>

          {/* Particle effects */}
          {isFocused && particles.map(particle => (
            <motion.div
              key={particle.id}
              initial={{ opacity: 1, x: particle.x, y: particle.y }}
              animate={{ opacity: 0, x: particle.x + (Math.random() - 0.5) * 50, y: particle.y - 30 }}
              transition={{ duration: 1.5 }}
              className="absolute w-1 h-1 bg-cyan-neon rounded-full"
              style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
            />
          ))}
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-3"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            Powered by <span className="text-cyan-neon">hemicord</span> AI
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
