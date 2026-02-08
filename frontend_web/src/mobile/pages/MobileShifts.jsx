import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Sun, Moon, Clock, Camera, MapPin, ArrowRightLeft,
  CheckCircle2, Timer, Building2, Users,
} from 'lucide-react';
import { currentShift, corporateDuties, driverProfile } from '@/lib/mockData';

const fadeUp = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.3, delay: d } } });

export const MobileShifts = () => {
  const [tab, setTab] = useState('shift');
  const [handoverDone, setHandoverDone] = useState(false);
  const shiftProgress = (currentShift.hoursWorked / 9) * 100;

  return (
    <div className="px-5 pt-2 space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2 p-1 bg-secondary/50 rounded-2xl">
        {[{id: 'shift', label: 'Current Shift'}, {id: 'handover', label: 'Handover'}, {id: 'corporate', label: 'Corporate'}].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 py-2 px-2 rounded-xl text-xs font-medium transition-all duration-200 ${
            tab === t.id ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
          }`}>{t.label}</button>
        ))}
      </div>

      {tab === 'shift' && (
        <>
          {/* Shift Card */}
          <motion.div {...fadeUp()}>
            <Card className="border-primary/15 bg-card">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sun className="w-5 h-5 text-accent" />
                    <span className="text-base font-heading font-bold text-foreground">Morning Shift</span>
                  </div>
                  <Badge variant="success" className="gap-1 text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />Active
                  </Badge>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-heading font-bold text-foreground">06:00</p>
                    <p className="text-[10px] text-muted-foreground">Start</p>
                  </div>
                  <div className="flex-1 mx-4">
                    <Progress value={shiftProgress} className="h-2.5" />
                    <p className="text-[10px] text-muted-foreground text-center mt-1">{currentShift.hoursWorked}h / 9h</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-heading font-bold text-foreground">15:00</p>
                    <p className="text-[10px] text-muted-foreground">End</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-secondary/50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Camera className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-foreground">Check-in</span>
                    </div>
                    <div className="flex items-center gap-1 text-success text-[11px]">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{currentShift.checkInTime}</span>
                    </div>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="text-xs font-medium text-foreground">Location</span>
                    </div>
                    <div className="flex items-center gap-1 text-success text-[11px]">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Timer className="w-3.5 h-3.5" />
                    <span>Overtime: <span className="text-foreground font-medium">{currentShift.overtimeMinutes} min</span></span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Schedule */}
          <motion.div {...fadeUp(0.08)}>
            <p className="text-sm font-heading font-semibold text-foreground mb-2">Today's Schedule</p>
            <div className="space-y-2">
              {[{shift:'Morning', time:'6:00 AM - 3:00 PM', driver: driverProfile.name, icon: Sun, active: true},
                {shift:'Evening', time:'3:00 PM - 12:00 AM', driver: currentShift.handoverTo, icon: Moon, active: false}].map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.shift} className={`flex items-center gap-3 p-3.5 rounded-2xl border ${
                    s.active ? 'border-primary/20 bg-primary/5' : 'border-border/50 bg-card'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      s.active ? 'bg-primary/10' : 'bg-secondary'
                    }`}>
                      <Icon className={`w-5 h-5 ${s.active ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{s.shift} Shift</p>
                      <p className="text-[11px] text-muted-foreground">{s.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-foreground">{s.driver.split(' ')[0]}</p>
                      <Badge variant={s.active ? 'success' : 'muted'} className="text-[9px] mt-0.5">
                        {s.active ? 'Active' : 'Upcoming'}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}

      {tab === 'handover' && (
        <motion.div {...fadeUp()}>
          <Card className="border-border/50 bg-card">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-base font-bold text-primary">SP</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{currentShift.handoverTo}</p>
                  <p className="text-xs text-muted-foreground">Evening Shift Driver</p>
                </div>
                <Badge variant={handoverDone ? 'success' : 'warning'}>{handoverDone ? 'Done' : 'Pending'}</Badge>
              </div>

              <div className="space-y-2.5">
                <p className="text-sm font-medium text-foreground">Checklist</p>
                {['Vehicle condition check', 'Fuel level verification', 'Document handover', 'Key exchange'].map(item => (
                  <div key={item} className="flex items-center gap-3 py-1">
                    {handoverDone ? <CheckCircle2 className="w-5 h-5 text-success" /> : <div className="w-5 h-5 rounded-full border-2 border-border" />}
                    <span className={`text-sm ${handoverDone ? 'text-muted-foreground' : 'text-foreground'}`}>{item}</span>
                  </div>
                ))}
              </div>

              {!handoverDone && (
                <Button variant="premium" className="w-full rounded-xl h-11" onClick={() => setHandoverDone(true)}>
                  <ArrowRightLeft className="w-4 h-4" /> Complete Handover
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {tab === 'corporate' && (
        <motion.div {...fadeUp()}>
          <div className="space-y-2">
            {corporateDuties.map(duty => (
              <Card key={duty.id} className="border-border/50 bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-info" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{duty.company}</p>
                      <p className="text-[11px] text-muted-foreground">{duty.pickup} • {duty.time}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Users className="w-3 h-3" />{duty.employees} pax
                      </div>
                      <Badge variant={duty.status === 'completed' ? 'success' : 'info'} className="text-[9px] mt-0.5">{duty.status}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
      <div className="h-4" />
    </div>
  );
};
