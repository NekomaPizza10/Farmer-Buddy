import React, { useState, useRef } from "react";
import { StyleSheet, View, Image, Text, Pressable, Animated, Easing, Modal, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BodyCamera() {
    const navigation = useNavigation();
    const [isOn, setIsOn] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Animation values
    const colorAnim = useRef(new Animated.Value(0)).current;

    // Modal scale anim
    const modalScale = useRef(new Animated.Value(0.8)).current;
    const modalOpacity = useRef(new Animated.Value(0)).current;

    const openConfirmModal = () => {
        setShowConfirm(true);
        Animated.parallel([
            Animated.timing(modalScale, { toValue: 1, duration: 250, easing: Easing.out(Easing.back(1.5)), useNativeDriver: true }),
            Animated.timing(modalOpacity, { toValue: 1, duration: 250, useNativeDriver: true })
        ]).start();
    };

    const confirmToggle = () => {
        // close modal
        Animated.parallel([
            Animated.timing(modalScale, { toValue: 0.8, duration: 200, useNativeDriver: true }),
            Animated.timing(modalOpacity, { toValue: 0, duration: 200, useNativeDriver: true })
        ]).start(() => {
            setShowConfirm(false);

            // animate button color based on whether we are turning ON or OFF
            Animated.timing(colorAnim, {
                toValue: isOn ? 0 : 1, // toggle value
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
        outputRange: ["#2d4b2a", "#ef4444"] // changes to red when ACTIVE to indicate STOP SHIFT
    });

    const TeamMemberTag = ({ name, status, iconLetter }: { name: string, status: string, iconLetter: string }) => (
        <View style={styles.memberCard}>
            <View style={styles.memberAvatar}>
                <View style={styles.avatarBg} />
                <Text style={styles.avatarLetter}>{iconLetter}</Text>
            </View>

            <View style={styles.memberDetails}>
                <Text style={styles.memberName}>{name}</Text>
                <Text style={styles.memberRole}>Field Worker</Text>
            </View>

            <View style={styles.statusBadge}>
                <View style={[styles.statusDot, { backgroundColor: status === 'Online' ? '#22c55e' : '#ccc' }]} />
                <Text style={styles.statusBadgeText}>{status}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Top Header */}
            <View style={styles.topHeader}>
                <Pressable style={styles.userProfile} onPress={() => { navigation.navigate('Settings' as never) }}>
                    {/* Profile Icon is meant to be on the far left */}
                    <Image style={styles.icon} source={require("assets/image/Profile.png")} resizeMode="cover" />
                </Pressable>
                <View style={styles.headerTitles}>
                    <Text style={styles.bodycamManagement}>BodyCam Management</Text>
                    <View style={styles.managerAccess}>
                        <Text style={styles.managerAccess2}>Manager Access</Text>
                    </View>
                </View>
            </View>

            {/* Main Rounded Content Area */}
            <View style={styles.dashcard}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Shift Control Card */}
                    <View style={styles.shiftCard}>
                        <Text style={styles.cardHeader}>Global Shift Control</Text>

                        <View style={styles.statusRow}>
                            <Text style={styles.statusLabel}>Current Shifts Status: </Text>
                            <Text style={[styles.statusValue, { color: isOn ? '#ef4444' : '#1f291e' }]}>
                                {isOn ? 'Active' : 'Inactive'}
                            </Text>
                        </View>

                        <Text style={styles.statusSubtext}>Shift management for all active body cams.</Text>

                        {/* Animated Pressable Button */}
                        <Pressable style={styles.customStartButton} onPress={openConfirmModal}>
                            <Animated.View style={[styles.customStartButtonBg, { backgroundColor: buttonColor }]} />
                            <Text style={styles.customStartButtonText}>{isOn ? "End Shift (Cams OFF)" : "Start Shift (Power Cams ON)"}</Text>
                        </Pressable>
                    </View>

                    {/* Search & Team Filter Dash */}
                    <View style={styles.searchDash}>
                        <View style={styles.searchDashLeft}>
                            <Image style={styles.teamFilterIcon} resizeMode="cover" />
                            <Text style={styles.searchDashText}>Team Status</Text>
                        </View>
                        <View style={styles.searchDashRight}>
                            <Text style={styles.searchDashText}>Search</Text>
                            <View style={styles.searchIconPlaceholder} />
                        </View>
                    </View>

                    {/* Team Status List Header */}
                    <View style={styles.listHeaderRow}>
                        <Text style={styles.listHeaderTitle}>Team Status</Text>
                        <Text style={styles.listHeaderActive}> (Active - </Text>
                        <Text style={styles.listHeaderCount}>3)</Text>
                    </View>

                    {/* Team Members */}
                    <TeamMemberTag name="Ahmad" status="Online" iconLetter="A" />
                    <TeamMemberTag name="Ahmad" status="Online" iconLetter="A" />
                    <TeamMemberTag name="Ahmad" status="Online" iconLetter="A" />

                    {/* Bottom Padding */}
                    <View style={{ height: 100 }} />
                </ScrollView>
            </View>

            {/* Floating Buddy Button */}
            <Pressable style={[styles.buddy, styles.buddyLayout]} onPress={() => { }}>
                <View style={[styles.buddyChild, styles.buddyLayout]} />
                <Text style={[styles.buddy2, styles.buddy2Typo]}>Buddy</Text>
                <Image style={styles.buddyIcon} source={require("assets/image/buddySmall.png")} resizeMode="cover" />
            </Pressable>
            {/* Custom Animated Modal Dialog */}
            <Modal transparent visible={showConfirm} animationType="none">
                <View style={styles.modalOverlay}>
                    <Animated.View style={[styles.modalContent, { opacity: modalOpacity, transform: [{ scale: modalScale }] }]}>
                        <View style={[styles.modalIconWrapper, { backgroundColor: isOn ? '#fef2f2' : '#e8ece4' }]}>
                            <Text style={{ fontSize: 32 }}>{isOn ? '🛑' : '📹'}</Text>
                        </View>
                        <Text style={styles.modalTitle}>{isOn ? "End Shift" : "Confirm Shift"}</Text>
                        <Text style={styles.modalDescription}>
                            {isOn
                                ? "Are you sure you want to completely deactivate all body cams and end the active shift?"
                                : "Are you sure you want to activate all field body cameras? This will notify your team."}
                        </Text>

                        <View style={styles.modalButtonGroup}>
                            <Pressable style={styles.modalCancel} onPress={cancelToggle}>
                                <Text style={styles.modalCancelText}>Cancel</Text>
                            </Pressable>
                            <Pressable style={[styles.modalConfirm, { backgroundColor: isOn ? '#ef4444' : '#22c55e' }]} onPress={confirmToggle}>
                                <Text style={styles.modalConfirmText}>{isOn ? "Yes, End Shift" : "Yes, Start"}</Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f8f2',
    },
    topHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 66,
        paddingBottom: 10,
    },
    userProfile: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        overflow: 'hidden',
    },
    icon: {
        height: "100%",
        width: "100%",
        backgroundColor: '#d9d9d9', // Fallback color
    },
    headerTitles: {
        alignItems: 'flex-end',
    },
    bodycamManagement: {
        fontSize: 20,
        fontFamily: 'Sansation',
        fontWeight: 'bold',
        color: '#1f291e',
        marginBottom: 4,
    },
    managerAccess: {
        borderWidth: 1,
        borderColor: '#2d4b2a',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    managerAccess2: {
        fontSize: 11,
        fontFamily: 'Sansation',
        color: '#2d4b2a',
        textAlign: 'right',
    },
    dashcard: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,

    },
    scrollContent: {
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    shiftCard: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 6,
        marginBottom: 25,
        alignItems: 'center',
    },
    cardHeader: {
        fontSize: 22,
        color: '#1f291e',
        fontFamily: 'Sansation',
        fontWeight: 'bold',
        marginBottom: 12,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    statusLabel: {
        fontSize: 16,
        color: '#555',
        fontFamily: 'Sansation',
    },
    statusValue: {
        fontSize: 16,
        fontFamily: 'Sansation',
        fontWeight: 'bold',
    },
    statusSubtext: {
        fontSize: 14,
        color: '#777',
        fontFamily: 'Sansation',
        marginBottom: 24,
        textAlign: 'center',
    },
    customStartButton: {
        width: '100%',
        height: 54,
        borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    customStartButtonBg: {
        ...StyleSheet.absoluteFillObject,
    },
    customStartButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Sansation',
        fontWeight: 'bold',
        zIndex: 1,
    },
    searchDash: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#e8ece4',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 7,
        elevation: 4,
    },
    searchDashLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    teamFilterIcon: {
        width: 30,
        height: 30,
        backgroundColor: '#d9d9d9',
        borderRadius: 8,
        marginRight: 10,
    },
    searchDashText: {
        fontSize: 14,
        fontFamily: 'Sansation',
        color: '#1f291e',
        fontWeight: 'bold',
    },
    searchDashRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIconPlaceholder: {
        width: 24,
        height: 24,
        backgroundColor: '#ccc',
        borderRadius: 12,
        marginLeft: 8,
    },
    listHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    listHeaderTitle: {
        fontSize: 16,
        fontFamily: 'Sansation',
        fontWeight: 'bold',
        color: '#1f291e',
    },
    listHeaderActive: {
        fontSize: 16,
        fontFamily: 'Sansation',
        color: '#1f291e',
        marginLeft: 8,
    },
    listHeaderCount: {
        fontSize: 16,
        fontFamily: 'Sansation',
        fontWeight: 'bold',
        color: '#1f291e',
    },
    memberCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    memberAvatar: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    avatarBg: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#d9d9d9',
        borderRadius: 8,
    },
    avatarLetter: {
        fontSize: 24,
        fontFamily: 'Sansation',
        fontWeight: 'bold',
        color: '#1f291e',
        zIndex: 1,
    },
    memberDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    memberName: {
        fontSize: 18,
        fontFamily: 'Sansation',
        fontWeight: 'bold',
        color: '#1f291e',
        marginBottom: 2,
    },
    memberRole: {
        fontSize: 14,
        fontFamily: 'Sansation',
        color: '#666',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(34, 197, 94, 0.15)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusBadgeText: {
        fontSize: 12,
        fontFamily: 'Sansation',
        fontWeight: 'bold',
        color: '#2d4b2a',
    },
    buddy2Typo: {
        color: "#fff",
        fontSize: 15,
        fontFamily: "Sansation",
        position: "absolute"
    },
    buddyLayout: {
        height: 37,
        width: 104,
        position: "absolute"
    },
    buddy: {
        top: 820,
        left: 316
    },
    buddyChild: {
        backgroundColor: "#a25a28",
        borderRadius: 8,
        height: 37,
        width: 104,
        top: 0,
        left: 0
    },
    buddy2: {
        top: 7,
        left: 38,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 59,
        height: 21,
        fontWeight: "700"
    },
    buddyIcon: {
        top: 5,
        width: 25,
        height: 25,
        left: 13,
        position: "absolute"
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 10,
    },
    modalIconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#e8ece4',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 22,
        fontFamily: 'Sansation',
        fontWeight: 'bold',
        color: '#1f291e',
        marginBottom: 8,
    },
    modalDescription: {
        fontSize: 15,
        fontFamily: 'Sansation',
        color: '#555',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
    },
    modalButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 12,
    },
    modalCancel: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#f1f1f1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCancelText: {
        color: '#555',
        fontFamily: 'Sansation',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalConfirm: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#22c55e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalConfirmText: {
        color: '#fff',
        fontFamily: 'Sansation',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
