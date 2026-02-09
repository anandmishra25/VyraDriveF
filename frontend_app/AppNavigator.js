import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Screens
import AppLogin from './AppLogin';
import AppSignup from './AppSignup';
import AppDashboard from './AppDashboard';
import AppShifts from './AppShifts';
import AppTrips from './AppTrips';
import AppEarnings from './AppEarnings';
import AppExpenses from './AppExpenses';
import AppSafety from './AppSafety';
import AppProfile from './AppProfile';

// Icons
import { LayoutDashboard, Clock, Map, Wallet, Receipt, Shield, User } from 'lucide-react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={AppLogin} />
            <Stack.Screen name="Signup" component={AppSignup} />
        </Stack.Navigator>
    );
}

function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopColor: '#e2e8f0',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: '#0f172a',
                tabBarInactiveTintColor: '#94a3b8',
                tabBarIcon: ({ color, size }) => {
                    let Icon;
                    switch (route.name) {
                        case 'Dashboard': Icon = LayoutDashboard; break;
                        case 'Shifts': Icon = Clock; break;
                        case 'Trips': Icon = Map; break;
                        case 'Earnings': Icon = Wallet; break;
                        case 'Expenses': Icon = Receipt; break;
                        case 'Safety': Icon = Shield; break;
                        case 'Profile': Icon = User; break;
                        default: Icon = LayoutDashboard;
                    }
                    return <Icon color={color} size={size} />;
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={AppDashboard} />
            <Tab.Screen name="Shifts" component={AppShifts} />
            <Tab.Screen name="Trips" component={AppTrips} />
            <Tab.Screen name="Earnings" component={AppEarnings} />
            <Tab.Screen name="Expenses" component={AppExpenses} />
            <Tab.Screen name="Safety" component={AppSafety} />
            <Tab.Screen name="Profile" component={AppProfile} />
        </Tab.Navigator>
    );
}

function RootNavigator() {
    const { userToken, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0f172a" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {userToken ? <AppTabs /> : <AuthStack />}
        </NavigationContainer>
    );
}

export default function AppNavigator() {
    return (
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
    );
}
