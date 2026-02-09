import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from './context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function AppLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, guestLogin, isLoading } = useContext(AuthContext);
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            await login(email, password);
        } catch (e) {
            Alert.alert('Login Failed', 'Invalid email or password');
        }
    };

    const handleGuest = async () => {
        try {
            await guestLogin();
        } catch (e) {
            Alert.alert('Error', 'Could not continue as guest');
        }
    };

    return (
        <View style={styles.container}>
            <Animated.View entering={FadeInUp.duration(500)} style={styles.formContainer}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="driver@vyra.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="********"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonPrimaryText}>Sign In</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSecondary} onPress={handleGuest} disabled={isLoading}>
                    <Text style={styles.buttonSecondaryText}>Skip / Continue as Guest</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.linkText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc', justifyContent: 'center', padding: 24 },
    formContainer: { backgroundColor: '#fff', padding: 24, borderRadius: 24, borderWidth: 1, borderColor: '#e2e8f0', gap: 16 },
    title: { fontSize: 24, fontWeight: '700', color: '#0f172a', textAlign: 'center' },
    subtitle: { fontSize: 14, color: '#64748b', textAlign: 'center', marginBottom: 8 },
    inputGroup: { gap: 6 },
    label: { fontSize: 12, fontWeight: '500', color: '#0f172a' },
    input: { height: 44, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, paddingHorizontal: 16, fontSize: 14, backgroundColor: '#f8fafc' },
    buttonPrimary: { height: 48, backgroundColor: '#0f172a', borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
    buttonPrimaryText: { fontSize: 14, fontWeight: '600', color: '#fff' },
    buttonSecondary: { height: 48, backgroundColor: '#f1f5f9', borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
    buttonSecondaryText: { fontSize: 14, fontWeight: '500', color: '#475569' },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
    footerText: { fontSize: 13, color: '#64748b' },
    linkText: { fontSize: 13, fontWeight: '600', color: '#0f172a' },
});
