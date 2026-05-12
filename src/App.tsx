import React, { useState } from 'react';
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

export default function App() {
  // App State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeView, setActiveView] = useState<ViewState>('modules');
  
  // Overlays State
  const [purchasedProduct, setPurchasedProduct] = useState<string | null>(null);
  const [showAirdrops, setShowAirdrops] = useState(false);
  const [showPredictions, setShowPredictions] = useState(false);

  // Secure View Handler
  const handleViewChange = (view: ViewState) => {
    if (!isLoggedIn && view !== 'modules' && view !== 'network' && view !== 'roadmap') {
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
            <Hero />
            <AgentModulesSection onPurchase={(p) => {
              if (p.title === 'AIRDROP') {
                setShowAirdrops(true);
              } else if (p.title === 'FORECASTING') {
                setShowPredictions(true);
              } else {
                setPurchasedProduct(p.title);
              }
            }} />
          </>
        );
      case 'temporal_engine':
        return <TemporalEngineView />;
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
    <div className="flex h-screen bg-black overflow-hidden font-sans text-white">
      {/* Sidebar Navigation */}
      <Sidebar activeView={activeView} setActiveView={handleViewChange} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
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

          {/* Global Footer (shown only on certain views if needed, or kept at bottom of scrolling content) */}
          {activeView === 'modules' && (
            <footer className="py-24 border-t border-white/5 bg-black">
              <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="flex flex-col gap-2">
                  <h4 className="text-xl font-black uppercase tracking-tighter">
                    <span className="text-neon-lime">Quant</span>AI
                  </h4>
                  <p className="text-xs text-zinc-600 uppercase tracking-widest">
                    Autonomous Intelligence Network.
                  </p>
                </div>

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

      <AirdropsDashboard isOpen={showAirdrops} onClose={() => setShowAirdrops(false)} />
      <AiPredictionsModal isOpen={showPredictions} onClose={() => setShowPredictions(false)} />
      
      {/* Persistent News System */}
      <NewsAlertSystem />
    </div>
  );
}
