// src/components/Home/BottomTaskbar.tsx
import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

type TabItem = {
  name: string;
  label: string;
  icon: any;          // require(…) returns a number
  activeIcon?: any;   // optional highlighted version
  screen: string;
};

const tabs = [
  {
    name: 'home',
    label: 'Home',
    icon: require('@/assets/image/Home.png'),
    screen: 'Home',
  },
  {
    name: 'sensors',
    label: 'sensors',
    icon: require('@/assets/image/IoTSensor.png'),
    screen: 'sensors',
  },
  {
    name: 'scanner',
    label: 'scanner',
    icon: require('@/assets/image/Scanner.png'),
    screen: 'Scanner',
  },
  {
    name: 'cam',
    label: 'cam',
    icon: require('@/assets/image/BodyCam.png'),
    screen: 'cam',
  },
  {
    name: 'chatbot',
    label: 'Chatbot',
    icon: require('@/assets/image/chatbot.png'),
    screen: 'Chatbot',
  },
];

// 🎨 Define your colors in one place
const COLORS = {
  active: '#4CAF50', // Primary/active color
  inactive: '#9E9E9E', // Grey/inactive color
};

const BottomTaskbar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.taskbar}>
      {tabs.map((tab) => {
        const isActive = route.name === tab.screen;
        const tint = isActive ? COLORS.active : COLORS.inactive;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.screen as never)}
          >
            <Image
              source={tab.icon}
              style={[styles.icon, { tintColor: tint }]}
              resizeMode="contain"
            />

            <Text style={[styles.label, { color: tint }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  taskbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 10, // safe area padding for iPhone
    elevation: 10,     // Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },
});

export default BottomTaskbar;