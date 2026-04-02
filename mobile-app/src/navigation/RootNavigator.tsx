import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../hooks/useAuth';
import AuthStack from './AuthStack';
import ManagerTabs from './ManagerTabs';
import EmployeeTabs from './EmployeeTabs';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { session, loading, role } = useAuth();

  // 1. Show a loading spinner while we check for a session.
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  // 2. Once loading is false, render the correct navigator.
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!session ? (
        // User is not logged in, show login/register screens.
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : role === 'manager' ? (
        // User is a manager, show the manager tabs.
        <Stack.Screen name="ManagerApp" component={ManagerTabs} />
      ) : (
        // User is an employee (or has no specific role), show employee tabs.
        <Stack.Screen name="EmployeeApp" component={EmployeeTabs} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;