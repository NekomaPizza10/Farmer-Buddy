import * as React from "react";
import { StyleSheet, View, Image, Text, Pressable, TextInput, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { sendAgronomistMessage, ChatMessage } from "../services/api/geminiChatService";

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

    const handleSend = async () => {
        if (!inputText.trim()) return;
        
        const userText = inputText.trim();
        const newUserMsg: Message = { id: Date.now().toString(), text: userText, sender: 'User' };
        
        // Add user message to UI
        setMessages(prev => [...prev, newUserMsg]);
        setInputText('');
        setIsLoading(true);

        try {
            // Map current UI messages to backend format
            const history: ChatMessage[] = messages.map(m => ({
                id: m.id,
                text: m.text,
                sender: m.sender === 'User' ? 'user' : 'bot'
            }));

            // Call real backend API
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
                text: "Sorry, I am having trouble connecting right now. Please try again later.", 
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
            <View style={styles.messageRow}>
                {isUser ? (
                    <View style={styles.userContainer}>
                        <View style={styles.senderHeaderUser}>
                            <Text style={styles.senderName}>User</Text>
                            <View style={styles.avatarWrapper}>
                                <Image source={require('assets/image/Profile.png')} style={styles.avatarIcon} resizeMode="cover" />
                            </View>
                        </View>
                        <View style={[styles.messageBubble, styles.userBubble]}>
                            <Text style={styles.messageText}>{item.text}</Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.buddyContainer}>
                        <View style={styles.senderHeaderBuddy}>
                            <View style={styles.avatarWrapperBuddy}>
                                <Image source={require('assets/image/buddySmall.png')} style={styles.avatarIcon} resizeMode="contain" />
                            </View>
                            <Text style={styles.senderName}>Buddy</Text>
                        </View>
                        <View style={[styles.messageBubble, styles.buddyBubble]}>
                            <Text style={styles.messageText}>{item.text}</Text>
                        </View>
                    </View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.chatbot}>
            {/* Top Header */}
            <View style={styles.chatBotHeader}>
                <Pressable style={styles.userProfile} onPress={() => navigation.navigate('Settings' as never)}>
                    <Image source={require('assets/image/Profile.png')} style={styles.headerProfileIcon} resizeMode="cover" />
                </Pressable>
                
                <View style={styles.headerCenter}>
                    <View style={styles.headerBuddyIconBg}>
                        <Image source={require('assets/image/buddySmall.png')} style={styles.headerBuddyIcon} resizeMode="contain" />
                    </View>
                    <View style={styles.headerBuddyTextContainer}>
                        <Text style={styles.buddy3}>Buddy</Text>
                        <Text style={styles.assistant}>Assistant</Text>
                    </View>
                </View>

                <Pressable>
                    <Ionicons name="list" size={30} color="#4A5D23" />
                </Pressable>
            </View>
            
            {/* Main Area */}
            <View style={styles.dashcard}>
                <FlatList
                    data={messages}
                    keyExtractor={item => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={styles.chatList}
                    showsVerticalScrollIndicator={false}
                />
                
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={styles.bottomArea}>
                        <View style={styles.messageBot}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Ask Buddy"
                                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                                value={inputText}
                                onChangeText={setInputText}
                                onSubmitEditing={handleSend}
                                multiline
                            />
                            <View style={styles.bottomIconsRow}>
                                <View style={styles.leftIcons}>
                                    <Pressable>
                                        <Ionicons name="add" size={24} color="#4A5D23" style={styles.iconStyle} />
                                    </Pressable>
                                    <Pressable>
                                        <Ionicons name="mic" size={22} color="#4A5D23" style={[styles.iconStyle, {marginLeft: 15}]} />
                                    </Pressable>
                                </View>
                                <Pressable onPress={handleSend} disabled={isLoading}>
                                    {isLoading ? (
                                        <ActivityIndicator size="small" color="#4A5D23" style={styles.iconStyle} />
                                    ) : (
                                        <Ionicons name="send" size={22} color="#4A5D23" style={styles.iconStyle} />
                                    )}
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    chatbot: {
        flex: 1,
        backgroundColor: "#f5f8f2",
    },
    chatBotHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 15,
        height: 70,
    },
    userProfile: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#e6e6e6',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    headerProfileIcon: {
        width: 45,
        height: 45,
        opacity: 0.5,
    },
    headerCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerBuddyIconBg: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#e8ece4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    headerBuddyIcon: {
        width: 33,
        height: 33,
    },
    headerBuddyTextContainer: {
        justifyContent: 'center',
    },
    buddy3: {
        fontSize: 15,
        fontWeight: "700",
        color: "#000",
        fontFamily: "Sansation",
    },
    assistant: {
        fontSize: 15,
        color: "rgba(0, 0, 0, 0.7)",
        fontFamily: "Sansation",
        marginTop: -3,
    },
    dashcard: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 10,
        overflow: 'hidden',
    },
    chatList: {
        padding: 20,
        paddingTop: 30,
        paddingBottom: 20,
    },
    messageRow: {
        marginBottom: 25,
    },
    userContainer: {
        alignItems: 'flex-end',
        width: '100%',
    },
    buddyContainer: {
        alignItems: 'flex-start',
        width: '100%',
    },
    senderHeaderBuddy: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        marginLeft: 15,
    },
    senderHeaderUser: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 8,
        marginRight: 15,
    },
    avatarWrapper: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        backgroundColor: '#e6e6e6',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginLeft: 10,
    },
    avatarWrapperBuddy: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        backgroundColor: '#e8ece4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    avatarIcon: {
        width: '100%',
        height: '100%',
    },
    senderName: {
        fontSize: 13,
        color: "#000",
        fontFamily: "Sansation",
    },
    messageBubble: {
        width: '95%',
        minHeight: 140,
        padding: 15,
        borderRadius: 16,
    },
    userBubble: {
        backgroundColor: "#d4f0ff",
        alignSelf: 'center',
    },
    buddyBubble: {
        backgroundColor: "#d9d9d9",
        alignSelf: 'center',
    },
    messageText: {
        fontSize: 14,
        color: "#333",
    },
    bottomArea: {
        backgroundColor: "rgba(217, 217, 217, 0.25)",
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 115, 
    },
    messageBot: {
        minHeight: 82,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 16,
        padding: 15,
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        fontFamily: "Sansation",
        color: "#000",
        minHeight: 30,
        textAlignVertical: 'top',
    },
    bottomIconsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 5,
    },
    leftIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconStyle: {
        opacity: 0.8,
    }
});

export default ChatBotScreen;
