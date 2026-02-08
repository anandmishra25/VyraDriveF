import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Clock, Sun, Moon, Camera, MapPin, ArrowRightLeft,
  CheckCircle2, AlertCircle, Users, Building2, Timer,
} from 'lucide-react';
import { currentShift, corporateDuties, driverProfile } from '@/lib/mockData';

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const FadeIn = ({ children, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function ShiftsPage() {
  const [checkedIn, setCheckedIn] = useState(currentShift.checkedIn);
  const [handoverDone, setHandoverDone] = useState(false);
  const shiftProgress = (currentShift.hoursWorked / 9) * 100;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="space-y-6 max-w-4xl mx-auto"
    >
      <motion.div variants={fadeUp}>
        <h2 className="text-2xl font-heading font-bold text-foreground">Shift Management</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your shifts, check-ins, and handovers</p>
      </motion.div>

      <Tabs defaultValue="current" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="current">Current Shift</TabsTrigger>
          <TabsTrigger value="handover">Handover</TabsTrigger>
          <TabsTrigger value="corporate">Corporate Duties</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4 mt-4">
          {/* Current Shift Detail */}
          <motion.div variants={fadeUp}>
            <Card className="border-primary/20 bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-heading flex items-center gap-2">
                    <Sun className="w-5 h-5 text-accent" />
                    Morning Shift
                  </CardTitle>
                  <Badge variant="success" className="gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Timeline */}
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-heading font-bold text-foreground">06:00</p>
                    <p className="text-xs text-muted-foreground">Start</p>
                  </div>
                  <div className="flex-1">
                    <Progress value={shiftProgress} className="h-3" />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{currentShift.hoursWorked}h worked</span>
                      <span className="text-xs text-muted-foreground">{(9 - currentShift.hoursWorked).toFixed(1)}h remaining</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-heading font-bold text-foreground">15:00</p>
                    <p className="text-xs text-muted-foreground">End</p>
                  </div>
                </div>

                {/* Check-in Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Camera className="w-4.5 h-4.5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Photo Check-in</p>
                        <p className="text-xs text-muted-foreground">Geofence verified</p>
                      </div>
                    </div>
                    {checkedIn ? (
                      <div className="flex items-center gap-2 text-success text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Completed at {currentShift.checkInTime}</span>
                      </div>
                    ) : (
                      <Button variant="premium" size="sm" className="w-full" onClick={() => setCheckedIn(true)}>
                        <Camera className="w-4 h-4" />
                        Check In Now
                      </Button>
                    )}
                  </div>

                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                        <MapPin className="w-4.5 h-4.5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Location</p>
                        <p className="text-xs text-muted-foreground">GPS tracking active</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-success text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{currentShift.checkInLocation}</span>
                    </div>
                  </div>
                </div>

                {/* Overtime */}
                <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Overtime</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{currentShift.overtimeMinutes} min</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Schedule Overview */}
          <motion.div variants={fadeUp}>
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="text-base font-heading">Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { shift: 'Morning', time: '6:00 AM - 3:00 PM', driver: driverProfile.name, icon: Sun, active: true },
                    { shift: 'Evening', time: '3:00 PM - 12:00 AM', driver: currentShift.handoverTo, icon: Moon, active: false },
                  ].map((schedule) => {
                    const Icon = schedule.icon;
                    return (
                      <div key={schedule.shift} className={`flex items-center gap-4 p-3 rounded-lg ${
                        schedule.active ? 'bg-primary/5 border border-primary/20' : 'bg-secondary/30'
                      }`}>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          schedule.active ? 'bg-primary/10' : 'bg-secondary'
                        }`}>
                          <Icon className={`w-5 h-5 ${schedule.active ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{schedule.shift} Shift</p>
                          <p className="text-xs text-muted-foreground">{schedule.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-foreground">{schedule.driver}</p>
                          <Badge variant={schedule.active ? 'success' : 'muted'} className="text-[10px] mt-0.5">
                            {schedule.active ? 'Active' : 'Upcoming'}
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

        <TabsContent value="handover" className="space-y-4 mt-4">
          <motion.div variants={fadeUp}>
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <ArrowRightLeft className="w-5 h-5 text-primary" />
                  Shift Handover
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-base font-semibold text-primary">SP</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{currentShift.handoverTo}</p>
                    <p className="text-xs text-muted-foreground">Evening Shift Driver</p>
                  </div>
                  <Badge variant={handoverDone ? 'success' : 'warning'} className="ml-auto">
                    {handoverDone ? 'Completed' : 'Pending'}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Handover Checklist</h4>
                  {[
                    { label: 'Vehicle condition check', done: handoverDone },
                    { label: 'Fuel level verification', done: handoverDone },
                    { label: 'Document handover', done: handoverDone },
                    { label: 'Key exchange', done: handoverDone },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 text-sm">
                      {item.done ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-border" />
                      )}
                      <span className={item.done ? 'text-muted-foreground' : 'text-foreground'}>{item.label}</span>
                    </div>
                  ))}
                </div>

                {!handoverDone && (
                  <Button variant="premium" className="w-full" onClick={() => setHandoverDone(true)}>
                    <ArrowRightLeft className="w-4 h-4" />
                    Complete Handover
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="corporate" className="space-y-4 mt-4">
          <motion.div variants={fadeUp}>
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-info" />
                  Corporate Duties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {corporateDuties.map((duty) => (
                  <div key={duty.id} className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-info" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{duty.company}</p>
                      <p className="text-xs text-muted-foreground">{duty.pickup} • {duty.time}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" />
                        <span>{duty.employees} pax</span>
                      </div>
                      <Badge variant={duty.status === 'completed' ? 'success' : 'info'} className="text-[10px] mt-1">
                        {duty.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
