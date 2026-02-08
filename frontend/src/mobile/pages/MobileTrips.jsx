import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight, Star, Clock, Route, MapPin, Bell,
  CheckCircle2, XCircle, AlertCircle, Eye,
} from 'lucide-react';
import { recentTrips, rideOpportunities } from '@/lib/mockData';

const fadeUp = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.3, delay: d } } });

const platformColors = {
  Uber: 'bg-foreground/10 text-foreground',
  Ola: 'bg-accent/10 text-accent',
  Corporate: 'bg-info/10 text-info',
};
const actionIcons = { accepted: { icon: CheckCircle2, color: 'text-success' }, rejected: { icon: XCircle, color: 'text-destructive' }, missed: { icon: AlertCircle, color: 'text-warning' } };

export const MobileTrips = () => {
  const [tab, setTab] = useState('trips');
  const [expandedTrip, setExpandedTrip] = useState(null);

  return (
    <div className="px-5 pt-2 space-y-4">
      <div className="flex gap-2 p-1 bg-secondary/50 rounded-2xl">
        {[{id:'trips', label:'Trip History'}, {id:'opps', label:'Ride Log'}, {id:'tracking', label:'GPS'}].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 py-2 px-2 rounded-xl text-xs font-medium transition-all duration-200 ${
            tab === t.id ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
          }`}>{t.label}</button>
        ))}
      </div>

      {tab === 'trips' && (
        <div className="space-y-2">
          {recentTrips.map((trip, i) => (
            <motion.div key={trip.id} {...fadeUp(i * 0.04)}>
              <button
                className="w-full text-left p-3.5 bg-card border border-border/50 rounded-2xl active:bg-secondary transition-colors duration-150"
                onClick={() => setExpandedTrip(expandedTrip === trip.id ? null : trip.id)}
              >
                <div className="flex items-start gap-2.5">
                  <Badge className={`text-[9px] px-1.5 py-0.5 mt-0.5 ${platformColors[trip.platform] || ''}`}>{trip.platform}</Badge>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-sm">
                      <span className="font-medium text-foreground truncate">{trip.pickup}</span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{trip.dropoff}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{trip.time} • {trip.distance} km • {trip.duration} min</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-base font-heading font-bold text-foreground">₹{trip.fare}</p>
                    <div className="flex items-center gap-0.5 justify-end">
                      <Star className="w-3 h-3 text-accent fill-accent" />
                      <span className="text-[11px] text-muted-foreground">{trip.rating}</span>
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {expandedTrip === trip.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-border/50"
                    >
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-secondary/50 rounded-xl p-2 text-center">
                          <p className="text-[10px] text-muted-foreground">Distance</p>
                          <p className="text-sm font-bold text-foreground">{trip.distance} km</p>
                        </div>
                        <div className="bg-secondary/50 rounded-xl p-2 text-center">
                          <p className="text-[10px] text-muted-foreground">Duration</p>
                          <p className="text-sm font-bold text-foreground">{trip.duration} min</p>
                        </div>
                        <div className="bg-secondary/50 rounded-xl p-2 text-center">
                          <p className="text-[10px] text-muted-foreground">Rating</p>
                          <p className="text-sm font-bold text-foreground flex items-center justify-center gap-0.5">
                            <Star className="w-3 h-3 text-accent fill-accent" />{trip.rating}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {tab === 'opps' && (
        <motion.div {...fadeUp()}>
          <Card className="border-border/50 bg-card">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-accent" />
                <p className="text-sm font-heading font-semibold text-foreground">Notification Reader</p>
              </div>
              <p className="text-[11px] text-muted-foreground">Auto-captured from Ola & Uber</p>
              {rideOpportunities.map(opp => {
                const AI = actionIcons[opp.action]; const AIcon = AI.icon;
                return (
                  <div key={opp.id} className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/30">
                    <AIcon className={`w-4 h-4 flex-shrink-0 ${AI.color}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Badge className={`text-[9px] ${platformColors[opp.platform] || ''}`}>{opp.platform}</Badge>
                        <span className="text-[10px] text-muted-foreground">{opp.time}</span>
                      </div>
                      <p className="text-sm text-foreground mt-0.5 truncate">{opp.pickup}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-foreground">₹{opp.fare}</p>
                      <Badge variant={opp.action==='accepted'?'success':opp.action==='rejected'?'destructive':'warning'} className="text-[9px]">{opp.action}</Badge>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {tab === 'tracking' && (
        <motion.div {...fadeUp()}>
          <Card className="border-border/50 bg-card">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary" />
                <p className="text-sm font-heading font-semibold text-foreground">GPS Tracking</p>
              </div>
              <div className="relative w-full h-48 rounded-2xl bg-secondary/50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">Live Tracking</p>
                    <p className="text-xs text-muted-foreground">5s interval logging</p>
                  </div>
                </div>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
                  <path d="M 50 150 Q 100 50 200 100 T 350 50" fill="none" stroke="hsl(162 72% 46%)" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
                  <circle cx="50" cy="150" r="5" fill="hsl(162 72% 46%)" />
                  <circle cx="350" cy="50" r="5" fill="hsl(38 92% 50%)" />
                </svg>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[{l:'Speed', v:'42', u:'km/h'}, {l:'GPS Points', v:'2,847', u:'today'}, {l:'Route Match', v:'98%', u:'accuracy'}].map(s => (
                  <div key={s.l} className="bg-secondary/50 rounded-xl p-2.5 text-center">
                    <p className="text-[10px] text-muted-foreground">{s.l}</p>
                    <p className="text-base font-heading font-bold text-foreground">{s.v}</p>
                    <p className="text-[9px] text-muted-foreground">{s.u}</p>
                  </div>
                ))}
              </div>
              <Badge variant="success" className="gap-1 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Background tracking active
              </Badge>
            </CardContent>
          </Card>
        </motion.div>
      )}
      <div className="h-4" />
    </div>
  );
};
