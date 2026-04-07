import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

const TomorrowWeather = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Location Info */}
            <View style={styles.locationContainer}>
                <Text style={styles.locationTitle}>LOCATION</Text>
                <Text style={styles.locationSubText}>TUESDAY   16:30</Text>
            </View>

            <View style={{ flex: 1 }} />

            {/* Big Weather Illustration Circle */}
            <View style={styles.illustrationContainer}>
                <View style={styles.illustrationCircle}>
                    <Image 
                        source={require("../../assets/image/SunnyCloud.png")} 
                        style={styles.weatherImage} 
                        resizeMode="contain" 
                    />
                </View>
            </View>

            <View style={{ flex: 1 }} />

            {/* Main Temperature Stats */}
            <View style={styles.mainStatsContainer}>
                <Text style={styles.bigTemp}>29°</Text>
                <Text style={styles.weatherCondition}>Cloudy</Text>
                <Text style={styles.highLowText}>H:34°   L:25°</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Hourly Forecast */}
            <View style={styles.hourlyContainer}>
                {[
                    { time: 'Now', temp: '29°' },
                    { time: '17', temp: '29°' },
                    { time: '18', temp: '28°' },
                    { time: '19', temp: '27°' },
                    { time: '20', temp: '27°' },
                    { time: '21', temp: '26°' },
                ].map((item, index) => (
                    <View key={index} style={styles.hourlyItem}>
                        <Text style={styles.hourlyTime}>{item.time}</Text>
                        <Text style={styles.hourlyTemp}>{item.temp}</Text>
                    </View>
                ))}
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            <View style={{ flex: 1 }} />

            {/* Details Pills (Humidity, Wind, UV) */}
            <View style={styles.detailsContainer}>
                <View style={styles.detailPill}>
                    <Ionicons name="water-outline" size={14} color="#1f291e" style={styles.detailIcon} />
                    <Text style={styles.detailText}>Humidity: <Text style={styles.detailBold}>64%</Text></Text>
                </View>
                <View style={styles.detailPill}>
                    <Ionicons name="filter-outline" size={14} color="#1f291e" style={styles.detailIcon} />
                    <Text style={styles.detailText}>Wind: <Text style={styles.detailBold}>7km/h</Text></Text>
                </View>
                <View style={styles.detailPill}>
                    <Ionicons name="sunny-outline" size={14} color="#1f291e" style={styles.detailIcon} />
                    <Text style={styles.detailText}>UV Index: <Text style={styles.detailBold}>2</Text></Text>
                </View>
            </View>

            <View style={{ flex: 1 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: 'transparent',
    },
    locationContainer: {
        alignItems: 'center',
    },
    locationTitle: {
        fontSize: 32,
        color: '#fff',
        fontFamily: 'Sansation',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
        letterSpacing: 2,
    },
    locationSubText: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Sansation',
        marginTop: 6,
        opacity: 0.8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    illustrationContainer: {
        alignItems: 'center',
    },
    illustrationCircle: {
        width: width * 0.75,
        height: width * 0.75,
        borderRadius: (width * 0.75) / 2,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    weatherImage: {
        width: '65%',
        height: '65%',
    },
    mainStatsContainer: {
        alignItems: 'center',
    },
    bigTemp: {
        fontSize: 76,
        color: '#1f291e',
        fontFamily: 'Sansation',
        fontWeight: 'bold',
        lineHeight: 85,
    },
    weatherCondition: {
        fontSize: 36,
        color: '#1f291e',
        fontFamily: 'Sansation',
        fontWeight: 'bold',
        marginTop: -5,
    },
    highLowText: {
        fontSize: 16,
        color: '#444',
        fontFamily: 'Sansation',
        marginTop: 8,
        letterSpacing: 0.5,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.15)',
        marginHorizontal: 30,
        marginVertical: 18,
    },
    hourlyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 35,
    },
    hourlyItem: {
        alignItems: 'center',
    },
    hourlyTime: {
        fontSize: 15,
        color: '#333',
        fontFamily: 'Sansation',
        marginBottom: 10,
    },
    hourlyTemp: {
        fontSize: 17,
        color: '#1f291e',
        fontFamily: 'Sansation',
        fontWeight: 'bold',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        gap: 8,
    },
    detailPill: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 1,
    },
    detailIcon: {
        marginRight: 6,
        opacity: 0.8,
    },
    detailText: {
        fontSize: 12,
        color: '#1f291e',
        fontFamily: 'Sansation',
    },
    detailBold: {
        fontWeight: 'bold',
    }
});

export default TomorrowWeather;
