import * as React from "react";
import { StyleSheet, View, Text, Image, Pressable, ScrollView, SafeAreaView, Platform, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface MemberShiftModalProps {
    visible: boolean;
    onClose: () => void;
    memberName: string | null;
}

const MemberShiftModal: React.FC<MemberShiftModalProps> = ({ visible, onClose, memberName }) => {
    const [selectedSegment, setSelectedSegment] = React.useState<any>(null);
    const [isSummaryExpanded, setIsSummaryExpanded] = React.useState(false);

    let shiftName = "Morning Shift: 08:00 - 12:00";
    if (memberName === "Sarah") {
        shiftName = "Afternoon Shift: 12:00 - 16:00";
    } else if (memberName === "John") {
        shiftName = "Night Shift: 16:00 - 20:00";
    }

    if (!visible) return null;

    // View for a specific selected video segment
    if (selectedSegment) {
        return (
            <View style={styles.container}>
                {/* Background Layer */}
                <View style={[styles.dashboard, styles.dashboardPosition]} />

                {/* Header aligned with HomePage */}
                <View style={styles.topHeaeder}>
                    <Pressable style={styles.backButton} onPress={() => { setSelectedSegment(null); setIsSummaryExpanded(false); }}>
                        <Text style={styles.backText}>← Back</Text>
                    </Pressable>
                    <View style={styles.titleContainer}>
                        <Text style={styles.headerTitle}>Management</Text>
                        <View style={styles.managerBadge}><Text style={styles.managerBadgeText}>Manager Access</Text></View>
                    </View>
                </View>

                {/* Main Dashcard */}
                <View style={styles.dashcard} />

                <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.scrollPadding}>
                        <View style={styles.videoDetailCard}>
                            <Text style={styles.videoDetailText}>
                                Shift Detail{"\n"}
                                <Text style={styles.detailLabel}>Name: </Text>{memberName}{"\n"}
                                <Text style={styles.detailLabel}>Zone: </Text>B{"\n"}
                                <Text style={styles.detailLabel}>Time: </Text>{selectedSegment.time}
                            </Text>
                        </View>

                        <View style={styles.videoPlayerPlaceholder}>
                            <View style={styles.playIconCircle}>
                                <Text style={styles.vidPlaceholderText}>Vid</Text>
                            </View>
                        </View>

                        <View style={styles.actionButtonsRow}>
                            <Pressable style={styles.generateReportBtn}>
                                <Text style={styles.generateReportText}>Generate Report</Text>
                            </Pressable>
                            <Pressable style={styles.viewSummaryBtn}>
                                <Text style={styles.viewSummaryText}>View AI Summary</Text>
                            </Pressable>
                        </View>

                        <View style={styles.aiSummaryContainer}>
                            {isSummaryExpanded && (
                                <View style={styles.aiSummaryBox}>
                                    <View style={styles.summaryPlaceholderIcon} />
                                    <Text style={styles.summaryPlaceholderText}>Gemini AI analysis will appear here...</Text>
                                </View>
                            )}
                            <Pressable
                                style={styles.expandCollapseBtn}
                                onPress={() => setIsSummaryExpanded(!isSummaryExpanded)}
                            >
                                <Text style={styles.collapseText}>
                                    {isSummaryExpanded ? "Collapse Summary ▲" : "Expand Summary ▼"}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ height: 200 }} />
                </ScrollView>

                {/* Buddy Button - Constant Position */}
                <Pressable style={styles.buddyButton} onPress={() => { }}>
                    <LinearGradient colors={['#a25a28', '#8b4a1f']} style={styles.buddyGradient}>
                        <Image style={styles.buddyBotIcon} source={require('assets/image/buddySmall.png')} />
                        <Text style={styles.buddyText}>Buddy</Text>
                    </LinearGradient>
                </Pressable>
            </View>
        );
    }

    // List view of all segments in the shift
    const shiftData = [
        { time: "08:00 AM - 08:02 AM", status: "1m 58s recorded", hasRecording: true },
        { time: "08:03 AM - 08:05 AM", status: "1m 58s recorded", hasRecording: true },
        { time: "08:06 AM - 08:08 AM", status: "1m 58s recorded", hasRecording: true },
        { time: "08:09 AM - 08:11 AM", status: "No recording", hasRecording: false },
        { time: "08:12 AM - 08:14 AM", status: "1m 58s recorded", hasRecording: true },
        { time: "08:15 AM - 08:17 AM", status: "1m 58s recorded", hasRecording: true },
    ];

    const dates = [
        { day: 'Mon', num: '23', active: false },
        { day: 'Tue', num: '24', active: false },
        { day: 'Wed', num: '25', active: true },
        { day: 'Thu', num: '26', active: false },
        { day: 'Fri', num: '27', active: false },
        { day: 'Sat', num: '28', active: false },
        { day: 'Sun', num: '29', active: false },
    ];

    return (
        <View style={styles.container}>
            <View style={[styles.dashboard, styles.dashboardPosition]} />

            <View style={styles.topHeaeder}>
                <Pressable style={styles.backButton} onPress={onClose}>
                    <Text style={styles.backText}>← Back</Text>
                </Pressable>
                <View style={styles.titleContainer}>
                    <Text style={styles.headerTitle}>{memberName}'s Shift</Text>
                    <View style={styles.managerBadge}><Text style={styles.managerBadgeText}>Manager Access</Text></View>
                </View>
            </View>

            <View style={styles.dashcard} />

            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.scrollPadding}>
                    {/* Dates Card */}
                    <View style={styles.card}>
                        <View style={styles.datesRow}>
                            {dates.map((d, index) => (
                                <View key={index} style={[styles.dateItem, d.active && styles.dateItemActive]}>
                                    <Text style={[styles.dayText, d.active && styles.activeText]}>{d.day}</Text>
                                    <Text style={[styles.numText, d.active && styles.activeText]}>{d.num}</Text>
                                </View>
                            ))}
                        </View>
                        <Text style={styles.shiftTitle}>{shiftName}</Text>
                    </View>

                    {/* Timeline Card */}
                    <View style={styles.timelineCard}>
                        <Text style={styles.timelineHeader}>2-Minute Timeline</Text>
                        <View style={styles.timelineList}>
                            {shiftData.map((item, index) => (
                                <View key={index} style={styles.timelineRow}>
                                    <View style={styles.timelineLine}>
                                        <View style={styles.timelineDot} />
                                        {index !== shiftData.length - 1 && <View style={styles.timelineLineSegment} />}
                                    </View>
                                    <Pressable style={styles.timelineContentContainer} onPress={() => setSelectedSegment(item)}>
                                        <Text style={styles.timeText}>{item.time}</Text>
                                        <View style={styles.badgesWrapper}>
                                            <View style={[styles.badge, styles.vidBadge]}>
                                                <Text style={styles.vidBadgeText}>Vid</Text>
                                            </View>
                                            <View style={[styles.badge, item.hasRecording ? styles.recordedBadge : styles.noRecordBadge]}>
                                                <Text style={styles.statusText}>{item.status}</Text>
                                            </View>
                                        </View>
                                    </Pressable>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={{ height: 200 }} />
            </ScrollView>

            <Pressable style={styles.buddyButton} onPress={() => { }}>
                <LinearGradient colors={['#a25a28', '#8b4a1f']} style={styles.buddyGradient}>
                    <Image style={styles.buddyBotIcon} source={require('assets/image/buddySmall.png')} />
                    <Text style={styles.buddyText}>Buddy</Text>
                </LinearGradient>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f8f2" },
    dashboardPosition: { width: '100%', left: 0, position: "absolute" },
    dashboard: { backgroundColor: "#f5f8f2", height: 300, top: 0 },

    // Header Logic Matching Home Page
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
    backButton: { paddingVertical: 5 },
    backText: { fontSize: 16, color: '#1f291e', fontWeight: 'bold', fontFamily: 'Sansation' },
    titleContainer: { alignItems: 'flex-end' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1f291e', fontFamily: 'Sansation' },
    managerBadge: { backgroundColor: 'rgba(45, 75, 42, 0.1)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginTop: 2 },
    managerBadgeText: { fontSize: 10, color: '#2d4b2a', fontFamily: 'Sansation', fontWeight: 'bold' },

    // Dashcard Logic Matching Home Page
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
    contentContainer: { flex: 1, marginTop: 140 },
    scrollPadding: { paddingHorizontal: 20, paddingTop: 10 },

    // Video Detail Section
    videoDetailCard: {
        backgroundColor: "#e8ece4",
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
    },
    videoDetailText: { fontSize: 18, color: "#1f291e", fontFamily: "Sansation", fontWeight: "bold", lineHeight: 26 },
    detailLabel: { color: '#555', fontWeight: 'normal' },
    videoPlayerPlaceholder: {
        backgroundColor: "#d4f0ff",
        height: 230,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#b9e4f9'
    },
    playIconCircle: { justifyContent: 'center', alignItems: 'center' }, // Fixed: Added playIconCircle
    vidPlaceholderText: { fontSize: 20, color: "#0052CC", fontFamily: "Sansation", fontWeight: '700' },
    actionButtonsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
    generateReportBtn: { backgroundColor: "#dcfce7", borderColor: "#2d4b2a", borderWidth: 1.5, borderRadius: 15, flex: 1, marginRight: 8, height: 50, justifyContent: 'center', alignItems: 'center' },
    generateReportText: { color: "#1f291e", fontFamily: "Sansation", fontSize: 14, fontWeight: "bold" },
    viewSummaryBtn: { backgroundColor: "#2d4b2a", borderRadius: 15, flex: 1, marginLeft: 8, height: 50, justifyContent: 'center', alignItems: 'center' },
    viewSummaryText: { color: "#fff", fontFamily: "Sansation", fontSize: 14, fontWeight: "bold" },

    // Timeline & Cards
    card: { backgroundColor: '#f9fbf9', borderRadius: 20, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: '#edf2ed' },
    datesRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    dateItem: { alignItems: 'center', paddingVertical: 8, flex: 1, borderRadius: 12 },
    dateItemActive: { backgroundColor: '#2d4b2a' },
    dayText: { fontSize: 12, color: '#2d4b2a', fontFamily: 'Sansation', marginBottom: 4 },
    numText: { fontSize: 15, fontWeight: 'bold', color: '#2d4b2a' },
    activeText: { color: '#fff' },
    shiftTitle: { fontSize: 16, fontWeight: 'bold', color: '#2d4b2a', textAlign: 'center' },
    timelineCard: { backgroundColor: '#f9fbf9', borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#edf2ed' },
    timelineHeader: { fontSize: 18, fontWeight: '700', color: '#1f291e', marginBottom: 20 },
    timelineList: { width: '100%', marginTop: 5 }, // Fixed: Added timelineList
    timelineRow: { flexDirection: 'row' },
    timelineLine: { width: 24, alignItems: 'center', marginRight: 12 },
    timelineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#2d4b2a', marginTop: 6 },
    timelineLineSegment: { width: 2, flex: 1, backgroundColor: '#d1d5db', marginTop: 4, marginBottom: -6 },
    timelineContentContainer: { flex: 1, paddingBottom: 25 },
    timeText: { fontSize: 15, fontWeight: 'bold', color: '#1f291e', marginBottom: 6 },
    badgesWrapper: { flexDirection: 'row', gap: 10 },
    badge: { paddingVertical: 4, paddingHorizontal: 12, borderRadius: 8 },
    vidBadge: { backgroundColor: '#d4f0ff' },
    vidBadgeText: { fontSize: 12, fontWeight: 'bold', color: '#0052CC' },
    recordedBadge: { backgroundColor: '#e2e8f0' },
    noRecordBadge: { backgroundColor: '#fee2e2' },
    statusText: { fontSize: 11, fontWeight: '700', color: '#444' },

    // AI Summary
    aiSummaryContainer: { width: '100%', alignItems: 'center' }, // Fixed: Added aiSummaryContainer
    aiSummaryBox: { backgroundColor: "#f3f4f6", borderRadius: 16, padding: 20, marginBottom: 15, alignItems: 'center', width: '100%' },
    summaryPlaceholderIcon: { width: 40, height: 40, backgroundColor: '#d1d5db', borderRadius: 20, marginBottom: 10 },
    summaryPlaceholderText: { color: '#666', fontSize: 12 },
    expandCollapseBtn: { backgroundColor: "rgba(45, 75, 42, 0.05)", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, alignSelf: 'center', borderWidth: 1, borderColor: '#2d4b2a' },
    collapseText: { fontSize: 13, color: "#2d4b2a", fontWeight: "bold" },

    // Buddy Button Sync
    buddyButton: {
        position: 'absolute', bottom: 100, right: 20,
        height: 44, width: 105, borderRadius: 12, elevation: 8, overflow: 'hidden'
    },
    buddyGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    buddyText: { color: "#fff", fontWeight: "700", marginLeft: 6, fontSize: 14 },
    buddyBotIcon: { width: 18, height: 18 },
});

export default MemberShiftModal;