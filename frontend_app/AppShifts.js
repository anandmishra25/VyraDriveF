import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import {
    Sun, Moon, Clock, Camera, MapPin, ArrowRightLeft,
    CheckCircle2, Timer, Building2, Users, ArrowRight
} from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

// Mock Data
const currentShift = {
    hoursWorked: 6.5,
    checkInTime: '06:05 AM',
    overtimeMinutes: 45,
    handoverTo: 'Rahul S.'
};

const driverProfile = { name: 'Amit Sharma' };

const corporateDuties = [
    { id: 1, company: 'Tech Mahindra', pickup: 'Hinjewadi Phase 3', time: '05:30 PM', employees: 4, status: 'scheduled' },
    { id: 2, company: 'Infosys', pickup: 'Phase 1', time: '08:00 AM', employees: 3, status: 'completed' },
];

export default function AppShifts() {
    const [tab, setTab] = useState('shift');
    const [handoverDone, setHandoverDone] = useState(false);
    const shiftProgress = (currentShift.hoursWorked / 9) * 100;

    const renderTabContent = () => {
        switch (tab) {
            case 'shift':
                return (
                    <>
                        {/* Shift Card */}
                        <Animated.View entering={FadeInUp.delay(0).duration(350)} style={styles.card}>
                            <View style={styles.cardHeader}>
                                <View style={styles.row}>
                                    <Sun size={20} color="#f59e0b" />
                                    <Text style={styles.cardTitle}>Morning Shift</Text>
                                </View>
                                <View style={styles.badgeSuccess}>
                                    <View style={styles.dotPulse} />
                                    <Text style={styles.badgeTextSuccess}>Active</Text>
                                </View>
                            </View>

                            <View style={styles.timeRow}>
                                <View style={styles.centerText}>
                                    <Text style={styles.timeText}>06:00</Text>
                                    <Text style={styles.subText}>Start</Text>
                                </View>
                                <View style={styles.progressBarContainer}>
                                    <View style={styles.progressBar}>
                                        <View style={[styles.progressFill, { width: `${shiftProgress}%` }]} />
                                    </View>
                                    <Text style={styles.progressText}>{currentShift.hoursWorked}h / 9h</Text>
                                </View>
                                <View style={styles.centerText}>
                                    <Text style={styles.timeText}>15:00</Text>
                                    <Text style={styles.subText}>End</Text>
                                </View>
                            </View>

                            <View style={styles.grid2}>
                                <View style={styles.infoBox}>
                                    <View style={styles.rowGap}>
                                        <Camera size={16} color="#3b82f6" />
                                        <Text style={styles.infoLabel}>Check-in</Text>
                                    </View>
                                    <View style={styles.rowGap}>
                                        <CheckCircle2 size={12} color="#22c55e" />
                                        <Text style={styles.infoValue}>{currentShift.checkInTime}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoBox}>
                                    <View style={styles.rowGap}>
                                        <MapPin size={16} color="#f59e0b" />
                                        <Text style={styles.infoLabel}>Location</Text>
                                    </View>
                                    <View style={styles.rowGap}>
                                        <CheckCircle2 size={12} color="#22c55e" />
                                        <Text style={styles.infoValue}>Verified</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.footerRow}>
                                <View style={styles.rowGap}>
                                    <Timer size={14} color="#64748b" />
                                    <Text style={styles.footerText}>Overtime: <Text style={styles.boldText}>{currentShift.overtimeMinutes} min</Text></Text>
                                </View>
                            </View>
                        </Animated.View>

                        {/* Schedule */}
                        <Animated.View entering={FadeInUp.delay(50).duration(350)}>
                            <Text style={styles.sectionTitle}>Today's Schedule</Text>
                            <View style={styles.gaps}>
                                {[
                                    { shift: 'Morning', time: '6:00 AM - 3:00 PM', driver: driverProfile.name, icon: Sun, active: true },
                                    { shift: 'Evening', time: '3:00 PM - 12:00 AM', driver: currentShift.handoverTo, icon: Moon, active: false }
                                ].map((s, index) => {
                                    const Icon = s.icon;
                                    return (
                                        <View key={index} style={[styles.scheduleCard, s.active ? styles.borderPrimary : styles.borderDefault]}>
                                            <View style={[styles.iconBox, s.active ? styles.bgPrimaryLight : styles.bgDefaultLight]}>
                                                <Icon size={20} color={s.active ? '#3b82f6' : '#64748b'} />
                                            </View>
                                            <View style={styles.flex1}>
                                                <Text style={styles.itemTitle}>{s.shift} Shift</Text>
                                                <Text style={styles.itemSub}>{s.time}</Text>
                                            </View>
                                            <View style={styles.alignRight}>
                                                <Text style={styles.driverName}>{s.driver.split(' ')[0]}</Text>
                                                <View style={[styles.badge, s.active ? styles.badgeSuccess : styles.badgeMuted]}>
                                                    <Text style={[styles.badgeText, s.active ? styles.textSuccess : styles.textMuted]}>
                                                        {s.active ? 'Active' : 'Upcoming'}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        </Animated.View>
                    </>
                );
            case 'handover':
                return (
                    <Animated.View entering={FadeInUp.duration(350)} style={styles.card}>
                        <View style={styles.handoverHeader}>
                            <View style={styles.avatarBox}>
                                <Text style={styles.avatarText}>SP</Text>
                            </View>
                            <View style={styles.flex1}>
                                <Text style={styles.itemTitle}>{currentShift.handoverTo}</Text>
                                <Text style={styles.itemSub}>Evening Shift Driver</Text>
                            </View>
                            <View style={[styles.badge, handoverDone ? styles.badgeSuccess : styles.badgeWarning]}>
                                <Text style={[styles.badgeText, handoverDone ? styles.textSuccess : styles.textWarning]}>
                                    {handoverDone ? 'Done' : 'Pending'}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.checklist}>
                            <Text style={styles.sectionTitleSmall}>Checklist</Text>
                            {['Vehicle condition check', 'Fuel level verification', 'Document handover', 'Key exchange'].map((item, index) => (
                                <View key={index} style={styles.checkItem}>
                                    {handoverDone ? (
                                        <CheckCircle2 size={20} color="#22c55e" />
                                    ) : (
                                        <View style={styles.checkboxCircle} />
                                    )}
                                    <Text style={[styles.checkText, handoverDone && styles.textMuted]}>{item}</Text>
                                </View>
                            ))}
                        </View>

                        {!handoverDone && (
                            <TouchableOpacity style={styles.buttonPrimary} onPress={() => setHandoverDone(true)}>
                                <ArrowRightLeft size={16} color="#fff" />
                                <Text style={styles.buttonText}>Complete Handover</Text>
                            </TouchableOpacity>
                        )}
                    </Animated.View>
                );
            case 'corporate':
                return (
                    <Animated.View entering={FadeInUp.duration(350)}>
                        <View style={styles.gaps}>
                            {corporateDuties.map((duty) => (
                                <View key={duty.id} style={styles.card}>
                                    <View style={styles.rowGap}>
                                        <View style={styles.iconBoxInfo}>
                                            <Building2 size={20} color="#0ea5e9" />
                                        </View>
                                        <View style={styles.flex1}>
                                            <Text style={styles.itemTitle}>{duty.company}</Text>
                                            <Text style={styles.itemSub}>{duty.pickup} • {duty.time}</Text>
                                        </View>
                                        <View style={styles.alignRight}>
                                            <View style={styles.rowGapSmall}>
                                                <Users size={12} color="#64748b" />
                                                <Text style={styles.itemSub}>{duty.employees} pax</Text>
                                            </View>
                                            <View style={[styles.badge, duty.status === 'completed' ? styles.badgeSuccess : styles.badgeInfo]}>
                                                <Text style={[styles.badgeText, duty.status === 'completed' ? styles.textSuccess : styles.textInfo]}>
                                                    {duty.status}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
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
                {[{ id: 'shift', label: 'Current Shift' }, { id: 'handover', label: 'Handover' }, { id: 'corporate', label: 'Corporate' }].map(t => (
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

    // Card Common
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#e2e8f0' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    cardTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginLeft: 8 },
    row: { flexDirection: 'row', alignItems: 'center' },
    badgeSuccess: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#dcfce7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 4 },
    badgeTextSuccess: { fontSize: 10, color: '#15803d', fontWeight: '600' },
    dotPulse: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#15803d' },

    // Time & Progress
    timeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    centerText: { alignItems: 'center' },
    timeText: { fontSize: 24, fontWeight: '700', color: '#0f172a' },
    subText: { fontSize: 10, color: '#64748b' },
    progressBarContainer: { flex: 1, marginHorizontal: 16 },
    progressBar: { height: 10, backgroundColor: '#e2e8f0', borderRadius: 5, overflow: 'hidden' },
    progressFill: { height: '100%', backgroundColor: '#0f172a' },
    progressText: { fontSize: 10, color: '#64748b', textAlign: 'center', marginTop: 4 },

    // Grid Info
    grid2: { flexDirection: 'row', gap: 8 },
    infoBox: { flex: 1, backgroundColor: '#f1f5f9', padding: 12, borderRadius: 12 },
    infoLabel: { fontSize: 12, fontWeight: '500', color: '#0f172a' },
    infoValue: { fontSize: 11, color: '#15803d', fontWeight: '500' },
    rowGap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    rowGapSmall: { flexDirection: 'row', alignItems: 'center', gap: 4 },

    divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 12 },
    footerRow: { flexDirection: 'row', justifyContent: 'space-between' },
    footerText: { fontSize: 12, color: '#64748b' },
    boldText: { fontWeight: '600', color: '#0f172a' },

    // Schedule
    sectionTitle: { fontSize: 14, fontWeight: '600', color: '#0f172a', marginBottom: 8 },
    gaps: { gap: 8 },
    scheduleCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 16, borderWidth: 1, gap: 12, backgroundColor: '#fff' },
    borderPrimary: { borderColor: '#bfdbfe', backgroundColor: '#eff6ff' },
    borderDefault: { borderColor: '#e2e8f0' },
    bgPrimaryLight: { backgroundColor: '#dbeafe' },
    bgDefaultLight: { backgroundColor: '#f1f5f9' },
    iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    flex1: { flex: 1 },
    itemTitle: { fontSize: 14, fontWeight: '500', color: '#0f172a' },
    itemSub: { fontSize: 11, color: '#64748b' },
    alignRight: { alignItems: 'flex-end' },
    driverName: { fontSize: 12, color: '#0f172a' },
    badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
    badgeMuted: { backgroundColor: '#f1f5f9' },
    textMuted: { fontSize: 10, color: '#64748b' },
    textSuccess: { fontSize: 10, color: '#15803d' },

    // Handover
    handoverHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', padding: 12, borderRadius: 12, gap: 12, marginBottom: 16 },
    avatarBox: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#e0f2fe', alignItems: 'center', justifyContent: 'center' },
    avatarText: { fontSize: 16, fontWeight: '700', color: '#0ea5e9' },
    badgeWarning: { backgroundColor: '#fef3c7' },
    textWarning: { fontSize: 10, color: '#d97706' },

    checklist: { gap: 12, marginBottom: 16 },
    sectionTitleSmall: { fontSize: 14, fontWeight: '500', color: '#0f172a' },
    checkItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    checkboxCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#e2e8f0' },
    checkText: { fontSize: 14, color: '#0f172a' },
    buttonPrimary: { backgroundColor: '#0f172a', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 12, gap: 8 },
    buttonText: { color: '#fff', fontWeight: '600' },

    // Corporate
    iconBoxInfo: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#e0f2fe', alignItems: 'center', justifyContent: 'center' },
    badgeInfo: { backgroundColor: '#e0f2fe' },
    textInfo: { fontSize: 10, color: '#0ea5e9' },
});
