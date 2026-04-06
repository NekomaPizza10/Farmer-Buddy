import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../screens/HomePage';
import FarmerSensorScreen from '../screens/FarmerSensorScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ChatBotScreen from '../screens/ChatBotScreen';
import BodyCamera from '../screens/BodyCamera';
import { EmployeeTabParamList } from './types';
import { Text } from 'react-native';

import TaskBar from '../components/TaskBar';

const Tab = createBottomTabNavigator<EmployeeTabParamList>();

export default function EmployeeTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <TaskBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1E293B',
          borderTopColor: '#334155',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#64748B',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={HomePage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20 }}>🏠</Text>
          ),
        }}
      />

      <Tab.Screen
        name="FarmerSensor"
        component={FarmerSensorScreen}
        options={{
          tabBarLabel: 'Sensor',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20 }}>🌱</Text>
          ),
        }}
      />

      <Tab.Screen
        name="BodyCamera"
        component={BodyCamera}
        options={{
          tabBarLabel: 'BodyCam',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20 }}>📷</Text>
          ),
        }}
      />

      <Tab.Screen
        name="ChatBot"
        component={ChatBotScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20 }}>🤖</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
