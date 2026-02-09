import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from './context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function AppSignup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading } = useContext(AuthContext);
    const navigation = useNavigation();

    const handleSignup = async () => {
        try {
            await signup(fullName, email, password);
        } catch (e) {
            Alert.alert('Signup Failed', 'Please check your details and try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Animated.View entering={FadeInUp.duration(500)} style={styles.formContainer}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Join Vyra Drive today</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Amit Sharma"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                </View>

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

                <TouchableOpacity style={styles.buttonPrimary} onPress={handleSignup} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonPrimaryText}>Sign Up</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.linkText}>Sign In</Text>
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
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
    footerText: { fontSize: 13, color: '#64748b' },
    linkText: { fontSize: 13, fontWeight: '600', color: '#0f172a' },
});
