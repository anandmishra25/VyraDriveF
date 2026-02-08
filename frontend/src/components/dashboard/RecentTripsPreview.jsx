import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Star, ChevronRight } from 'lucide-react';
import { recentTrips } from '@/lib/mockData';

const platformColors = {
  Uber: 'bg-foreground/10 text-foreground',
  Ola: 'bg-accent/10 text-accent',
  Corporate: 'bg-info/10 text-info',
};

export const RecentTripsPreview = ({ onNavigate }) => {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-heading font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Recent Trips
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onNavigate && onNavigate('trips')} className="text-xs text-muted-foreground gap-1">
            View All <ChevronRight className="w-3 h-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recentTrips.slice(0, 3).map((trip) => (
            <div
              key={trip.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors duration-200"
            >
              <div className="flex-shrink-0">
                <Badge className={`text-[10px] ${platformColors[trip.platform] || 'bg-secondary text-secondary-foreground'}`}>
                  {trip.platform}
                </Badge>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="truncate text-foreground font-medium">{trip.pickup}</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                  <span className="truncate text-muted-foreground">{trip.dropoff}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                  <span>{trip.time}</span>
                  <span>•</span>
                  <span>{trip.distance} km</span>
                  <span>•</span>
                  <span>{trip.duration} min</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold text-foreground">₹{trip.fare}</p>
                <div className="flex items-center gap-0.5 justify-end">
                  <Star className="w-3 h-3 text-accent fill-accent" />
                  <span className="text-xs text-muted-foreground">{trip.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
