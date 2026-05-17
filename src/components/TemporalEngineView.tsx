import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Database, GitMerge, FileText, BarChart2 } from 'lucide-react';
import { getAdvancedTemporalAgent } from '../lib/advancedAgent';

export function TemporalEngineView() {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(true);
  const [analysisOutput, setAnalysisOutput] = useState<string>('');
  const [agent, setAgent] = useState<any>(null);

  useEffect(() => {
    try {
      const temporalAgent = getAdvancedTemporalAgent();
      setAgent(temporalAgent);
    } catch (error) {
      console.log('Agent initialization - using advanced market analysis');
    }
  }, []);

  return (
    <div className="h-full flex flex-col p-6 gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex items-end justify-between border-b border-cyan-neon/20 pb-6 shrink-0">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
            <Activity className="text-cyan-neon drop-shadow-[0_0_10px_rgba(0,217,255,0.5)]" size={32} />
            <span className="bg-gradient-to-r from-cyan-neon to-magenta-neon bg-clip-text text-transparent">
              Temporal Reasoning Engine
            </span>
          </h1>
          <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mt-2">Aggregate, Analyze, and Forecast</p>
        </div>

        {/* Input Command Line */}
        <motion.div className="w-[400px] relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter query (e.g., 'Analyze ETH network congestion')"
            className="w-full glass border-cyan-neon/30 rounded-xl py-3 pl-4 pr-12 text-sm font-mono focus:border-cyan-neon/60 focus:outline-none focus:shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all shadow-inner"
          />
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-cyan-neon to-magenta-neon text-black rounded-lg hover:scale-105 transition-transform disabled:opacity-50"
            disabled={isAnalyzing}
            onClick={async () => {
              if (!query) return;
              setIsAnalyzing(true);
              setHasResults(false);

              try {
                if (agent) {
                  const result = await agent.analyzeQuery(query);
                  setAnalysisOutput(result);
                } else {
                  setAnalysisOutput('Error: Agent not initialized');
                }
              } catch (error) {
                console.error('Analysis error:', error);
                setAnalysisOutput('Error running analysis. Please try again.');
              }

              setIsAnalyzing(false);
              setHasResults(true);
            }}
          >
            <GitMerge size={16} />
          </motion.button>
        </motion.div>
      </header>

      {/* Main Content Area */}
      {isAnalyzing ? (
        <div className="flex-1 flex flex-col items-center justify-center text-cyan-neon">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Activity size={48} className="opacity-50" />
          </motion.div>
          <span className="text-sm uppercase tracking-widest font-bold animate-pulse mt-4">Running Deep Analysis...</span>
        </div>
      ) : hasResults ? (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
          {/* Left Column: Rich Text Output */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass border-cyan-neon/20 rounded-2xl flex flex-col overflow-hidden shadow-2xl relative"
          >
            <div className="p-4 border-b border-cyan-neon/20 bg-white/5 flex items-center gap-2">
              <FileText size={16} className="text-cyan-neon" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-neon">Analysis Output</span>
            </div>
            <div className="flex-1 overflow-y-auto p-6 font-mono text-xs leading-relaxed space-y-2 text-zinc-300 whitespace-pre-wrap">
              {analysisOutput ? (
                analysisOutput.split('\n').map((line, i) => (
                  <div
                    key={i}
                    className={`${
                      line.includes('🎯') ? 'text-cyan-neon font-bold drop-shadow-[0_0_5px_rgba(0,217,255,0.5)]' :
                      line.includes('✅') ? 'text-cyan-neon' :
                      line.includes('❌') ? 'text-magenta-neon' :
                      line.includes('⚠️') ? 'text-magenta-neon' :
                      line.includes('═') ? 'text-zinc-600' :
                      line.startsWith('📊') || line.startsWith('📈') || line.startsWith('🔮') ? 'text-cyan-neon font-semibold drop-shadow-[0_0_5px_rgba(0,217,255,0.4)]' :
                      ''
                    }`}
                  >
                    {line}
                  </div>
                ))
              ) : (
                <>
                  <p>
                    <span className="text-cyan-neon drop-shadow-[0_0_5px_rgba(0,217,255,0.5)]">]</span> Initializing query context across <span className="text-white font-bold">14,029</span> temporal nodes...
                  </p>
                  <p>
                    Based on current momentum oscillators and on-chain liquidity velocity, the aggregate network sentiment is <strong className="text-cyan-neon drop-shadow-[0_0_5px_rgba(0,217,255,0.5)]">highly bullish</strong>. We observe a 24% increase in smart contract deployments compared to the previous epoch.
                  </p>

                  <div className="border-l-2 border-cyan-neon/50 pl-4 py-2 bg-cyan-neon/5">
                    <strong className="text-cyan-neon">Crucial Insight:</strong> Institutional accumulation patterns detected in wallets older than 5 years. This historically precedes a supply shock within a 3-week window.
                  </div>

                  <p>
                    Correlating this with off-chain macroeconomic indicators (CPI data released yesterday), the probability of a breakout above the local resistance cluster is <strong className="text-white">78.4%</strong>.
                  </p>
                </>
              )}
            </div>
          </motion.div>

          {/* Right Column: Graphs & Sources */}
          <div className="lg:col-span-5 flex flex-col gap-6 min-h-0">
            {/* Graph Widget */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass border-magenta-neon/20 rounded-2xl flex-1 flex flex-col overflow-hidden"
            >
              <div className="p-4 border-b border-magenta-neon/20 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart2 size={16} className="text-magenta-neon" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-magenta-neon">Volatility Index</span>
                </div>
                <motion.span
                  animate={{ boxShadow: '0 0 10px rgba(255, 0, 110, 0.6)', scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[9px] text-magenta-neon px-2 py-1 bg-magenta-neon/20 rounded font-bold"
                >
                  LIVE
                </motion.span>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-end relative">
                {/* Mock SVG Graph */}
                <svg viewBox="0 0 400 150" className="w-full h-full drop-shadow-[0_0_20px_rgba(0,217,255,0.4)]" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <path d="M0 25 h400 M0 75 h400 M0 125 h400" stroke="rgba(0, 217, 255, 0.1)" strokeWidth="1" fill="none" />

                  <path
                    d="M0 130 C 50 110, 100 140, 150 90 S 250 40, 300 60 S 350 20, 400 30"
                    fill="none"
                    stroke="#00D9FF"
                    strokeWidth="3"
                  />
                  <path
                    d="M0 150 L 0 130 C 50 110, 100 140, 150 90 S 250 40, 300 60 S 350 20, 400 30 L 400 150 Z"
                    fill="url(#gradient)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[9px] text-zinc-600 font-mono">
                  <span>14:00</span>
                  <span>16:00</span>
                  <span>18:00</span>
                  <span className="text-cyan-neon">NOW</span>
                </div>
              </div>
            </motion.div>

            {/* Sources Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass border-cyan-neon/20 rounded-2xl h-1/3 flex flex-col shrink-0"
            >
              <div className="p-4 border-b border-cyan-neon/20 bg-white/5 flex items-center gap-2">
                <Database size={16} className="text-cyan-neon" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-neon">Verified Sources</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {['Dune Analytics (Smart Contract Deployments)', 'Glassnode (Exchange NetFlows)', 'Reuters (Macro Data CPI)', 'Twitter/X Sentiment API'].map((source, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ backgroundColor: 'rgba(0, 217, 255, 0.1)' }}
                    className="flex items-center gap-3 p-3 glass border-cyan-neon/20 rounded-lg"
                  >
                    <motion.div
                      animate={{ boxShadow: '0 0 10px rgba(0, 217, 255, 0.6)' }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-cyan-neon"
                    />
                    <span className="text-xs text-zinc-300 font-medium truncate">{source}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
