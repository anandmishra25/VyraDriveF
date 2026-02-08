import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import DashboardPage from '@/pages/DashboardPage';
import ShiftsPage from '@/pages/ShiftsPage';
import TripsPage from '@/pages/TripsPage';
import EarningsPage from '@/pages/EarningsPage';
import ExpensesPage from '@/pages/ExpensesPage';
import SafetyPage from '@/pages/SafetyPage';
import { MobileApp } from '@/mobile/MobileApp';
import { Toaster } from '@/components/ui/sonner';

const desktopPages = {
  dashboard: DashboardPage,
  shifts: ShiftsPage,
  trips: TripsPage,
  earnings: EarningsPage,
  expenses: ExpensesPage,
  safety: SafetyPage,
};

const DesktopApp = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const PageComponent = desktopPages[activePage] || DashboardPage;

  return (
    <div className="min-h-screen bg-background">
      <AppLayout activePage={activePage} onNavigate={setActivePage}>
        <PageComponent onNavigate={setActivePage} />
      </AppLayout>
    </div>
  );
};

const MobilePreview = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 lg:p-8">
      {/* Desktop: Phone Frame Preview */}
      <div className="hidden lg:block text-center mb-6">
        <h1 className="text-3xl font-heading font-bold text-foreground">Vyra Drive Mobile App</h1>
        <p className="text-sm text-muted-foreground mt-2">Cross-platform driver fleet management</p>
      </div>

      {/* Phone Frame for Desktop */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Phone Bezel */}
          <div className="w-[390px] h-[844px] rounded-[50px] border-[6px] border-[hsl(var(--border))] bg-background shadow-[0_20px_60px_hsl(var(--background)/0.8),0_0_0_1px_hsl(var(--border)/0.5)] overflow-hidden relative">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-[hsl(var(--foreground)/0.95)] rounded-full z-50" />
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[140px] h-[5px] bg-[hsl(var(--foreground)/0.2)] rounded-full z-50" />
            
            {/* App Content */}
            <div className="w-full h-full pt-[42px] overflow-hidden">
              <MobileApp />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Full Screen */}
      <div className="lg:hidden w-full h-screen fixed inset-0">
        <MobileApp />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DesktopApp />} />
        <Route path="/mobile" element={<MobilePreview />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
