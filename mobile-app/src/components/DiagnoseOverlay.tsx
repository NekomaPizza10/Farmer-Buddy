import * as React from "react";
import { Image, StyleSheet, View, Text, ScrollView, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

interface DiagnoseOverlayProps {
    visible: boolean;
    onClose: () => void;
}

const DiagnoseOverlay: React.FC<DiagnoseOverlayProps> = ({ visible, onClose }) => {
    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View style={styles.theDiagnoseOverlay}>
                <BlurView intensity={80} style={StyleSheet.absoluteFill} tint="dark" />
                <View style={styles.dim} />
                
                {/* Close Button Header */}
                <View style={styles.header}>
                    <Pressable onPress={onClose} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={28} color="#fff" />
                    </Pressable>
                </View>

                {/* Main Content Card Wrapper */}
                <View style={[styles.content, styles.contentLayout]}>
                    <View style={styles.contentChild}>
                        
                        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
                            {/* Verdict Section */}
                            <View style={styles.verdictSection}>
                                <Text style={[styles.verdict, styles.verdictClr]}>Verdict</Text>
                                <Text style={[styles.earlyBlight, styles.earlyBlightTypo]}>Early Blight</Text>
                                <View style={styles.statusRow}>
                                    <Ionicons name="warning" size={20} color="#eab308" style={styles.warningIcon} />
                                    <Text style={styles.statusCritical}>Status: Critical / Needs Attention</Text>
                                </View>
                                
                                <Text style={[styles.aboutTheConditionContainer, styles.verdictClr]}>
                                    <Text style={[styles.aboutTheCondition, styles.earlyBlightTypo]}>About the Condition{'\n'}</Text>
                                    <Text style={styles.aFungalInfection}>A fungal infection common in tomatoes, caused by Alternaria solani.</Text>
                                </Text>
                            </View>

                            <Text style={[styles.treatmentPlanHow, styles.earlyBlightTypo]}>Treatment Plan{'\n'}How to Cure</Text>
                            
                            {/* Treatment List */}
                            <View style={styles.treatmentList}>
                                {/* Chemical Control */}
                                <View style={styles.treatmentListItem}>
                                    <View style={[styles.iconBox, {backgroundColor: '#d2c2b2'}]}>
                                        <Ionicons name="flask" size={32} color="#fff" />
                                    </View>
                                    <View style={styles.treatmentTextContainer}>
                                        <Text style={[styles.chemicalControl, styles.chemicalControlTypo]}>Chemical Control</Text>
                                        <Text style={styles.applyAntiFungi}>Apply anti fungi containing copper or chiorothalonil.</Text>
                                    </View>
                                    <Ionicons name="chevron-down" size={20} color="#888" style={styles.dropdownIcon} />
                                </View>

                                {/* Cultural Control */}
                                <View style={styles.treatmentListItem}>
                                    <View style={[styles.iconBox, {backgroundColor: '#d2c2b2'}]}>
                                        <Ionicons name="leaf" size={30} color="#fff" />
                                    </View>
                                    <View style={styles.treatmentTextContainer}>
                                        <Text style={[styles.chemicalControl, styles.chemicalControlTypo]}>Cultural Control</Text>
                                        <Text style={styles.applyAntiFungi}>Remove infected leaves immediately to stop spread.</Text>
                                    </View>
                                    <Ionicons name="chevron-down" size={20} color="#888" style={styles.dropdownIcon} />
                                </View>

                                {/* Prevention */}
                                <View style={styles.treatmentListItem}>
                                    <View style={[styles.iconBox, {backgroundColor: '#d2c2b2'}]}>
                                        <Ionicons name="water" size={32} color="#fff" />
                                    </View>
                                    <View style={styles.treatmentTextContainer}>
                                        <Text style={[styles.chemicalControl, styles.chemicalControlTypo]}>Prevention</Text>
                                        <Text style={styles.applyAntiFungi}>Apply Water at the base of the plant, avoid wetting leaves.</Text>
                                    </View>
                                    <Ionicons name="chevron-down" size={20} color="#888" style={styles.dropdownIcon} />
                                </View>

                                {/* Biological Control */}
                                <View style={styles.treatmentListItem}>
                                    <View style={[styles.iconBox, {backgroundColor: '#d2c2b2'}]}>
                                        <Ionicons name="bug" size={30} color="#fff" />
                                    </View>
                                    <View style={styles.treatmentTextContainer}>
                                        <Text style={[styles.chemicalControl, styles.chemicalControlTypo]}>Biological Control</Text>
                                        <Text style={styles.applyAntiFungi}>Introduce beneficial insects or apply certified organic solution.</Text>
                                    </View>
                                    <Ionicons name="chevron-down" size={20} color="#888" style={styles.dropdownIcon} />
                                </View>

                                {/* Nutrient Support */}
                                <View style={styles.treatmentListItem}>
                                    <View style={[styles.iconBox, {backgroundColor: 'rgba(131, 217, 255, 0.68)'}]}>
                                        <Ionicons name="nutrition" size={32} color="#fff" />
                                    </View>
                                    <View style={styles.treatmentTextContainer}>
                                        <Text style={[styles.nutrientSupport, styles.chemicalControlTypo]}>Nutrient Support</Text>
                                        <Text style={styles.adjustFertilizerWith}>Adjust fertilizer with balancing fertilizer with an emphasis on ....</Text>
                                    </View>
                                    <Ionicons name="chevron-down" size={20} color="#888" style={styles.dropdownIcon} />
                                </View>
                            </View>
                        </ScrollView>

                        {/* Share Button bottom fixed */}
                        <View style={styles.bottomPage}>
                            <Pressable style={styles.shareButton} onPress={() => alert('Report Shared!')}>
                                <Text style={styles.shareReport}>Share Report</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    theDiagnoseOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    dim: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    header: {
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
        zIndex: 10,
    },
    backBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentLayout: {
        flex: 1,
        width: '100%',
    },
    content: {
        marginTop: 20,
    },
    contentChild: {
        flex: 1,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        backgroundColor: "#f5f5f5",
        overflow: 'hidden',
    },
    scrollContent: {
        flex: 1,
    },
    verdictSection: {
        padding: 30,
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: '#d9d9d9',
    },
    verdictClr: {
        color: "#000",
        textAlign: "left"
    },
    earlyBlightTypo: {
        fontWeight: "700",
        fontFamily: "Sansation"
    },
    verdict: {
        fontWeight: "300",
        fontFamily: "Sansation Light",
        fontSize: 20,
        marginBottom: 5,
    },
    earlyBlight: {
        fontSize: 40,
        fontFamily: "Sansation",
        color: "#000",
        marginBottom: 10,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    warningIcon: {
        marginRight: 10,
    },
    statusCritical: {
        fontSize: 16,
        fontFamily: "Sansation",
        fontWeight: "700",
        color: "#000"
    },
    aboutTheConditionContainer: {
        marginTop: 10,
    },
    aboutTheCondition: {
        fontFamily: "Sansation",
        fontSize: 20
    },
    aFungalInfection: {
        fontSize: 15,
        fontFamily: "Sansation",
        lineHeight: 22,
    },
    treatmentPlanHow: {
        color: "#1f291e",
        fontFamily: "Sansation",
        fontSize: 22,
        paddingHorizontal: 30,
        paddingTop: 30,
        paddingBottom: 15,
    },
    treatmentList: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    treatmentListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconBox: {
        width: 60,
        height: 60,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    treatmentTextContainer: {
        flex: 1,
    },
    chemicalControlTypo: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 5,
    },
    chemicalControl: {
        fontFamily: "Sansation",
        color: "#000",
    },
    applyAntiFungi: {
        fontFamily: "Sansation",
        fontSize: 13,
        color: "#444",
        lineHeight: 18,
    },
    nutrientSupport: {
        fontFamily: "Sansation",
        color: "#000",
    },
    adjustFertilizerWith: {
        fontFamily: "Sansation",
        fontSize: 13,
        color: "#444",
        lineHeight: 18,
    },
    dropdownIcon: {
        marginLeft: 10,
    },
    bottomPage: {
        padding: 20,
        paddingBottom: 30,
        backgroundColor: "#f5f5f5",
        borderTopWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    shareButton: {
        borderRadius: 30,
        backgroundColor: "#2d4b2a",
        paddingVertical: 15,
        alignItems: 'center',
    },
    shareReport: {
        color: "#fff",
        fontFamily: "Sansation",
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default DiagnoseOverlay;
