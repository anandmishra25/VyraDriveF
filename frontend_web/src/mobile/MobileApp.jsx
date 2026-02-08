import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileDashboard } from './pages/MobileDashboard';
import { MobileShifts } from './pages/MobileShifts';
import { MobileTrips } from './pages/MobileTrips';
import { MobileEarnings } from './pages/MobileEarnings';
import { MobileExpenses } from './pages/MobileExpenses';
import { MobileSafety } from './pages/MobileSafety';
import { MobileProfile } from './pages/MobileProfile';
import { Toaster } from '@/components/ui/sonner';

const pages = {
  dashboard: MobileDashboard,
  shifts: MobileShifts,
  trips: MobileTrips,
  earnings: MobileEarnings,
  expenses: MobileExpenses,
  safety: MobileSafety,
  profile: MobileProfile,
};

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

export const MobileApp = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [pageHistory, setPageHistory] = useState(['dashboard']);

  const navigate = useCallback((page) => {
    setActivePage(page);
    setPageHistory((prev) => [...prev, page]);
  }, []);

  const goBack = useCallback(() => {
    if (pageHistory.length > 1) {
      const newHistory = [...pageHistory];
      newHistory.pop();
      setPageHistory(newHistory);
      setActivePage(newHistory[newHistory.length - 1]);
    }
  }, [pageHistory]);

  const PageComponent = pages[activePage] || MobileDashboard;

  return (
    <div className="mobile-app-shell relative w-full h-full flex flex-col bg-background overflow-hidden">
      {/* Status Bar Simulation */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1 bg-background z-20">
        <span className="text-[11px] font-semibold text-foreground">9:41</span>
        <div className="flex items-center gap-1">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <rect x="0" y="5" width="3" height="7" rx="0.5" fill="hsl(var(--foreground))" opacity="0.4"/>
            <rect x="4.5" y="3" width="3" height="9" rx="0.5" fill="hsl(var(--foreground))" opacity="0.6"/>
            <rect x="9" y="1" width="3" height="11" rx="0.5" fill="hsl(var(--foreground))" opacity="0.8"/>
            <rect x="13" y="0" width="3" height="12" rx="0.5" fill="hsl(var(--foreground))"/>
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="2" stroke="hsl(var(--foreground))" strokeOpacity="0.35"/>
            <rect x="2" y="2" width="16" height="8" rx="1" fill="hsl(var(--primary))"/>
            <rect x="22.5" y="3.5" width="1.5" height="5" rx="0.5" fill="hsl(var(--foreground))" fillOpacity="0.4"/>
          </svg>
        </div>
      </div>

      {/* App Header */}
      <MobileHeader activePage={activePage} onBack={goBack} canGoBack={pageHistory.length > 1 && activePage !== 'dashboard'} onNavigate={navigate} />

      {/* Page Content */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 overflow-y-auto scroll-smooth"
            style={{ paddingBottom: '100px' }}
          >
            <PageComponent onNavigate={navigate} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav activePage={activePage} onNavigate={navigate} />
      <Toaster position="top-center" />
    </div>
  );
};
