import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Modal,
  ScrollView,
  RefreshControl,
  Alert,
  Linking,
  Dimensions,
  Platform,
  Image // Fixed: Added Image to imports
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from '../services/supabase';
import BuddyHeader from "../components/common/BuddyHeader";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Recording {
  id: string;
  shift_id: string;
  employee_id: string;
  egress_id: string | null;
  chunk_index: number;
  storage_url: string | null;
  status: 'recording' | 'completed' | 'failed';
  started_at: string;
  ended_at: string | null;
  summary: string | null;
  processing_status: 'pending' | 'processing' | 'completed' | 'failed' | null;
}

interface Employee {
  id: string;
  name: string;
  email: string;
}

interface EmployeeWithRecordings {
  employee: Employee;
  recordings: Recording[];
}

interface ShiftReport {
  employee_id: string;
  report_url: string;
}

interface ShiftDetailsScreenProps {
  route: {
    params: {
      shiftId: string;
      shiftStartedAt: string;
      shiftStatus?: string;
    };
  };
  navigation: any;
}

// Utility Helpers
function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatDuration(startIso: string, endIso: string | null): string {
  if (!endIso) return 'Live';
  const ms = new Date(endIso).getTime() - new Date(startIso).getTime();
  const m = Math.round(ms / 60000);
  return m > 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`;
}

function SummaryContent({ summaryJson }: { summaryJson: string }) {
  let parsed: any = null;
  try { parsed = JSON.parse(summaryJson); } catch { return <Text style={modalStyles.summaryText}>{summaryJson}</Text>; }
  return (
    <View>
      {parsed.executive_summary && (
        <View style={modalStyles.section}>
          <Text style={modalStyles.sectionTitle}>📋 Executive Summary</Text>
          <Text style={modalStyles.sectionBody}>{parsed.executive_summary}</Text>
        </View>
      )}
      {Array.isArray(parsed.timeline) && (
        <View style={modalStyles.section}>
          <Text style={modalStyles.sectionTitle}>🕐 Timeline</Text>
          {parsed.timeline.map((t: any, i: number) => (
            <View key={i} style={modalStyles.timelineRow}>
              <Text style={modalStyles.timelineTime}>{t.time_estimate ?? `${i + 1}`}</Text>
              <Text style={modalStyles.timelineActivity}>{t.activity}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function SummaryModal({ visible, onClose, employeeName, recording }: any) {
  if (!recording) return null;
  const isCompleted = recording.processing_status === 'completed';
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={modalStyles.overlay}>
        <View style={modalStyles.sheet}>
          <View style={modalStyles.handle} />
          <Text style={modalStyles.title}>{employeeName}</Text>
          <Text style={modalStyles.sub}>Session Analysis</Text>
          <ScrollView style={modalStyles.body}>
            {isCompleted ? <SummaryContent summaryJson={recording.summary} /> : <ActivityIndicator color="#2d4b2a" />}
          </ScrollView>
          <TouchableOpacity style={modalStyles.closeBtn} onPress={onClose}>
            <Text style={modalStyles.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default function ShiftDetailsScreen({ route, navigation }: ShiftDetailsScreenProps) {
  const { shiftId, shiftStartedAt } = route.params;
  const [groups, setGroups] = useState<EmployeeWithRecordings[]>([]);
  const [shiftStatus, setShiftStatus] = useState<string>('ended');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [shiftReports, setShiftReports] = useState<ShiftReport[]>([]);
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);

  const fetchShiftReports = useCallback(async () => {
    const { data } = await supabase.from('shift_reports').select('employee_id, report_url').eq('shift_id', shiftId);
    if (data) setShiftReports(data as ShiftReport[]);
  }, [shiftId]);

  const fetchData = useCallback(async () => {
    const [{ data: recordings }, { data: employees }, { data: shiftData }] = await Promise.all([
      supabase.from('recordings').select('*').eq('shift_id', shiftId).order('started_at', { ascending: true }),
      supabase.from('users').select('id, name, email').eq('role', 'employee'),
      supabase.from('shifts').select('status').eq('id', shiftId).single(),
    ]);
    if (shiftData) setShiftStatus((shiftData as any).status ?? 'ended');
    if (recordings && employees) {
      const empMap: any = {};
      employees.forEach((e: any) => { empMap[e.id] = e; });
      const groupMap: any = {};
      recordings.forEach((r: any) => {
        if (!groupMap[r.employee_id]) groupMap[r.employee_id] = [];
        groupMap[r.employee_id].push(r);
      });
      setGroups(Object.entries(groupMap).map(([empId, recs]) => ({
        employee: empMap[empId] ?? { id: empId, name: 'Unknown', email: '' },
        recordings: recs as Recording[],
      })));
    }
    await fetchShiftReports();
    setLoading(false);
    setRefreshing(false);
  }, [shiftId, fetchShiftReports]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleGenerateReport = async (employeeId: string, employeeName: string) => {
    setGeneratingReport(employeeId);
    try {
      const { data: session } = await supabase.auth.getSession();
      const res = await fetch('https://bkwrixhpykvcdpkvezsd.supabase.co/functions/v1/generate-shift-report', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${session.session?.access_token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ shiftId, employeeId }),
      });
      const { reportUrl } = await res.json();
      await fetchShiftReports();
      Alert.alert('Report Ready', `Analysis for ${employeeName} is complete.`, [{ text: 'View', onPress: () => Linking.openURL(reportUrl) }, { text: 'OK' }]);
    } catch (err) { Alert.alert('Error', 'Failed to generate report'); }
    finally { setGeneratingReport(null); }
  };

  const renderRecording = (rec: Recording, index: number, empName: string) => {
    const isLive = rec.status === 'recording';
    const isFailed = rec.status === 'failed';
    const summaryReady = rec.processing_status === 'completed';

    return (
      <View key={rec.id} style={[styles.recCard, isLive && styles.recCardActive]}>
        <View style={styles.recHeader}>
          <Text style={styles.recLabel}>Session {index + 1}</Text>
          <View style={[styles.badge, isLive ? styles.badgeLive : isFailed ? styles.badgeFailed : styles.badgeDone]}>
            <Text style={[styles.badgeText, { color: isLive ? '#EF4444' : isFailed ? '#666' : '#22C55E' }]}>
              {rec.status.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.recMeta}>
          <Text style={styles.recMetaText}>🕐 {formatTime(rec.started_at)}</Text>
          <Text style={styles.recMetaText}>⏱ {formatDuration(rec.started_at, rec.ended_at)}</Text>
        </View>
        {rec.status === 'completed' && (
          <TouchableOpacity
            style={[styles.summaryBtn, summaryReady ? styles.summaryBtnActive : styles.summaryBtnDisabled]}
            onPress={() => summaryReady && (setSelectedRecording(rec), setSelectedEmployee(empName), setShowModal(true))}
          >
            <Text style={styles.summaryBtnText}>{summaryReady ? "🤖 View AI Summary" : "⏳ Processing..."}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading) return <View style={styles.centered}><ActivityIndicator size="large" color="#2d4b2a" /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dashboardBackground} />

      <BuddyHeader
        title="Shift Detail"
        onProfilePress={() => navigation.goBack()}
        showRightIcon={false}
      />

      <View style={styles.dashcard} />

      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchData(); }} />}
      >
        <View style={styles.scrollPadding}>
          {groups.map((item) => {
            const existingReport = shiftReports.find((r) => r.employee_id === item.employee.id);
            const hasCompleted = item.recordings.some(r => r.processing_status === 'completed');

            return (
              <View key={item.employee.id} style={styles.employeeGroup}>
                <View style={styles.employeeHeader}>
                  <View style={styles.avatar}><Text style={styles.avatarText}>{item.employee.name.charAt(0)}</Text></View>
                  <View>
                    <Text style={styles.employeeName}>{item.employee.name}</Text>
                    <Text style={styles.employeeSub}>{item.recordings.length} Sessions</Text>
                  </View>
                </View>

                {item.recordings.map((rec, i) => renderRecording(rec, i, item.employee.name))}

                {shiftStatus === 'ended' && (
                  <TouchableOpacity
                    style={[styles.reportBtn, existingReport ? styles.reportBtnView : styles.reportBtnGen]}
                    onPress={() => existingReport ? Linking.openURL(existingReport.report_url) : handleGenerateReport(item.employee.id, item.employee.name)}
                    disabled={generatingReport === item.employee.id || (!hasCompleted && !existingReport)}
                  >
                    <Text style={styles.reportBtnText}>
                      {generatingReport === item.employee.id ? "Generating..." : existingReport ? "📄 View Shift Report" : "📊 Generate Report"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
        <View style={{ height: 150 }} />
      </ScrollView>

      <TouchableOpacity style={styles.buddyButton} onPress={() => navigation.navigate('ChatBot')}>
        <LinearGradient colors={['#a25a28', '#8b4a1f']} style={styles.buddyGradient}>
          <Image style={styles.buddyBotIcon} source={require('assets/image/buddySmall.png')} />
          <Text style={styles.buddyText}>Buddy</Text>
        </LinearGradient>
      </TouchableOpacity>

      <SummaryModal visible={showModal} onClose={() => setShowModal(false)} employeeName={selectedEmployee} recording={selectedRecording} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f8f2" },
  dashboardBackground: { position: 'absolute', top: 0, width: '100%', height: 300, backgroundColor: "#f5f8f2" },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  dashcard: {
    top: 130,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '100%',
    backgroundColor: "#fff",
    width: SCREEN_WIDTH,
    position: "absolute",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  contentContainer: { flex: 1, marginTop: 140 },
  scrollPadding: { paddingHorizontal: 20, paddingTop: 20 },
  employeeGroup: { marginBottom: 25, backgroundColor: '#f9fbf9', borderRadius: 20, padding: 15, borderWidth: 1, borderColor: '#edf2ed' },
  employeeHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#2d4b2a', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { color: '#fff', fontWeight: 'bold' },
  employeeName: { fontSize: 16, fontWeight: '700', color: '#1f291e' },
  employeeSub: { fontSize: 12, color: '#666' },
  recCard: { backgroundColor: '#fff', borderRadius: 15, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  recCardActive: { borderColor: '#EF4444', backgroundColor: '#fff5f5' },
  recHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  recLabel: { fontWeight: '700', fontSize: 13, color: '#444' },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, backgroundColor: '#f0f0f0' },
  badgeLive: { backgroundColor: '#fee2e2' },
  badgeFailed: { backgroundColor: '#f3f4f6' }, // Fixed: Added badgeFailed
  badgeDone: { backgroundColor: '#dcfce7' },
  badgeText: { fontSize: 10, fontWeight: '800' },
  recMeta: { flexDirection: 'row', gap: 15, marginBottom: 10 },
  recMetaText: { fontSize: 12, color: '#777' },
  summaryBtn: { height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  summaryBtnActive: { backgroundColor: '#e8ece4' },
  summaryBtnDisabled: { backgroundColor: '#f5f5f5' },
  summaryBtnText: { fontSize: 12, fontWeight: '700', color: '#2d4b2a' },
  reportBtn: { marginTop: 10, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  reportBtnGen: { backgroundColor: '#2d4b2a' },
  reportBtnView: { backgroundColor: '#a25a28' },
  reportBtnText: { color: '#fff', fontWeight: 'bold' },
  buddyButton: {
    position: 'absolute', bottom: 100, right: 20,
    height: 44, width: 105, borderRadius: 12, elevation: 8, overflow: 'hidden'
  },
  buddyGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  buddyText: { color: "#fff", fontWeight: "700", marginLeft: 6, fontSize: 14 },
  buddyBotIcon: { width: 18, height: 18 },
});

const modalStyles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20, maxHeight: '80%' },
  handle: { width: 40, height: 5, backgroundColor: '#ddd', borderRadius: 3, alignSelf: 'center', marginBottom: 15 },
  title: { fontSize: 20, fontWeight: '800', color: '#1f291e' },
  sub: { color: '#666', marginBottom: 20 },
  body: { marginBottom: 20 },
  summaryText: { fontSize: 14, color: '#444' }, // Fixed: Added summaryText
  section: { marginBottom: 20 },
  sectionTitle: { fontWeight: '700', color: '#2d4b2a', marginBottom: 5 },
  sectionBody: { color: '#444', lineHeight: 20 },
  timelineRow: { flexDirection: 'row', marginBottom: 8 },
  timelineTime: { width: 60, fontWeight: 'bold', color: '#a25a28' },
  timelineActivity: { flex: 1, color: '#444' },
  closeBtn: { backgroundColor: '#f0f0f0', height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  closeBtnText: { fontWeight: 'bold', color: '#444' }
});