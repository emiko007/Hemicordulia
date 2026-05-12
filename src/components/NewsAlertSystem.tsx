import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, AlertTriangle, TrendingUp, TrendingDown, X, Globe } from 'lucide-react';

interface NewsAlert {
  id: string;
  headline: string;
  summary: string;
  shortTermImpact: string;
  longTermImpact: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  timestamp: string;
}

const MOCK_ALERTS: NewsAlert[] = [
  {
    id: 'news-1',
    headline: 'SEC Approves New Institutional Crypto Custody Framework',
    summary: 'The SEC has officially outlined a clear framework allowing major banks to custody digital assets, resolving months of regulatory uncertainty.',
    shortTermImpact: 'High volatility expected. Immediate price surge in major large-cap assets (BTC, ETH) as institutional buying pressure front-runs actual implementation.',
    longTermImpact: 'Massive influx of traditional finance capital. Validates the asset class and paves the way for trillions in managed wealth to enter the space safely.',
    sentiment: 'Bullish',
    timestamp: 'Just now'
  }
];

export function NewsAlertSystem() {
  const [alerts, setAlerts] = useState<NewsAlert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<NewsAlert | null>(null);

  // Simulate incoming news
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlerts(MOCK_ALERTS);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Floating Notification */}
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col gap-4">
        <AnimatePresence>
          {alerts.map(alert => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-black border border-neon-lime/30 p-4 rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.15)] w-80 cursor-pointer hover:border-neon-lime transition-colors"
              onClick={() => {
                setSelectedAlert(alert);
                setAlerts(alerts.filter(a => a.id !== alert.id)); // Dismiss on click
              }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-neon-lime/10 rounded-full text-neon-lime shrink-0">
                  <Bell size={16} className="animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-neon-lime">Breaking Alert</span>
                    <span className="text-[9px] text-zinc-500 uppercase">{alert.timestamp}</span>
                  </div>
                  <h4 className="text-sm font-bold leading-tight line-clamp-2">{alert.headline}</h4>
                  <p className="text-xs text-zinc-400 mt-2">Click for AI Impact Analysis</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Detailed Analysis Modal */}
      <AnimatePresence>
        {selectedAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden relative shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex items-start justify-between bg-black/50">
                <div className="flex items-center gap-3 text-neon-lime mb-2">
                  <Globe size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest">Global Market Intelligence</span>
                </div>
                <button 
                  onClick={() => setSelectedAlert(null)}
                  className="text-zinc-500 hover:text-white transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 leading-tight">
                  {selectedAlert.headline}
                </h2>
                <p className="text-zinc-400 leading-relaxed mb-8">
                  {selectedAlert.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Short Term */}
                  <div className="bg-zinc-900/50 border border-white/5 p-5 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle size={16} className="text-yellow-500" />
                      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-300">Short-Term Impact</h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {selectedAlert.shortTermImpact}
                    </p>
                  </div>

                  {/* Long Term */}
                  <div className="bg-zinc-900/50 border border-white/5 p-5 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp size={16} className="text-neon-lime" />
                      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-300">Long-Term Impact</h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {selectedAlert.longTermImpact}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest">AI Sentiment Analysis:</span>
                    <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm ${
                      selectedAlert.sentiment === 'Bullish' ? 'bg-neon-lime/10 text-neon-lime border border-neon-lime/20' : 
                      selectedAlert.sentiment === 'Bearish' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                      'bg-zinc-800 text-white'
                    }`}>
                      {selectedAlert.sentiment}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Quant Network AI</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
