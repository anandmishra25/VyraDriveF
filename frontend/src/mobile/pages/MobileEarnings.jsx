import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Wallet, IndianRupee, TrendingUp, Award, Calendar,
  Fuel, Star, CheckCircle2, ArrowUpRight,
} from 'lucide-react';
import { todayStats, weeklyEarnings, earningsHistory } from '@/lib/mockData';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const fadeUp = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.3, delay: d } } });

const MobileTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl p-2 shadow-lg">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="text-sm text-primary font-bold">₹{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export const MobileEarnings = () => {
  const [tab, setTab] = useState('overview');

  return (
    <div className="px-5 pt-2 space-y-4">
      <div className="flex gap-2 p-1 bg-secondary/50 rounded-2xl">
        {[{id:'overview', label:'Overview'}, {id:'breakdown', label:'Breakdown'}, {id:'weekly', label:'Payout'}].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 py-2 px-2 rounded-xl text-xs font-medium transition-all duration-200 ${
            tab === t.id ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
          }`}>{t.label}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <>
          <motion.div {...fadeUp()}>
            <Card className="border-primary/15 bg-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs text-muted-foreground">Today's Earnings</p>
                  <Badge variant="success" className="text-[10px] gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />+12%
                  </Badge>
                </div>
                <p className="text-[42px] font-heading font-bold text-foreground leading-none tracking-tight">
                  <span className="text-lg text-muted-foreground">₹</span>{todayStats.totalEarnings.toLocaleString()}
                </p>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {[{l:'Trips', v: todayStats.totalTrips, i: CheckCircle2}, {l:'KM', v: todayStats.totalKm, i: TrendingUp}, {l:'Hours', v: todayStats.onlineHours, i: Calendar}, {l:'Rating', v: todayStats.avgRating, i: Star}].map(s => {
                    const Icon = s.i;
                    return (
                      <div key={s.l} className="text-center">
                        <Icon className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-1" />
                        <p className="text-base font-heading font-bold text-foreground">{s.v}</p>
                        <p className="text-[10px] text-muted-foreground">{s.l}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeUp(0.08)}>
            <p className="text-sm font-heading font-semibold text-foreground mb-2">This Week</p>
            <Card className="border-border/50 bg-card">
              <CardContent className="p-4">
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={earningsHistory} barCategoryGap="15%">
                      <XAxis dataKey="day" tick={{ fill: 'hsl(215 14% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<MobileTooltip />} />
                      <Bar dataKey="earnings" radius={[6, 6, 0, 0]}>
                        {earningsHistory.map((entry, i) => (
                          <Cell key={i} fill={entry.day === 'Fri' ? 'hsl(162 72% 46%)' : 'hsl(162 72% 46% / 0.25)'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}

      {tab === 'breakdown' && (
        <motion.div {...fadeUp()}>
          <Card className="border-border/50 bg-card">
            <CardContent className="p-4 space-y-2.5">
              <p className="text-sm font-heading font-semibold text-foreground mb-1">Weekly Pay Breakdown</p>
              {[
                { l: 'Base Pay (Guaranteed)', v: weeklyEarnings.basePay, i: Wallet, c: 'text-foreground' },
                { l: `KM Incentive (${weeklyEarnings.totalKm}km × ₹0.70)`, v: weeklyEarnings.kmIncentive, i: TrendingUp, c: 'text-primary' },
                { l: 'Quality Bonus', v: weeklyEarnings.qualityBonus, i: Star, c: 'text-accent' },
                { l: `Attendance (${weeklyEarnings.daysWorked} days)`, v: weeklyEarnings.attendanceBonus, i: Calendar, c: 'text-info' },
                { l: 'Fuel Efficiency', v: weeklyEarnings.fuelBonus, i: Fuel, c: 'text-success' },
              ].map(item => {
                const Icon = item.i;
                return (
                  <div key={item.l} className="flex items-center justify-between p-3 bg-secondary/30 rounded-xl">
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${item.c}`} />
                      <span className="text-xs text-muted-foreground">{item.l}</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">+₹{item.v.toLocaleString()}</span>
                  </div>
                );
              })}
              <div className="flex items-center justify-between p-3 bg-destructive/5 rounded-xl">
                <span className="text-xs text-destructive">Deductions</span>
                <span className="text-sm font-semibold text-destructive">-₹{weeklyEarnings.deductions}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-2xl border border-primary/20">
                <span className="text-sm font-heading font-bold text-foreground">Net Payout</span>
                <span className="text-2xl font-heading font-bold text-primary">₹{weeklyEarnings.netPayout.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {tab === 'weekly' && (
        <motion.div {...fadeUp()}>
          <Card className="border-primary/15 bg-card">
            <CardContent className="p-6 text-center">
              <Award className="w-14 h-14 text-accent mx-auto mb-3" />
              <p className="text-lg font-heading font-bold text-foreground">Weekly Payout</p>
              <p className="text-xs text-muted-foreground mt-1">{weeklyEarnings.payoutDate}</p>
              <p className="text-5xl font-heading font-bold text-primary mt-4">₹{weeklyEarnings.netPayout.toLocaleString()}</p>
              <div className="grid grid-cols-3 gap-3 mt-6">
                {[{l:'Trips', v: weeklyEarnings.totalTrips}, {l:'KM', v: weeklyEarnings.totalKm}, {l:'Days', v: weeklyEarnings.daysWorked}].map(s => (
                  <div key={s.l} className="bg-secondary/50 rounded-xl p-3">
                    <p className="text-xl font-heading font-bold text-foreground">{s.v}</p>
                    <p className="text-[10px] text-muted-foreground">{s.l}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      <div className="h-4" />
    </div>
  );
};
