// src/screens/HomePage.tsx
import React, { FunctionComponent, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import UserProfileIcon from '../assets/icons/UserProfile.svg';

// ── Sub-components (broken out for readability) ──
import WeatherCard from '../components/Home/WeatherCard';
import SummaryUpdates from '../components/Home/SummaryUpdates';
import SafetyCheck from '../components/Home/SafetyCheck';
import AIInsight from '../components/Home/AIInsight';
import FarmSensorData from '../components/Home/FarmSensorData';
import BuddyButton from '../components/Home/BuddyButton';
import BottomTaskbar from '../components/Home/BottomTaskbar';


const HomePage: FunctionComponent = () => {
  const navigation = useNavigation();

  const onUserProfileIconClick = useCallback(() => {
    navigation.navigate('Settings' as never);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* ── Top Header ── */}
      <View style={styles.topHeader}>
        <Text style={styles.greeting}>Good Morning</Text>
        <TouchableOpacity onPress={onUserProfileIconClick}>
          {/* ✅ SVG used as component — NOT with require() */}
          <UserProfileIcon width={40} height={40} />
        </TouchableOpacity>
      </View>

      {/* ── Scrollable Dashboard Content ── */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <WeatherCard onPress={onUserProfileIconClick} />
        <SummaryUpdates />
        <SafetyCheck onPress={onUserProfileIconClick} />
        <AIInsight onPress={onUserProfileIconClick} />
        <FarmSensorData onActivate={onUserProfileIconClick} />
      </ScrollView>

      {/* ── Floating Buddy Button ── */}
      <BuddyButton onPress={onUserProfileIconClick} />

      {/* ── Bottom Taskbar ── */}
      <BottomTaskbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  taskbar: {
    width: '100%',
    height: 60,
  },
});

export default HomePage;