import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Fuel, Receipt, Camera, Plus, Gauge, TrendingUp,
  CheckCircle2, AlertCircle, Car, ParkingCircle, Wrench,
} from 'lucide-react';
import { expenses, fuelLog } from '@/lib/mockData';

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const expenseIcons = {
  fuel: Fuel,
  toll: Car,
  parking: ParkingCircle,
  repair: Wrench,
};

export default function ExpensesPage() {
  const [showFuelForm, setShowFuelForm] = useState(false);
  const [fuelAmount, setFuelAmount] = useState('');
  const [fuelKg, setFuelKg] = useState('');
  const [odometer, setOdometer] = useState('');

  const handleFuelSubmit = () => {
    setShowFuelForm(false);
    setFuelAmount('');
    setFuelKg('');
    setOdometer('');
  };

  // Calculate average efficiency
  const avgEfficiency = (fuelLog.reduce((sum, f) => sum + f.efficiency, 0) / fuelLog.length).toFixed(1);
  const efficiencyStatus = avgEfficiency >= 21 ? 'success' : avgEfficiency >= 18 ? 'warning' : 'destructive';

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="space-y-6 max-w-4xl mx-auto"
    >
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-2xl font-heading font-bold text-foreground">CNG & Expenses</h2>
        <p className="text-sm text-muted-foreground mt-1">Track fuel, tolls, and maintenance costs</p>
      </motion.div>

      {/* Efficiency Overview */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className={`border-${efficiencyStatus}/20 bg-card`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fuel Efficiency (Avg)</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-4xl font-heading font-bold text-foreground">{avgEfficiency}</p>
                  <span className="text-sm text-muted-foreground">km/kg</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Target: 21-24 km/kg for bonus</p>
              </div>
              <div className="w-20 h-20 rounded-full border-4 border-success flex items-center justify-center">
                <div className="text-center">
                  <Gauge className="w-6 h-6 text-success mx-auto" />
                  <Badge variant={efficiencyStatus} className="text-[10px] mt-1">
                    {avgEfficiency >= 21 ? 'Bonus' : 'Below Target'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="fuel" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="fuel">Fuel Log</TabsTrigger>
          <TabsTrigger value="expenses">All Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="fuel" className="space-y-4 mt-4">
          {/* Add Fuel Form */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {!showFuelForm ? (
              <Button variant="outline" className="w-full gap-2" onClick={() => setShowFuelForm(true)}>
                <Plus className="w-4 h-4" />
                Log Fuel Fill
              </Button>
            ) : (
              <Card className="border-primary/20 bg-card">
                <CardHeader>
                  <CardTitle className="text-base font-heading">Log Fuel Fill</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Amount (₹)</Label>
                      <Input
                        type="number"
                        placeholder="850"
                        value={fuelAmount}
                        onChange={(e) => setFuelAmount(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">CNG (kg)</Label>
                      <Input
                        type="number"
                        placeholder="12.5"
                        value={fuelKg}
                        onChange={(e) => setFuelKg(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Odometer</Label>
                      <Input
                        type="number"
                        placeholder="45230"
                        value={odometer}
                        onChange={(e) => setOdometer(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full gap-2">
                    <Camera className="w-4 h-4" />
                    Upload Receipt Photo
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="secondary" className="flex-1" onClick={() => setShowFuelForm(false)}>Cancel</Button>
                    <Button variant="premium" className="flex-1" onClick={handleFuelSubmit}>Save Entry</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Fuel Log List */}
          {fuelLog.map((entry) => (
            <motion.div key={entry.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="border-border/50 bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                      <Fuel className="w-5 h-5 text-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">{entry.kg} kg CNG</p>
                        <Badge variant={entry.efficiency >= 21 ? 'success' : 'warning'} className="text-[10px]">
                          {entry.efficiency} km/kg
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{entry.date} • Odo: {entry.odometer.toLocaleString()}</p>
                    </div>
                    <p className="text-base font-heading font-bold text-foreground">₹{entry.cost}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="expenses" className="space-y-3 mt-4">
          {expenses.map((expense) => {
            const Icon = expenseIcons[expense.type] || Receipt;
            return (
              <motion.div key={expense.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card className="border-border/50 bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{expense.description}</p>
                          {expense.verified ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-warning flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{expense.date} • {expense.type}</p>
                      </div>
                      <p className="text-base font-heading font-bold text-foreground">₹{expense.amount}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
