// src/components/Home/AIInsight.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AIInsightProps {
  onPress?: () => void;
}

const AIInsight: React.FC<AIInsightProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>Gemini AI Insight:</Text>
      <Text style={styles.content}>
        No insights available at this time.
      </Text>
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
  content: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});

export default AIInsight;