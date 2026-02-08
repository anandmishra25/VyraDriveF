import React from 'react';
import { Menu, Bell, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { driverProfile, currentShift } from '@/lib/mockData';

export const Header = ({ onMenuClick }) => {
  return (
    <header className="h-14 flex items-center justify-between px-4 lg:px-8 border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span>Mumbai, Maharashtra</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant={currentShift.status === 'active' ? 'success' : 'muted'} className="gap-1.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {currentShift.status === 'active' ? 'On Shift' : 'Off Duty'}
        </Badge>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
        </Button>

        <div className="hidden sm:flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-semibold text-primary">
              {driverProfile.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
