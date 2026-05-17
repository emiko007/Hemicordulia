import React from 'react';
import { motion } from 'motion/react';
import { Gift, Clock, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

interface Airdrop {
  id: string;
  projectName: string;
  rewardEstimate: string;
  deadline: string;
  status: 'Ongoing' | 'Upcoming';
  description: string;
}

const MOCK_AIRDROPS: Airdrop[] = [
  { id: '1', projectName: 'Nexus Protocol', rewardEstimate: '$500 - $1,200', deadline: 'Ends in 3 days', status: 'Ongoing', description: 'Interact with the Nexus lending contracts on testnet to qualify.' },
  { id: '2', projectName: 'Orbital Dex', rewardEstimate: '$200 - $450', deadline: 'Ends in 12 days', status: 'Ongoing', description: 'Trade volume > $500 on mainnet triggers automatic allocation.' },
  { id: '3', projectName: 'Zephyr Network', rewardEstimate: 'TBA', deadline: 'Starts next month', status: 'Upcoming', description: 'Early node runners will receive Genesis Drop.' },
];

export function AirdropsDashboard() {
  return (
    <div className="relative w-full h-full bg-black py-12 px-6">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-neon/15 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-magenta-neon/10 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="container mx-auto relative z-10 max-w-5xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-16 border-b border-cyan-neon/20 pb-8">
          <div className="flex items-center gap-6">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                <Gift className="text-cyan-neon drop-shadow-[0_0_10px_rgba(0,217,255,0.5)]" />
                <span className="bg-gradient-to-r from-cyan-neon to-magenta-neon bg-clip-text text-transparent">
                  Active Airdrops
                </span>
              </h2>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Quant Network Distribution</p>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)' }}
            className="hidden md:flex items-center gap-2 text-xs font-bold text-cyan-neon uppercase tracking-widest border border-cyan-neon/30 px-4 py-2 rounded-full glass hover:border-cyan-neon/50 transition-all"
          >
            <ShieldCheck size={16} /> Scanning Secure Opportunities
          </motion.div>
        </header>

        {/* Airdrop List */}
        <div className="space-y-6">
          {MOCK_AIRDROPS.map((drop, index) => (
            <motion.div
              key={drop.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ borderColor: 'rgba(0, 217, 255, 0.4)' }}
              className="glass border-cyan-neon/20 rounded-2xl p-6 md:p-8 hover:shadow-[0_0_30px_rgba(0,217,255,0.2)] transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <motion.span
                      animate={{
                        backgroundColor: drop.status === 'Ongoing'
                          ? ['rgba(0, 217, 255, 1)', 'rgba(255, 0, 110, 1)', 'rgba(0, 217, 255, 1)']
                          : 'rgba(113, 113, 122, 0.2)',
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm ${
                        drop.status === 'Ongoing'
                          ? 'text-black'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {drop.status}
                    </motion.span>
                    <h3 className="text-2xl font-black uppercase tracking-tight">{drop.projectName}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">{drop.description}</p>
                </div>

                <div className="flex flex-col md:items-end gap-2">
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <span className="text-[10px] uppercase text-zinc-500 tracking-widest">Est. Reward:</span>
                    <motion.span
                      animate={{ color: ['#00D9FF', '#FF006E', '#00D9FF'] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="font-bold drop-shadow-[0_0_10px_rgba(0,217,255,0.4)]"
                    >
                      {drop.rewardEstimate}
                    </motion.span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Clock size={14} className="text-cyan-neon/60" />
                    <span className="text-[10px] uppercase tracking-widest">{drop.deadline}</span>
                  </div>
                </div>

                <div className="pt-4 md:pt-0 md:pl-6 md:border-l border-cyan-neon/20">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-neon to-magenta-neon text-black hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                  >
                    Participate <ExternalLink size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
