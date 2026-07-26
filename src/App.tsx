import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageContainer } from '@/components/layout/PageContainer';
import { PurchaseRequestPage } from '@/features/purchase-request/PurchaseRequestPage';
import { TourGuide } from '@/components/ui/TourGuide';

export const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileTab, setMobileTab] = useState<'katalog' | 'keranjang' | 'pesanan'>('katalog');
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [isResettingSession, setIsResettingSession] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [startSimulationSignal, setStartSimulationSignal] = useState(0);

  const handleResetSession = () => {
    setIsResettingSession(true);
    setResetSignal((prev) => prev + 1);
    setTimeout(() => {
      setIsResettingSession(false);
    }, 2000);
  };

  const handleOpenMobileCart = () => {
    setMobileTab('keranjang');
    setIsMobileCartOpen(true);
  };

  const handleGoToKatalog = () => {
    setMobileTab('katalog');
    setIsMobileCartOpen(false);
  };

  const handleStartSimulation = () => {
    setStartSimulationSignal((prev) => prev + 1);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F8F9FA] text-slate-800 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartItemCount={3}
        onOpenCartMobile={handleOpenMobileCart}
        onResetSession={handleResetSession}
        isResettingSession={isResettingSession}
      />

      {/* Main Layout Area: Strictly Fixed 3-Column Layout */}
      <div className="flex-1 flex w-full overflow-hidden">
        {/* Desktop Fixed Left Sidebar Navigation (No Scroll) */}
        <Sidebar
          activeTab="Katalog"
          onOpenHelp={() => setIsTourOpen(true)}
        />

        {/* Dynamic Page Content (Center Column Only Scrollable) */}
        <PageContainer>
          <PurchaseRequestPage
            searchQuery={searchQuery}
            isMobileCartOpen={isMobileCartOpen}
            onCloseMobileCart={() => setIsMobileCartOpen(false)}
            onOpenMobileCart={handleOpenMobileCart}
            resetSignal={resetSignal}
            startSimulationSignal={startSimulationSignal}
          />
        </PageContainer>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        cartItemCount={3}
        activeTab={mobileTab}
        onOpenCartMobile={handleOpenMobileCart}
        onGoToKatalog={handleGoToKatalog}
      />

      {/* Interactive Tour Guide Modal */}
      <TourGuide
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onStartSimulation={handleStartSimulation}
      />
    </div>
  );
};

export default App;
