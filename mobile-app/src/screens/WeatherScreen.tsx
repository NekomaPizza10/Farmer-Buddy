import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View, Animated, Dimensions, Pressable, Text, SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import TodayWeather from '../components/TodayWeather';
import TomorrowWeather from '../components/TomorrowWeather';

const { width } = Dimensions.get('window');

export default function WeatherScreen() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<ScrollView>(null);
    const navigation = useNavigation();

    const onTabPress = (index: number) => {
        scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
    };

    // Calculate exact tab dimensions for precise indicator sliding
    const tabsContainerPadding = width * 0.2;
    const totalTabsWidth = width - (tabsContainerPadding * 2);
    const indicatorMoveDistance = totalTabsWidth / 2;

    // Interpolate the green underline indicator position exactly to the second tab position
    const indicatorTranslateX = scrollX.interpolate({
        inputRange: [0, width],
        outputRange: [0, indicatorMoveDistance],
        extrapolate: 'clamp'
    });

    const activeColor1 = scrollX.interpolate({
        inputRange: [0, width],
        outputRange: ['#1f291e', '#888']
    });

    const activeColor2 = scrollX.interpolate({
        inputRange: [0, width],
        outputRange: ['#888', '#1f291e']
    });

    return (
        <LinearGradient
            colors={['#dee8f8', '#ffdfd3']}
            style={styles.container}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
        >
            <SafeAreaView style={styles.safeArea}>
                {/* Fixed Global Header */}
                <View style={styles.header}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}>
                        <Ionicons name="chevron-back" size={30} color="#fff" style={{ opacity: 0.9 }} />
                    </Pressable>
                    <Pressable style={styles.iconBtn}>
                        <Ionicons name="add" size={30} color="#fff" style={{ opacity: 0.9 }} />
                    </Pressable>
                </View>

                {/* Animated Page Content */}
                <Animated.ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    style={styles.scrollView}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={16}
                >
                    <TodayWeather />
                    <TomorrowWeather />
                </Animated.ScrollView>

                {/* Fixed Bottom Tabs Container */}
                <View style={styles.bottomTabsContainer}>
                    <View style={styles.tabsRow}>
                        <Pressable style={styles.tabItem} onPress={() => onTabPress(0)}>
                            <Animated.Text style={[styles.tabText, { color: activeColor1 }]}>
                                Today
                            </Animated.Text>
                        </Pressable>
                        <Pressable style={styles.tabItem} onPress={() => onTabPress(1)}>
                            <Animated.Text style={[styles.tabText, { color: activeColor2 }]}>
                                Tomorrow
                            </Animated.Text>
                        </Pressable>
                    </View>
                    <View style={styles.indicatorTrack}>
                        <Animated.View style={[styles.indicator, { transform: [{ translateX: indicatorTranslateX }] }]} />
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    iconBtn: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
    },
    bottomTabsContainer: {
        height: 60,
        backgroundColor: 'transparent',
        paddingHorizontal: width * 0.2, // Center the tabs tightly
        marginBottom: 20,
    },
    tabsRow: {
        flexDirection: 'row',
        flex: 1,
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabText: {
        fontSize: 18,
        fontFamily: 'Sansation',
        fontWeight: 'bold',
    },
    indicatorTrack: {
        width: '100%',
        height: 3,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    indicator: {
        width: '50%',
        height: '100%',
        backgroundColor: '#2d4b2a',
        borderRadius: 2,
    }
});
