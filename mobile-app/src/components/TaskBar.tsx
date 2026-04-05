import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const TaskBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    return (
        <View style={styles.taskbar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

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

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabButton}
                    >
                        {options.tabBarIcon ? (
                             options.tabBarIcon({ focused: isFocused, color: isFocused ? '#10B981' : '#64748B', size: 24 })
                        ) : null}
                        <Text style={{ color: isFocused ? '#10B981' : '#64748B', fontSize: 12, marginTop: 4, fontFamily: "Sansation", fontWeight: "700" }}>
                            {label as string}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    taskbar: {
        width: "100%",
        height: 72,
        // @ts-ignore
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
        elevation: 5,
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 0,
        left: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    tabButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});

export default TaskBar;
