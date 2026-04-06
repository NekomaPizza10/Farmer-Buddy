import * as React from "react";
import { StyleSheet, View, Text, Pressable, Modal, Animated, PanResponder, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ChatbotSidebarProps {
    visible: boolean;
    onClose: () => void;
    onNewChat: () => void;
}

const { width } = Dimensions.get("window");
const SIDEBAR_WIDTH = Math.min(280, width * 0.7);

const ChatbotSidebar: React.FC<ChatbotSidebarProps> = ({ visible, onClose, onNewChat }) => {
    const slideAnim = React.useRef(new Animated.Value(SIDEBAR_WIDTH)).current;

    React.useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: SIDEBAR_WIDTH,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, slideAnim]);

    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return gestureState.dx > 20; // Only capture if dragging right
            },
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dx > 0) {
                    slideAnim.setValue(gestureState.dx);
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > SIDEBAR_WIDTH / 3 || gestureState.vx > 0.5) {
                    onClose();
                } else {
                    Animated.spring(slideAnim, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.overlayContainer}>
                <Pressable style={styles.overlay} onPress={onClose} />
                
                <Animated.View 
                    style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
                    {...panResponder.panHandlers}
                >
                    <View style={styles.header}>
                        <Pressable onPress={onClose} style={styles.closeBtn}>
                            <Ionicons name="close" size={28} color="#2d4b2a" />
                        </Pressable>
                    </View>

                    <View style={styles.content}>
                        <Pressable 
                            style={styles.newChatBtn} 
                            onPress={() => {
                                onNewChat();
                                onClose();
                            }}
                        >
                            <Ionicons name="add-circle-outline" size={24} color="#2d4b2a" style={styles.iconMargin} />
                            <Text style={styles.newChatText}>New Chat</Text>
                        </Pressable>

                        <Text style={styles.chatsHeader}>Chats</Text>
                        
                        <View style={styles.historyList}>
                            {/* Dummy History Items */}
                            <Pressable style={styles.historyItem}>
                                <Text style={[styles.historyText, styles.activeHistory]}>What is Agriculture?</Text>
                            </Pressable>
                            <Pressable style={styles.historyItem}>
                                <Text style={styles.historyText}>Soil Moisture Tips</Text>
                            </Pressable>
                            <Pressable style={styles.historyItem}>
                                <Text style={styles.historyText}>NPK Values Explained</Text>
                            </Pressable>
                            <Pressable style={styles.historyItem}>
                                <Text style={styles.historyText}>Pesticide usage</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Pressable style={styles.helpBtn}>
                            <Ionicons name="help-circle-outline" size={24} color="#2d4b2a" style={styles.iconMargin} />
                            <Text style={styles.helpText}>Help</Text>
                        </Pressable>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlayContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    sidebar: {
        width: SIDEBAR_WIDTH,
        backgroundColor: "#f5f8f2",
        height: '100%',
        position: 'absolute',
        right: 0,
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        paddingTop: 50, // Safe area for header
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    closeBtn: {
        padding: 5,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    newChatBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 30,
    },
    iconMargin: {
        marginRight: 10,
    },
    newChatText: {
        color: "#2d4b2a",
        fontSize: 16,
        fontFamily: "Sansation",
        fontWeight: "600",
    },
    chatsHeader: {
        color: "#2d4b2a",
        fontSize: 14,
        fontFamily: "Sansation",
        fontWeight: "bold",
        marginBottom: 15,
        marginLeft: 5,
    },
    historyList: {
        flex: 1,
    },
    historyItem: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginBottom: 5,
        borderRadius: 8,
    },
    historyText: {
        color: "#1f291e",
        fontSize: 14,
        fontFamily: "Sansation",
    },
    activeHistory: {
        fontWeight: 'bold',
        color: '#4A5D23',
    },
    footer: {
        padding: 20,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    helpBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    helpText: {
        color: "#2d4b2a",
        fontSize: 16,
        fontFamily: "Sansation",
        fontWeight: "600",
    }
});

export default ChatbotSidebar;
