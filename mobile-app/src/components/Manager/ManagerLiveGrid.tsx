import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// MOCK — requires EAS development build for real LiveKit streaming
export default function ManagerLiveGrid({ shiftId }: { shiftId: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📡</Text>
      <Text style={styles.title}>Live Feed Grid</Text>
      <Text style={styles.subtitle}>
        Live streaming requires a development build.{'\n'}
        Employee streams will appear here in production.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    borderStyle: 'dashed',
    marginVertical: 8,
  },
  icon: { fontSize: 40, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: '700', color: '#F8FAFC', marginBottom: 6 },
  subtitle: { fontSize: 13, color: '#64748B', textAlign: 'center', lineHeight: 20 },
});