import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Fuel, Camera, Plus, Gauge, CheckCircle2, AlertCircle,
  Car, ParkingCircle, Wrench, Receipt,
} from 'lucide-react';
import { expenses, fuelLog } from '@/lib/mockData';

const fadeUp = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.3, delay: d } } });
const expenseIcons = { fuel: Fuel, toll: Car, parking: ParkingCircle, repair: Wrench };

export const MobileExpenses = () => {
  const [tab, setTab] = useState('fuel');
  const [showForm, setShowForm] = useState(false);
  const avgEff = (fuelLog.reduce((s, f) => s + f.efficiency, 0) / fuelLog.length).toFixed(1);

  return (
    <div className="px-5 pt-2 space-y-4">
      {/* Efficiency Hero */}
      <motion.div {...fadeUp()}>
        <Card className="border-success/15 bg-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Fuel Efficiency (Avg)</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl font-heading font-bold text-foreground">{avgEff}</span>
                  <span className="text-sm text-muted-foreground">km/kg</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">Target: 21-24 km/kg</p>
              </div>
              <div className="w-20 h-20 rounded-full border-4 border-success flex items-center justify-center">
                <div className="text-center">
                  <Gauge className="w-6 h-6 text-success mx-auto" />
                  <Badge variant="success" className="text-[9px] mt-0.5">Bonus</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex gap-2 p-1 bg-secondary/50 rounded-2xl">
        {[{id:'fuel', label:'Fuel Log'}, {id:'expenses', label:'All Expenses'}].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 py-2 px-3 rounded-xl text-xs font-medium transition-all duration-200 ${
            tab === t.id ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
          }`}>{t.label}</button>
        ))}
      </div>

      {tab === 'fuel' && (
        <>
          {!showForm ? (
            <motion.div {...fadeUp(0.04)}>
              <Button variant="outline" className="w-full rounded-2xl gap-2 h-11 border-dashed" onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4" /> Log Fuel Fill
              </Button>
            </motion.div>
          ) : (
            <motion.div {...fadeUp()}>
              <Card className="border-primary/20 bg-card">
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm font-heading font-semibold text-foreground">Log Fuel Fill</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <Label className="text-[10px]">Amount (₹)</Label>
                      <Input type="number" placeholder="850" className="h-9 rounded-xl" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px]">CNG (kg)</Label>
                      <Input type="number" placeholder="12.5" className="h-9 rounded-xl" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px]">Odometer</Label>
                      <Input type="number" placeholder="45230" className="h-9 rounded-xl" />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full rounded-xl gap-2 h-9"><Camera className="w-4 h-4" /> Receipt Photo</Button>
                  <div className="flex gap-2">
                    <Button variant="secondary" className="flex-1 rounded-xl" onClick={() => setShowForm(false)}>Cancel</Button>
                    <Button variant="premium" className="flex-1 rounded-xl" onClick={() => setShowForm(false)}>Save</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <div className="space-y-2">
            {fuelLog.map((entry, i) => (
              <motion.div key={entry.id} {...fadeUp(i * 0.04)}>
                <div className="flex items-center gap-3 p-3.5 bg-card border border-border/50 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Fuel className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-foreground">{entry.kg} kg CNG</p>
                      <Badge variant={entry.efficiency >= 21 ? 'success' : 'warning'} className="text-[9px]">{entry.efficiency} km/kg</Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{entry.date} • Odo: {entry.odometer.toLocaleString()}</p>
                  </div>
                  <p className="text-sm font-heading font-bold text-foreground">₹{entry.cost}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {tab === 'expenses' && (
        <div className="space-y-2">
          {expenses.map((exp, i) => {
            const Icon = expenseIcons[exp.type] || Receipt;
            return (
              <motion.div key={exp.id} {...fadeUp(i * 0.04)}>
                <div className="flex items-center gap-3 p-3.5 bg-card border border-border/50 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-foreground">{exp.description}</p>
                      {exp.verified ? <CheckCircle2 className="w-3 h-3 text-success flex-shrink-0" /> : <AlertCircle className="w-3 h-3 text-warning flex-shrink-0" />}
                    </div>
                    <p className="text-[11px] text-muted-foreground">{exp.date} • {exp.type}</p>
                  </div>
                  <p className="text-sm font-heading font-bold text-foreground">₹{exp.amount}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
      <div className="h-4" />
    </div>
  );
};
