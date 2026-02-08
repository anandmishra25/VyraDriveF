import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Wallet, IndianRupee, TrendingUp, Award, Calendar,
  Fuel, Star, CheckCircle2, ArrowUpRight,
} from 'lucide-react';
import { todayStats, weeklyEarnings, earningsHistory } from '@/lib/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-sm text-primary font-semibold">₹{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function EarningsPage() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="space-y-6 max-w-4xl mx-auto"
    >
      <motion.div variants={fadeUp}>
        <h2 className="text-2xl font-heading font-bold text-foreground">Earnings</h2>
        <p className="text-sm text-muted-foreground mt-1">Track your income, bonuses, and payouts</p>
      </motion.div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="breakdown">Pay Breakdown</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          {/* Today's Earnings Big Card */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Card className="border-primary/20 bg-card glow-primary">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Earnings</p>
                    <p className="text-4xl font-heading font-bold text-foreground mt-1">
                      <span className="text-lg text-muted-foreground">₹</span>{todayStats.totalEarnings.toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="success" className="gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    +12% vs avg
                  </Badge>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: 'Trips', value: todayStats.totalTrips, icon: CheckCircle2 },
                    { label: 'KM', value: todayStats.totalKm, icon: TrendingUp },
                    { label: 'Hours', value: todayStats.onlineHours, icon: Calendar },
                    { label: 'Rating', value: todayStats.avgRating, icon: Star },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="text-center">
                        <Icon className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                        <p className="text-lg font-heading font-bold text-foreground">{item.value}</p>
                        <p className="text-[10px] text-muted-foreground">{item.label}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Chart */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="text-base font-heading flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  This Week's Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={earningsHistory} barCategoryGap="20%">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(225 14% 18%)" />
                      <XAxis dataKey="day" tick={{ fill: 'hsl(215 14% 55%)', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: 'hsl(215 14% 55%)', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="earnings" radius={[6, 6, 0, 0]}>
                        {earningsHistory.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.day === 'Fri' ? 'hsl(162 72% 46%)' : 'hsl(162 72% 46% / 0.3)'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4 mt-4">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-primary" />
                  Weekly Pay Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: 'Base Pay (Guaranteed)', value: weeklyEarnings.basePay, icon: Wallet, color: 'text-foreground' },
                  { label: `KM Incentive (${weeklyEarnings.totalKm} km × ₹0.70)`, value: weeklyEarnings.kmIncentive, icon: TrendingUp, color: 'text-primary' },
                  { label: 'Quality Bonus (Rating)', value: weeklyEarnings.qualityBonus, icon: Star, color: 'text-accent' },
                  { label: `Attendance Bonus (${weeklyEarnings.daysWorked} days)`, value: weeklyEarnings.attendanceBonus, icon: Calendar, color: 'text-info' },
                  { label: 'Fuel Efficiency Bonus', value: weeklyEarnings.fuelBonus, icon: Fuel, color: 'text-success' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${item.color}`} />
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">+ ₹{item.value.toLocaleString()}</span>
                    </div>
                  );
                })}

                {/* Deductions */}
                <div className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg">
                  <span className="text-sm text-destructive">Deductions</span>
                  <span className="text-sm font-semibold text-destructive">- ₹{weeklyEarnings.deductions.toLocaleString()}</span>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-xl border border-primary/20">
                  <span className="text-base font-heading font-semibold text-foreground">Net Payout</span>
                  <span className="text-2xl font-heading font-bold text-primary">₹{weeklyEarnings.netPayout.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4 mt-4">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Card className="border-primary/20 bg-card">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-accent mx-auto mb-3" />
                <h3 className="text-xl font-heading font-bold text-foreground">Weekly Payout Summary</h3>
                <p className="text-sm text-muted-foreground mt-1">Payout Date: {weeklyEarnings.payoutDate}</p>
                <p className="text-5xl font-heading font-bold text-primary mt-4">
                  ₹{weeklyEarnings.netPayout.toLocaleString()}
                </p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-xl font-heading font-bold text-foreground">{weeklyEarnings.totalTrips}</p>
                    <p className="text-xs text-muted-foreground">Total Trips</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-xl font-heading font-bold text-foreground">{weeklyEarnings.totalKm}</p>
                    <p className="text-xs text-muted-foreground">Total KM</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-xl font-heading font-bold text-foreground">{weeklyEarnings.daysWorked}</p>
                    <p className="text-xs text-muted-foreground">Days Worked</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
