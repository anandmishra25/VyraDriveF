import React from 'react';
import { ChevronLeft, Bell, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { driverProfile, currentShift } from '@/lib/mockData';

const pageTitles = {
  dashboard: null,
  shifts: 'Shift Management',
  trips: 'Trips & Rides',
  earnings: 'Earnings',
  expenses: 'CNG & Expenses',
  safety: 'Safety',
  profile: 'Profile',
};

export const MobileHeader = ({ activePage, onBack, canGoBack, onNavigate }) => {
  const isDashboard = activePage === 'dashboard';

  if (isDashboard) {
    return (
      <div className="px-5 pt-2 pb-3 bg-background z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('profile')}
              className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 transition-colors duration-200 active:scale-95"
            >
              <span className="text-sm font-bold text-primary">
                {driverProfile.name.split(' ').map(n => n[0]).join('')}
              </span>
            </button>
            <div>
              <p className="text-[13px] text-muted-foreground">Good morning</p>
              <p className="text-base font-heading font-bold text-foreground leading-tight">{driverProfile.name.split(' ')[0]}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={currentShift.status === 'active' ? 'success' : 'muted'} className="gap-1 py-1 px-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              <span className="text-[10px]">On Shift</span>
            </Badge>
            <button className="relative w-10 h-10 rounded-full bg-secondary flex items-center justify-center transition-colors duration-200 active:bg-surface-hover">
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-destructive border-2 border-background" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-1 pb-3 bg-background z-10">
      <div className="flex items-center gap-3">
        {canGoBack && (
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center transition-colors duration-200 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
        )}
        <h1 className="text-lg font-heading font-bold text-foreground">
          {pageTitles[activePage] || 'Vyra Drive'}
        </h1>
      </div>
    </div>
  );
};
