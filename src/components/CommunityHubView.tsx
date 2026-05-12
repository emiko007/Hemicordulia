import React, { useState } from 'react';
import { MessageSquare, Calendar, ThumbsUp, PlusCircle, Target, Bug, Lightbulb, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

type Tab = 'feedback' | 'ama' | 'support';

interface FeedbackItem {
  id: number;
  title: string;
  category: 'Feature' | 'Bug' | 'Suggestion';
  upvotes: number;
  status: 'Under Review' | 'Planned' | 'In Progress' | 'Shipped';
  author: string;
}

const MOCK_FEEDBACK: FeedbackItem[] = [
  { id: 1, title: 'Add Solana to AI Predictions', category: 'Feature', upvotes: 342, status: 'Planned', author: '0xAlpha' },
  { id: 2, title: 'Mobile push notifications for Airdrops', category: 'Suggestion', upvotes: 289, status: 'Under Review', author: 'CryptoWhale' },
  { id: 3, title: 'Temporal Engine Graph rendering glitch on Safari', category: 'Bug', upvotes: 156, status: 'In Progress', author: 'Web3Dev' },
];

export function CommunityHubView() {
  const [activeTab, setActiveTab] = useState<Tab>('feedback');

  return (
    <div className="h-full flex flex-col p-6 gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/10 pb-6 shrink-0">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
            <UsersIcon /> Community Hub
          </h1>
          <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mt-2">Connect, Propose, and Build</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/5">
          <button onClick={() => setActiveTab('feedback')} className={`px-4 py-2 rounded-lg text-xs font-bold tracking-widest transition-all ${activeTab === 'feedback' ? 'bg-neon-lime text-black shadow-[0_0_15px_rgba(57,255,20,0.3)]' : 'text-zinc-500 hover:text-white'}`}>FEEDBACK</button>
          <button onClick={() => setActiveTab('ama')} className={`px-4 py-2 rounded-lg text-xs font-bold tracking-widest transition-all ${activeTab === 'ama' ? 'bg-neon-lime text-black shadow-[0_0_15px_rgba(57,255,20,0.3)]' : 'text-zinc-500 hover:text-white'}`}>AMAs</button>
          <button onClick={() => setActiveTab('support')} className={`px-4 py-2 rounded-lg text-xs font-bold tracking-widest transition-all ${activeTab === 'support' ? 'bg-neon-lime text-black shadow-[0_0_15px_rgba(57,255,20,0.3)]' : 'text-zinc-500 hover:text-white'}`}>SUPPORT</button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'feedback' && (
          <div className="h-full flex flex-col gap-6">
            <div className="flex items-center justify-between">
               <h3 className="text-lg font-bold">Unified Feedback Board</h3>
               <button className="flex items-center gap-2 bg-white text-black hover:bg-neon-lime px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors shadow-lg">
                 <PlusCircle size={14} /> New Request
               </button>
            </div>
            
            {/* Board Columns (Linear/Canny style) */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {MOCK_FEEDBACK.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#0a0a0a] border border-white/5 hover:border-white/20 p-5 rounded-xl flex items-center justify-between group transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    {/* Upvote Button */}
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-zinc-900/50 group-hover:bg-zinc-800 transition-colors border border-white/5">
                      <ThumbsUp size={14} className="text-zinc-400 group-hover:text-neon-lime" />
                      <span className="text-xs font-bold font-mono">{item.upvotes}</span>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {item.category === 'Feature' && <Target size={14} className="text-blue-400" />}
                        {item.category === 'Bug' && <Bug size={14} className="text-red-400" />}
                        {item.category === 'Suggestion' && <Lightbulb size={14} className="text-yellow-400" />}
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500">{item.category}</span>
                        <span className="text-[10px] text-zinc-600 px-2 py-0.5 rounded-full bg-zinc-900 border border-white/5">{item.status}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-neon-lime to-emerald-600"></div>
                    <span className="text-[10px] text-zinc-500 font-mono">{item.author}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ama' && (
          <div className="h-full flex flex-col items-center justify-center text-center">
             <Calendar size={64} className="text-neon-lime mb-6 opacity-80" />
             <h2 className="text-2xl font-black uppercase mb-4">Upcoming AMA Sessions</h2>
             <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl max-w-md w-full">
               <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                 <span className="text-sm font-bold">Quant AI Architecture Reveal</span>
                 <span className="text-[10px] bg-neon-lime text-black px-2 py-1 rounded font-bold uppercase tracking-widest">Starts in 2H</span>
               </div>
               <p className="text-xs text-zinc-400 mb-6 leading-relaxed">Join the core dev team as we unveil the math behind the Temporal Reasoning Engine.</p>
               <button className="w-full bg-white text-black py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-neon-lime transition-colors">Set Reminder</button>
             </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="h-full flex flex-col items-center justify-center">
            <MessageSquare size={64} className="text-zinc-700 mb-6" />
            <h2 className="text-xl font-bold mb-2">Automated Support Chat</h2>
            <p className="text-zinc-500 text-sm mb-6">Quant Network AI is online and ready to assist.</p>
            <button className="bg-neon-lime text-black px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(57,255,20,0.3)]">
              Initiate Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-lime">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
