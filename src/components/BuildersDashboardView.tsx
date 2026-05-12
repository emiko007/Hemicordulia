import React from 'react';
import { Wrench, Trophy, Code2, UploadCloud, Hexagon, Star } from 'lucide-react';
import { motion } from 'motion/react';

export function BuildersDashboardView() {
  return (
    <div className="h-full flex flex-col p-6 gap-6 max-w-7xl mx-auto overflow-y-auto">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/10 pb-6 shrink-0">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
            <Wrench className="text-neon-lime" size={32} /> Builders Dashboard
          </h1>
          <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mt-2">Contribute, Earn Rep, Shape the Future</p>
        </div>
        
        {/* User Rep Stats */}
        <div className="flex items-center gap-6 bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
           <div className="flex flex-col items-end">
             <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Your Rep</span>
             <span className="text-2xl font-black text-neon-lime font-mono">2,450</span>
           </div>
           <div className="w-[1px] h-8 bg-white/10"></div>
           <div className="flex items-center gap-2">
             <Hexagon size={24} className="text-purple-400" />
             <div className="flex flex-col">
               <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Current Badge</span>
               <span className="text-sm font-bold text-white uppercase tracking-wider">Quant Vanguard</span>
             </div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* Left Column: Bounties & Submission */}
        <div className="lg:col-span-8 flex flex-col gap-6 h-full">
          
          {/* Submission Portal */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-neon-lime/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2 mb-1">
                  <UploadCloud size={18} className="text-neon-lime" /> Contribution Portal
                </h3>
                <p className="text-xs text-zinc-400">Submit code, datasets, or prompts for the Temporal Engine.</p>
              </div>
              <button className="bg-white text-black px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-neon-lime transition-colors">
                New Submission
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              {['Code PR', 'Dataset', 'Prompt Eng', 'Research'].map(type => (
                <div key={type} className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-white/20 transition-colors cursor-pointer">
                   <Code2 size={20} className="text-zinc-500" />
                   <span className="text-xs font-bold text-zinc-300">{type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Open Bounties */}
          <div className="flex-1 bg-[#0a0a0a] border border-white/5 rounded-2xl flex flex-col overflow-hidden min-h-[400px]">
            <div className="p-4 border-b border-white/5 bg-zinc-900/30 flex items-center justify-between">
               <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-zinc-300">
                 <Star size={16} className="text-yellow-400" /> Open Bounties
               </h3>
               <span className="text-[10px] text-zinc-500 uppercase tracking-widest bg-zinc-800 px-2 py-1 rounded">12 Active</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {[
                { title: 'Optimize Temporal Pathfinding Algorithm', reward: '5,000 Rep + 100 QNT', tags: ['Rust', 'Algorithm'], diff: 'Hard' },
                { title: 'Create Market Sentiment Training Dataset (Q3)', reward: '2,000 Rep', tags: ['Data', 'Python'], diff: 'Medium' },
                { title: 'Fix mobile responsiveness on Dashboard', reward: '500 Rep', tags: ['Frontend', 'React'], diff: 'Easy' },
              ].map((bounty, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-zinc-900/40 border border-white/5 rounded-xl hover:border-neon-lime/30 transition-all cursor-pointer">
                  <div className="mb-4 md:mb-0">
                    <h4 className="text-sm font-bold text-white mb-2">{bounty.title}</h4>
                    <div className="flex items-center gap-2">
                      {bounty.tags.map(t => <span key={t} className="text-[9px] bg-white/5 text-zinc-400 px-2 py-0.5 rounded font-mono uppercase tracking-wider">{t}</span>)}
                      <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                        bounty.diff === 'Hard' ? 'text-red-400 bg-red-400/10' : 
                        bounty.diff === 'Medium' ? 'text-yellow-400 bg-yellow-400/10' : 'text-neon-lime bg-neon-lime/10'
                      }`}>{bounty.diff}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="block text-[10px] uppercase text-zinc-500 tracking-widest mb-1">Reward</span>
                      <span className="text-sm font-bold text-neon-lime font-mono">{bounty.reward}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Leaderboard */}
        <div className="lg:col-span-4 bg-[#0a0a0a] border border-white/5 rounded-2xl flex flex-col overflow-hidden h-full min-h-[400px]">
           <div className="p-4 border-b border-white/5 bg-zinc-900/30 flex items-center gap-2">
             <Trophy size={16} className="text-yellow-500" />
             <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300">Top Contributors</h3>
           </div>
           <div className="flex-1 overflow-y-auto p-4 space-y-2">
             {[
               { rank: 1, name: '0xAlpha', rep: '42,500', tier: 'Titan' },
               { rank: 2, name: 'DevNode', rep: '38,120', tier: 'Titan' },
               { rank: 3, name: 'DataWizard', rep: '29,400', tier: 'Vanguard' },
               { rank: 4, name: 'CryptoCoder', rep: '24,100', tier: 'Vanguard' },
               { rank: 5, name: 'Anon_99', rep: '18,500', tier: 'Elite' },
               { rank: 6, name: 'SysAdmin', rep: '15,200', tier: 'Elite' },
               { rank: 7, name: 'QuantGeek', rep: '12,000', tier: 'Adept' },
             ].map((user) => (
               <div key={user.rank} className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-900/50 transition-colors">
                 <div className="flex items-center gap-4">
                   <div className={`w-6 text-center font-bold font-mono text-sm ${
                     user.rank === 1 ? 'text-yellow-400' : 
                     user.rank === 2 ? 'text-zinc-300' : 
                     user.rank === 3 ? 'text-amber-600' : 'text-zinc-600'
                   }`}>
                     #{user.rank}
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-600"></div>
                     <div className="flex flex-col">
                       <span className="text-xs font-bold text-white">{user.name}</span>
                       <span className="text-[9px] text-zinc-500 uppercase tracking-widest">{user.tier}</span>
                     </div>
                   </div>
                 </div>
                 <span className="text-xs font-mono font-bold text-neon-lime">{user.rep}</span>
               </div>
             ))}
           </div>
           
           <div className="p-4 border-t border-white/5 bg-zinc-950/80">
             <div className="flex items-center justify-between p-3 bg-neon-lime/10 border border-neon-lime/30 rounded-xl">
               <div className="flex items-center gap-4">
                 <div className="w-6 text-center font-bold font-mono text-sm text-zinc-400">#42</div>
                 <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-neon-lime to-emerald-600"></div>
                   <span className="text-xs font-bold text-white">You</span>
                 </div>
               </div>
               <span className="text-xs font-mono font-bold text-neon-lime">2,450</span>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
