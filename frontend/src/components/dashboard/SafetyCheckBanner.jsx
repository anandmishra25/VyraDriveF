import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle2, Clock, X } from 'lucide-react';
import { currentShift, driverProfile } from '@/lib/mockData';

export const SafetyCheckBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);

  if (dismissed) return null;

  return (
    <Card className="border-accent/20 bg-accent/5">
      <CardContent className="py-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
            {checkedIn ? (
              <CheckCircle2 className="w-5 h-5 text-success" />
            ) : (
              <Shield className="w-5 h-5 text-accent" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            {checkedIn ? (
              <>
                <p className="text-sm font-medium text-foreground">Safety Check Complete</p>
                <p className="text-xs text-muted-foreground mt-0.5">Next check-in at {currentShift.nextCheckIn}</p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-foreground">Good morning, {driverProfile.name.split(' ')[0]}!</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Safety check-in is due. Next: {currentShift.nextCheckIn}
                </p>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {!checkedIn && (
              <Button variant="accent" size="sm" onClick={() => setCheckedIn(true)}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Check In
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => setDismissed(true)} className="h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
