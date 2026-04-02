// src/components/Home/SafetyCheck.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SafetyCheckProps {
  onPress?: () => void;
}

const SafetyCheck: React.FC<SafetyCheckProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>Safety Check :</Text>
      <Text style={styles.status}>Active Anomalies : 0</Text>
    </TouchableOpacity>
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
  },
  status: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 8,
  },
});

export default SafetyCheck;