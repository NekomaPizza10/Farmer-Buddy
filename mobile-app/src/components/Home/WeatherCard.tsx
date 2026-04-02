// src/components/Home/WeatherCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface WeatherCardProps {
  onPress?: () => void;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
const TEMPS = ['30°', '30°', '33°', '27°', '29°', '28°', '27°'];

const WeatherCard: React.FC<WeatherCardProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Location & Temperature */}
      <View style={styles.header}>
        <Text style={styles.location}>Location</Text>
        <Text style={styles.temperature}>30°</Text>
        <Text style={styles.condition}>Mostly Cleared</Text>
      </View>

      {/* Weekly Forecast */}
      <View style={styles.forecast}>
        {DAYS.map((day, index) => (
          <View key={day} style={styles.forecastDay}>
            <Text style={styles.dayLabel}>{day}</Text>
            {/* Replace with actual weather icons */}
            <View style={styles.weatherIconPlaceholder} />
            <Text style={styles.tempLabel}>{TEMPS[index]}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#4A90D9',
    borderRadius: 16,
    padding: 20,
  },
  header: {
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 48,
    color: '#FFF',
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  forecast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forecastDay: {
    alignItems: 'center',
    gap: 4,
  },
  dayLabel: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  weatherIconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
  },
  tempLabel: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default WeatherCard;