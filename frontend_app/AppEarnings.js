import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import {
    Wallet, TrendingUp, Award, Calendar, Fuel, Star,
    CheckCircle2, ArrowUpRight, ArrowRight
} from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { BarChart } from 'react-native-gifted-charts';

// Mock Data
const todayStats = { totalEarnings: 1850, totalTrips: 8, totalKm: 142, onlineHours: 6.5, avgRating: 4.9 };
const weeklyEarnings = {
    basePay: 4500, kmIncentive: 850, qualityBonus: 500,
    attendanceBonus: 1000, fuelBonus: 300, deductions: 250,
    netPayout: 6900, payoutDate: 'Mon, 12 Feb',
    totalTrips: 42, totalKm: 680, daysWorked: 5
};
const earningsHistory = [
    { label: 'Mon', value: 1200 },
    { label: 'Tue', value: 1450 },
    { label: 'Wed', value: 1100 },
    { label: 'Thu', value: 1600 },
    { label: 'Fri', value: 1850, frontColor: '#15803d' }, // Highlight current day
    { label: 'Sat', value: 0 },
    { label: 'Sun', value: 0 },
];

const screenWidth = Dimensions.get('window').width;

export default function AppEarnings() {
    const [tab, setTab] = useState('overview');

    const renderTabContent = () => {
        switch (tab) {
            case 'overview':
                return (
                    <>
                        {/* Today's Earnings Card */}
                        <Animated.View entering={FadeInUp.delay(0).duration(350)} style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.subtitle}>Today's Earnings</Text>
                                <View style={styles.badgeSuccess}>
                                    <ArrowUpRight size={12} color="#15803d" />
                                    <Text style={styles.badgeTextSuccess}>+12%</Text>
                                </View>
                            </View>

                            <View style={styles.earningsRow}>
                                <Text style={styles.currencyLarge}>₹</Text>
                                <Text style={styles.earningsValueLarge}>{todayStats.totalEarnings.toLocaleString()}</Text>
                            </View>

                            <View style={styles.statsGrid}>
                                {[
                                    { l: 'Trips', v: todayStats.totalTrips, i: CheckCircle2 },
                                    { l: 'KM', v: todayStats.totalKm, i: TrendingUp },
                                    { l: 'Hours', v: todayStats.onlineHours, i: Calendar },
                                    { l: 'Rating', v: todayStats.avgRating, i: Star }
                                ].map((s, index) => {
                                    const Icon = s.i;
                                    return (
                                        <View key={index} style={styles.statItemCenter}>
                                            <Icon size={14} color="#64748b" style={styles.mb4} />
                                            <Text style={styles.statValueBold}>{s.v}</Text>
                                            <Text style={styles.statLabelSmall}>{s.l}</Text>
                                        </View>
                                    );
                                })}
                            </View>
                        </Animated.View>

                        {/* Weekly Chart */}
                        <Animated.View entering={FadeInUp.delay(50).duration(350)} style={styles.card}>
                            <Text style={styles.sectionTitle}>This Week</Text>
                            <View style={styles.chartContainer}>
                                <BarChart
                                    data={earningsHistory}
                                    barWidth={22}
                                    noOfSections={3}
                                    barBorderRadius={4}
                                    frontColor="rgba(21, 128, 61, 0.25)"
                                    yAxisThickness={0}
                                    xAxisThickness={0}
                                    yAxisTextStyle={{ color: '#94a3b8', fontSize: 10 }}
                                    xAxisLabelTextStyle={{ color: '#64748b', fontSize: 10 }}
                                    hideRules
                                    width={screenWidth - 80}
                                    height={150}
                                />
                            </View>
                        </Animated.View>
                    </>
                );
            case 'breakdown':
                return (
                    <Animated.View entering={FadeInUp.duration(350)} style={styles.card}>
                        <Text style={styles.sectionTitle}>Weekly Pay Breakdown</Text>
                        <View style={styles.breakdownList}>
                            {[
                                { l: 'Base Pay (Guaranteed)', v: weeklyEarnings.basePay, i: Wallet, c: '#0f172a', bg: '#f1f5f9' },
                                { l: `KM Incentive (${weeklyEarnings.totalKm}km × ₹0.70)`, v: weeklyEarnings.kmIncentive, i: TrendingUp, c: '#3b82f6', bg: '#eff6ff' },
                                { l: 'Quality Bonus', v: weeklyEarnings.qualityBonus, i: Star, c: '#f59e0b', bg: '#fffbeb' },
                                { l: `Attendance (${weeklyEarnings.daysWorked} days)`, v: weeklyEarnings.attendanceBonus, i: Calendar, c: '#0ea5e9', bg: '#e0f2fe' },
                                { l: 'Fuel Efficiency', v: weeklyEarnings.fuelBonus, i: Fuel, c: '#22c55e', bg: '#dcfce7' },
                            ].map((item, index) => {
                                const Icon = item.i;
                                return (
                                    <View key={index} style={styles.breakdownItem}>
                                        <View style={styles.rowGap}>
                                            <View style={[styles.iconBoxSmall, { backgroundColor: item.bg }]}>
                                                <Icon size={14} color={item.c} />
                                            </View>
                                            <Text style={styles.breakdownLabel} numberOfLines={1}>{item.l}</Text>
                                        </View>
                                        <Text style={styles.breakdownValue}>+₹{item.v.toLocaleString()}</Text>
                                    </View>
                                );
                            })}

                            <View style={styles.deductionItem}>
                                <Text style={styles.deductionLabel}>Deductions</Text>
                                <Text style={styles.deductionValue}>-₹{weeklyEarnings.deductions}</Text>
                            </View>

                            <View style={styles.netPayoutBox}>
                                <Text style={styles.netPayoutLabel}>Net Payout</Text>
                                <Text style={styles.netPayoutValue}>₹{weeklyEarnings.netPayout.toLocaleString()}</Text>
                            </View>
                        </View>
                    </Animated.View>
                );
            case 'weekly':
                return (
                    <Animated.View entering={FadeInUp.duration(350)} style={styles.card}>
                        <View style={styles.payoutContent}>
                            <Award size={56} color="#f59e0b" style={styles.mb12} />
                            <Text style={styles.payoutTitle}>Weekly Payout</Text>
                            <Text style={styles.payoutDate}>{weeklyEarnings.payoutDate}</Text>
                            <Text style={styles.payoutAmount}>₹{weeklyEarnings.netPayout.toLocaleString()}</Text>

                            <View style={styles.statsGrid}>
                                {[
                                    { l: 'Trips', v: weeklyEarnings.totalTrips },
                                    { l: 'KM', v: weeklyEarnings.totalKm },
                                    { l: 'Days', v: weeklyEarnings.daysWorked }
                                ].map((s, index) => (
                                    <View key={index} style={styles.statBox}>
                                        <Text style={styles.statValueLarge}>{s.v}</Text>
                                        <Text style={styles.statLabelSmall}>{s.l}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </Animated.View>
                );
            default:
                return null;
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Tab Switcher */}
            <View style={styles.tabContainer}>
                {[{ id: 'overview', label: 'Overview' }, { id: 'breakdown', label: 'Breakdown' }, { id: 'weekly', label: 'Payout' }].map(t => (
                    <TouchableOpacity
                        key={t.id}
                        onPress={() => setTab(t.id)}
                        style={[styles.tabButton, tab === t.id ? styles.tabActive : styles.tabInactive]}
                    >
                        <Text style={[styles.tabText, tab === t.id ? styles.textActive : styles.textInactive]}>{t.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {renderTabContent()}
            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    content: { padding: 20, gap: 16 },

    // Tabs
    tabContainer: { flexDirection: 'row', backgroundColor: '#f1f5f9', padding: 4, borderRadius: 16 },
    tabButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
    tabActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
    tabInactive: {},
    tabText: { fontSize: 12, fontWeight: '600' },
    textActive: { color: '#0f172a' },
    textInactive: { color: '#64748b' },

    // Common
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#e2e8f0' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    subtitle: { fontSize: 12, color: '#64748b' },
    sectionTitle: { fontSize: 14, fontWeight: '600', color: '#0f172a', marginBottom: 16 },
    rowGap: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },

    // Overview
    badgeSuccess: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#dcfce7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 2 },
    badgeTextSuccess: { fontSize: 10, color: '#15803d', fontWeight: '600' },
    earningsRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 20 },
    currencyLarge: { fontSize: 18, color: '#64748b', marginRight: 4 },
    earningsValueLarge: { fontSize: 42, fontWeight: '700', color: '#0f172a' },
    statsGrid: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
    statItemCenter: { alignItems: 'center', flex: 1 },
    mb4: { marginBottom: 4 },
    statValueBold: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
    statLabelSmall: { fontSize: 10, color: '#64748b' },
    chartContainer: { alignItems: 'center', overflow: 'hidden' },

    // Breakdown
    breakdownList: { gap: 12 },
    breakdownItem: { flexDirection: 'row', items: 'center', justifyContent: 'space-between', padding: 12, backgroundColor: '#f8fafc', borderRadius: 12 },
    iconBoxSmall: { width: 24, height: 24, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
    breakdownLabel: { fontSize: 12, color: '#64748b', flex: 1 },
    breakdownValue: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
    deductionItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#fef2f2', borderRadius: 12 },
    deductionLabel: { fontSize: 12, color: '#ef4444' },
    deductionValue: { fontSize: 14, fontWeight: '600', color: '#ef4444' },
    netPayoutBox: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#eff6ff', borderRadius: 16, borderWidth: 1, borderColor: '#bfdbfe' },
    netPayoutLabel: { fontSize: 14, fontWeight: '700', color: '#0f172a' },
    netPayoutValue: { fontSize: 24, fontWeight: '700', color: '#3b82f6' },

    // Payout
    payoutContent: { alignItems: 'center', paddingVertical: 10 },
    mb12: { marginBottom: 12 },
    payoutTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
    payoutDate: { fontSize: 12, color: '#64748b', marginTop: 4 },
    payoutAmount: { fontSize: 48, fontWeight: '700', color: '#3b82f6', marginTop: 16, marginBottom: 24 },
    statBox: { flex: 1, backgroundColor: '#f8fafc', padding: 12, borderRadius: 12, alignItems: 'center' },
    statValueLarge: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
});
