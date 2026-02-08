import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  User, Car, Phone, Star, Calendar, MapPin,
  Shield, Settings, LogOut, ChevronRight, Award,
} from 'lucide-react';
import { driverProfile } from '@/lib/mockData';

const fadeUp = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.3, delay: d } } });

export const MobileProfile = ({ onNavigate }) => {
  return (
    <div className="px-5 pt-2 space-y-4">
      {/* Profile Card */}
      <motion.div {...fadeUp()}>
        <Card className="border-primary/15 bg-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                <span className="text-xl font-bold text-primary">
                  {driverProfile.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-lg font-heading font-bold text-foreground">{driverProfile.name}</p>
                <p className="text-xs text-muted-foreground">{driverProfile.id} • {driverProfile.fleetOwner}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant="success" className="gap-0.5 text-[10px]">
                    <Star className="w-3 h-3 fill-current" />{driverProfile.rating}
                  </Badge>
                  <Badge variant="info" className="text-[10px]">
                    {driverProfile.daysActive} days active
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Vehicle Info */}
      <motion.div {...fadeUp(0.06)}>
        <p className="text-sm font-heading font-semibold text-foreground mb-2">Vehicle</p>
        <Card className="border-border/50 bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Car className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{driverProfile.vehicleNumber}</p>
                <p className="text-xs text-muted-foreground">{driverProfile.vehicleType}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Links */}
      <motion.div {...fadeUp(0.12)}>
        <p className="text-sm font-heading font-semibold text-foreground mb-2">Quick Links</p>
        <Card className="border-border/50 bg-card">
          <CardContent className="p-1">
            {[
              { label: 'Contact Fleet Owner', icon: Phone, detail: driverProfile.phone },
              { label: 'Shift History', icon: Calendar, detail: 'View past shifts' },
              { label: 'Safety Settings', icon: Shield, detail: 'SOS & check-in config' },
              { label: 'App Settings', icon: Settings, detail: 'Theme, notifications' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.label}>
                  <button className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-secondary/50 transition-colors duration-150">
                    <Icon className="w-4.5 h-4.5 text-muted-foreground" />
                    <div className="flex-1 text-left">
                      <p className="text-sm text-foreground">{item.label}</p>
                      <p className="text-[11px] text-muted-foreground">{item.detail}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  {i < 3 && <Separator className="mx-4" />}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* Sign Out */}
      <motion.div {...fadeUp(0.18)}>
        <Button variant="outline" className="w-full rounded-2xl h-11 gap-2 border-destructive/20 text-destructive hover:bg-destructive/5 hover:text-destructive">
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </motion.div>

      <div className="h-8" />
    </div>
  );
};
