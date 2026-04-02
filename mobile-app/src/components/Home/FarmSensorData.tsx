// src/components/Home/FarmSensorData.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface FarmSensorDataProps {
  onActivate?: () => void;
}

const FarmSensorData: React.FC<FarmSensorDataProps> = ({ onActivate }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Farm Sensor Data</Text>
      <Text style={styles.subtitle}>Soil Sensor</Text>

      {/* Sensor Readings */}
      <View style={styles.readings}>
        <View style={styles.reading}>
          <Text style={styles.label}>pH Value</Text>
          <Text style={styles.value}>6.5</Text>
        </View>
        <View style={styles.reading}>
          <Text style={styles.label}>Soil Moisture</Text>
          <Text style={styles.value}>65%</Text>
        </View>
      </View>

      {/* NPK Content */}
      <Text style={styles.subtitle}>NPK Content</Text>
      <View style={styles.npkRow}>
        <View style={styles.npkItem}>
          <Text style={styles.npkLabel}>N</Text>
        </View>
        <View style={styles.npkItem}>
          <Text style={styles.npkLabel}>P</Text>
        </View>
        <View style={styles.npkItem}>
          <Text style={styles.npkLabel}>K</Text>
        </View>
      </View>

      {/* Activate IoT Sensor Button */}
      <TouchableOpacity
        style={styles.activateButton}
        onPress={onActivate}
      >
        <Text style={styles.activateText}>IoT Sensor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 12,
    marginBottom: 8,
  },
  readings: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reading: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#999',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  npkRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  npkItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  npkLabel: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  activateButton: {
    backgroundColor: '#4A90D9',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  activateText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default FarmSensorData;