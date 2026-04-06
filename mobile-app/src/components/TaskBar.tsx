import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const { width } = Dimensions.get('window');

const TaskBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    return (
        <View style={styles.taskbar}>
            {/* Map through the routes but cleanly insert the center button halfway */}
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                
                let iconSource;
                let label = route.name;
                if (route.name === "Dashboard") { iconSource = require("assets/image/Home.png"); label = "Home"; }
                else if (route.name === "FarmerSensor") { iconSource = require("assets/image/ActSens.png"); label = "Sensor"; }
                else if (route.name === "ChatBot") { iconSource = require("assets/image/chatbot.png"); label = "AI Bot"; }
                else if (route.name === "BodyCamera") { iconSource = require("assets/image/BodyCam.png"); label = "BodyCam"; }

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                return (
                    <React.Fragment key={route.key}>
                        {/* Insert Middle Floating Button when halfway */}
                        {index === 2 && (
                            <View style={styles.centerButtonWrapper}>
                                <TouchableOpacity
                                    style={styles.floatingButton}
                                    onPress={() => navigation.navigate('LeafScanner' as never)}
                                    activeOpacity={0.8}
                                >
                                    <Image style={styles.cameraIcon} source={require("assets/image/Scanner.png")} />
                                </TouchableOpacity>
                            </View>
                        )}

                        <TouchableOpacity onPress={onPress} style={styles.tabButton}>
                            <View style={[styles.iconContainer, isFocused && styles.activeIconContainer]}>
                                {iconSource && <Image source={iconSource} style={styles.iconStyle} resizeMode="contain" />}
                            </View>
                            <Text style={[styles.tabLabel, isFocused && styles.activeTabLabel]}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    </React.Fragment>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    taskbar: {
        width: "100%",
        height: 90, // Taller to provide safe area clearance for iOS home indicator
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingBottom: 25, // Push items up so they don't clip at the very bottom!
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 15,
        // @ts-ignore
        boxShadow: "0px -4px 15px rgba(0,0,0,0.06)",
    },
    tabButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10,
    },
    iconContainer: {
        padding: 6,
        borderRadius: 14,
        marginBottom: 4,
    },
    activeIconContainer: {
        backgroundColor: "rgba(34, 197, 94, 0.15)", // Light green highlight background when active
    },
    iconStyle: {
        width: 24,
        height: 24,
    },
    tabLabel: {
        fontSize: 10,
        fontFamily: "Sansation",
        color: "#64748B",
        fontWeight: "600",
    },
    activeTabLabel: {
        color: "#22c55e",
        fontWeight: "700",
    },
    centerButtonWrapper: {
        width: 70,
        alignItems: "center",
        justifyContent: "center",
    },
    floatingButton: {
        width: 66,
        height: 66,
        borderRadius: 33,
        backgroundColor: "#22c55e",
        justifyContent: "center",
        alignItems: "center",
        bottom: 15, // Pushes it up to hover overlapping the taskbar
        elevation: 10,
        // @ts-ignore
        boxShadow: "0px 6px 14px rgba(34, 197, 94, 0.4)",
        borderWidth: 4,
        borderColor: "#f5f8f2",
    },
    cameraIcon: {
        width: 28,
        height: 28,
    }
});

export default TaskBar;
