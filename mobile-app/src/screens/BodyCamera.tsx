import React, { useState, useRef, useMemo } from "react";
import { StyleSheet, View, Image, Text, Pressable, Animated, Easing, Modal, ScrollView, Dimensions, TextInput, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import MemberShiftModal from "../components/MemberShiftModal"; // Fixed: Import the correct Modal component

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Mock Data for Team Members
const TEAM_MEMBERS = [
    { id: 'FB-001', name: "Ahmad", status: "Online", iconLetter: "A" },
    { id: 'FB-002', name: "Sarah", status: "Online", iconLetter: "S" },
    { id: 'FB-003', name: "John", status: "Offline", iconLetter: "J" },
    { id: 'FB-004', name: "Zul", status: "Online", iconLetter: "Z" },
    { id: 'FB-005', name: "Emily", status: "Offline", iconLetter: "E" },
];

export default function BodyCamera() {
    const navigation = useNavigation();
    const [isOn, setIsOn] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedMember, setSelectedMember] = useState<string | null>(null);

    // Search & Filter State
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"All" | "Online" | "Offline">("All");

    // Animation values
    const colorAnim = useRef(new Animated.Value(0)).current;
    const modalScale = useRef(new Animated.Value(0.8)).current;
    const modalOpacity = useRef(new Animated.Value(0)).current;

    // --- Logic: Search & Filter ---
    const filteredTeam = useMemo(() => {
        return TEAM_MEMBERS.filter(member => {
            const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = statusFilter === "All" || member.status === statusFilter;
            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, statusFilter]);

    const handleFilterPress = () => {
        if (statusFilter === "All") setStatusFilter("Online");
        else if (statusFilter === "Online") setStatusFilter("Offline");
        else setStatusFilter("All");
    };

    const openConfirmModal = () => {
        setShowConfirm(true);
        Animated.parallel([
            Animated.timing(modalScale, { toValue: 1, duration: 250, easing: Easing.out(Easing.back(1.5)), useNativeDriver: true }),
            Animated.timing(modalOpacity, { toValue: 1, duration: 250, useNativeDriver: true })
        ]).start();
    };

    const confirmToggle = () => {
        Animated.parallel([
            Animated.timing(modalScale, { toValue: 0.8, duration: 200, useNativeDriver: true }),
            Animated.timing(modalOpacity, { toValue: 0, duration: 200, useNativeDriver: true })
        ]).start(() => {
            setShowConfirm(false);
            Animated.timing(colorAnim, {
                toValue: isOn ? 0 : 1,
                duration: 400,
                useNativeDriver: false
            }).start(() => setIsOn(!isOn));
        });
    };

    const cancelToggle = () => {
        Animated.parallel([
            Animated.timing(modalScale, { toValue: 0.8, duration: 200, useNativeDriver: true }),
            Animated.timing(modalOpacity, { toValue: 0, duration: 200, useNativeDriver: true })
        ]).start(() => setShowConfirm(false));
    };

    const buttonColor = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["#2d4b2a", "#ef4444"]
    });

    if (selectedMember) {
        // Fixed: Use MemberShiftModal which accepts these props
        return <MemberShiftModal visible={true} onClose={() => setSelectedMember(null)} memberName={selectedMember} />;
    }

    return (
        <View style={styles.homePage}>
            {/* 1. Background Layer */}
            <View style={[styles.dashboard, styles.dashboardPosition]} />

            {/* 2. Top Header Section */}
            <View style={[styles.topHeaeder, styles.topHeaederLayout]}>
                <Pressable style={styles.userProfile} onPress={() => navigation.navigate('Settings' as never)}>
                    <Image style={styles.icon} source={require('assets/image/Profile.png')} resizeMode="cover" />
                </Pressable>
                <View style={styles.headerTitleContainer}>
                    <Text style={[styles.goodMorning, styles.locationClr]}>BodyCam</Text>
                    <View style={styles.managerBadge}><Text style={styles.managerBadgeText}>Manager</Text></View>
                </View>
            </View>

            {/* 3. Main Dashcard */}
            <View style={styles.dashcard} />

            {/* 4. Scrollable Content */}
            <ScrollView style={[styles.homePageInner, styles.homePageInnerFlexBox]} showsVerticalScrollIndicator={false}>
                <View style={styles.contentWrapper}>

                    {/* Shift Control Card */}
                    <View style={styles.shiftCard}>
                        <Text style={styles.sectionTitle}>Global Shift Control</Text>
                        <View style={styles.statusBox}>
                            <Text style={styles.statusLabel}>Current Status: </Text>
                            <Text style={[styles.statusValue, { color: isOn ? '#ef4444' : '#2d4b2a' }]}>
                                {isOn ? 'ACTIVE' : 'INACTIVE'}
                            </Text>
                        </View>
                        <Text style={styles.statusSubtext}>Control all body cameras for the field team.</Text>

                        <Pressable style={styles.mainActionBtn} onPress={openConfirmModal}>
                            <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: buttonColor }]} />
                            <Text style={styles.mainActionBtnText}>
                                {isOn ? "STOP ALL CAMERAS" : "START TEAM SHIFT"}
                            </Text>
                        </Pressable>
                    </View>

                    {/* Search & Filter Header */}
                    <View style={styles.searchContainer}>
                        <View style={styles.searchBar}>
                            <Image style={styles.searchIcon} source={require('assets/image/Locationicon.png')} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search Name or ID (e.g. FB-001)"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                placeholderTextColor="#999"
                            />
                        </View>
                        <Pressable style={styles.filterBtn} onPress={handleFilterPress}>
                            <Text style={styles.filterBtnText}>{statusFilter}</Text>
                        </Pressable>
                    </View>

                    {/* Team List Header */}
                    <View style={styles.listHeader}>
                        <Text style={styles.listTitle}>Team Members ({filteredTeam.length})</Text>
                    </View>

                    {/* Team List Body */}
                    {filteredTeam.map((member) => (
                        <Pressable key={member.id} style={styles.memberCard} onPress={() => setSelectedMember(member.name)}>
                            <View style={styles.memberAvatar}>
                                <Text style={styles.avatarLetter}>{member.iconLetter}</Text>
                            </View>
                            <View style={styles.memberInfo}>
                                <Text style={styles.memberName}>{member.name}</Text>
                                <Text style={styles.memberId}>{member.id} • Field Worker</Text>
                            </View>
                            <View style={[styles.statusIndicator, { backgroundColor: member.status === 'Online' ? '#22c55e' : '#ccc' }]} />
                            <Text style={[styles.statusText, { color: member.status === 'Online' ? '#22c55e' : '#999' }]}>
                                {member.status}
                            </Text>
                        </Pressable>
                    ))}

                    {filteredTeam.length === 0 && (
                        <Text style={styles.noResultText}>No members found matching your criteria.</Text>
                    )}

                    <View style={{ height: 250 }} />
                </View>
            </ScrollView>

            {/* 5. Floating Buddy Button */}
            <Pressable style={styles.buddyButton} onPress={() => { }}>
                <LinearGradient colors={['#a25a28', '#8b4a1f']} style={styles.buddyGradient}>
                    <Image style={styles.buddyBotIcon} source={require('assets/image/buddySmall.png')} />
                    <Text style={styles.buddyText}>Buddy</Text>
                </LinearGradient>
            </Pressable>

            {/* Confirmation Modal */}
            <Modal transparent visible={showConfirm} animationType="none">
                <View style={styles.modalOverlay}>
                    <Animated.View style={[styles.modalContent, { opacity: modalOpacity, transform: [{ scale: modalScale }] }]}>
                        <View style={styles.modalIconBg}>
                            <Text style={{ fontSize: 30 }}>{isOn ? '🛑' : '📹'}</Text>
                        </View>
                        <Text style={styles.modalTitle}>{isOn ? "End Team Shift" : "Start Team Shift"}</Text>
                        <Text style={styles.modalDesc}>
                            {isOn ? "Are you sure you want to deactivate all cameras?" : "This will power on all assigned body cams and notify the workers."}
                        </Text>
                        <View style={styles.modalButtons}>
                            <Pressable style={styles.modalBtnSecondary} onPress={cancelToggle}><Text style={styles.modalBtnTextSecondary}>Cancel</Text></Pressable>
                            <Pressable style={[styles.modalBtnPrimary, { backgroundColor: isOn ? '#ef4444' : '#22c55e' }]} onPress={confirmToggle}>
                                <Text style={styles.modalBtnTextPrimary}>Confirm</Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    homePage: { flex: 1, backgroundColor: "#f5f8f2" },
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
    headerTitleContainer: { alignItems: 'flex-end' },
    goodMorning: { fontFamily: "Sansation", fontWeight: "700", color: "#1f291e", fontSize: 22 },
    managerBadge: { backgroundColor: 'rgba(45, 75, 42, 0.1)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginTop: 2 },
    managerBadgeText: { fontSize: 10, fontWeight: '700', color: '#2d4b2a' },
    userProfile: { width: 45, height: 45 },
    icon: { height: 45, width: 45, borderRadius: 22.5, backgroundColor: '#e0e0e0' },
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
    },
    homePageInner: { marginTop: 140, width: SCREEN_WIDTH },
    homePageInnerFlexBox: { flex: 1 },
    contentWrapper: { paddingHorizontal: 20 },
    shiftCard: { backgroundColor: '#e8ece4', borderRadius: 24, padding: 20, marginBottom: 20, alignItems: 'center' },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1f291e', marginBottom: 10 },
    statusBox: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
    statusLabel: { fontSize: 15, color: '#666' },
    statusValue: { fontSize: 16, fontWeight: '800' },
    statusSubtext: { fontSize: 13, color: '#777', marginBottom: 20, textAlign: 'center' },
    mainActionBtn: { width: '100%', height: 55, borderRadius: 15, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', elevation: 3 },
    mainActionBtnText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 1 },
    searchContainer: { flexDirection: 'row', marginBottom: 20, gap: 10 },
    searchBar: { flex: 1, height: 45, backgroundColor: '#f3f4f6', borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 },
    searchIcon: { width: 16, height: 16, tintColor: '#999', marginRight: 10 },
    searchInput: { flex: 1, fontSize: 14, color: '#1f291e' },
    filterBtn: { backgroundColor: '#2d4b2a', paddingHorizontal: 15, borderRadius: 12, justifyContent: 'center' },
    filterBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
    listHeader: { marginBottom: 15 },
    listTitle: { fontSize: 16, fontWeight: '700', color: '#1f291e' },
    memberCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 18, marginBottom: 12, borderWidth: 1, borderColor: '#f0f0f0', elevation: 2 },
    memberAvatar: { width: 45, height: 45, borderRadius: 12, backgroundColor: '#e8ece4', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    avatarLetter: { fontSize: 20, fontWeight: '800', color: '#2d4b2a' },
    memberInfo: { flex: 1 },
    memberName: { fontSize: 16, fontWeight: '700', color: '#1f291e' },
    memberId: { fontSize: 12, color: '#888', marginTop: 2 },
    statusIndicator: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
    statusText: { fontSize: 12, fontWeight: '700' },
    noResultText: { textAlign: 'center', color: '#999', marginTop: 20 },
    buddyButton: { position: 'absolute', bottom: 100, right: 20, height: 44, width: 105, borderRadius: 12, elevation: 8, overflow: 'hidden' },
    buddyGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    buddyText: { color: "#fff", fontWeight: "700", marginLeft: 6, fontSize: 14 },
    buddyBotIcon: { width: 18, height: 18 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { width: '85%', backgroundColor: '#fff', borderRadius: 25, padding: 25, alignItems: 'center' },
    modalIconBg: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
    modalTitle: { fontSize: 20, fontWeight: '800', color: '#1f291e', marginBottom: 8 },
    modalDesc: { textAlign: 'center', color: '#666', lineHeight: 20, marginBottom: 25 },
    modalButtons: { flexDirection: 'row', gap: 12 },
    modalBtnPrimary: { flex: 1, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    modalBtnSecondary: { flex: 1, height: 45, borderRadius: 12, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center' },
    modalBtnTextPrimary: { color: '#fff', fontWeight: '700' },
    modalBtnTextSecondary: { color: '#666', fontWeight: '700' }
});