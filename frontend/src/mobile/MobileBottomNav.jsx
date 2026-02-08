import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Clock,
  MapPin,
  Wallet,
  ShieldCheck,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { id: 'shifts', label: 'Shifts', icon: Clock },
  { id: 'trips', label: 'Trips', icon: MapPin },
  { id: 'earnings', label: 'Earn', icon: Wallet },
  { id: 'safety', label: 'Safety', icon: ShieldCheck },
];

export const MobileBottomNav = ({ activePage, onNavigate }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30">
      {/* Gradient fade */}
      <div className="h-6 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      <nav className="bg-card/95 backdrop-blur-xl border-t border-border/50 px-2 pb-2 pt-1.5">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative flex flex-col items-center justify-center gap-0.5 w-14 py-1 transition-colors duration-150 active:scale-90"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -top-1.5 w-8 h-1 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <div className={`relative p-1.5 rounded-xl transition-colors duration-200 ${
                  isActive ? 'bg-primary/10' : ''
                }`}>
                  <Icon className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                <span className={`text-[10px] font-medium leading-none transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
