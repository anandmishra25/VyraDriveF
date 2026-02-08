import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Sun, Clock, ArrowRightLeft, MapPin, Navigation, Route,
  IndianRupee, Star, Fuel, Gauge, TrendingUp, CheckCircle2,
  ArrowRight, ArrowUpRight, Zap, Camera, AlertTriangle,
  MessageSquare, FileText, Shield, X,
} from 'lucide-react';
import { currentShift, todayStats, weeklyEarnings, recentTrips, driverProfile } from '@/lib/mockData';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, delay, ease: [0.25, 0.1, 0.25, 1] } },
});

const quickStats = [
  { label: 'KM', value: todayStats.totalKm, icon: Route, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Hours', value: `${todayStats.onlineHours}h`, icon: Clock, color: 'text-info', bg: 'bg-info/10' },
  { label: 'Rating', value: todayStats.avgRating, icon: Star, color: 'text-accent', bg: 'bg-accent/10' },
  { label: 'Fuel', value: `${todayStats.fuelUsed}kg`, icon: Fuel, color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Efficiency', value: `${todayStats.efficiency}`, icon: Gauge, color: 'text-success', bg: 'bg-success/10' },
  { label: 'Accept', value: `${todayStats.acceptanceRate}%`, icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
];

const quickActions = [
  { id: 'fuel', label: 'Log Fuel', icon: Fuel, nav: 'expenses' },
  { id: 'checkin', label: 'Check-in', icon: Camera, nav: 'shifts' },
  { id: 'handover', label: 'Handover', icon: ArrowRightLeft, nav: 'shifts' },
  { id: 'sos', label: 'SOS', icon: AlertTriangle, nav: 'safety', danger: true },
];

const platformColors = {
  Uber: 'bg-foreground/10 text-foreground',
  Ola: 'bg-accent/10 text-accent',
  Corporate: 'bg-info/10 text-info',
};

export const MobileDashboard = ({ onNavigate }) => {
  const [showBanner, setShowBanner] = useState(true);
  const [checkedIn, setCheckedIn] = useState(false);
  const [tripActive, setTripActive] = useState(true);
  const shiftProgress = (currentShift.hoursWorked / 9) * 100;

  return (
    <div className="px-5 pt-2 space-y-5">
      {/* Safety Check Banner */}
      {showBanner && (
        <motion.div {...fadeUp(0)}>
          <div className={`rounded-2xl p-3.5 border ${
            checkedIn ? 'border-success/20 bg-success/5' : 'border-accent/20 bg-accent/5'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                checkedIn ? 'bg-success/10' : 'bg-accent/10'
              }`}>
                {checkedIn ? <CheckCircle2 className="w-5 h-5 text-success" /> : <Shield className="w-5 h-5 text-accent" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {checkedIn ? 'Safety Check Done' : `Hey ${driverProfile.name.split(' ')[0]}!`}
                </p>
                <p className="text-xs text-muted-foreground">
                  {checkedIn ? 'Next at 10:00 AM' : 'Safety check-in due'}
                </p>
              </div>
              {!checkedIn && (
                <Button variant="accent" size="sm" className="rounded-xl text-xs h-8" onClick={() => setCheckedIn(true)}>
                  Check In
                </Button>
              )}
              <button onClick={() => setShowBanner(false)} className="p-1">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Earnings Hero Card */}
      <motion.div {...fadeUp(0.04)}>
        <Card className="border-primary/15 bg-card overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-1">
              <p className="text-xs text-muted-foreground">Today's Earnings</p>
              <Badge variant="success" className="text-[10px] gap-0.5 py-0.5">
                <ArrowUpRight className="w-3 h-3" />+12%
              </Badge>
            </div>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-sm text-muted-foreground">₹</span>
              <span className="text-[40px] font-heading font-bold text-foreground leading-none tracking-tight">{todayStats.totalEarnings.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-primary" />{todayStats.totalTrips} trips</span>
              <span className="flex items-center gap-1"><Route className="w-3 h-3 text-primary" />{todayStats.totalKm} km</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-primary" />{todayStats.onlineHours}h online</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Shift Status Compact */}
      <motion.div {...fadeUp(0.08)}>
        <Card className="border-border/50 bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Sun className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-heading font-semibold text-foreground">Morning Shift</p>
                  <p className="text-[11px] text-muted-foreground">{currentShift.start} — {currentShift.end}</p>
                </div>
              </div>
              <Badge variant="success" className="text-[10px] gap-1">
                <span className="w-1 h-1 rounded-full bg-current animate-pulse" />Active
              </Badge>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{currentShift.hoursWorked}h / 9h</span>
              </div>
              <Progress value={shiftProgress} className="h-1.5" />
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <ArrowRightLeft className="w-3 h-3" />
                <span>Handover: <span className="text-foreground font-medium">{currentShift.handoverTo}</span></span>
              </div>
              <Badge variant="warning" className="text-[10px]">Pending</Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats - Horizontal Scroll */}
      <motion.div {...fadeUp(0.12)}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-heading font-semibold text-foreground">Quick Stats</p>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-5 px-5 no-scrollbar">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex-shrink-0 w-[80px] bg-card border border-border/50 rounded-2xl p-3 text-center">
                <div className={`w-8 h-8 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-1.5`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <p className="text-base font-heading font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Active Trip */}
      {tripActive && (
        <motion.div {...fadeUp(0.16)}>
          <Card className="border-primary/20 bg-card glow-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Navigation className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm font-heading font-semibold text-foreground">Active Trip</p>
                </div>
                <Badge variant="info" className="text-[10px] gap-1 animate-pulse">
                  <span className="w-1 h-1 rounded-full bg-current" />Live
                </Badge>
              </div>
              <div className="flex gap-3 mb-3">
                <div className="flex flex-col items-center py-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="w-0.5 flex-1 bg-border my-1" />
                  <div className="w-2 h-2 rounded-full border-2 border-accent bg-background" />
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Pickup</p>
                    <p className="text-sm font-medium text-foreground">Andheri Station West</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Drop-off</p>
                    <p className="text-sm font-medium text-foreground">Bandra Kurla Complex</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Est. Fare</p>
                  <p className="text-xl font-heading font-bold text-foreground">₹320</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[{ l: 'Distance', v: '12.4 km' }, { l: 'Duration', v: '38 min' }, { l: 'Platform', v: 'Uber' }].map(s => (
                  <div key={s.l} className="bg-secondary/50 rounded-xl p-2 text-center">
                    <p className="text-xs font-semibold text-foreground">{s.v}</p>
                    <p className="text-[10px] text-muted-foreground">{s.l}</p>
                  </div>
                ))}
              </div>
              <Button variant="premium" className="w-full rounded-xl h-11" onClick={() => setTripActive(false)}>
                Complete Trip
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div {...fadeUp(0.2)}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-heading font-semibold text-foreground">Quick Actions</p>
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onNavigate(action.nav)}
                className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl transition-colors duration-150 active:scale-95 ${
                  action.danger
                    ? 'bg-destructive/10 active:bg-destructive/20'
                    : 'bg-card border border-border/50 active:bg-secondary'
                }`}
              >
                <Icon className={`w-5 h-5 ${action.danger ? 'text-destructive' : 'text-muted-foreground'}`} />
                <span className={`text-[10px] font-medium ${action.danger ? 'text-destructive' : 'text-muted-foreground'}`}>{action.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Trips */}
      <motion.div {...fadeUp(0.24)}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-heading font-semibold text-foreground">Recent Trips</p>
          <button onClick={() => onNavigate('trips')} className="text-xs text-primary font-medium">View All</button>
        </div>
        <div className="space-y-2">
          {recentTrips.slice(0, 3).map((trip) => (
            <div key={trip.id} className="flex items-center gap-3 p-3 bg-card border border-border/50 rounded-2xl active:bg-secondary transition-colors duration-150">
              <Badge className={`text-[9px] px-1.5 py-0.5 ${platformColors[trip.platform] || ''}`}>{trip.platform}</Badge>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-medium text-foreground truncate">{trip.pickup}</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground truncate">{trip.dropoff}</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">{trip.time} • {trip.distance} km • {trip.duration} min</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-heading font-bold text-foreground">₹{trip.fare}</p>
                <div className="flex items-center gap-0.5 justify-end">
                  <Star className="w-2.5 h-2.5 text-accent fill-accent" />
                  <span className="text-[10px] text-muted-foreground">{trip.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Weekly Payout Teaser */}
      <motion.div {...fadeUp(0.28)}>
        <button onClick={() => onNavigate('earnings')} className="w-full">
          <div className="flex items-center justify-between p-4 bg-card border border-border/50 rounded-2xl active:bg-secondary transition-colors duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">Weekly Payout</p>
                <p className="text-[11px] text-muted-foreground">{weeklyEarnings.payoutDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-heading font-bold text-primary">₹{weeklyEarnings.netPayout.toLocaleString()}</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </button>
      </motion.div>

      <div className="h-4" />
    </div>
  );
};

const Wallet = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
);
