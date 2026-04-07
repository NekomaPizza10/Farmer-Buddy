import * as React from "react";
import { StyleSheet, View, Image, Text, Pressable, TextInput, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, ActivityIndicator, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { sendAgronomistMessage, ChatMessage } from "../services/api/geminiChatService";
import ChatbotSidebar from "../components/ChatbotSidebar";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type Message = {
    id: string;
    text: string;
    sender: 'User' | 'Buddy';
};

const ChatBotScreen = () => {
    const navigation = useNavigation();
    const [messages, setMessages] = React.useState<Message[]>([
        { id: '1', text: 'Hi! I am Buddy Assistant. How can I help you regarding your farm today?', sender: 'Buddy' }
    ]);
    const [inputText, setInputText] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userText = inputText.trim();
        const newUserMsg: Message = { id: Date.now().toString(), text: userText, sender: 'User' };

        setMessages(prev => [...prev, newUserMsg]);
        setInputText('');
        setIsLoading(true);

        try {
            const history: ChatMessage[] = messages.map(m => ({
                id: m.id,
                text: m.text,
                sender: m.sender === 'User' ? 'user' : 'bot'
            }));

            const aiResponseText = await sendAgronomistMessage(userText, history);

            const newAiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: aiResponseText,
                sender: 'Buddy'
            };
            setMessages(prev => [...prev, newAiMsg]);
        } catch (error) {
            console.error("Gemini Error:", error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I am having trouble connecting right now.",
                sender: 'Buddy'
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const renderMessage = ({ item }: { item: Message }) => {
        const isUser = item.sender === 'User';
        return (
            <View style={isUser ? styles.userChatWrapper : styles.buddyChatWrapper}>
                <View style={isUser ? styles.userHeaderRow : styles.buddyHeaderRow}>
                    {!isUser && (
                        <View style={styles.iconCircle}>
                            <Image source={require('assets/image/buddySmall.png')} style={styles.iconImg} resizeMode="contain" />
                        </View>
                    )}
                    <Text style={styles.senderLabel}>{isUser ? "User" : "Buddy"}</Text>
                    {isUser && (
                        <View style={styles.iconCircle}>
                            <Image source={require('assets/image/Profile.png')} style={styles.iconImg} resizeMode="cover" />
                        </View>
                    )}
                </View>
                <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.buddyBubble]}>
                    <Text style={styles.messageText}>{item.text}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* 1. Background Dashboard Color */}
            <View style={[styles.dashboard, styles.dashboardPosition]} />

            {/* 2. Top Header Section */}
            <View style={[styles.topHeaeder, styles.topHeaederLayout]}>
                <Pressable style={styles.userProfile} onPress={() => navigation.navigate('Settings' as never)}>
                    <Image style={styles.profileIcon} source={require('assets/image/Profile.png')} resizeMode="cover" />
                </Pressable>

                <View style={styles.headerCenter}>
                    <View style={styles.buddyCircleHeader}>
                        <Image source={require('assets/image/buddySmall.png')} style={styles.buddyIconSmall} />
                    </View>
                    <View style={styles.headerTextCol}>
                        <Text style={styles.buddyTitle}>Buddy</Text>
                        <Text style={styles.assistantSub}>Assistant</Text>
                    </View>
                </View>

                <Pressable onPress={() => setIsSidebarOpen(true)}>
                    <Ionicons name="list" size={28} color="#1f291e" />
                </Pressable>
            </View>

            {/* 3. Main Dashcard */}
            <View style={styles.dashcard} />

            {/* 4. Chat Content */}
            <View style={styles.contentContainer}>
                <FlatList
                    data={messages}
                    keyExtractor={item => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={styles.chatList}
                    showsVerticalScrollIndicator={false}
                />

                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={styles.inputAreaBackground}>
                        <View style={styles.messageBotContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Ask Buddy"
                                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                                value={inputText}
                                onChangeText={setInputText}
                                multiline
                            />
                            <View style={styles.inputActionsRow}>
                                <View style={styles.leftActions}>
                                    <Ionicons name="add" size={22} color="#4A5D23" />
                                    <Ionicons name="mic" size={20} color="#4A5D23" style={{ marginLeft: 15 }} />
                                </View>
                                <Pressable onPress={handleSend} disabled={isLoading}>
                                    {isLoading ? <ActivityIndicator size="small" color="#4A5D23" /> : <Ionicons name="send" size={20} color="#4A5D23" />}
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>

            <ChatbotSidebar
                visible={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onNewChat={() => setMessages([{ id: '1', text: 'Hi! I am Buddy Assistant. How can I help you regarding your farm today?', sender: 'Buddy' }])}
            />
        </View>
    );
};

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
    userProfile: { width: 45, height: 45 },
    profileIcon: { height: 45, width: 45, borderRadius: 22.5, backgroundColor: '#e0e0e0' },
    headerCenter: { flexDirection: 'row', alignItems: 'center' },
    buddyCircleHeader: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#e8ece4', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    buddyIconSmall: { width: 24, height: 24 },
    headerTextCol: { justifyContent: 'center' },
    buddyTitle: { fontSize: 16, fontWeight: '700', color: '#000', fontFamily: 'Sansation' },
    assistantSub: { fontSize: 12, color: 'rgba(0,0,0,0.6)', marginTop: -2, fontFamily: 'Sansation' },

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

    contentContainer: { flex: 1, marginTop: 140 },
    chatList: { padding: 20, paddingBottom: 150 },
    buddyChatWrapper: { marginBottom: 25, alignItems: 'flex-start' },
    userChatWrapper: { marginBottom: 25, alignItems: 'flex-end' },
    buddyHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, marginLeft: 10 },
    userHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, marginRight: 10 },
    iconCircle: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#e8ece4', justifyContent: 'center', alignItems: 'center', marginHorizontal: 8 },
    iconImg: { width: '100%', height: '100%', borderRadius: 15 },
    senderLabel: { fontSize: 13, fontFamily: 'Sansation', color: '#000' },
    messageBubble: { width: '92%', minHeight: 120, borderRadius: 20, padding: 18 },
    buddyBubble: { backgroundColor: "#d9d9d9" },
    userBubble: { backgroundColor: "#d4f0ff" },
    messageText: { fontSize: 14, lineHeight: 20, color: '#333', fontFamily: 'Sansation' },

    // --- Fixed Position ---
    inputAreaBackground: {
        backgroundColor: "rgba(217, 217, 217, 0.33)",
        paddingHorizontal: 20,
        paddingTop: 15,
        // Increased padding to push container above the navigation bar
        paddingBottom: Platform.OS === 'ios' ? 110 : 95,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    messageBotContainer: {
        minHeight: 82,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 16,
        padding: 15,
        justifyContent: 'space-between',
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    textInput: { flex: 1, fontSize: 14, fontFamily: "Sansation", color: "#000", textAlignVertical: 'top' },
    inputActionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    leftActions: { flexDirection: 'row', alignItems: 'center' },
    locationClr: { color: "#1f291e" }
});

export default ChatBotScreen;