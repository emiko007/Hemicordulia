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
          {/* Animated gradient background grid */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"
          />

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="w-full max-w-5xl h-[85vh] md:h-auto md:max-h-[90vh] glass border-cyan-neon/20 rounded-[2rem] relative z-10 flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <header className="p-6 md:p-8 border-b border-cyan-neon/20 flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0 bg-white/5">
              <div className="flex items-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-3 rounded-full glass border-cyan-neon/30 hover:border-cyan-neon/60 hover:text-cyan-neon transition-colors"
                >
                  <ArrowLeft size={20} />
                </motion.button>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                    <Cpu className="text-cyan-neon drop-shadow-[0_0_10px_rgba(0,217,255,0.5)]" />
                    <span className="bg-gradient-to-r from-cyan-neon to-magenta-neon bg-clip-text text-transparent">
                      Deep Market Forecast
                    </span>
                  </h2>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mt-1">Analyzing: BTC/USD Aggregated Data</p>
                </div>
              </div>

              {/* Timeframe Tabs */}
              <div className="flex glass border-cyan-neon/20 p-1 rounded-xl">
                {(Object.keys(PREDICTIONS) as Timeframe[]).map((tf) => (
                  <motion.button
                    key={tf}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tf)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold tracking-widest transition-all ${
                      activeTab === tf
                        ? 'bg-gradient-to-r from-cyan-neon to-magenta-neon text-black shadow-[0_0_15px_rgba(0,217,255,0.3)]'
                        : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    {tf}
                  </motion.button>
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
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="glass border-cyan-neon/20 p-6 rounded-2xl flex flex-col justify-center relative overflow-hidden hover:shadow-[0_0_20px_rgba(0,217,255,0.2)]"
                    >
                      <motion.div
                        animate={{ opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-0 right-0 p-4 text-cyan-neon/20"
                      >
                        <Activity size={100} />
                      </motion.div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-neon mb-2">Success Probability</span>
                      <div className="flex items-end gap-3">
                        <motion.span
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-6xl font-black text-white leading-none"
                        >
                          {currentPrediction.probability}%
                        </motion.span>
                        <span className={`text-sm font-bold uppercase tracking-widest mb-1 ${
                          currentPrediction.trend === 'Bullish' ? 'text-cyan-neon drop-shadow-[0_0_5px_rgba(0,217,255,0.5)]' :
                          currentPrediction.trend === 'Bearish' ? 'text-magenta-neon' : 'text-purple-accent'
                        }`}>
                          {currentPrediction.trend} Bias
                        </span>
                      </div>
                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-white/10 rounded-full mt-6 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${currentPrediction.probability}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${
                            currentPrediction.trend === 'Bullish' ? 'bg-gradient-to-r from-cyan-neon to-cyan-neon shadow-[0_0_10px_rgba(0,217,255,0.5)]' :
                            currentPrediction.trend === 'Bearish' ? 'bg-magenta-neon shadow-[0_0_10px_rgba(255,0,110,0.5)]' : 'bg-purple-accent'
                          }`}
                        />
                      </div>
                    </motion.div>

                    {/* Recommended Action */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="glass border-magenta-neon/20 p-6 rounded-2xl flex flex-col justify-center hover:shadow-[0_0_20px_rgba(255,0,110,0.2)]"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <BarChart3 size={16} className="text-magenta-neon" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-magenta-neon">AI Recommended Action</span>
                      </div>
                      <p className="text-lg font-bold leading-relaxed text-white">
                        "{currentPrediction.action}"
                      </p>
                    </motion.div>
                  </div>

                  {/* Reasons & Risks */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Main Reasons */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="glass border-cyan-neon/20 p-6 rounded-2xl hover:shadow-[0_0_15px_rgba(0,217,255,0.2)]"
                    >
                      <div className="flex items-center gap-2 mb-6 border-b border-cyan-neon/20 pb-4">
                        <CheckCircle size={18} className="text-cyan-neon" />
                        <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-neon">Main Drivers</h3>
                      </div>
                      <ul className="space-y-4">
                        {currentPrediction.reasons.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-cyan-neon mt-1 drop-shadow-[0_0_3px_rgba(0,217,255,0.4)]">▹</span>
                            <span className="text-sm text-zinc-300 leading-relaxed">{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Key Risks */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="glass border-magenta-neon/20 p-6 rounded-2xl hover:shadow-[0_0_15px_rgba(255,0,110,0.2)]"
                    >
                      <div className="flex items-center gap-2 mb-6 border-b border-magenta-neon/20 pb-4">
                        <ShieldAlert size={18} className="text-magenta-neon" />
                        <h3 className="text-sm font-bold uppercase tracking-widest text-magenta-neon">Key Risks & Invalidations</h3>
                      </div>
                      <ul className="space-y-4">
                        {currentPrediction.risks.map((risk, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-magenta-neon mt-1 drop-shadow-[0_0_3px_rgba(255,0,110,0.4)]">▹</span>
                            <span className="text-sm text-zinc-300 leading-relaxed">{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

            <footer className="p-4 border-t border-cyan-neon/10 text-center bg-white/5 shrink-0">
              <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-600">Predictions are generated by Quant Network AI analyzing live on-chain and market sentiment data. Not financial advice.</span>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
