import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  Dimensions,
  Image,
  Pressable,
  ScrollView // Fixed: Added ScrollView import
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { supabase } from '../services/supabase';
import { useAuth } from '../hooks/useAuth';
import { RootStackParamList } from '../navigation/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
type NavProp = NativeStackNavigationProp<RootStackParamList>;

interface Shift {
  id: string;
  status: 'active' | 'ended';
  started_at: string;
  ended_at: string | null;
  manager_id: string;
}

interface ShiftWithCounts extends Shift {
  recording_count: number;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDuration(startIso: string, endIso: string | null): string {
  if (!endIso) return 'Ongoing';
  const ms = new Date(endIso).getTime() - new Date(startIso).getTime();
  const totalMins = Math.round(ms / 60000);
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function ShiftsScreen() {
  const navigation = useNavigation<NavProp>();
  const { profile } = useAuth();
  const [shifts, setShifts] = useState<ShiftWithCounts[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchShifts = useCallback(async () => {
    if (!profile) return;

    const { data: shiftData, error } = await supabase
      .from('shifts')
      .select('*')
      .order('started_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch shifts:', error);
      setLoading(false);
      setRefreshing(false);
      return;
    }

    const { data: recData } = await supabase.from('recordings').select('shift_id');

    const counts: Record<string, number> = {};
    if (recData) {
      recData.forEach((r: { shift_id: string }) => {
        counts[r.shift_id] = (counts[r.shift_id] ?? 0) + 1;
      });
    }

    const combined: ShiftWithCounts[] = (shiftData ?? []).map((s: Shift) => ({
      ...s,
      recording_count: counts[s.id] ?? 0,
    }));

    setShifts(combined);
    setLoading(false);
    setRefreshing(false);
  }, [profile]);

  useEffect(() => {
    fetchShifts();
    const channel = supabase
      .channel('shifts-list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shifts' }, () => fetchShifts())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchShifts]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchShifts();
  };

  const renderShift = ({ item }: { item: ShiftWithCounts }) => {
    const isActive = item.status === 'active';
    return (
      <TouchableOpacity
        style={[styles.card, isActive && styles.cardActive]}
        onPress={() =>
          navigation.navigate('ShiftDetails', {
            shiftId: item.id,
            shiftStartedAt: item.started_at,
          })
        }
        activeOpacity={0.75}
      >
        <View style={styles.cardTop}>
          <View style={styles.dateBlock}>
            <Text style={styles.dateText}>{formatDate(item.started_at)}</Text>
            <Text style={styles.timeText}>
              {formatTime(item.started_at)}
              {item.ended_at ? ` – ${formatTime(item.ended_at)}` : ''}
            </Text>
          </View>
          <View style={[styles.badge, isActive ? styles.badgeActive : styles.badgeEnded]}>
            {isActive && <View style={styles.liveDot} />}
            <Text style={[styles.badgeText, isActive ? styles.badgeTextActive : styles.badgeTextEnded]}>
              {isActive ? 'ACTIVE' : 'ENDED'}
            </Text>
          </View>
        </View>

        <View style={styles.cardBottom}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{formatDuration(item.started_at, item.ended_at)}</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{item.recording_count}</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
        </View>
        <Image source={require('assets/image/Locationicon.png')} style={styles.arrowIcon} />
      </TouchableOpacity>
    );
  };

  if (loading) return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centered}><ActivityIndicator size="large" color="#2d4b2a" /></View>
    </SafeAreaView>
  );

  return (
    <View style={styles.container}>
      {/* 1. Background Dashboard Layer */}
      <View style={[styles.dashboard, styles.dashboardPosition]} />

      {/* 2. Top Header Section */}
      <View style={[styles.topHeaeder, styles.topHeaederLayout]}>
        <Pressable style={styles.userProfile} onPress={() => navigation.goBack()}>
          <Image style={styles.icon} source={require('assets/image/Profile.png')} resizeMode="cover" />
        </Pressable>
        <Text style={[styles.headerTitle, styles.locationClr]}>Shifts</Text>
      </View>

      {/* 3. Main Dashcard */}
      <View style={styles.dashcard} />

      {/* 4. Scrollable Content */}
      <ScrollView
        style={[styles.homePageInner, styles.homePageInnerFlexBox]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#2d4b2a" />
        }
      >
        <View style={styles.contentWrapper}>
          <Text style={styles.headerSub}>{shifts.length} total shifts recorded</Text>

          {shifts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyTitle}>No Shifts Yet</Text>
              <Text style={styles.emptySub}>Shifts appear here after starting one.</Text>
            </View>
          ) : (
            shifts.map((item) => <View key={item.id}>{renderShift({ item })}</View>)
          )}

          <View style={{ height: 250 }} />
        </View>
      </ScrollView>

      {/* 5. Floating Buddy Button */}
      <Pressable style={styles.buddyButton} onPress={() => navigation.navigate('ChatBot' as never)}>
        <LinearGradient colors={['#a25a28', '#8b4a1f']} style={styles.buddyGradient}>
          <Image style={styles.buddyBotIcon} source={require('assets/image/buddySmall.png')} />
          <Text style={styles.buddyText}>Buddy</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f8f2" },
  dashboardPosition: { width: '100%', left: 0, position: "absolute" },
  dashboard: { backgroundColor: "#f5f8f2", height: 300, top: 0 },
  topHeaeder: {
    top: 60,
    paddingHorizontal: 25,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
  },
  topHeaederLayout: { height: 50 },
  headerTitle: { fontFamily: "Sansation", fontWeight: "700", color: "#1f291e", fontSize: 22 },
  userProfile: { width: 45, height: 45 },
  icon: { height: 45, width: 45, borderRadius: 22.5 },
  locationClr: { color: "#1f291e" },
  dashcard: {
    top: 130,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '100%',
    backgroundColor: "#fff",
    elevation: 10,
    width: SCREEN_WIDTH,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  homePageInner: { marginTop: 140, width: SCREEN_WIDTH },
  homePageInnerFlexBox: { flex: 1 },
  contentWrapper: { paddingHorizontal: 20, paddingTop: 10 },
  headerSub: { fontSize: 13, color: '#64748B', marginBottom: 20, fontFamily: 'Sansation' },
  card: {
    backgroundColor: '#f9fbf9',
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#edf2ed',
    elevation: 2,
  },
  cardActive: { borderColor: '#22C55E', backgroundColor: '#f0f9f0' },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
  dateBlock: { flex: 1 }, // Fixed: Defined dateBlock
  dateText: { fontSize: 16, fontWeight: '700', color: '#1f291e', marginBottom: 4, fontFamily: 'Sansation' },
  timeText: { fontSize: 13, color: '#64748B', fontFamily: 'Sansation' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, gap: 5 },
  badgeActive: { backgroundColor: 'rgba(34,197,94,0.1)' },
  badgeEnded: { backgroundColor: 'rgba(100,116,139,0.1)' },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#22C55E' },
  badgeText: { fontSize: 10, fontWeight: '800' },
  badgeTextActive: { color: '#22C55E' },
  badgeTextEnded: { color: '#64748B' },
  cardBottom: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#f0f0f0' },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '800', color: '#1f291e' },
  statLabel: { fontSize: 11, color: '#64748B', marginTop: 2, fontWeight: '600' },
  divider: { width: 1, height: 25, backgroundColor: '#eee' },
  arrowIcon: { position: 'absolute', right: 15, bottom: 20, width: 15, height: 15, transform: [{ rotate: '90deg' }], tintColor: '#ccc' },
  buddyButton: {
    position: 'absolute', bottom: 100, right: 20,
    height: 44, width: 105, borderRadius: 12, elevation: 8, overflow: 'hidden'
  },
  buddyGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  buddyText: { color: "#fff", fontWeight: "700", marginLeft: 6, fontSize: 14 },
  buddyBotIcon: { width: 18, height: 18 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  emptyIcon: { fontSize: 52, marginBottom: 14 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#1f291e' },
  emptySub: { fontSize: 14, color: '#64748B', textAlign: 'center', marginTop: 8 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});