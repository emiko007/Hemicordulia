import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Hero } from './components/Hero';
import { AgentModulesSection } from './components/AgentModulesSection';
import { SuccessOverlay } from './components/SuccessOverlay';
import { AirdropsDashboard } from './components/AirdropsDashboard';
import { NewsAlertSystem } from './components/NewsAlertSystem';
import { AiPredictionsModal } from './components/AiPredictionsModal';
import { Sidebar, ViewState } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { AuthModal } from './components/AuthModal';
import { TemporalEngineView } from './components/TemporalEngineView';
import { CommunityHubView } from './components/CommunityHubView';
import { BuildersDashboardView } from './components/BuildersDashboardView';
import { RoadmapView } from './components/RoadmapView';
import { TasksView } from './components/TasksView';
import { TokenomicsView } from './components/TokenomicsView';
import { AISearchBar } from './components/AISearchBar';

export default function App() {
  // App State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeView, setActiveView] = useState<ViewState>('modules');

  // Overlays State
  const [purchasedProduct, setPurchasedProduct] = useState<string | null>(null);
  const [showPredictions, setShowPredictions] = useState(false);

  // Secure View Handler
  const handleViewChange = (view: ViewState) => {
    if (!isLoggedIn && view !== 'modules' && view !== 'network' && view !== 'roadmap' && view !== 'temporal_engine') {
      setShowAuthModal(true);
      return;
    }
    setActiveView(view);
  };

  const renderView = () => {
    switch (activeView) {
      case 'modules':
        return (
          <>
            <AISearchBar />
            <Hero />
            <AgentModulesSection onPurchase={(p) => {
              if (p.title === 'FORECASTING') {
                setShowPredictions(true);
              } else {
                setPurchasedProduct(p.title);
              }
            }} />
          </>
        );
      case 'temporal_engine':
        return <TemporalEngineView />;
      case 'airdrops':
        return <AirdropsDashboard />;
      case 'tasks':
        return <TasksView />;
      case 'tokenomics':
        return <TokenomicsView />;
      case 'community':
        return <CommunityHubView />;
      case 'builders':
        return <BuildersDashboardView />;
      case 'roadmap':
        return <RoadmapView />;
      case 'network':
        return (
          <div className="p-12 text-center text-zinc-500">
            <h2 className="text-3xl font-black uppercase mb-4 text-white">Network Status</h2>
            <p>Global node synchronization is active.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden font-sans text-white relative">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-dark/20 to-black pointer-events-none" />

      {/* Sidebar Navigation */}
      <Sidebar activeView={activeView} setActiveView={handleViewChange} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <TopBar
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setShowAuthModal(true)}
          onLogout={() => {
            setIsLoggedIn(false);
            setActiveView('modules');
          }}
        />

        <main className="flex-1 overflow-y-auto relative scroll-smooth">
          {renderView()}

          {/* Global Footer */}
          {activeView === 'modules' && (
            <footer className="py-24 border-t border-cyan-neon/10 bg-gradient-to-t from-black via-transparent to-transparent relative z-10">
              <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
                <motion.div className="flex flex-col gap-2">
                  <h4 className="text-xl font-black uppercase tracking-tighter group cursor-pointer">
                    <span className="text-cyan-neon group-hover:drop-shadow-[0_0_15px_rgba(0,217,255,0.6)]">Quant</span>
                    <span className="text-magenta-neon group-hover:drop-shadow-[0_0_15px_rgba(255,0,110,0.6)]">AI</span>
                  </h4>
                  <p className="text-xs text-zinc-600 uppercase tracking-widest">
                    Autonomous Intelligence Network.
                  </p>
                </motion.div>

                <div className="text-right">
                  <span className="text-[10px] font-black uppercase text-zinc-500 block mb-2 opacity-50 tracking-[0.5em]">Quant Network</span>
                  <span className="text-[10px] uppercase opacity-30">© 2026 All rights reserved.</span>
                </div>
              </div>
            </footer>
          )}
        </main>
      </div>

      {/* Modals & Overlays */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={() => setIsLoggedIn(true)}
      />

      <SuccessOverlay
        isOpen={!!purchasedProduct}
        onClose={() => setPurchasedProduct(null)}
        productTitle={purchasedProduct || ''}
      />

      <AiPredictionsModal isOpen={showPredictions} onClose={() => setShowPredictions(false)} />

      {/* Persistent News System */}
      <NewsAlertSystem />
    </div>
  );
}

