// src/components/Home/SummaryUpdates.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SummaryUpdates: React.FC = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Summary Updates</Text>

      <View style={styles.row}>
        <View style={styles.stat}>
          <Text style={styles.percentage}>93%</Text>
          <Text style={styles.label}>Labor Efficiency</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.percentage}>75%</Text>
          <Text style={styles.label}>Crop Health</Text>
        </View>
      </View>
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
    marginBottom: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  percentage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90D9',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

// THIS LINE IS CRITICAL - it's what "default export" means
export default SummaryUpdates;