import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Route, Clock, Star, Fuel, TrendingUp, Gauge } from 'lucide-react';
import { todayStats } from '@/lib/mockData';

const stats = [
  {
    label: 'Total KM',
    value: `${todayStats.totalKm}`,
    unit: 'km',
    icon: Route,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    label: 'Online Hours',
    value: `${todayStats.onlineHours}`,
    unit: 'hrs',
    icon: Clock,
    color: 'text-info',
    bg: 'bg-info/10',
  },
  {
    label: 'Avg Rating',
    value: `${todayStats.avgRating}`,
    unit: '/5',
    icon: Star,
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    label: 'Fuel Used',
    value: `${todayStats.fuelUsed}`,
    unit: 'kg',
    icon: Fuel,
    color: 'text-warning',
    bg: 'bg-warning/10',
  },
  {
    label: 'Efficiency',
    value: `${todayStats.efficiency}`,
    unit: 'km/kg',
    icon: Gauge,
    color: 'text-success',
    bg: 'bg-success/10',
  },
  {
    label: 'Accept Rate',
    value: `${todayStats.acceptanceRate}`,
    unit: '%',
    icon: TrendingUp,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
];

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="border-border/50 bg-card hover:bg-secondary/30 transition-colors duration-200 cursor-default">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-heading font-bold text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.unit}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
