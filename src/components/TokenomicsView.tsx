import React from 'react';
import { Coins } from 'lucide-react';

export function TokenomicsView() {
  return (
    <div className="p-12 text-center text-zinc-500 h-full flex flex-col items-center justify-center">
      <Coins size={48} className="text-neon-lime mb-6 opacity-50" />
      <h2 className="text-3xl font-black uppercase mb-4 text-white">Tokenomics</h2>
      <p className="max-w-md mx-auto leading-relaxed">
        The mathematical architecture of the agent economy, ensuring sustainable incentive alignment.
      </p>
    </div>
  );
}
