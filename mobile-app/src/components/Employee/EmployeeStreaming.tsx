import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// ─────────────────────────────────────────────────────────────────────────────
// MOCK component — LiveKit is disabled for Expo Go.
// To restore real streaming, do an EAS development build:
//   eas build --profile development-device --platform ios
// Then restore the real EmployeeStreaming from EmployeeStreaming.real.tsx
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  shiftId: string;
  employeeName: string;
}

export default function EmployeeStreaming({ shiftId, employeeName }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.mockCamera}>
        <Text style={styles.cameraIcon}>📹</Text>
        <Text style={styles.mockTitle}>Camera Stream</Text>
        <Text style={styles.mockSubtext}>
          Live streaming requires a development build.{'\n'}
          Run: eas build --profile development-device
        </Text>
      </View>
      <TouchableOpacity style={styles.mockButton} disabled>
        <Text style={styles.mockButtonText}>Start Streaming (Disabled in Expo Go)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  mockCamera: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    borderStyle: 'dashed',
    marginBottom: 12,
  },
  cameraIcon: { fontSize: 48, marginBottom: 12 },
  mockTitle: { fontSize: 16, fontWeight: '700', color: '#F8FAFC', marginBottom: 8 },
  mockSubtext: { fontSize: 13, color: '#64748B', textAlign: 'center', lineHeight: 20 },
  mockButton: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  mockButtonText: { color: '#64748B', fontSize: 14, fontWeight: '600' },
});