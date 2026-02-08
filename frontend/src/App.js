import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import DashboardPage from '@/pages/DashboardPage';
import ShiftsPage from '@/pages/ShiftsPage';
import TripsPage from '@/pages/TripsPage';
import EarningsPage from '@/pages/EarningsPage';
import ExpensesPage from '@/pages/ExpensesPage';
import SafetyPage from '@/pages/SafetyPage';
import { Toaster } from '@/components/ui/sonner';

const pages = {
  dashboard: DashboardPage,
  shifts: ShiftsPage,
  trips: TripsPage,
  earnings: EarningsPage,
  expenses: ExpensesPage,
  safety: SafetyPage,
};

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const PageComponent = pages[activePage] || DashboardPage;

  return (
    <div className="min-h-screen bg-background">
      <AppLayout activePage={activePage} onNavigate={setActivePage}>
        <PageComponent onNavigate={setActivePage} />
      </AppLayout>
      <Toaster />
    </div>
  );
}

export default App;
