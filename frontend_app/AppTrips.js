import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
    ArrowRight, Star, Clock, Route, MapPin, Bell,
    CheckCircle2, XCircle, AlertCircle, Eye, Navigation
} from 'lucide-react-native';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';

// Mock Data
const recentTrips = [
    { id: 1, pickup: 'Andheri West', dropoff: 'Juhu Beach', fare: 240, time: '10:30 AM', distance: 12.5, duration: 45, rating: 5, platform: 'Uber' },
    { id: 2, pickup: 'Bandra', dropoff: 'Airport T2', fare: 450, time: '12:15 PM', distance: 18.2, duration: 55, rating: 5, platform: 'Ola' },
    { id: 3, pickup: 'Lower Parel', dropoff: 'Marine Drive', fare: 320, time: '02:00 PM', distance: 15.0, duration: 40, rating: 4.8, platform: 'Uber' },
];

const rideOpportunities = [
    { id: 1, pickup: 'Vile Parle', platform: 'Ola', time: '10:00 AM', fare: 180, action: 'accepted' },
    { id: 2, pickup: 'Santa Cruz', platform: 'Uber', time: '10:05 AM', fare: 200, action: 'rejected' },
    { id: 3, pickup: 'Goregaon', platform: 'Uber', time: '10:15 AM', fare: 350, action: 'missed' },
];

const platformColors = {
    Uber: { bg: '#1f2937', text: '#f9fafb' }, // Dark bg, light text
    Ola: { bg: '#fef3c7', text: '#d97706' }, // Warning bg, warning text
};

export default function AppTrips() {
    const [tab, setTab] = useState('trips');
    const [expandedTrip, setExpandedTrip] = useState(null);

    const renderTabContent = () => {
        switch (tab) {
            case 'trips':
                return (
                    <View style={styles.gaps}>
                        {recentTrips.map((trip, index) => (
                            <Animated.View key={trip.id} entering={FadeInUp.delay(index * 50).duration(350)}>
                                <TouchableOpacity
                                    style={styles.card}
                                    onPress={() => setExpandedTrip(expandedTrip === trip.id ? null : trip.id)}
                                    activeOpacity={0.8}
                                >
                                    <View style={styles.rowAlignTop}>
                                        <View style={[styles.platformBadge, { backgroundColor: platformColors[trip.platform]?.bg || '#f3f4f6' }]}>
                                            <Text style={[styles.platformText, { color: platformColors[trip.platform]?.text || '#374151' }]}>{trip.platform}</Text>
                                        </View>
                                        <View style={styles.flex1}>
                                            <View style={styles.rowGapSmall}>
                                                <Text style={styles.pickupText} numberOfLines={1}>{trip.pickup}</Text>
                                                <ArrowRight size={12} color="#64748b" />
                                            </View>
                                            <Text style={styles.dropoffText} numberOfLines={1}>{trip.dropoff}</Text>
                                            <Text style={styles.metaText}>{trip.time} • {trip.distance} km • {trip.duration} min</Text>
                                        </View>
                                        <View style={styles.alignRight}>
                                            <Text style={styles.fareText}>₹{trip.fare}</Text>
                                            <View style={styles.rowGapSmallest}>
                                                <Star size={10} color="#f59e0b" fill="#f59e0b" />
                                                <Text style={styles.ratingText}>{trip.rating}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    {expandedTrip === trip.id && (
                                        <Animated.View layout={Layout.springify()} style={styles.expandedContent}>
                                            <View style={styles.grid3}>
                                                <View style={styles.statBox}>
                                                    <Text style={styles.statLabel}>Distance</Text>
                                                    <Text style={styles.statValue}>{trip.distance} km</Text>
                                                </View>
                                                <View style={styles.statBox}>
                                                    <Text style={styles.statLabel}>Duration</Text>
                                                    <Text style={styles.statValue}>{trip.duration} min</Text>
                                                </View>
                                                <View style={styles.statBox}>
                                                    <Text style={styles.statLabel}>Rating</Text>
                                                    <View style={styles.rowGapSmallest}>
                                                        <Star size={12} color="#f59e0b" fill="#f59e0b" />
                                                        <Text style={styles.statValue}>{trip.rating}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </Animated.View>
                                    )}
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </View>
                );
            case 'opps':
                return (
                    <Animated.View entering={FadeInUp.duration(350)} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.rowGap}>
                                <Bell size={16} color="#f59e0b" />
                                <Text style={styles.cardTitle}>Notification Reader</Text>
                            </View>
                        </View>
                        <Text style={styles.subtitle}>Auto-captured from Ola & Uber</Text>

                        <View style={styles.gaps}>
                            {rideOpportunities.map((opp) => {
                                let Icon = AlertCircle;
                                let color = '#f59e0b';
                                let bgColor = '#fffbeb';

                                if (opp.action === 'accepted') {
                                    Icon = CheckCircle2;
                                    color = '#22c55e';
                                    bgColor = '#f0fdf4';
                                } else if (opp.action === 'rejected') {
                                    Icon = XCircle;
                                    color = '#ef4444';
                                    bgColor = '#fef2f2';
                                }

                                return (
                                    <View key={opp.id} style={[styles.oppItem, { backgroundColor: '#f8fafc' }]}>
                                        <Icon size={16} color={color} />
                                        <View style={styles.flex1}>
                                            <View style={styles.rowGapSmall}>
                                                <View style={[styles.platformBadgeSmall, { backgroundColor: platformColors[opp.platform]?.bg || '#f3f4f6' }]}>
                                                    <Text style={[styles.platformTextSmall, { color: platformColors[opp.platform]?.text || '#374151' }]}>{opp.platform}</Text>
                                                </View>
                                                <Text style={styles.metaText}>{opp.time}</Text>
                                            </View>
                                            <Text style={styles.pickupTextSmall} numberOfLines={1}>{opp.pickup}</Text>
                                        </View>
                                        <View style={styles.alignRight}>
                                            <Text style={styles.fareTextSmall}>₹{opp.fare}</Text>
                                            <View style={[styles.badge, { backgroundColor: bgColor }]}>
                                                <Text style={[styles.badgeText, { color: color }]}>{opp.action}</Text>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </Animated.View>
                );
            case 'tracking':
                return (
                    <Animated.View entering={FadeInUp.duration(350)} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.rowGap}>
                                <Eye size={16} color="#3b82f6" />
                                <Text style={styles.cardTitle}>GPS Tracking</Text>
                            </View>
                        </View>

                        <View style={styles.mapPlaceholder}>
                            <View style={styles.mapContent}>
                                <MapPin size={32} color="#3b82f6" />
                                <Text style={styles.mapTitle}>Live Tracking</Text>
                                <Text style={styles.mapSubtitle}>5s interval logging</Text>
                            </View>
                        </View>

                        <View style={styles.grid3}>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>Speed</Text>
                                <Text style={styles.statValueLarge}>42</Text>
                                <Text style={styles.statUnit}>km/h</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>GPS Points</Text>
                                <Text style={styles.statValueLarge}>2,847</Text>
                                <Text style={styles.statUnit}>today</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>Accuracy</Text>
                                <Text style={styles.statValueLarge}>98%</Text>
                                <Text style={styles.statUnit}>route match</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.badgeSuccess}>
                            <View style={styles.dotPulse} />
                            <Text style={styles.badgeTextSuccess}>Background tracking active</Text>
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
                {[{ id: 'trips', label: 'Trip History' }, { id: 'opps', label: 'Ride Log' }, { id: 'tracking', label: 'GPS' }].map(t => (
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
    gaps: { gap: 12 },
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#e2e8f0' },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    cardTitle: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
    subtitle: { fontSize: 11, color: '#64748b', marginBottom: 12 },
    rowAlignTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
    flex1: { flex: 1 },
    alignRight: { alignItems: 'flex-end' },
    rowGap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    rowGapSmall: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    rowGapSmallest: { flexDirection: 'row', alignItems: 'center', gap: 2 },
    divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 12 },

    // Trip Item
    platformBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginTop: 2 },
    platformText: { fontSize: 9, fontWeight: '600' },
    pickupText: { fontSize: 14, fontWeight: '500', color: '#0f172a' },
    dropoffText: { fontSize: 14, color: '#64748b', marginTop: 2 },
    metaText: { fontSize: 11, color: '#94a3b8', marginTop: 4 },
    fareText: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
    ratingText: { fontSize: 11, color: '#64748b' },

    // Expanded Trip
    expandedContent: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
    grid3: { flexDirection: 'row', gap: 8 },
    statBox: { flex: 1, backgroundColor: '#f8fafc', padding: 10, borderRadius: 12, alignItems: 'center' },
    statLabel: { fontSize: 10, color: '#64748b', marginBottom: 4 },
    statValue: { fontSize: 13, fontWeight: '600', color: '#0f172a' },
    statValueLarge: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
    statUnit: { fontSize: 9, color: '#94a3b8' },

    // Opps
    oppItem: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, gap: 10 },
    platformBadgeSmall: { paddingHorizontal: 4, paddingVertical: 1, borderRadius: 4 },
    platformTextSmall: { fontSize: 9, fontWeight: '600' },
    pickupTextSmall: { fontSize: 13, color: '#0f172a', marginTop: 2 },
    fareTextSmall: { fontSize: 14, fontWeight: '700', color: '#0f172a' },
    badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginTop: 4 },
    badgeText: { fontSize: 9, fontWeight: '600', textTransform: 'capitalize' },

    // GPS
    mapPlaceholder: { height: 180, backgroundColor: '#f1f5f9', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
    mapContent: { alignItems: 'center' },
    mapTitle: { fontSize: 14, fontWeight: '500', color: '#0f172a', marginTop: 8 },
    mapSubtitle: { fontSize: 12, color: '#64748b' },
    badgeSuccess: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start', gap: 6 },
    badgeTextSuccess: { fontSize: 10, color: '#15803d', fontWeight: '600' },
    dotPulse: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#15803d' },
});
