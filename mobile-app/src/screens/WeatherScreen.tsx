import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import TodayWeather from '../components/TodayWeather';
import TomorrowWeather from '../components/TomorrowWeather';

export default function WeatherScreen() {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                style={styles.scrollView}
            >
                <TodayWeather />
                <TomorrowWeather />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f8f2',
    },
    scrollView: {
        flex: 1,
    }
});
