import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Fuel,
  Camera,
  ArrowRightLeft,
  AlertTriangle,
  MessageSquare,
  FileText,
  Zap,
} from 'lucide-react';

const actions = [
  { id: 'fuel', label: 'Log Fuel', icon: Fuel, navigate: 'expenses' },
  { id: 'checkin', label: 'Check-in', icon: Camera, navigate: 'shifts' },
  { id: 'handover', label: 'Handover', icon: ArrowRightLeft, navigate: 'shifts' },
  { id: 'sos', label: 'SOS', icon: AlertTriangle, variant: 'destructive', navigate: 'safety' },
  { id: 'message', label: 'Message', icon: MessageSquare, navigate: 'safety' },
  { id: 'report', label: 'Reports', icon: FileText, navigate: 'earnings' },
];

export const QuickActions = ({ onNavigate }) => {
  return (
    <Card className="h-full border-border/50 bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-heading font-semibold flex items-center gap-2">
          <Zap className="w-4 h-4 text-accent" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onNavigate && onNavigate(action.navigate)}
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl transition-colors duration-200 ${
                  action.id === 'sos'
                    ? 'bg-destructive/10 hover:bg-destructive/20 text-destructive'
                    : 'bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
