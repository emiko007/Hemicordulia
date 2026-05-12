import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Database, GitMerge, FileText, BarChart2 } from 'lucide-react';

export function TemporalEngineView() {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(true); // Default true for demo

  return (
    <div className="h-full flex flex-col p-6 gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex items-end justify-between border-b border-white/10 pb-6 shrink-0">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
            <Activity className="text-neon-lime" size={32} /> Temporal Reasoning Engine
          </h1>
          <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mt-2">Aggregate, Analyze, and Forecast</p>
        </div>
        
        {/* Input Command Line */}
        <div className="w-[400px] relative">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter query (e.g., 'Analyze ETH network congestion impact on L2s')"
            className="w-full bg-zinc-900/80 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm font-mono focus:border-neon-lime/50 focus:outline-none transition-colors shadow-inner"
          />
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-neon-lime text-black rounded-lg hover:scale-105 transition-transform"
            onClick={() => {
              if(!query) return;
              setIsAnalyzing(true);
              setHasResults(false);
              setTimeout(() => { setIsAnalyzing(false); setHasResults(true); }, 2000);
            }}
          >
            <GitMerge size={16} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      {isAnalyzing ? (
        <div className="flex-1 flex flex-col items-center justify-center text-neon-lime">
           <Activity size={48} className="animate-spin mb-4 opacity-50" />
           <span className="text-sm uppercase tracking-widest font-bold animate-pulse">Running Deep Analysis...</span>
        </div>
      ) : hasResults ? (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
          
          {/* Left Column: Rich Text Output */}
          <div className="lg:col-span-7 bg-[#0a0a0a] border border-white/5 rounded-2xl flex flex-col overflow-hidden shadow-2xl relative">
            <div className="p-4 border-b border-white/5 bg-zinc-900/30 flex items-center gap-2">
              <FileText size={16} className="text-zinc-500" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Analysis Output</span>
            </div>
            <div className="flex-1 overflow-y-auto p-6 font-mono text-sm leading-relaxed space-y-6 text-zinc-300">
              <p>
                <span className="text-neon-lime">]</span> Initializing query context across <span className="text-white font-bold">14,029</span> temporal nodes...
              </p>
              <p>
                Based on current momentum oscillators and on-chain liquidity velocity, the aggregate network sentiment is <strong className="text-neon-lime">highly bullish</strong>. We observe a 24% increase in smart contract deployments compared to the previous epoch.
              </p>
              
              <div className="border-l-2 border-neon-lime/50 pl-4 py-2 bg-neon-lime/5">
                <strong>Crucial Insight:</strong> Institutional accumulation patterns detected in wallets older than 5 years. This historically precedes a supply shock within a 3-week window.
              </div>

              <p>
                Correlating this with off-chain macroeconomic indicators (CPI data released yesterday), the probability of a breakout above the local resistance cluster is <strong className="text-white">78.4%</strong>.
              </p>
              
              <ul className="space-y-2 opacity-80 text-xs">
                <li className="flex gap-2"><span className="text-neon-lime">▸</span> <span className="text-white">Primary Support:</span> $3,450</li>
                <li className="flex gap-2"><span className="text-neon-lime">▸</span> <span className="text-white">Resistance:</span> $3,800 - $4,100</li>
                <li className="flex gap-2"><span className="text-neon-lime">▸</span> <span className="text-white">Invalidation:</span> Daily close below $3,200</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Graphs & Sources */}
          <div className="lg:col-span-5 flex flex-col gap-6 min-h-0">
            
            {/* Graph Widget */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl flex-1 flex flex-col overflow-hidden">
               <div className="p-4 border-b border-white/5 bg-zinc-900/30 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <BarChart2 size={16} className="text-zinc-500" />
                   <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Volatility Index</span>
                 </div>
                 <span className="text-[9px] text-neon-lime px-2 py-1 bg-neon-lime/10 rounded">LIVE</span>
               </div>
               <div className="flex-1 p-6 flex flex-col justify-end relative">
                 {/* Mock SVG Graph */}
                 <svg viewBox="0 0 400 150" className="w-full h-full drop-shadow-[0_0_15px_rgba(57,255,20,0.3)]" preserveAspectRatio="none">
                   {/* Grid lines */}
                   <path d="M0 25 h400 M0 75 h400 M0 125 h400" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
                   
                   <path 
                     d="M0 130 C 50 110, 100 140, 150 90 S 250 40, 300 60 S 350 20, 400 30" 
                     fill="none" 
                     stroke="#39FF14" 
                     strokeWidth="3" 
                   />
                   <path 
                     d="M0 150 L 0 130 C 50 110, 100 140, 150 90 S 250 40, 300 60 S 350 20, 400 30 L 400 150 Z" 
                     fill="url(#gradient)" 
                   />
                   <defs>
                     <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="#39FF14" stopOpacity="0.2" />
                       <stop offset="100%" stopColor="#39FF14" stopOpacity="0" />
                     </linearGradient>
                   </defs>
                 </svg>
                 
                 <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[9px] text-zinc-600 font-mono">
                    <span>14:00</span>
                    <span>16:00</span>
                    <span>18:00</span>
                    <span>NOW</span>
                 </div>
               </div>
            </div>

            {/* Sources Widget */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl h-1/3 flex flex-col shrink-0">
               <div className="p-4 border-b border-white/5 bg-zinc-900/30 flex items-center gap-2">
                 <Database size={16} className="text-zinc-500" />
                 <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Verified Sources</span>
               </div>
               <div className="flex-1 overflow-y-auto p-4 space-y-3">
                 {['Dune Analytics (Smart Contract Deployments)', 'Glassnode (Exchange NetFlows)', 'Reuters (Macro Data CPI)', 'Twitter/X Sentiment API'].map((source, i) => (
                   <div key={i} className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-lg border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-neon-lime"></div>
                      <span className="text-xs text-zinc-300 font-medium truncate">{source}</span>
                   </div>
                 ))}
               </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-zinc-600 font-mono text-sm">
          Awaiting input parameters...
        </div>
      )}
    </div>
  );
}
