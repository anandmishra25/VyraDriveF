import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import {
    AlertTriangle, ShieldCheck, Phone, Radio, MapPin,
    CheckCircle2, Clock, Send, MessageSquare
} from 'lucide-react-native';
import Animated, { FadeInUp, useAnimatedStyle, withRepeat, withSequence, withTiming, useSharedValue } from 'react-native-reanimated';

// Mock Data
const safetyCheckins = [
    { id: 1, time: '08:00 AM', status: 'completed' },
    { id: 2, time: '10:00 AM', status: 'completed' },
    { id: 3, time: '12:00 PM', status: 'due' },
    { id: 4, time: '02:00 PM', status: 'upcoming' },
];

const initialMessages = [
    { id: 1, from: 'Fleet Admin', time: '10:30 AM', message: 'Please confirm your location at Andheri.', read: true },
    { id: 2, from: 'You', time: '10:32 AM', message: 'Reached. Waiting for passenger.', read: true },
];

export default function AppSafety() {
    const [sosActive, setSosActive] = useState(false);
    const [tab, setTab] = useState('sos'); // 'sos' (Check-ins) or 'chat'
    const [messageInput, setMessageInput] = useState('');
    const [chatMessages, setChatMessages] = useState(initialMessages);

    // Pulse Animation for SOS
    const scale = useSharedValue(1);

    React.useEffect(() => {
        if (sosActive) {
            scale.value = withRepeat(
                withSequence(
                    withTiming(1.1, { duration: 500 }),
                    withTiming(1, { duration: 500 })
                ),
                -1,
                true
            );
        } else {
            scale.value = withTiming(1);
        }
    }, [sosActive]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handleSend = () => {
        if (!messageInput.trim()) return;
        const newMessage = {
            id: Date.now(),
            from: 'You',
            time: 'Now',
            message: messageInput,
            read: true
        };
        setChatMessages([newMessage, ...chatMessages]);
        setMessageInput('');
    };

    const renderTabContent = () => {
        switch (tab) {
            case 'sos':
                return (
                    <Animated.View entering={FadeInUp.delay(0).duration(350)} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.rowGap}>
                                <ShieldCheck size={16} color="#3b82f6" />
                                <Text style={styles.cardTitle}>Check-ins (Every 2h)</Text>
                            </View>
                        </View>

                        <View style={styles.gaps}>
                            {safetyCheckins.map((c, index) => {
                                let Icon = Clock;
                                let color = '#64748b';
                                let bg = '#f1f5f9';
                                let iconBg = '#e2e8f0';

                                if (c.status === 'completed') {
                                    Icon = CheckCircle2;
                                    color = '#22c55e';
                                    bg = '#f0fdf4';
                                    iconBg = '#dcfce7';
                                } else if (c.status === 'due') {
                                    Icon = AlertTriangle;
                                    color = '#f59e0b';
                                    bg = '#fffbeb';
                                    iconBg = '#fef3c7';
                                }

                                return (
                                    <View key={index} style={[styles.checkinItem, { backgroundColor: bg }]}>
                                        <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
                                            <Icon size={20} color={color} />
                                        </View>
                                        <View style={styles.flex1}>
                                            <Text style={styles.itemTitle}>{c.time}</Text>
                                            <Text style={styles.itemSubCapital}>{c.status}</Text>
                                        </View>
                                        {c.status === 'due' && (
                                            <TouchableOpacity style={styles.buttonSmall}>
                                                <Text style={styles.buttonSmallText}>Check In</Text>
                                            </TouchableOpacity>
                                        )}
                                        {c.status === 'completed' && (
                                            <View style={styles.badgeSuccess}>
                                                <Text style={styles.textSuccess}>Done</Text>
                                            </View>
                                        )}
                                    </View>
                                );
                            })}
                        </View>
                    </Animated.View>
                );
            case 'chat':
                return (
                    <Animated.View entering={FadeInUp.duration(350)} style={[styles.card, styles.chatCard]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.rowGap}>
                                <MessageSquare size={16} color="#3b82f6" />
                                <Text style={styles.cardTitle}>Fleet Chat</Text>
                            </View>
                        </View>

                        <FlatList
                            data={chatMessages}
                            keyExtractor={item => item.id.toString()}
                            inverted
                            style={styles.chatList}
                            renderItem={({ item }) => (
                                <View style={[
                                    styles.messageBubble,
                                    item.from === 'You' ? styles.msgRight : styles.msgLeft
                                ]}>
                                    <View style={styles.rowBetween}>
                                        <Text style={styles.msgFrom}>{item.from}</Text>
                                        <Text style={styles.msgTime}>{item.time}</Text>
                                    </View>
                                    <Text style={styles.msgText}>{item.message}</Text>
                                </View>
                            )}
                        />

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.chatInput}
                                placeholder="Message fleet admin..."
                                placeholderTextColor="#94a3b8"
                                value={messageInput}
                                onChangeText={setMessageInput}
                            />
                            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                                <Send size={16} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                );
            default:
                return null;
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.content}>
                {/* SOS Hero */}
                <Animated.View entering={FadeInUp.duration(350)} style={[styles.sosCard, sosActive && styles.sosActiveBg]}>
                    <View style={styles.centerCol}>
                        <TouchableOpacity onPress={() => setSosActive(!sosActive)} activeOpacity={0.9}>
                            <Animated.View style={[styles.sosButton, sosActive ? styles.sosButtonActive : styles.sosButtonInactive, animatedStyle]}>
                                <AlertTriangle size={48} color={sosActive ? '#fff' : '#ef4444'} />
                            </Animated.View>
                        </TouchableOpacity>

                        <View style={styles.centerText}>
                            <Text style={styles.sosTitle}>{sosActive ? 'SOS Active' : 'Emergency SOS'}</Text>
                            <Text style={styles.sosSub}>{sosActive ? 'Sharing live location with fleet owner' : 'Tap to share live location'}</Text>
                        </View>

                        {sosActive && (
                            <View style={styles.rowGap}>
                                <View style={styles.badgeDestructive}>
                                    <Radio size={12} color="#ef4444" />
                                    <Text style={styles.textDestructive}>Broadcasting</Text>
                                </View>
                                <View style={styles.badgeMuted}>
                                    <MapPin size={12} color="#64748b" />
                                    <Text style={styles.textMuted}>GPS Active</Text>
                                </View>
                            </View>
                        )}

                        <View style={styles.rowFull}>
                            <TouchableOpacity style={styles.buttonOutline}>
                                <Phone size={14} color="#0f172a" />
                                <Text style={styles.buttonOutlineText}>Call Owner</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonOutline}>
                                <Phone size={14} color="#0f172a" />
                                <Text style={styles.buttonOutlineText}>Call 112</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>

                {/* Tab Switcher */}
                <View style={styles.tabContainer}>
                    {[{ id: 'sos', label: 'Check-ins' }, { id: 'chat', label: 'Messages' }].map(t => (
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
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    content: { padding: 20, gap: 16 },

    // SOS Hero
    sosCard: { backgroundColor: '#fff', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#fef2f2', alignItems: 'center' },
    sosActiveBg: { backgroundColor: '#fef2f2', borderColor: '#ef4444' },
    centerCol: { alignItems: 'center', gap: 16, width: '100%' },
    sosButton: { width: 112, height: 112, borderRadius: 56, alignItems: 'center', justifyContent: 'center' },
    sosButtonInactive: { backgroundColor: '#fee2e2' },
    sosButtonActive: { backgroundColor: '#ef4444', shadowColor: '#ef4444', shadowOpacity: 0.5, shadowRadius: 20, elevation: 10 },
    centerText: { alignItems: 'center' },
    sosTitle: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
    sosSub: { fontSize: 12, color: '#64748b', marginTop: 4 },
    rowGap: { flexDirection: 'row', gap: 8 },
    badgeDestructive: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fee2e2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
    textDestructive: { fontSize: 10, color: '#ef4444', fontWeight: '600' },
    badgeMuted: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
    textMuted: { fontSize: 10, color: '#64748b', fontWeight: '600' },
    rowFull: { flexDirection: 'row', gap: 12, width: '100%' },
    buttonOutline: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', backgroundColor: '#fff', gap: 8 },
    buttonOutlineText: { fontSize: 13, fontWeight: '500', color: '#0f172a' },

    // Tabs
    tabContainer: { flexDirection: 'row', backgroundColor: '#f1f5f9', padding: 4, borderRadius: 16 },
    tabButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
    tabActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
    tabInactive: {},
    tabText: { fontSize: 12, fontWeight: '600' },
    textActive: { color: '#0f172a' },
    textInactive: { color: '#64748b' },

    // Check-ins
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#e2e8f0' },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    cardTitle: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
    gaps: { gap: 10 },
    checkinItem: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, gap: 12 },
    iconBox: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    flex1: { flex: 1 },
    itemTitle: { fontSize: 14, fontWeight: '500', color: '#0f172a' },
    itemSubCapital: { fontSize: 11, color: '#64748b', textTransform: 'capitalize' },
    buttonSmall: { backgroundColor: '#0f172a', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    buttonSmallText: { fontSize: 11, color: '#fff', fontWeight: '600' },
    badgeSuccess: { backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    textSuccess: { fontSize: 10, color: '#15803d', fontWeight: '600' },

    // Chat
    chatCard: { flex: 1, minHeight: 400 },
    chatList: { flex: 1, marginBottom: 16 },
    messageBubble: { padding: 12, borderRadius: 12, maxWidth: '80%', marginBottom: 12 },
    msgLeft: { alignSelf: 'flex-start', backgroundColor: '#f1f5f9', borderTopLeftRadius: 0 },
    msgRight: { alignSelf: 'flex-end', backgroundColor: '#eff6ff', borderTopRightRadius: 0 },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4, gap: 8 },
    msgFrom: { fontSize: 11, fontWeight: '600', color: '#0f172a' },
    msgTime: { fontSize: 10, color: '#94a3b8' },
    msgText: { fontSize: 13, color: '#334155' },
    inputContainer: { flexDirection: 'row', gap: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
    chatInput: { flex: 1, height: 40, backgroundColor: '#f8fafc', borderRadius: 12, paddingHorizontal: 12, fontSize: 13, borderWidth: 1, borderColor: '#e2e8f0' },
    sendButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#0f172a', alignItems: 'center', justifyContent: 'center' },
});
