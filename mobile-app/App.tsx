import React from 'react';
import { AuthProvider } from './src/hooks/useAuth';       // For login, session, and role
import { AppProvider } from './src/context/AppContext';   // For other app data
import RootNavigator from './src/navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { ShiftProvider } from '@/hooks/useShift';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <ShiftProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ShiftProvider>
      </AppProvider>
    </AuthProvider>
  );
}