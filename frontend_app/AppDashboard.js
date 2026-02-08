import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
    Sun, Clock, ArrowRightLeft, MapPin, Navigation, Route,
    DollarSign, Star, Fuel, Gauge, TrendingUp, CheckCircle2,
    ArrowRight, ArrowUpRight, AlertTriangle, Shield, X, Camera
} from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

// Mock Data (Ported from lib/mockData)
const currentShift = { start: '06:00 AM', end: '03:00 PM', hoursWorked: 6.5, handoverTo: 'Rahul S.' };
const todayStats = { totalEarnings: 1850, totalTrips: 8, totalKm: 142, onlineHours: 6.5, avgRating: 4.9, fuelUsed: 4.2, efficiency: 18.5, acceptanceRate: 94 };
const recentTrips = [
    { id: 1, pickup: 'Andheri West', dropoff: 'Juhu Beach', fare: 240, time: '10:30 AM', distance: 12.5, duration: 45, rating: 5, platform: 'Uber' },
    { id: 2, pickup: 'Bandra', dropoff: 'Airport T2', fare: 450, time: '12:15 PM', distance: 18.2, duration: 55, rating: 5, platform: 'Ola' },
];

const quickStats = [
    { label: 'KM', value: todayStats.totalKm, icon: Route, color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Hours', value: `${todayStats.onlineHours}h`, icon: Clock, color: '#0ea5e9', bg: '#f0f9ff' },
    { label: 'Rating', value: todayStats.avgRating, icon: Star, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Fuel', value: `${todayStats.fuelUsed}kg`, icon: Fuel, color: '#f97316', bg: '#fff7ed' },
];

const quickActions = [
    { id: 'fuel', label: 'Log Fuel', icon: Fuel, nav: 'Expenses' },
    { id: 'checkin', label: 'Check-in', icon: Camera, nav: 'Shifts' },
    { id: 'handover', label: 'Handover', icon: ArrowRightLeft, nav: 'Shifts' },
    { id: 'sos', label: 'SOS', icon: AlertTriangle, nav: 'Safety', danger: true },
];

export default function AppDashboard({ navigation }) {
    const [showBanner, setShowBanner] = useState(true);
    const [checkedIn, setCheckedIn] = useState(false);
    const [tripActive, setTripActive] = useState(true);
    const shiftProgress = (currentShift.hoursWorked / 9) * 100;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>

            {/* Safety Check Banner */}
            {showBanner && (
                <Animated.View entering={FadeInUp.delay(0).duration(350)} style={[styles.banner, checkedIn ? styles.bannerSuccess : styles.bannerWarning]}>
                    <View style={[styles.iconBox, checkedIn ? styles.bgSuccessLight : styles.bgWarningLight]}>
                        {checkedIn ? <CheckCircle2 size={20} color="#22c55e" /> : <Shield size={20} color="#f59e0b" />}
                    </View>
                    <View style={styles.bannerText}>
                        <Text style={styles.bannerTitle}>{checkedIn ? 'Safety Check Done' : 'Hey Driver!'}</Text>
                        <Text style={styles.bannerSubtitle}>{checkedIn ? 'Next at 10:00 AM' : 'Safety check-in due'}</Text>
                    </View>
                    {!checkedIn && (
                        <TouchableOpacity style={styles.checkInButton} onPress={() => setCheckedIn(true)}>
                            <Text style={styles.checkInText}>Check In</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => setShowBanner(false)} style={styles.closeButton}>
                        <X size={16} color="#64748b" />
                    </TouchableOpacity>
                </Animated.View>
            )}

            {/* Earnings Card */}
            <Animated.View entering={FadeInUp.delay(50).duration(350)} style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardLabel}>Today's Earnings</Text>
                    <View style={styles.badgeSuccess}>
                        <ArrowUpRight size={12} color="#15803d" />
                        <Text style={styles.badgeTextSuccess}>+12%</Text>
                    </View>
                </View>
                <View style={styles.earningsRow}>
                    <Text style={styles.currency}>₹</Text>
                    <Text style={styles.earningsValue}>{todayStats.totalEarnings.toLocaleString()}</Text>
                </View>
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <CheckCircle2 size={12} color="#64748b" />
                        <Text style={styles.statText}>{todayStats.totalTrips} trips</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Route size={12} color="#64748b" />
                        <Text style={styles.statText}>{todayStats.totalKm} km</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Clock size={12} color="#64748b" />
                        <Text style={styles.statText}>{todayStats.onlineHours}h online</Text>
                    </View>
                </View>
            </Animated.View>

            {/* Quick Stats */}
            <Animated.View entering={FadeInUp.delay(100).duration(350)}>
                <Text style={styles.sectionTitle}>Quick Stats</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickStatsScroll}>
                    {quickStats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <View key={index} style={styles.quickStatCard}>
                                <View style={[styles.quickStatIcon, { backgroundColor: stat.bg }]}>
                                    <Icon size={16} color={stat.color} />
                                </View>
                                <Text style={styles.quickStatValue}>{stat.value}</Text>
                                <Text style={styles.quickStatLabel}>{stat.label}</Text>
                            </View>
                        );
                    })}
                </ScrollView>
            </Animated.View>

            {/* Active Trip */}
            {tripActive && (
                <Animated.View entering={FadeInUp.delay(150).duration(350)} style={[styles.card, styles.activeTripCard]}>
                    <View style={styles.cardHeader}>
                        <View style={styles.row}>
                            <View style={styles.iconBoxPrimary}>
                                <Navigation size={16} color="#3b82f6" />
                            </View>
                            <Text style={styles.cardTitle}>Active Trip</Text>
                        </View>
                        <View style={styles.badgeInfo}>
                            <View style={styles.dot} />
                            <Text style={styles.badgeTextInfo}>Live</Text>
                        </View>
                    </View>

                    <View style={styles.tripRoute}>
                        <View style={styles.timeline}>
                            <View style={styles.dotPrimary} />
                            <View style={styles.line} />
                            <View style={styles.dotDest} />
                        </View>
                        <View style={styles.tripDetails}>
                            <View style={styles.tripPoint}>
                                <Text style={styles.labelTiny}>Pickup</Text>
                                <Text style={styles.locationText}>Andheri Station West</Text>
                            </View>
                            <View style={styles.tripPoint}>
                                <Text style={styles.labelTiny}>Drop-off</Text>
                                <Text style={styles.locationText}>Bandra Kurla Complex</Text>
                            </View>
                        </View>
                        <View style={styles.fareBox}>
                            <Text style={styles.labelTiny}>Est. Fare</Text>
                            <Text style={styles.fareText}>₹320</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.buttonPrimary} onPress={() => setTripActive(false)}>
                        <Text style={styles.buttonText}>Complete Trip</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}

            {/* Quick Actions */}
            <Animated.View entering={FadeInUp.delay(200).duration(350)}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.actionsGrid}>
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.actionButton, action.danger ? styles.bgDangerLight : styles.bgCard]}
                                onPress={() => navigation.navigate(action.nav)}
                            >
                                <Icon size={20} color={action.danger ? '#ef4444' : '#64748b'} />
                                <Text style={[styles.actionLabel, action.danger && styles.textDanger]}>{action.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </Animated.View>

            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    content: { padding: 20, gap: 20 },
    sectionTitle: { fontSize: 14, fontWeight: '600', color: '#0f172a', marginBottom: 10 },
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#e2e8f0' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    cardLabel: { fontSize: 12, color: '#64748b' },
    cardTitle: { fontSize: 14, fontWeight: '600', color: '#0f172a', marginLeft: 8 },
    earningsRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 16 },
    currency: { fontSize: 14, color: '#64748b', marginRight: 4 },
    earningsValue: { fontSize: 32, fontWeight: '700', color: '#0f172a' },
    statsRow: { flexDirection: 'row', gap: 16 },
    statItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    statText: { fontSize: 12, color: '#64748b' },

    // Quick Stats
    quickStatsScroll: { marginHorizontal: -20, paddingHorizontal: 20 },
    quickStatCard: { width: 80, backgroundColor: '#fff', borderRadius: 16, padding: 12, alignItems: 'center', marginRight: 10, borderWidth: 1, borderColor: '#e2e8f0' },
    quickStatIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
    quickStatValue: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
    quickStatLabel: { fontSize: 10, color: '#64748b' },

    // Active Trip
    activeTripCard: { borderColor: '#bfdbfe', shadowColor: '#3b82f6', shadowOpacity: 0.1, shadowRadius: 10 },
    row: { flexDirection: 'row', alignItems: 'center' },
    iconBoxPrimary: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center' },
    tripRoute: { flexDirection: 'row', marginVertical: 12 },
    timeline: { alignItems: 'center', width: 20, paddingTop: 6 },
    dotPrimary: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#3b82f6' },
    line: { width: 2, flex: 1, backgroundColor: '#e2e8f0', marginVertical: 4 },
    dotDest: { width: 8, height: 8, borderRadius: 4, borderWidth: 2, borderColor: '#f59e0b', backgroundColor: '#fff' },
    tripDetails: { flex: 1, gap: 16, paddingLeft: 8 },
    tripPoint: {},
    labelTiny: { fontSize: 10, color: '#64748b' },
    locationText: { fontSize: 14, fontWeight: '500', color: '#0f172a' },
    fareBox: { alignItems: 'flex-end', justifyContent: 'center' },
    fareText: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
    buttonPrimary: { backgroundColor: '#0f172a', padding: 12, borderRadius: 12, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: '600' },

    // Banner
    banner: { padding: 14, borderRadius: 16, borderWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
    bannerWarning: { backgroundColor: '#fffbeb', borderColor: '#fef3c7' },
    bannerSuccess: { backgroundColor: '#f0fdf4', borderColor: '#dcfce7' },
    iconBox: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
    bgWarningLight: { backgroundColor: '#fef3c7' },
    bgSuccessLight: { backgroundColor: '#dcfce7' },
    bannerText: { flex: 1 },
    bannerTitle: { fontSize: 14, fontWeight: '500', color: '#0f172a' },
    bannerSubtitle: { fontSize: 12, color: '#64748b' },
    checkInButton: { backgroundColor: '#f59e0b', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    checkInText: { color: '#fff', fontSize: 12, fontWeight: '600' },

    // Badges
    badgeSuccess: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#dcfce7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 2 },
    badgeTextSuccess: { fontSize: 10, color: '#15803d', fontWeight: '600' },
    badgeInfo: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#eff6ff', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 4 },
    badgeTextInfo: { fontSize: 10, color: '#1d4ed8', fontWeight: '600' },
    dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#1d4ed8' },

    // Actions
    actionsGrid: { flexDirection: 'row', gap: 10 },
    actionButton: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0', gap: 6 },
    actionLabel: { fontSize: 10, fontWeight: '500', color: '#64748b' },
    bgCard: { backgroundColor: '#fff' },
    bgDangerLight: { backgroundColor: '#fef2f2', borderColor: '#fee2e2' },
    textDanger: { color: '#ef4444' },
});
