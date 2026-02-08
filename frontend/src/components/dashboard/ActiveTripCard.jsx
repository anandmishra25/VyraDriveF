import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Navigation, Clock, MapPin, IndianRupee, Route } from 'lucide-react';

export const ActiveTripCard = () => {
  const [tripActive, setTripActive] = useState(true);

  if (!tripActive) {
    return (
      <Card className="h-full border-border/50 bg-card">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Navigation className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">No Active Trip</p>
          <p className="text-xs text-muted-foreground mt-1">Waiting for next ride request...</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => setTripActive(true)}>
            Simulate Trip
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full border-primary/20 bg-card glow-primary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-heading font-semibold flex items-center gap-2">
            <Navigation className="w-4 h-4 text-primary" />
            Active Trip
          </CardTitle>
          <Badge variant="info" className="gap-1 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            In Progress
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Route */}
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <div className="w-0.5 flex-1 bg-border my-1" />
            <div className="w-2.5 h-2.5 rounded-full border-2 border-accent bg-background" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Pickup</p>
              <p className="text-sm font-medium text-foreground">Andheri Station West</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Drop-off</p>
              <p className="text-sm font-medium text-foreground">Bandra Kurla Complex</p>
            </div>
          </div>
        </div>

        {/* Trip Stats */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Distance', value: '12.4 km', icon: Route },
            { label: 'Duration', value: '38 min', icon: Clock },
            { label: 'Est. Fare', value: '₹320', icon: IndianRupee },
            { label: 'Platform', value: 'Uber', icon: MapPin },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-secondary/50 rounded-lg p-2 text-center">
                <Icon className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-1" />
                <p className="text-xs font-semibold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <Button variant="premium" className="w-full" onClick={() => setTripActive(false)}>
          Complete Trip
        </Button>
      </CardContent>
    </Card>
  );
};
