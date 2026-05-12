import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Gift, Clock, ExternalLink, ShieldCheck } from 'lucide-react';

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
  { id: '2', projectName: 'Orbital Dex', rewardEstimate: '$200 - $450', deadline: 'Ends in 12 days', status: 'Ongoing', description: 'Trade volume \u003E $500 on mainnet triggers automatic allocation.' },
  { id: '3', projectName: 'Zephyr Network', rewardEstimate: 'TBA', deadline: 'Starts next month', status: 'Upcoming', description: 'Early node runners will receive Genesis Drop.' },
];

interface AirdropsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AirdropsDashboard({ isOpen, onClose }: AirdropsDashboardProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black overflow-y-auto"
        >
          {/* Background Glow */}
          <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-neon-lime/10 rounded-full blur-[150px] pointer-events-none"></div>

          <div className="container mx-auto px-6 py-12 relative z-10 max-w-5xl">
            {/* Header */}
            <header className="flex items-center justify-between mb-16 border-b border-white/10 pb-8">
              <div className="flex items-center gap-6">
                <button 
                  onClick={onClose}
                  className="p-3 rounded-full bg-zinc-900 hover:bg-neon-lime hover:text-black transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                    <Gift className="text-neon-lime" /> Active Airdrops
                  </h2>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Quant Network Distribution</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs font-bold text-neon-lime uppercase tracking-widest border border-neon-lime/30 px-4 py-2 rounded-full">
                <ShieldCheck size={16} /> Scanning Secure Opportunities
              </div>
            </header>

            {/* Airdrop List */}
            <div className="space-y-6">
              {MOCK_AIRDROPS.map((drop, index) => (
                <motion.div 
                  key={drop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 md:p-8 hover:border-neon-lime/30 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm ${drop.status === 'Ongoing' ? 'bg-neon-lime text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                          {drop.status}
                        </span>
                        <h3 className="text-2xl font-black uppercase tracking-tight">{drop.projectName}</h3>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">{drop.description}</p>
                    </div>

                    <div className="flex flex-col md:items-end gap-2">
                      <div className="flex items-center gap-2 text-sm text-zinc-300">
                        <span className="text-[10px] uppercase text-zinc-500 tracking-widest">Est. Reward:</span>
                        <span className="font-bold text-neon-lime">{drop.rewardEstimate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-300">
                        <Clock size={14} className="text-zinc-500" />
                        <span className="text-[10px] uppercase tracking-widest">{drop.deadline}</span>
                      </div>
                    </div>

                    <div className="pt-4 md:pt-0 md:pl-6 md:border-l border-white/10">
                      <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-white text-black hover:bg-neon-lime px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">
                        Participate <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
