import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import {
    Fuel, Camera, Plus, Gauge, CheckCircle2, AlertCircle,
    Car, ParkingCircle, Wrench, Receipt, ArrowRight
} from 'lucide-react-native';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';

// Mock Data
const fuelLog = [
    { id: 1, kg: 8.5, efficiency: 22.4, date: 'Today, 10:30 AM', odometer: 45230, cost: 650 },
    { id: 2, kg: 7.2, efficiency: 19.8, date: 'Yesterday, 08:15 PM', odometer: 45010, cost: 580 },
    { id: 3, kg: 9.0, efficiency: 23.1, date: '10 Feb, 07:00 AM', odometer: 44850, cost: 720 },
];

const expenses = [
    { id: 1, type: 'toll', description: 'Bandra-Worli Sea Link', amount: 85, date: 'Today, 11:45 AM', verified: true },
    { id: 2, type: 'parking', description: 'Airport T2 Parsing', amount: 150, date: 'Yesterday, 02:30 PM', verified: true },
    { id: 3, type: 'repair', description: 'Tyre Puncture Fix', amount: 120, date: '10 Feb, 04:15 PM', verified: false },
];

const expenseIcons = { fuel: Fuel, toll: Car, parking: ParkingCircle, repair: Wrench };

export default function AppExpenses() {
    const [tab, setTab] = useState('fuel');
    const [showForm, setShowForm] = useState(false);
    const avgEff = (fuelLog.reduce((s, f) => s + f.efficiency, 0) / fuelLog.length).toFixed(1);

    const renderTabContent = () => {
        switch (tab) {
            case 'fuel':
                return (
                    <>
                        {!showForm ? (
                            <Animated.View entering={FadeInUp.delay(0).duration(350)}>
                                <TouchableOpacity style={styles.addButton} onPress={() => setShowForm(true)}>
                                    <Plus size={16} color="#0f172a" />
                                    <Text style={styles.addButtonText}>Log Fuel Fill</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        ) : (
                            <Animated.View entering={FadeInUp.duration(350)} layout={Layout.springify()} style={styles.card}>
                                <Text style={styles.sectionTitle}>Log Fuel Fill</Text>

                                <View style={styles.grid3}>
                                    <View style={styles.inputGroup}>
                                        <Text style={styles.inputLabel}>Amount (₹)</Text>
                                        <TextInput style={styles.input} placeholder="850" keyboardType="numeric" placeholderTextColor="#94a3b8" />
                                    </View>
                                    <View style={styles.inputGroup}>
                                        <Text style={styles.inputLabel}>CNG (kg)</Text>
                                        <TextInput style={styles.input} placeholder="12.5" keyboardType="numeric" placeholderTextColor="#94a3b8" />
                                    </View>
                                    <View style={styles.inputGroup}>
                                        <Text style={styles.inputLabel}>Odometer</Text>
                                        <TextInput style={styles.input} placeholder="45230" keyboardType="numeric" placeholderTextColor="#94a3b8" />
                                    </View>
                                </View>

                                <TouchableOpacity style={styles.buttonOutline}>
                                    <Camera size={16} color="#0f172a" />
                                    <Text style={styles.buttonOutlineText}>Receipt Photo</Text>
                                </TouchableOpacity>

                                <View style={styles.rowGap}>
                                    <TouchableOpacity style={styles.buttonSecondary} onPress={() => setShowForm(false)}>
                                        <Text style={styles.buttonSecondaryText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonPrimary} onPress={() => setShowForm(false)}>
                                        <Text style={styles.buttonPrimaryText}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animated.View>
                        )}

                        <View style={styles.gaps}>
                            {fuelLog.map((entry, index) => (
                                <Animated.View key={entry.id} entering={FadeInUp.delay(index * 50).duration(350)} style={styles.logCard}>
                                    <View style={styles.iconBoxSuccess}>
                                        <Fuel size={20} color="#15803d" />
                                    </View>
                                    <View style={styles.flex1}>
                                        <View style={styles.rowGapSmall}>
                                            <Text style={styles.itemTitle}>{entry.kg} kg CNG</Text>
                                            <View style={[styles.badge, entry.efficiency >= 21 ? styles.badgeSuccess : styles.badgeWarning]}>
                                                <Text style={[styles.badgeText, entry.efficiency >= 21 ? styles.textSuccess : styles.textWarning]}>
                                                    {entry.efficiency} km/kg
                                                </Text>
                                            </View>
                                        </View>
                                        <Text style={styles.itemSub}>{entry.date} • Odo: {entry.odometer.toLocaleString()}</Text>
                                    </View>
                                    <Text style={styles.costText}>₹{entry.cost}</Text>
                                </Animated.View>
                            ))}
                        </View>
                    </>
                );
            case 'expenses':
                return (
                    <Animated.View entering={FadeInUp.duration(350)} style={styles.gaps}>
                        {expenses.map((exp, index) => {
                            const Icon = expenseIcons[exp.type] || Receipt;
                            return (
                                <Animated.View key={exp.id} entering={FadeInUp.delay(index * 50).duration(350)} style={styles.logCard}>
                                    <View style={styles.iconBoxSecondary}>
                                        <Icon size={20} color="#64748b" />
                                    </View>
                                    <View style={styles.flex1}>
                                        <View style={styles.rowGapSmall}>
                                            <Text style={styles.itemTitle}>{exp.description}</Text>
                                            {exp.verified ? (
                                                <CheckCircle2 size={12} color="#22c55e" />
                                            ) : (
                                                <AlertCircle size={12} color="#f59e0b" />
                                            )}
                                        </View>
                                        <Text style={styles.itemSub}>{exp.date} • {exp.type}</Text>
                                    </View>
                                    <Text style={styles.costText}>₹{exp.amount}</Text>
                                </Animated.View>
                            );
                        })}
                    </Animated.View>
                );
            default:
                return null;
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Efficiency Hero */}
            <Animated.View entering={FadeInUp.duration(350)} style={styles.heroCard}>
                <View style={styles.rowBetween}>
                    <View>
                        <Text style={styles.heroLabel}>Fuel Efficiency (Avg)</Text>
                        <View style={styles.heroValueRow}>
                            <Text style={styles.heroValue}>{avgEff}</Text>
                            <Text style={styles.heroUnit}>km/kg</Text>
                        </View>
                        <Text style={styles.heroTarget}>Target: 21-24 km/kg</Text>
                    </View>
                    <View style={styles.gaugeCircle}>
                        <Gauge size={24} color="#15803d" />
                        <View style={styles.badgeSuccessSmall}>
                            <Text style={styles.textSuccessSmall}>Bonus</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>

            {/* Tab Switcher */}
            <View style={styles.tabContainer}>
                {[{ id: 'fuel', label: 'Fuel Log' }, { id: 'expenses', label: 'All Expenses' }].map(t => (
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

    // Hero
    heroCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#dcfce7' },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    heroLabel: { fontSize: 12, color: '#64748b' },
    heroValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 4 },
    heroValue: { fontSize: 32, fontWeight: '700', color: '#0f172a' },
    heroUnit: { fontSize: 14, color: '#64748b' },
    heroTarget: { fontSize: 11, color: '#64748b', marginTop: 4 },
    gaugeCircle: { width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: '#22c55e', alignItems: 'center', justifyContent: 'center', gap: 4 },
    badgeSuccessSmall: { backgroundColor: '#dcfce7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
    textSuccessSmall: { fontSize: 9, color: '#15803d', fontWeight: '600' },

    // Tabs
    tabContainer: { flexDirection: 'row', backgroundColor: '#f1f5f9', padding: 4, borderRadius: 16 },
    tabButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
    tabActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
    tabInactive: {},
    tabText: { fontSize: 12, fontWeight: '600' },
    textActive: { color: '#0f172a' },
    textInactive: { color: '#64748b' },

    // Form
    addButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#94a3b8', gap: 8 },
    addButtonText: { fontSize: 14, fontWeight: '500', color: '#0f172a' },
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#e2e8f0', gap: 12 },
    sectionTitle: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
    grid3: { flexDirection: 'row', gap: 8 },
    inputGroup: { flex: 1, gap: 4 },
    inputLabel: { fontSize: 10, color: '#0f172a', fontWeight: '500' },
    input: { height: 36, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, paddingHorizontal: 10, fontSize: 13, color: '#0f172a' },
    buttonOutline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', gap: 8 },
    buttonOutlineText: { fontSize: 13, fontWeight: '500', color: '#0f172a' },
    rowGap: { flexDirection: 'row', gap: 8 },
    buttonSecondary: { flex: 1, padding: 10, borderRadius: 12, backgroundColor: '#f1f5f9', alignItems: 'center' },
    buttonSecondaryText: { fontSize: 13, fontWeight: '500', color: '#0f172a' },
    buttonPrimary: { flex: 1, padding: 10, borderRadius: 12, backgroundColor: '#0f172a', alignItems: 'center' },
    buttonPrimaryText: { fontSize: 13, fontWeight: '600', color: '#fff' },

    // Lists
    gaps: { gap: 8 },
    logCard: { flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0', gap: 12 },
    iconBoxSuccess: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#dcfce7', alignItems: 'center', justifyContent: 'center' },
    iconBoxSecondary: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center' },
    flex1: { flex: 1 },
    rowGapSmall: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    itemTitle: { fontSize: 14, fontWeight: '500', color: '#0f172a' },
    itemSub: { fontSize: 11, color: '#64748b', marginTop: 2 },
    costText: { fontSize: 14, fontWeight: '700', color: '#0f172a' },

    badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
    badgeSuccess: { backgroundColor: '#dcfce7' },
    badgeWarning: { backgroundColor: '#fef3c7' },
    textSuccess: { fontSize: 9, color: '#15803d', fontWeight: '600' },
    textWarning: { fontSize: 9, color: '#d97706', fontWeight: '600' },
});
