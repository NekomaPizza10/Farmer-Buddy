import React from 'react';
import {
    StyleSheet, View, Text, Image, Pressable, ScrollView,
    TextInput, Dimensions, Modal, KeyboardAvoidingView, Platform
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BuddyChatPopupProps {
    isVisible: boolean;
    onClose: () => void;
    initialMessage: string;
    placeholder?: string;
}

const BuddyChatPopup: React.FC<BuddyChatPopupProps> = ({ isVisible, onClose, initialMessage, placeholder = "Ask Buddy anything..." }) => {
    return (
        <Modal
            transparent
            visible={isVisible}
            animationType="fade"
            onRequestClose={onClose}
        >
            {/* The Backdrop - Dims the screen underneath */}
            <Pressable style={styles.modalOverlay} onPress={onClose}>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardView}
                >
                    <Pressable style={styles.buddyPopup} onPress={(e) => e.stopPropagation()}>
                        {/* Header with Brand Gradient */}
                        <LinearGradient
                            colors={['#a25a28', '#8b4a1f']}
                            style={styles.chatHeader}
                        >
                            <View style={styles.buddyInfo}>
                                <View style={styles.iconCircle}>
                                    <Image source={require("assets/image/buddySmall.png")} style={styles.chatIcon} />
                                </View>
                                <View>
                                    <Text style={styles.buddyName}>Buddy Assistant</Text>
                                    <Text style={styles.onlineStatus}>Online</Text>
                                </View>
                            </View>
                            <Pressable style={styles.closeBtnWrapper} onPress={onClose}>
                                <Text style={styles.closeBtn}>✕</Text>
                            </Pressable>
                        </LinearGradient>

                        <ScrollView style={styles.chatBody} showsVerticalScrollIndicator={false}>
                            <View style={styles.buddyMsg}>
                                <Text style={styles.msgText}>{initialMessage}</Text>
                            </View>
                        </ScrollView>

                        {/* Refined Input Row */}
                        <View style={styles.chatInputRow}>
                            <TextInput
                                style={styles.chatInput}
                                placeholder={placeholder}
                                placeholderTextColor="#999"
                            />
                            <Pressable style={styles.sendBtn}>
                                <Text style={styles.sendText}>Send</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </KeyboardAvoidingView>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dimming effect
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyboardView: {
        width: '100%',
        alignItems: 'center',
    },
    buddyPopup: {
        width: '90%',
        height: SCREEN_HEIGHT * 0.48,
        backgroundColor: '#fff',
        borderRadius: 30,
        overflow: 'hidden',
        // High-depth shadow
        elevation: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    buddyInfo: { flexDirection: 'row', alignItems: 'center' },
    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
    },
    chatIcon: { width: 22, height: 22 },
    buddyName: { color: '#fff', fontWeight: 'bold', fontSize: 16, fontFamily: 'Sansation' },
    onlineStatus: { color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: -2 },

    closeBtnWrapper: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBtn: { color: '#fff', fontWeight: 'bold', fontSize: 20 },

    chatBody: { flex: 1, padding: 20 },
    buddyMsg: {
        backgroundColor: '#f1f3f0',
        padding: 16,
        borderRadius: 20,
        borderTopLeftRadius: 4,
        maxWidth: '90%',
        borderWidth: 1,
        borderColor: '#e2e8e0'
    },
    msgText: { fontSize: 14, lineHeight: 20, color: '#1f291e', fontFamily: 'Sansation' },

    chatInputRow: {
        flexDirection: 'row',
        padding: 15,
        borderTopWidth: 1,
        borderColor: '#f0f0f0',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    chatInput: {
        flex: 1,
        backgroundColor: '#f5f7f5',
        borderRadius: 25,
        paddingHorizontal: 18,
        height: 45,
        color: '#000',
        fontSize: 14,
        fontFamily: 'Sansation'
    },
    sendBtn: { marginLeft: 12, paddingHorizontal: 5 },
    sendText: { color: '#a25a28', fontWeight: '800', fontSize: 15, fontFamily: 'Sansation' },
});

export default BuddyChatPopup;