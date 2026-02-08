import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Sun, ArrowRightLeft, MapPin } from 'lucide-react';
import { currentShift } from '@/lib/mockData';

export const ShiftStatusCard = () => {
  const shiftProgress = (currentShift.hoursWorked / 9) * 100;

  return (
    <Card className="h-full border-border/50 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-heading font-semibold flex items-center gap-2">
            <Sun className="w-4 h-4 text-accent" />
            Morning Shift
          </CardTitle>
          <Badge variant="success" className="gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Time Range */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{currentShift.start}</span>
          </div>
          <div className="flex-1 mx-3 border-t border-dashed border-border" />
          <span className="text-muted-foreground">{currentShift.end}</span>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Shift Progress</span>
            <span className="font-medium text-foreground">{currentShift.hoursWorked}h / 9h</span>
          </div>
          <Progress value={shiftProgress} className="h-2" />
        </div>

        {/* Check-in Info */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 rounded-lg px-3 py-2">
          <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <span>Checked in at {currentShift.checkInTime} — {currentShift.checkInLocation}</span>
        </div>

        {/* Handover */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Handover to: <span className="text-foreground font-medium">{currentShift.handoverTo}</span></span>
          </div>
          <Badge variant="warning" className="text-[10px]">
            Pending
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
