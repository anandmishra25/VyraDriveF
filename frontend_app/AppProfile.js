import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
    User, Car, Phone, Star, Calendar, MapPin,
    Shield, Settings, LogOut, ChevronRight
} from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

// Mock Data
const driverProfile = {
    name: 'Amit Sharma',
    id: 'DRV-2024-883',
    fleetOwner: 'Vikas Transport',
    rating: 4.85,
    daysActive: 342,
    vehicleNumber: 'MH 02 DN 4829',
    vehicleType: 'Maruti WagonR CNG',
    phone: '+91 98765 43210'
};

export default function AppProfile() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Profile Card */}
            <Animated.View entering={FadeInUp.delay(0).duration(350)} style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.avatarBox}>
                        <Text style={styles.avatarText}>
                            {driverProfile.name.split(' ').map(n => n[0]).join('')}
                        </Text>
                    </View>
                    <View style={styles.flex1}>
                        <Text style={styles.nameText}>{driverProfile.name}</Text>
                        <Text style={styles.metaText}>{driverProfile.id} • {driverProfile.fleetOwner}</Text>
                        <View style={styles.statsRow}>
                            <View style={styles.badgeSuccess}>
                                <Star size={10} color="#15803d" fill="#15803d" />
                                <Text style={styles.badgeTextSuccess}>{driverProfile.rating}</Text>
                            </View>
                            <View style={styles.badgeInfo}>
                                <Text style={styles.badgeTextInfo}>{driverProfile.daysActive} days active</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Animated.View>

            {/* Vehicle Info */}
            <Animated.View entering={FadeInUp.delay(50).duration(350)}>
                <Text style={styles.sectionTitle}>Vehicle</Text>
                <View style={styles.plainCard}>
                    <View style={styles.row}>
                        <View style={styles.iconBoxAccent}>
                            <Car size={24} color="#f59e0b" />
                        </View>
                        <View style={styles.flex1}>
                            <Text style={styles.vehicleText}>{driverProfile.vehicleNumber}</Text>
                            <Text style={styles.metaText}>{driverProfile.vehicleType}</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>

            {/* Quick Links */}
            <Animated.View entering={FadeInUp.delay(100).duration(350)}>
                <Text style={styles.sectionTitle}>Quick Links</Text>
                <View style={styles.listCard}>
                    {[
                        { label: 'Contact Fleet Owner', icon: Phone, detail: driverProfile.phone },
                        { label: 'Shift History', icon: Calendar, detail: 'View past shifts' },
                        { label: 'Safety Settings', icon: Shield, detail: 'SOS & check-in config' },
                        { label: 'App Settings', icon: Settings, detail: 'Theme, notifications' },
                    ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <React.Fragment key={index}>
                                <TouchableOpacity style={styles.listItem}>
                                    <Icon size={18} color="#64748b" />
                                    <View style={styles.flex1}>
                                        <Text style={styles.listLabel}>{item.label}</Text>
                                        <Text style={styles.listDetail}>{item.detail}</Text>
                                    </View>
                                    <ChevronRight size={16} color="#94a3b8" />
                                </TouchableOpacity>
                                {index < 3 && <View style={styles.separator} />}
                            </React.Fragment>
                        );
                    })}
                </View>
            </Animated.View>

            {/* Sign Out */}
            <Animated.View entering={FadeInUp.delay(150).duration(350)}>
                <TouchableOpacity style={styles.signOutButton}>
                    <LogOut size={16} color="#ef4444" />
                    <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
            </Animated.View>

            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    content: { padding: 20, gap: 24 },

    // Profile Card
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#bfdbfe' },
    row: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    avatarBox: { width: 64, height: 64, borderRadius: 16, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#dbeafe' },
    avatarText: { fontSize: 20, fontWeight: '700', color: '#3b82f6' },
    flex1: { flex: 1 },
    nameText: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
    metaText: { fontSize: 12, color: '#64748b' },
    statsRow: { flexDirection: 'row', gap: 8, marginTop: 6 },
    badgeSuccess: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#dcfce7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 4 },
    badgeTextSuccess: { fontSize: 10, color: '#15803d', fontWeight: '600' },
    badgeInfo: { backgroundColor: '#e0f2fe', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
    badgeTextInfo: { fontSize: 10, color: '#0ea5e9', fontWeight: '600' },

    // Vehicle
    sectionTitle: { fontSize: 14, fontWeight: '600', color: '#0f172a', marginBottom: 8 },
    plainCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#e2e8f0' },
    iconBoxAccent: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#fef3c7', alignItems: 'center', justifyContent: 'center' },
    vehicleText: { fontSize: 14, fontWeight: '600', color: '#0f172a' },

    // Quick Links
    listCard: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0', overflow: 'hidden' },
    listItem: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
    listLabel: { fontSize: 14, color: '#0f172a' },
    listDetail: { fontSize: 11, color: '#64748b', marginTop: 2 },
    separator: { height: 1, backgroundColor: '#f1f5f9', marginLeft: 16, marginRight: 16 },

    // Sign Out
    signOutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 16, borderWidth: 1, borderColor: '#fee2e2', backgroundColor: '#fff', gap: 8 },
    signOutText: { fontSize: 14, fontWeight: '500', color: '#ef4444' },
});
