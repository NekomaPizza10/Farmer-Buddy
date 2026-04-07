import * as React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BuddyHeaderProps {
    title?: string;
    badge?: React.ReactNode;
    onProfilePress?: () => void;
    onRightPress?: () => void;
    showRightIcon?: boolean;
}

const BuddyHeader: React.FC<BuddyHeaderProps> = ({ title, badge, onProfilePress, onRightPress, showRightIcon = true }) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.singleRow}>
                <View style={styles.leftGroup}>
                    {/* Profile Icon */}
                    <Pressable style={styles.userProfile} onPress={onProfilePress}>
                        <Image 
                            style={styles.profileIcon} 
                            source={require("assets/image/Profile.png")} 
                            resizeMode="cover" 
                        />
                    </Pressable>

                    {/* Title Text next to Profile */}
                    {title ? <Text style={styles.screenTitle} numberOfLines={1}>{title}</Text> : null}
                </View>

                {/* Right Area (Badge or Menu) */}
                <View style={styles.rightGroup}>
                    {badge}
                    {showRightIcon && (
                        <Pressable style={styles.menuIcon} onPress={onRightPress}>
                            <Ionicons name="list" size={32} color="#4A5D23" />
                        </Pressable>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        top: 66,
        left: 24,
        right: 24,
        zIndex: 100,
    },
    singleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 48,
    },
    leftGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    screenTitle: {
        fontSize: 22,
        fontFamily: 'Sansation',
        fontWeight: 'bold',
        color: '#1f291e',
        marginLeft: 12,
    },
    userProfile: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#e6e6e6',
        overflow: 'hidden',
    },
    profileIcon: {
        width: '100%',
        height: '100%',
    },
    rightGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    menuIcon: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
});

export default BuddyHeader;
