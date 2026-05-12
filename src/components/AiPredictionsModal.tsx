import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Cpu, Activity, ShieldAlert, CheckCircle, BarChart3 } from 'lucide-react';

interface AiPredictionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Timeframe = '1H' | '1D' | '1W' | '1M' | '1Y';

interface PredictionData {
  probability: number;
  trend: 'Bullish' | 'Bearish' | 'Neutral';
  reasons: string[];
  risks: string[];
  action: string;
}

const PREDICTIONS: Record<Timeframe, PredictionData> = {
  '1H': {
    probability: 68,
    trend: 'Bullish',
    reasons: ['Sudden spike in DEX volume', 'Positive sentiment shift on Twitter/X in the last 15 mins'],
    risks: ['Low liquidity could lead to fake-outs', 'Algorithmic selling pressure at resistance'],
    action: 'Scalp long with tight stop loss below the 15m moving average.'
  },
  '1D': {
    probability: 82,
    trend: 'Bullish',
    reasons: ['Breaking above major daily resistance', 'Net positive inflows to spot ETFs'],
    risks: ['Macroeconomic data release tomorrow could invalidate setup'],
    action: 'Hold current positions, consider adding on slight retracements.'
  },
  '1W': {
    probability: 55,
    trend: 'Neutral',
    reasons: ['Approaching historical supply zone', 'Momentum indicators showing slight bearish divergence'],
    risks: ['Potential regulatory news from US SEC', 'Miners transferring large amounts to exchanges'],
    action: 'Take partial profits and wait for a clear weekly close above resistance.'
  },
  '1M': {
    probability: 75,
    trend: 'Bullish',
    reasons: ['On-chain metrics indicate strong accumulation by whale wallets', 'Decreasing exchange reserves'],
    risks: ['Global macro uncertainty (inflation data)'],
    action: 'Dollar-cost average (DCA) into core positions.'
  },
  '1Y': {
    probability: 90,
    trend: 'Bullish',
    reasons: ['Post-halving supply shock taking full effect', 'Institutional adoption reaching critical mass'],
    risks: ['Unforeseen black swan events', 'Severe global recession'],
    action: 'Maintain heavy long-term exposure, store assets in cold storage.'
  }
};

export function AiPredictionsModal({ isOpen, onClose }: AiPredictionsModalProps) {
  const [activeTab, setActiveTab] = useState<Timeframe>('1D');

  const currentPrediction = PREDICTIONS[activeTab];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-xl"
        >
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

          <div className="w-full max-w-5xl h-[85vh] md:h-auto md:max-h-[90vh] bg-black border border-white/10 rounded-[2rem] relative z-10 flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <header className="p-6 md:p-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0 bg-zinc-950">
              <div className="flex items-center gap-6">
                <button 
                  onClick={onClose}
                  className="p-3 rounded-full bg-zinc-900 border border-white/5 hover:border-neon-lime hover:text-neon-lime transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                    <Cpu className="text-neon-lime" /> Deep Market Forecast
                  </h2>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mt-1">Analyzing: BTC/USD Aggregated Data</p>
                </div>
              </div>

              {/* Timeframe Tabs */}
              <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/5">
                {(Object.keys(PREDICTIONS) as Timeframe[]).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setActiveTab(tf)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold tracking-widest transition-all ${
                      activeTab === tf 
                        ? 'bg-neon-lime text-black shadow-[0_0_15px_rgba(57,255,20,0.3)]' 
                        : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </header>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  {/* Top Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Probability Meter */}
                    <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Activity size={100} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Success Probability</span>
                      <div className="flex items-end gap-3">
                        <span className="text-6xl font-black text-white leading-none">{currentPrediction.probability}%</span>
                        <span className={`text-sm font-bold uppercase tracking-widest mb-1 ${
                          currentPrediction.trend === 'Bullish' ? 'text-neon-lime' :
                          currentPrediction.trend === 'Bearish' ? 'text-red-500' : 'text-yellow-500'
                        }`}>
                          {currentPrediction.trend} Bias
                        </span>
                      </div>
                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-zinc-800 rounded-full mt-6 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${currentPrediction.probability}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${
                            currentPrediction.trend === 'Bullish' ? 'bg-neon-lime shadow-[0_0_10px_rgba(57,255,20,0.5)]' :
                            currentPrediction.trend === 'Bearish' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-yellow-500'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Recommended Action */}
                    <div className="bg-neon-lime/5 border border-neon-lime/20 p-6 rounded-2xl flex flex-col justify-center">
                       <div className="flex items-center gap-2 mb-4">
                         <BarChart3 size={16} className="text-neon-lime" />
                         <span className="text-[10px] font-bold uppercase tracking-widest text-neon-lime">AI Recommended Action</span>
                       </div>
                       <p className="text-lg font-bold leading-relaxed text-white">
                         "{currentPrediction.action}"
                       </p>
                    </div>
                  </div>

                  {/* Reasons & Risks */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Main Reasons */}
                    <div className="bg-zinc-900/20 border border-white/5 p-6 rounded-2xl">
                      <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                        <CheckCircle size={18} className="text-white" />
                        <h3 className="text-sm font-bold uppercase tracking-widest">Main Drivers</h3>
                      </div>
                      <ul className="space-y-4">
                        {currentPrediction.reasons.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-neon-lime mt-1">▹</span>
                            <span className="text-sm text-zinc-300 leading-relaxed">{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Risks */}
                    <div className="bg-zinc-900/20 border border-white/5 p-6 rounded-2xl">
                      <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                        <ShieldAlert size={18} className="text-red-400" />
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-100">Key Risks & Invalidations</h3>
                      </div>
                      <ul className="space-y-4">
                        {currentPrediction.risks.map((risk, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-red-400 mt-1">▹</span>
                            <span className="text-sm text-zinc-300 leading-relaxed">{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
            
            <footer className="p-4 border-t border-white/5 text-center bg-zinc-950 shrink-0">
               <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-600">Predictions are generated by Quant Network AI analyzing live on-chain and market sentiment data. Not financial advice.</span>
            </footer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
