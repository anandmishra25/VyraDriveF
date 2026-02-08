import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MapPin, ArrowRight, Star, Clock, Route, IndianRupee,
  CheckCircle2, XCircle, AlertCircle, Bell, Eye,
} from 'lucide-react';
import { recentTrips, rideOpportunities } from '@/lib/mockData';

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const platformColors = {
  Uber: 'bg-foreground/10 text-foreground',
  Ola: 'bg-accent/10 text-accent',
  Corporate: 'bg-info/10 text-info',
};

const actionIcons = {
  accepted: { icon: CheckCircle2, color: 'text-success' },
  rejected: { icon: XCircle, color: 'text-destructive' },
  missed: { icon: AlertCircle, color: 'text-warning' },
};

export default function TripsPage() {
  const [selectedTrip, setSelectedTrip] = useState(null);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="space-y-6 max-w-4xl mx-auto"
    >
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-2xl font-heading font-bold text-foreground">Trips & Rides</h2>
        <p className="text-sm text-muted-foreground mt-1">Track your trips and ride opportunities</p>
      </motion.div>

      <Tabs defaultValue="trips" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="trips">Trip History</TabsTrigger>
          <TabsTrigger value="opportunities">Ride Opportunities</TabsTrigger>
          <TabsTrigger value="tracking">GPS Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="trips" className="space-y-3 mt-4">
          {recentTrips.map((trip, index) => (
            <motion.div key={trip.id} variants={fadeUp}>
              <Card
                className={`border-border/50 bg-card cursor-pointer transition-colors duration-200 hover:bg-secondary/30 ${
                  selectedTrip === trip.id ? 'border-primary/30' : ''
                }`}
                onClick={() => setSelectedTrip(selectedTrip === trip.id ? null : trip.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Badge className={`text-[10px] mt-0.5 ${platformColors[trip.platform] || ''}`}>
                      {trip.platform}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-sm">
                        <span className="font-medium text-foreground truncate">{trip.pickup}</span>
                        <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        <span className="text-muted-foreground truncate">{trip.dropoff}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{trip.time}</span>
                        <span className="flex items-center gap-1"><Route className="w-3 h-3" />{trip.distance} km</span>
                        <span>{trip.duration} min</span>
                      </div>

                      {/* Expanded detail */}
                      {selectedTrip === trip.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 pt-3 border-t border-border space-y-2"
                        >
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-secondary/50 rounded-lg p-2 text-center">
                              <p className="text-xs text-muted-foreground">Distance</p>
                              <p className="text-sm font-semibold text-foreground">{trip.distance} km</p>
                            </div>
                            <div className="bg-secondary/50 rounded-lg p-2 text-center">
                              <p className="text-xs text-muted-foreground">Duration</p>
                              <p className="text-sm font-semibold text-foreground">{trip.duration} min</p>
                            </div>
                            <div className="bg-secondary/50 rounded-lg p-2 text-center">
                              <p className="text-xs text-muted-foreground">Rating</p>
                              <p className="text-sm font-semibold text-foreground flex items-center justify-center gap-1">
                                <Star className="w-3 h-3 text-accent fill-accent" />{trip.rating}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-base font-heading font-bold text-foreground">₹{trip.fare}</p>
                      <div className="flex items-center gap-0.5 justify-end mt-0.5">
                        <Star className="w-3 h-3 text-accent fill-accent" />
                        <span className="text-xs text-muted-foreground">{trip.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4 mt-4">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="text-base font-heading flex items-center gap-2">
                  <Bell className="w-4 h-4 text-accent" />
                  Smart Notification Reader
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">
                  Automatically captured from Ola & Uber notifications
                </p>
                <div className="space-y-2">
                  {rideOpportunities.map((opp) => {
                    const actionInfo = actionIcons[opp.action];
                    const ActionIcon = actionInfo.icon;
                    return (
                      <div key={opp.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                        <ActionIcon className={`w-4 h-4 ${actionInfo.color} flex-shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Badge className={`text-[10px] ${platformColors[opp.platform] || ''}`}>{opp.platform}</Badge>
                            <span className="text-xs text-muted-foreground">{opp.time}</span>
                          </div>
                          <p className="text-sm text-foreground mt-0.5">{opp.pickup}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-semibold text-foreground">₹{opp.fare}</p>
                          <Badge
                            variant={opp.action === 'accepted' ? 'success' : opp.action === 'rejected' ? 'destructive' : 'warning'}
                            className="text-[10px] mt-0.5"
                          >
                            {opp.action}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4 mt-4">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="text-base font-heading flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  GPS Tracking & Trip Logger
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Map placeholder */}
                <div className="relative w-full h-48 sm:h-64 rounded-xl bg-secondary/50 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground">Live GPS Tracking</p>
                      <p className="text-xs text-muted-foreground mt-1">5-second interval logging active</p>
                    </div>
                  </div>
                  {/* Simulated route dots */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
                    <path d="M 50 150 Q 100 50 200 100 T 350 50" fill="none" stroke="hsl(162 72% 46%)" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
                    <circle cx="50" cy="150" r="5" fill="hsl(162 72% 46%)" />
                    <circle cx="350" cy="50" r="5" fill="hsl(38 92% 50%)" />
                  </svg>
                </div>

                {/* Tracking Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground">Speed</p>
                    <p className="text-lg font-heading font-bold text-foreground">42</p>
                    <p className="text-[10px] text-muted-foreground">km/h</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground">GPS Points</p>
                    <p className="text-lg font-heading font-bold text-foreground">2,847</p>
                    <p className="text-[10px] text-muted-foreground">logged today</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground">Route Match</p>
                    <p className="text-lg font-heading font-bold text-success">98%</p>
                    <p className="text-[10px] text-muted-foreground">accuracy</p>
                  </div>
                </div>

                <Badge variant="success" className="gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  Background tracking active — 5s intervals
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
