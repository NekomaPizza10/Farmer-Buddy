import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');

const TomorrowWeather = () => {
    const navigation = useNavigation();

    return (
        <View style={[styles.tomorrow, { width }]}>
            <Image style={styles.backgroudIcon} resizeMode="cover" />
            <Image style={styles.imageIcon} source={require("assets/image/SunnyCloud.png")} resizeMode="cover" />
            <View style={styles.locationParent}>
                <Text style={[styles.location, styles.text13FlexBox]}>LOCATION</Text>
                <Text style={[styles.tuesday, styles.textTypo2]}>TUESDAY</Text>
                <Text style={[styles.text, styles.textTypo2]}>16:30</Text>
            </View>
            <View style={[styles.announcement, styles.descriptionPosition]}>
                <View style={styles.temperature}>
                    <Text style={[styles.text2, styles.textTypo1]}>30°</Text>
                    <Text style={[styles.text3, styles.textTypo1]}>30°</Text>
                    <Text style={[styles.text4, styles.textTypo1]}>30°</Text>
                    <Text style={[styles.text5, styles.textTypo1]}>30°</Text>
                    <Text style={[styles.text6, styles.textTypo1]}>30°</Text>
                    <Text style={[styles.text7, styles.textTypo1]}>30°</Text>
                </View>
                <View style={[styles.time, styles.nowPosition]}>
                    <Text style={[styles.now, styles.nowPosition]}>Now</Text>
                    <Text style={[styles.text8, styles.textTypo]}>18</Text>
                    <Text style={[styles.text9, styles.textTypo]}>19</Text>
                    <Text style={[styles.text10, styles.textTypo]}>20</Text>
                    <Text style={[styles.text11, styles.textTypo]}>21</Text>
                    <Text style={[styles.text12, styles.textTypo]}>17</Text>
                </View>
            </View>
            <View style={styles.divider}>
                <View style={[styles.dividerChild, styles.dividerLayout]} />
                <View style={[styles.dividerItem, styles.dividerLayout]} />
            </View>
            <View style={[styles.parent, styles.parentLayout]}>
                <Text style={[styles.text13, styles.text13FlexBox]}>29°</Text>
                <Text style={[styles.cloudy, styles.parentLayout]}>{`Cloudy `}</Text>
                <Text style={[styles.h34L25, styles.h34L25Layout]}>
                    <Text style={styles.h34}>H:34</Text>
                    <Text style={[styles.text14, styles.cloudyTypo]}>{`°       `}</Text>
                    <Text style={styles.h34}>L:25</Text>
                    <Text style={[styles.text14, styles.cloudyTypo]}>°</Text>
                </Text>
            </View>
            <View style={[styles.description, styles.descriptionPosition]}>
                <Image style={[styles.humidityIcon, styles.iconLayout1]} resizeMode="cover" />
                <Image style={[styles.windIcon, styles.iconLayout1]} resizeMode="cover" />
                <View style={[styles.uvIndex, styles.iconLayout1]} />
                <Image style={styles.humidityIcon2} resizeMode="cover" />
                <Image style={[styles.windIcon2, styles.iconLayout]} resizeMode="cover" />
                <Image style={[styles.uvIcon, styles.iconLayout]} resizeMode="cover" />
                <Text style={styles.wind7kmh}>
                    <Text style={styles.wind7kmhTxtContainer}>
                        <Text style={styles.h34}>{`Wind: `}</Text>
                        <Text style={[styles.text14, styles.cloudyTypo]}>7km/h</Text>
                    </Text>
                </Text>
                <Text style={[styles.humidity64, styles.humidity64Layout]}>
                    <Text style={styles.wind7kmhTxtContainer}>
                        <Text style={styles.h34}>{`Humidity: `}</Text>
                        <Text style={[styles.text14, styles.cloudyTypo]}>64%</Text>
                    </Text>
                </Text>
                <Text style={[styles.uvIndex2Container, styles.humidity64Layout]}>
                    <Text style={styles.wind7kmhTxtContainer}>
                        <Text style={styles.h34}>{`UV Index:  `}</Text>
                        <Text style={[styles.text14, styles.cloudyTypo]}>2</Text>
                    </Text>
                </Text>
            </View>
            <View style={styles.page}>
                <Text style={[styles.today, styles.todayTypo]}>Today</Text>
                <Text style={[styles.tomorrow2, styles.todayTypo]}>Tomorrow</Text>
                <Image style={[styles.pageChild, styles.pageLayout]} resizeMode="cover" />
                <Image style={[styles.pageItem, styles.pageLayout]} resizeMode="cover" />
                <View style={[styles.pageInner, styles.lineIconPosition]} />
                <Image style={[styles.lineIcon, styles.lineIconPosition]} resizeMode="cover" />
            </View>
            <View style={[styles.topHeader, styles.h34L25Layout]}>
                <Pressable style={[styles.back, styles.iconLayout]} onPress={() => { navigation.goBack() }}>
                    <Text style={{ fontSize: 20 }}>🔙</Text>
                </Pressable>
                <Image style={[styles.addIcon, styles.h34L25Layout]} resizeMode="cover" />
            </View>
        </View>);
};

const styles = StyleSheet.create({
    text13FlexBox: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        textAlign: "center",
        fontFamily: "Sansation",
        fontWeight: "700",
        top: 0,
        position: "absolute"
    },
    textTypo2: {
        height: 22,
        width: 78,
        letterSpacing: 0.5,
        fontSize: 16,
        top: 38,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        textAlign: "center",
        color: "#fff",
        fontFamily: "Sansation",
        position: "absolute"
    },
    descriptionPosition: {
        left: 40,
        position: "absolute"
    },
    textTypo1: {
        width: 23,
        color: "#1f291e",
        fontSize: 13,
        height: 23,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        textAlign: "center",
        fontFamily: "Sansation",
        fontWeight: "700",
        top: 0,
        position: "absolute"
    },
    nowPosition: {
        height: 15,
        left: 0,
        top: 0,
        position: "absolute"
    },
    textTypo: {
        width: 43,
        height: 15,
        color: "#1f291e",
        fontSize: 13,
        textAlign: "center",
        fontFamily: "Sansation",
        top: 0,
        position: "absolute"
    },
    dividerLayout: {
        transform: [
            {
                rotate: "0.1deg"
            }
        ],
        height: 1,
        width: 391,
        borderTopWidth: 1,
        borderColor: "#1f291e",
        borderStyle: "solid",
        left: "50%",
        position: "absolute"
    },
    parentLayout: {
        width: 117,
        position: "absolute"
    },
    h34L25Layout: {
        height: 20,
        position: "absolute"
    },
    cloudyTypo: {
        fontWeight: "700",
        fontFamily: "Sansation"
    },
    iconLayout1: {
        height: 47,
        width: 112,
        borderRadius: 16,
        // @ts-ignore
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        position: "absolute"
    },
    iconLayout: {
        height: 17,
        width: 17,
        position: "absolute"
    },
    humidity64Layout: {
        width: 91,
        height: 27,
        fontSize: 12,
        color: "#1f291e",
        alignItems: "center",
        display: "flex",
        textAlign: "center",
        position: "absolute"
    },
    todayTypo: {
        height: 24,
        width: 87,
        color: "#1f291e",
        fontSize: 13,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        textAlign: "center",
        fontFamily: "Sansation",
        top: 0,
        position: "absolute"
    },
    pageLayout: {
        height: 6,
        width: 6,
        top: 38,
        position: "absolute"
    },
    lineIconPosition: {
        top: 23,
        position: "absolute"
    },
    tomorrow: {
        backgroundColor: "#f5f8f2",
        flexGrow: 0,
        flex: 1,
        maxWidth: "100%"
    },
    backgroudIcon: {
        width: 440,
        height: 956,
        left: 0,
        top: 0,
        position: "absolute"
    },
    imageIcon: {
        top: 250,
        left: 61,
        width: 318,
        height: 300,
        position: "absolute"
    },
    locationParent: {
        marginLeft: -74,
        top: 79,
        width: 156,
        height: 60,
        left: "50%",
        position: "absolute"
    },
    location: {
        marginLeft: -73,
        fontSize: 24,
        letterSpacing: 0.7,
        width: 138,
        textShadowColor: "rgba(0, 0, 0, 0.1)",
        textShadowOffset: {
            width: 0,
            height: 0
        },
        textShadowRadius: 4,
        color: "#fff",
        alignItems: "center",
        display: "flex",
        textAlign: "center",
        height: 60,
        left: "50%"
    },
    tuesday: {
        left: 0
    },
    text: {
        left: 78
    },
    announcement: {
        top: 729,
        height: 41,
        width: 357
    },
    temperature: {
        top: 18,
        left: 20,
        width: 327,
        height: 23,
        position: "absolute"
    },
    text2: {
        left: 0
    },
    text3: {
        left: 68
    },
    text4: {
        left: 127
    },
    text5: {
        left: 186
    },
    text6: {
        left: 245
    },
    text7: {
        left: 304
    },
    time: {
        width: 357
    },
    now: {
        width: 62,
        color: "#1f291e",
        fontSize: 13,
        textAlign: "center",
        fontFamily: "Sansation"
    },
    text8: {
        left: 137
    },
    text9: {
        left: 196
    },
    text10: {
        left: 255
    },
    text11: {
        left: 314
    },
    text12: {
        left: 78
    },
    divider: {
        marginLeft: -195,
        top: 718,
        width: 392,
        height: 63,
        left: "50%",
        position: "absolute"
    },
    dividerChild: {
        marginLeft: -196,
        top: 0
    },
    dividerItem: {
        marginLeft: -194,
        top: 62
    },
    parent: {
        top: 569,
        left: 161,
        height: 137
    },
    text13: {
        left: 12,
        fontSize: 50,
        width: 94,
        height: 94,
        color: "#1f291e"
    },
    cloudy: {
        marginLeft: -58,
        top: 74,
        fontSize: 36,
        textAlign: "left",
        height: 46,
        color: "#1f291e",
        fontFamily: "Sansation",
        fontWeight: "700",
        left: "50%"
    },
    h34L25: {
        marginLeft: -49,
        top: 117,
        width: 100,
        color: "#1f291e",
        fontSize: 13,
        textAlign: "center",
        left: "50%"
    },
    h34: {
        fontFamily: "Sansation"
    },
    text14: {
        fontFamily: "Sansation"
    },
    description: {
        top: 812,
        width: 360,
        height: 48
    },
    humidityIcon: {
        left: 0,
        top: 0
    },
    windIcon: {
        left: 123,
        top: 0
    },
    uvIndex: {
        left: 248,
        elevation: 4,
        backgroundColor: "#fff",
        top: 1
    },
    humidityIcon2: {
        left: 6,
        width: 16,
        height: 16,
        top: 17,
        position: "absolute"
    },
    windIcon2: {
        left: 132,
        top: 17
    },
    uvIcon: {
        left: 254,
        top: 17
    },
    wind7kmh: {
        left: 150,
        width: 83,
        height: 27,
        fontSize: 12,
        top: 11,
        color: "#1f291e",
        alignItems: "center",
        display: "flex",
        textAlign: "center",
        position: "absolute"
    },
    wind7kmhTxtContainer: {
        width: "100%"
    },
    humidity64: {
        top: 10,
        left: 24
    },
    uvIndex2Container: {
        left: 269,
        top: 11,
        width: 91
    },
    page: {
        top: 900,
        left: 103,
        width: 234,
        height: 44,
        position: "absolute"
    },
    today: {
        left: 9
    },
    tomorrow2: {
        left: 134
    },
    pageChild: {
        left: 107
    },
    pageItem: {
        left: 117
    },
    pageInner: {
        left: -1,
        borderColor: "rgba(45, 75, 42, 0.6)",
        borderTopWidth: 2,
        width: 236,
        height: 2,
        borderStyle: "solid",
        top: 23
    },
    lineIcon: {
        left: 112,
        width: 122,
        height: 0
    },
    topHeader: {
        top: 52,
        left: 39,
        width: 371
    },
    back: {
        top: 1,
        left: 0
    },
    icon: {
        height: "100%",
        width: "100%"
    },
    addIcon: {
        left: 351,
        width: 20,
        top: 0
    }
});

export default TomorrowWeather;
