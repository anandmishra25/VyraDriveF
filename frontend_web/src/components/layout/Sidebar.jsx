import React from 'react';
import {
  LayoutDashboard,
  Clock,
  MapPin,
  Wallet,
  Fuel,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { driverProfile } from '@/lib/mockData';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'shifts', label: 'Shifts', icon: Clock },
  { id: 'trips', label: 'Trips & Rides', icon: MapPin },
  { id: 'earnings', label: 'Earnings', icon: Wallet },
  { id: 'expenses', label: 'Expenses', icon: Fuel },
  { id: 'safety', label: 'Safety', icon: ShieldCheck },
];

export const Sidebar = ({ activePage, onNavigate }) => {
  return (
    <aside className="w-64 h-full flex flex-col bg-card border-r border-border">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-heading text-lg font-bold text-foreground tracking-tight">Vyra Drive</h1>
            <p className="text-xs text-muted-foreground">Fleet Driver App</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              <span>{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          );
        })}
      </nav>

      {/* Driver Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {driverProfile.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{driverProfile.name}</p>
            <p className="text-xs text-muted-foreground">{driverProfile.id}</p>
          </div>
          <Badge variant="success" className="text-[10px]">
            {driverProfile.rating}
          </Badge>
        </div>
      </div>
    </aside>
  );
};
