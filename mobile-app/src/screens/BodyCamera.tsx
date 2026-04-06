import * as React from "react";
import {StyleSheet, View, Image, Text, Pressable} from "react-native";

const BodyCamera = () => {
    return (
        <View style={styles.bodyCamera}>
            <View style={[styles.dashcard, styles.dashcardPosition]} />
            <View style={[styles.topHeader, styles.topHeaderLayout]}>
                <Text style={[styles.bodycamManagement, styles.ahmadTypo]}>BodyCam Management</Text>
                <Pressable style={[styles.userProfile, styles.topHeaderLayout]} onPress={()=>{}}>
                    <Image style={styles.icon} resizeMode="cover" />
                </Pressable>
                <View style={styles.managerAccess}>
                    <Text style={[styles.managerAccess2, styles.textFlexBox]}>Manager Access</Text>
                    <View style={styles.managerAccessChild} />
                </View>
            </View>
            <View style={styles.globalParent}>
                <View style={[styles.global, styles.globalLayout]}>
                    <Image style={[styles.globalChild, styles.globalLayout]} resizeMode="cover" />
                    <Pressable style={[styles.startButton, styles.startLayout]} onPress={()=>{}}>
                        <View style={[styles.startButtonChild, styles.startLayout]} />
                        <Text style={styles.startShiftPower}>Start Shift (Power Cams ON)</Text>
                    </Pressable>
                    <Text style={[styles.globalShiftControl, styles.aFlexBox]}>Global Shift Control</Text>
                    <Text style={[styles.currentShiftsStatusContainer, styles.textFlexBox]}>
                        <Text style={styles.currentShiftsStatusContainer2}>
                            <Text style={styles.currentShiftsStatus}>
                                <Text style={[styles.currentShiftsStatus2, styles.ahmadTypo]}>{`Current Shifts Status: `}</Text>
                            </Text>
                            <Text style={styles.inactiveShiftManagementFor}>
                                <Text style={styles.currentShiftsStatus}>Inactive{'\n'}</Text>
                                <Text style={styles.shiftManagementFor}>Shift management for all active body cams.</Text>
                            </Text>
                        </Text>
                    </Text>
                </View>
                <Image style={[styles.globalIcon, styles.iconLayout]} resizeMode="cover" />
                <View style={[styles.dash, styles.dashIconLayout]}>
                    <View style={[styles.dashChild, styles.dashIconLayout]} />
                    <View style={[styles.team, styles.teamLayout2]}>
                        <Image style={styles.teamIcon} resizeMode="cover" />
                        <Text style={[styles.teamStatus, styles.search2Typo]}>Team Status</Text>
                    </View>
                    <View style={styles.search}>
                        <Text style={[styles.search2, styles.search2Position]}>Search</Text>
                        <Image style={[styles.maskGroupIcon, styles.maskGroupIconPosition]} resizeMode="cover" />
                    </View>
                </View>
            </View>
            <View style={[styles.team2, styles.teamLayout1]}>
                <View style={[styles.team3, styles.teamLayout1]}>
                    <View style={[styles.teamStatusParent, styles.teamLayout]}>
                        <Text style={[styles.teamStatus2, styles.teamLayout]}>Team Status</Text>
                        <Text style={[styles.active, styles.teamLayout]}>(Active -</Text>
                        <Text style={[styles.text, styles.teamLayout]}> 3)</Text>
                    </View>
                    <View style={[styles.nametag1, styles.nametagShadowBox]}>
                        <View style={[styles.nameIcon, styles.dashIconLayout]}>
                            <View style={[styles.nameIconChild, styles.childPosition]} />
                            <Image style={styles.nameIconItem} resizeMode="cover" />
                            <Text style={[styles.a, styles.aFlexBox]}>A</Text>
                        </View>
                        <View style={[styles.nameIcon, styles.dashIconLayout]}>
                            <Pressable style={[styles.nameIconChild, styles.childPosition]} onPress={()=>{}} />
                            <Image style={styles.nameIconItem} resizeMode="cover" />
                            <Text style={[styles.a, styles.aFlexBox]}>A</Text>
                        </View>
                        <Text style={styles.ahmadFieldWorkerContainer}>
                            <Text style={[styles.ahmad, styles.ahmadTypo]}>Ahmad{'\n'}</Text>
                            <Text style={styles.fieldWorker}>Field Worker</Text>
                        </Text>
                        <View style={styles.nametag1Child} />
                        <Image style={[styles.nametag1Item, styles.search2Position]} resizeMode="cover" />
                        <Text style={[styles.online, styles.onlineTypo]}>Online</Text>
                    </View>
                    <View style={[styles.nametag2, styles.dashIconLayout]}>
                        <View style={[styles.nameIcon, styles.dashIconLayout]}>
                            <View style={[styles.nameIconChild, styles.childPosition]} />
                            <Image style={styles.nameIconItem} resizeMode="cover" />
                            <Text style={[styles.a, styles.aFlexBox]}>A</Text>
                        </View>
                        <View style={[styles.nameIcon4, styles.nametagShadowBox]}>
                            <View style={[styles.nameIconChild, styles.childPosition]} />
                            <Image style={styles.nameIconItem} resizeMode="cover" />
                            <Text style={[styles.a, styles.aFlexBox]}>A</Text>
                        </View>
                        <Text style={styles.ahmadFieldWorkerContainer}>
                            <Text style={[styles.ahmad, styles.ahmadTypo]}>Ahmad{'\n'}</Text>
                            <Text style={styles.fieldWorker}>Field Worker</Text>
                        </Text>
                        <View style={styles.nametag1Child} />
                        <Image style={[styles.nametag1Item, styles.search2Position]} resizeMode="cover" />
                        <Text style={[styles.online, styles.onlineTypo]}>Online</Text>
                    </View>
                    <View style={[styles.nametag3, styles.nametagShadowBox]}>
                        <View style={[styles.nameIcon, styles.dashIconLayout]}>
                            <View style={[styles.nameIconChild, styles.childPosition]} />
                            <Image style={styles.nameIconItem} resizeMode="cover" />
                            <Text style={[styles.a, styles.aFlexBox]}>A</Text>
                        </View>
                        <View style={[styles.nameIcon, styles.dashIconLayout]}>
                            <View style={[styles.nameIconChild, styles.childPosition]} />
                            <Image style={styles.nameIconItem} resizeMode="cover" />
                            <Text style={[styles.a, styles.aFlexBox]}>A</Text>
                        </View>
                        <Text style={styles.ahmadFieldWorkerContainer}>
                            <Text style={[styles.ahmad, styles.ahmadTypo]}>Ahmad{'\n'}</Text>
                            <Text style={styles.fieldWorker}>Field Worker</Text>
                        </Text>
                        <View style={styles.nametag1Child} />
                        <Image style={[styles.nametag1Item, styles.search2Position]} resizeMode="cover" />
                        <Text style={[styles.online, styles.onlineTypo]}>Online</Text>
                    </View>
                </View>
            </View>
            <Pressable style={[styles.buddy, styles.buddyLayout]} onPress={()=>{}}>
                <View style={[styles.buddyChild, styles.buddyLayout]} />
                <Text style={[styles.buddy2, styles.teamLayout]}>Buddy</Text>
                <Image style={styles.image10Icon} source={require("assets/image/buddySmall.png")} resizeMode="cover" />
            </Pressable>
        </View>
    );
};
            						
const styles = StyleSheet.create({
    dashcardPosition: {
        width: 440,
        left: 0,
        position: "absolute"
    },
    topHeaderLayout: {
        height: 45,
        position: "absolute"
    },
    ahmadTypo: {
        fontWeight: "700",
        fontFamily: "Sansation"
    },
    textFlexBox: {
        alignItems: "center",
        display: "flex"
    },
    globalLayout: {
        height: 175,
        width: 371,
        left: "50%",
        position: "absolute"
    },
    startLayout: {
        height: 51,
        width: 281,
        position: "absolute"
    },
    aFlexBox: {
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        fontFamily: "Sansation"
    },
    iconLayout: {
        width: 30,
        height: 30,
        position: "absolute"
    },
    dashIconLayout: {
        height: 76,
        width: 371,
        position: "absolute"
    },
    teamLayout2: {
        width: 85,
        position: "absolute"
    },
    search2Typo: {
        fontSize: 12,
        justifyContent: "center",
        textAlign: "center",
        height: 13,
        alignItems: "center",
        display: "flex",
        color: "#1f291e",
        fontFamily: "Sansation",
        left: 0
    },
    search2Position: {
        top: 35,
        position: "absolute"
    },
    maskGroupIconPosition: {
        left: 4,
        top: 0
    },
    teamLayout1: {
        height: 285,
        width: 371,
        position: "absolute"
    },
    teamLayout: {
        height: 21,
        position: "absolute"
    },
    nametagShadowBox: {
        elevation: 4,
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.5)",
        height: 76,
        width: 371,
        left: 0,
        position: "absolute"
    },
    childPosition: {
        borderRadius: 8,
        top: 0,
        left: 0
    },
    onlineTypo: {
        color: "#2d4b2a",
        fontSize: 11,
        fontFamily: "Sansation",
        position: "absolute"
    },
    buddyLayout: {
        height: 37,
        width: 104,
        position: "absolute"
    },
    bodyCamera: {
        height: 956,
        backgroundColor: "#f5f8f2",
        overflow: "hidden",
        width: "100%"
    },
    dashcard: {
        top: 121,
        boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.2)",
        elevation: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "#fff",
        height: 795
    },
    topHeader: {
        top: 66,
        left: 24,
        width: 394
    },
    bodycamManagement: {
        top: 4,
        left: 177,
        textAlign: "right",
        color: "#1f291e",
        fontFamily: "Sansation",
        fontSize: 20,
        position: "absolute"
    },
    userProfile: {
        width: 45,
        top: 0,
        left: 0
    },
    icon: {
        height: "100%",
        // @ts-ignore
        nodeWidth: 45,
        // @ts-ignore
        nodeHeight: 45,
        width: "100%"
    },
    managerAccess: {
        top: 28,
        left: 306,
        height: 12,
        width: 88,
        position: "absolute"
    },
    managerAccess2: {
        top: 1,
        left: 2,
        justifyContent: "flex-end",
        width: 84,
        height: 8,
        color: "#2d4b2a",
        fontSize: 11,
        fontFamily: "Sansation",
        position: "absolute",
        textAlign: "right"
    },
    managerAccessChild: {
        borderRadius: 4,
        borderStyle: "solid",
        borderColor: "#2d4b2a",
        borderWidth: 1,
        width: 89,
        height: 13,
        top: 0,
        left: 0,
        position: "absolute"
    },
    globalParent: {
        marginLeft: -200,
        top: 140,
        width: 400,
        height: 668,
        left: "50%",
        position: "absolute",
        overflow: "hidden"
    },
    global: {
        marginLeft: -185,
        elevation: 7,
        boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.8)",
        top: 20
    },
    globalChild: {
        marginLeft: -185,
        borderRadius: 16,
        top: 0
    },
    startButton: {
        top: 103,
        left: 39
    },
    startButtonChild: {
        borderRadius: 10,
        backgroundColor: "#2d4b2a",
        top: 0,
        left: 0
    },
    startShiftPower: {
        marginLeft: -130,
        top: 10,
        width: 262,
        height: 30,
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        left: "50%",
        alignItems: "center",
        display: "flex",
        fontFamily: "Sansation",
        fontSize: 20,
        position: "absolute"
    },
    globalShiftControl: {
        left: 58,
        width: 181,
        height: 28,
        top: 20,
        color: "#1f291e",
        fontSize: 20,
        position: "absolute"
    },
    currentShiftsStatusContainer: {
        top: 61,
        left: 21,
        width: 265,
        height: 34,
        textAlign: "left",
        color: "#1f291e",
        position: "absolute"
    },
    currentShiftsStatusContainer2: {
        width: "100%"
    },
    currentShiftsStatus: {
        fontSize: 14
    },
    currentShiftsStatus2: {
        fontFamily: "Sansation"
    },
    inactiveShiftManagementFor: {
        fontFamily: "Sansation"
    },
    shiftManagementFor: {
        fontSize: 13
    },
    globalIcon: {
        top: 38,
        left: 33
    },
    dash: {
        top: 222,
        left: 15,
        elevation: 7,
        boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.8)"
    },
    dashChild: {
        backgroundColor: "#e8ece4",
        borderRadius: 16,
        top: 0,
        left: 0
    },
    team: {
        top: 12,
        left: 62,
        height: 53
    },
    teamIcon: {
        left: 23,
        width: 40,
        height: 40,
        top: 0,
        position: "absolute"
    },
    teamStatus: {
        top: 40,
        width: 85,
        position: "absolute"
    },
    search: {
        top: 18,
        left: 245,
        height: 48,
        width: 38,
        position: "absolute"
    },
    search2: {
        width: 38,
        fontSize: 12,
        justifyContent: "center",
        textAlign: "center",
        height: 13,
        alignItems: "center",
        display: "flex",
        color: "#1f291e",
        fontFamily: "Sansation",
        left: 0
    },
    maskGroupIcon: {
        width: 30,
        height: 30,
        position: "absolute"
    },
    team2: {
        top: 465,
        left: 35
    },
    team3: {
        top: 0,
        left: 0
    },
    teamStatusParent: {
        width: 159,
        left: 4,
        top: 0
    },
    teamStatus2: {
        fontSize: 14,
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        fontFamily: "Sansation",
        width: 88,
        top: 0,
        color: "#1f291e",
        left: 0
    },
    active: {
        left: 88,
        width: 53,
        fontSize: 14,
        textAlign: "left",
        alignItems: "center",
        display: "flex",
        top: 0,
        color: "#1f291e",
        fontFamily: "Sansation"
    },
    text: {
        left: 141,
        width: 18,
        fontSize: 14,
        textAlign: "left",
        alignItems: "center",
        display: "flex",
        top: 0,
        color: "#1f291e",
        fontFamily: "Sansation"
    },
    nametag1: {
        top: 21
    },
    nameIcon: {
        top: 0,
        left: 0
    },
    nameIconChild: {
        backgroundColor: "#d9d9d9",
        height: 76,
        width: 371,
        position: "absolute"
    },
    nameIconItem: {
        top: 13,
        left: 20,
        width: 50,
        height: 50,
        position: "absolute"
    },
    a: {
        top: 26,
        left: 34,
        fontSize: 32,
        width: 21,
        height: 24,
        color: "#1f291e",
        position: "absolute"
    },
    ahmadFieldWorkerContainer: {
        top: 17,
        left: 80,
        width: 105,
        height: 39,
        textAlign: "left",
        color: "#1f291e",
        position: "absolute"
    },
    ahmad: {
        fontFamily: "Sansation",
        fontSize: 20
    },
    fieldWorker: {
        fontSize: 16,
        fontFamily: "Sansation"
    },
    nametag1Child: {
        top: 31,
        left: 291,
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        width: 57,
        height: 15,
        borderRadius: 16,
        position: "absolute"
    },
    nametag1Item: {
        left: 297,
        width: 6,
        height: 6
    },
    online: {
        top: 32,
        left: 309,
        width: 34,
        height: 10,
        textAlign: "left"
    },
    nametag2: {
        top: 115,
        left: 0
    },
    nameIcon4: {
        top: 0
    },
    nametag3: {
        top: 209
    },
    buddy: {
        top: 820,
        left: 316
    },
    buddyChild: {
        backgroundColor: "#a25a28",
        borderRadius: 8,
        top: 0,
        left: 0
    },
    buddy2: {
        top: 7,
        left: 38,
        fontSize: 15,
        width: 59,
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        fontFamily: "Sansation",
        color: "#fff",
        height: 21,
        fontWeight: "700"
    },
    image10Icon: {
        top: 5,
        left: 13,
        width: 25,
        height: 25,
        position: "absolute"
    }
});
            						
export default BodyCamera;
