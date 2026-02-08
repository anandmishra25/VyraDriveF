import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, IndianRupee, ArrowUpRight } from 'lucide-react';
import { todayStats, weeklyEarnings } from '@/lib/mockData';

export const EarningsWidget = () => {
  return (
    <Card className="h-full border-border/50 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-heading font-semibold flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-primary" />
            Today's Earnings
          </CardTitle>
          <Badge variant="success" className="gap-1 text-[10px]">
            <ArrowUpRight className="w-3 h-3" />
            +12%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Big Earning Number */}
        <div className="text-center py-2">
          <p className="text-4xl font-heading font-bold text-foreground tracking-tight">
            <span className="text-lg text-muted-foreground">₹</span>{todayStats.totalEarnings.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{todayStats.totalTrips} trips • {todayStats.totalKm} km</p>
        </div>

        {/* Mini Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-secondary/50 rounded-lg p-2.5 text-center">
            <p className="text-lg font-heading font-semibold text-foreground">{todayStats.totalTrips}</p>
            <p className="text-[10px] text-muted-foreground">Trips</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-2.5 text-center">
            <p className="text-lg font-heading font-semibold text-foreground">{todayStats.onlineHours}h</p>
            <p className="text-[10px] text-muted-foreground">Online</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-2.5 text-center">
            <p className="text-lg font-heading font-semibold text-foreground">{todayStats.acceptanceRate}%</p>
            <p className="text-[10px] text-muted-foreground">Accept Rate</p>
          </div>
        </div>

        {/* Weekly Teaser */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
            <span>Weekly Payout</span>
          </div>
          <span className="text-sm font-semibold text-foreground">₹{weeklyEarnings.netPayout.toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};
