import * as React from "react";
import {
    StyleSheet, View, ScrollView, Text, Image,
    Pressable, Dimensions, TextInput, KeyboardAvoidingView, Platform, Modal, FlatList, TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// --- Dropdown Choices ---
const FARM_TYPES = [
    "Open-Field Row Crops (Grains, Oilseeds)",
    "Permanent Crops (Orchards, Vineyards, Berries)",
    "Greenhouse / High-Tunnel Production",
    "Indoor Vertical / Hydroponic Farming",
    "Specialty Horticulture (Vegetables, Flowers, Nursery)",
    "Agroforestry (Mixed Trees & Crops)"
];

const GROWTH_STAGES = [
    "Sowing / Planting",
    "Seedling / Early Growth",
    "Vegetative (Leaf & Stem growth)",
    "Flowering / Reproductive",
    "Fruit / Grain Filling",
    "Maturing / Ready for Harvest"
];

const SOIL_TYPES = [
    "Sandy Soil",
    "Loamy Soil",
    "Clayey Soil",
    "Silty Soil",
    "Peaty Soil",
    "Chalky Soil"
];

const FarmerSensorScreen = () => {
    const navigation = useNavigation();

    // --- State ---
    const [cropType, setCropType] = React.useState("Corn (Maize)");
    const [observation, setObservation] = React.useState("");
    const [isBuddyOpen, setIsBuddyOpen] = React.useState(false);
    const [farmType, setFarmType] = React.useState(FARM_TYPES[0]);
    const [growthStage, setGrowthStage] = React.useState(GROWTH_STAGES[3]);
    const [soilType, setSoilType] = React.useState(SOIL_TYPES[1]);
    const [activeModal, setActiveModal] = React.useState<"farm" | "growth" | "soil" | null>(null);

    // Reuseable Components
    const SelectionModal = ({ visible, title, items, onSelect, onClose }: any) => (
        <Modal transparent visible={visible} animationType="fade">
            <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.modalItem}
                                onPress={() => { onSelect(item); onClose(); }}
                            >
                                <Text style={styles.modalItemText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={() => <View style={styles.modalSeparator} />}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    );

    const NPKDetail = ({ label, value, status, color, description }: any) => (
        <View style={styles.npkDetailCard}>
            <View style={styles.npkHeaderRow}>
                <Text style={styles.npkLabelText}>{label}</Text>
                <View style={[{ backgroundColor: color + '20', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 12 }] as any}>
                    <Text style={[styles.statusPillText, { color: color }]}>{status}</Text>
                </View>
            </View>
            <View style={styles.npkBarContainer}>
                <View style={[styles.npkBarFill, { width: value, backgroundColor: color }]} />
            </View>
            <Text style={styles.npkDescText}>{description}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.homePage}
        >
            {/* 1. Background Layer */}
            <View style={[styles.dashboard, styles.dashboardPosition]} />

            {/* 2. Top Header Section */}
            <View style={[styles.topHeaeder, styles.topHeaederLayout]}>
                <Pressable
                    style={styles.userProfile}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        style={styles.icon}
                        source={require('assets/image/Profile.png')}
                        resizeMode="cover"
                    />
                </Pressable>
                <Text style={[styles.headerTitle, styles.locationClr]}>Soil Analysis</Text>
            </View>

            {/* 3. Main Dashcard */}
            <View style={styles.dashcard} />

            {/* 4. Scrollable Content */}
            <ScrollView
                style={[styles.homePageInner, styles.homePageInnerFlexBox]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.contentWrapper}>
                    <View style={styles.overviewCard}>
                        <Text style={styles.cardTitle}>Moisture Content</Text>
                        <View style={styles.moistureRow}>
                            <View style={styles.moistureCircle}>
                                <Text style={styles.moistureMainValue}>65%</Text>
                                <Text style={styles.moistureSubText}>Volumetric</Text>
                            </View>
                            <View style={styles.moistureStats}>
                                <Text style={styles.statHint}>Status: <Text style={styles.boldGreen}>Optimal</Text></Text>
                                <Text style={styles.statHint}>Ideal Range: 60% - 75%</Text>
                                <Text style={styles.statHint}>Trend: <Text style={styles.boldBlue}>Stable ↑</Text></Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.detailCard}>
                        <Text style={styles.cardTitle}>Soil Acidity (pH)</Text>
                        <View style={styles.phValueContainer}>
                            <Text style={styles.phBigNumber}>6.5</Text>
                            <View style={styles.phStatusBadge}>
                                <Text style={styles.phStatusText}>Slightly Acidic (Perfect)</Text>
                            </View>
                        </View>
                        <LinearGradient
                            colors={['#ee1c25', '#fff200', '#00a651', '#2e3192']}
                            start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                            style={styles.phGradient}
                        />
                        <View style={styles.phMarkers}>
                            <Text style={styles.markerText}>4.0</Text>
                            <Text style={[styles.markerText, styles.activeMarker]}>6.5</Text>
                            <Text style={styles.markerText}>9.0</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionHeading}>Nutrient Composition</Text>
                    <NPKDetail label="Nitrogen (N)" value="85%" status="EXCELLENT" color="#2d4b2a" description="High levels promote leaf growth." />
                    <NPKDetail label="Phosphorus (P)" value="45%" status="WARNING" color="#a25a28" description="Low levels hinder root growth." />

                    <Text style={styles.sectionHeading}>AI Context Configuration</Text>
                    <View style={styles.whiteCard}>
                        <Text style={styles.inputLabel}>Current Crop Type</Text>
                        <TextInput
                            style={styles.inputBox}
                            value={cropType}
                            onChangeText={setCropType}
                            placeholder="e.g. Corn, Potatoes"
                        />

                        <Text style={styles.inputLabel}>Farm Type</Text>
                        <Pressable style={[styles.selectBox, { marginBottom: 15 }]} onPress={() => setActiveModal("farm")}>
                            <Text style={styles.selectText} numberOfLines={1}>{farmType}</Text>
                            <Image source={require("assets/image/dropdown.png")} style={styles.chevron} />
                        </Pressable>

                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <Text style={styles.inputLabel}>Growth Stage</Text>
                                <Pressable style={styles.selectBox} onPress={() => setActiveModal("growth")}>
                                    <Text style={styles.selectText} numberOfLines={1}>{growthStage}</Text>
                                    <Image source={require("assets/image/dropdown.png")} style={styles.chevron} />
                                </Pressable>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.inputLabel}>Soil Type</Text>
                                <Pressable style={styles.selectBox} onPress={() => setActiveModal("soil")}>
                                    <Text style={styles.selectText} numberOfLines={1}>{soilType}</Text>
                                    <Image source={require("assets/image/dropdown.png")} style={styles.chevron} />
                                </Pressable>
                            </View>
                        </View>

                        <Text style={[styles.inputLabel, { marginTop: 10 }]}>Visual Observation</Text>
                        <TextInput
                            style={[styles.inputBox, { height: 80, textAlignVertical: 'top' }]}
                            multiline
                            placeholder="e.g. Yellow leaves on the bottom..."
                            value={observation}
                            onChangeText={setObservation}
                        />
                    </View>

                    <Pressable
                        style={styles.analyzeButton}
                        onPress={() => navigation.navigate('Report' as never)}
                    >
                        <Text style={styles.analyzeButtonText}>Generate Gemini Insight Report</Text>
                    </Pressable>

                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>

            <SelectionModal visible={activeModal === "farm"} title="Select Farm Type" items={FARM_TYPES} onSelect={setFarmType} onClose={() => setActiveModal(null)} />
            <SelectionModal visible={activeModal === "growth"} title="Select Growth Stage" items={GROWTH_STAGES} onSelect={setGrowthStage} onClose={() => setActiveModal(null)} />
            <SelectionModal visible={activeModal === "soil"} title="Select Soil Type" items={SOIL_TYPES} onSelect={setSoilType} onClose={() => setActiveModal(null)} />

            {/* Buddy Popup Logic (Updated Button Style to match Home Page Exactly) */}
            {isBuddyOpen ? (
                <View style={styles.buddyPopup}>
                    <View style={styles.chatHeader}>
                        <View style={styles.buddyInfo}>
                            <Image source={require("assets/image/buddySmall.png")} style={styles.chatIcon} />
                            <Text style={styles.buddyName}>Buddy Assistant</Text>
                        </View>
                        <Pressable onPress={() => setIsBuddyOpen(false)}><Text style={styles.closeBtn}>✕</Text></Pressable>
                    </View>
                    <ScrollView style={styles.chatBody}>
                        <View style={styles.buddyMsg}>
                            <Text style={styles.msgText}>I see you're growing {cropType}. Your Nitrogen is looking great!</Text>
                        </View>
                    </ScrollView>
                    <View style={styles.chatInputRow}>
                        <TextInput style={styles.chatInput} placeholder="Ask about your soil..." />
                        <Pressable style={styles.sendBtn}><Text style={styles.sendText}>Send</Text></Pressable>
                    </View>
                </View>
            ) : (
                <Pressable style={styles.buddyButton} onPress={() => setIsBuddyOpen(true)}>
                    <LinearGradient colors={['#a25a28', '#8b4a1f']} style={styles.buddyGradient}>
                        <Image style={styles.buddyBotIcon} source={require('assets/image/buddySmall.png')} />
                        <Text style={styles.buddyText}>Buddy</Text>
                    </LinearGradient>
                </Pressable>
            )}
        </KeyboardAvoidingView>
    );
};

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
    contentWrapper: { paddingHorizontal: 20 },
    overviewCard: { backgroundColor: '#f9fbf7', borderRadius: 24, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#e8ece4' },
    detailCard: { backgroundColor: '#fff', borderRadius: 24, padding: 20, marginBottom: 20, elevation: 2, borderWidth: 1, borderColor: '#f0f0f0' },
    cardTitle: { fontSize: 16, fontFamily: "Sansation", fontWeight: "700", color: "#6b7280", marginBottom: 15 },
    moistureRow: { flexDirection: 'row', alignItems: 'center' },
    moistureCircle: { width: 90, height: 90, borderRadius: 45, borderWidth: 6, borderColor: '#2d4b2a', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    moistureMainValue: { fontSize: 22, fontWeight: 'bold' },
    moistureSubText: { fontSize: 10, color: '#666' },
    moistureStats: { marginLeft: 20, gap: 5 },
    statHint: { fontSize: 13, color: '#4b5563' },
    boldGreen: { color: '#2d4b2a', fontWeight: 'bold' },
    boldBlue: { color: '#3b82f6', fontWeight: 'bold' },
    phValueContainer: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 15 },
    phBigNumber: { fontSize: 40, fontWeight: 'bold', color: '#1f291e' },
    phStatusBadge: { backgroundColor: 'rgba(45, 75, 42, 0.1)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginLeft: 15 },
    phStatusText: { fontSize: 12, color: '#2d4b2a', fontWeight: '700' },
    phGradient: { height: 10, borderRadius: 5, width: '100%' },
    phMarkers: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
    markerText: { fontSize: 12, color: '#9ca3af' },
    activeMarker: { color: '#1f291e', fontWeight: 'bold' },
    sectionHeading: { fontSize: 18, fontFamily: "Sansation", fontWeight: "bold", marginVertical: 15, color: '#1f291e' },
    npkDetailCard: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 12, elevation: 1, borderWidth: 1, borderColor: '#f3f4f6' },
    npkHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    npkLabelText: { fontSize: 15, fontWeight: '700' },
    statusPillText: { fontSize: 10, fontWeight: 'bold' },
    npkBarContainer: { height: 6, backgroundColor: '#f3f4f6', borderRadius: 3, marginBottom: 10 },
    npkBarFill: { height: '100%', borderRadius: 3 },
    npkDescText: { fontSize: 12, color: '#6b7280', lineHeight: 18 },
    whiteCard: { backgroundColor: '#f9fafb', borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#e5e7eb' },
    inputLabel: { fontSize: 12, color: '#6b7280', marginBottom: 8, fontFamily: 'Sansation', fontWeight: '700' },
    inputBox: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 12, marginBottom: 15, fontSize: 14, color: '#1f291e' },
    selectBox: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    selectText: { fontSize: 14, color: '#1f291e', fontWeight: '600' },
    chevron: { width: 10, height: 10, tintColor: '#2d4b2a' },
    row: { flexDirection: 'row' },
    analyzeButton: { backgroundColor: '#2d4b2a', height: 55, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    analyzeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

    // --- Buddy Button (Exact Sync with Home Page) ---
    buddyButton: {
        position: 'absolute', bottom: 100, right: 20,
        height: 44, width: 105, borderRadius: 12, elevation: 8, overflow: 'hidden'
    },
    buddyGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    buddyText: { color: "#fff", fontWeight: "700", marginLeft: 6, fontSize: 14 },
    buddyBotIcon: { width: 18, height: 18 },

    // Modals & Chat
    buddyPopup: { position: 'absolute', bottom: 100, right: 20, left: 20, height: SCREEN_HEIGHT * 0.45, backgroundColor: '#fff', borderRadius: 25, elevation: 20, overflow: 'hidden' },
    chatHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#a25a28', alignItems: 'center' },
    buddyInfo: { flexDirection: 'row', alignItems: 'center' },
    chatIcon: { width: 20, height: 20, marginRight: 10 },
    buddyName: { color: '#fff', fontWeight: 'bold' },
    closeBtn: { color: '#fff', fontWeight: 'bold' },
    chatBody: { flex: 1, padding: 15 },
    buddyMsg: { backgroundColor: '#f3f4f6', padding: 12, borderRadius: 15, borderTopLeftRadius: 2, maxWidth: '85%' },
    msgText: { fontSize: 13, lineHeight: 18 },
    chatInputRow: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#eee', alignItems: 'center' },
    chatInput: { flex: 1, backgroundColor: '#f9fafb', borderRadius: 20, paddingHorizontal: 15, height: 40 },
    sendBtn: { marginLeft: 10 },
    sendText: { color: '#a25a28', fontWeight: 'bold' },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", padding: 20 },
    modalContent: { backgroundColor: "#fff", borderRadius: 20, width: "100%", maxHeight: "80%", padding: 20 },
    modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
    modalItem: { paddingVertical: 12 },
    modalItemText: { fontSize: 15, color: "#1f291e" },
    modalSeparator: { height: 1, backgroundColor: "#f3f4f6" }
});

export default FarmerSensorScreen;