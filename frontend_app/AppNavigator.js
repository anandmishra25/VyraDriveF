import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';

import AppDashboard from './AppDashboard';

// Placeholder Screens
import AppShifts from './AppShifts';

import AppTrips from './AppTrips';

import AppEarnings from './AppEarnings';

// Placeholder Screens
import AppExpenses from './AppExpenses';

import AppSafety from './AppSafety';

import AppProfile from './AppProfile';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Dashboard" component={AppDashboard} />
                <Tab.Screen name="Shifts" component={AppShifts} />
                <Tab.Screen name="Trips" component={AppTrips} />
                <Tab.Screen name="Earnings" component={AppEarnings} />
                <Tab.Screen name="Expenses" component={AppExpenses} />
                <Tab.Screen name="Safety" component={AppSafety} />
                <Tab.Screen name="Profile" component={AppProfile} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
