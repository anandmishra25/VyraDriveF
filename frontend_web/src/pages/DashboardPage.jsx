import React from 'react';
import { motion } from 'framer-motion';
import { ShiftStatusCard } from '@/components/dashboard/ShiftStatusCard';
import { EarningsWidget } from '@/components/dashboard/EarningsWidget';
import { ActiveTripCard } from '@/components/dashboard/ActiveTripCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { SafetyCheckBanner } from '@/components/dashboard/SafetyCheckBanner';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { RecentTripsPreview } from '@/components/dashboard/RecentTripsPreview';

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
};

export default function DashboardPage({ onNavigate }) {
  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-6 max-w-6xl mx-auto"
    >
      {/* Welcome & Safety Banner */}
      <motion.div variants={fadeUp}>
        <SafetyCheckBanner />
      </motion.div>

      {/* Shift + Earnings Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={fadeUp}>
          <ShiftStatusCard />
        </motion.div>
        <motion.div variants={fadeUp}>
          <EarningsWidget />
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div variants={fadeUp}>
        <StatsGrid />
      </motion.div>

      {/* Active Trip + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <ActiveTripCard />
        </motion.div>
        <motion.div variants={fadeUp}>
          <QuickActions onNavigate={onNavigate} />
        </motion.div>
      </div>

      {/* Recent Trips */}
      <motion.div variants={fadeUp}>
        <RecentTripsPreview onNavigate={onNavigate} />
      </motion.div>
    </motion.div>
  );
}
