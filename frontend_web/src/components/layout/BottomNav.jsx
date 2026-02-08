import React from 'react';
import {
  LayoutDashboard,
  Clock,
  MapPin,
  Wallet,
  Fuel,
  ShieldCheck,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { id: 'shifts', label: 'Shifts', icon: Clock },
  { id: 'trips', label: 'Trips', icon: MapPin },
  { id: 'earnings', label: 'Earn', icon: Wallet },
  { id: 'expenses', label: 'Expense', icon: Fuel },
  { id: 'safety', label: 'Safety', icon: ShieldCheck },
];

export const BottomNav = ({ activePage, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-surface border-t border-border">
      <div className="flex items-center justify-around h-16 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-lg min-w-[48px] transition-colors duration-200 ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]' : ''}`} />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
              {isActive && (
                <div className="absolute top-0 w-8 h-0.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
