import * as React from "react";
import {StyleSheet, View, Text, Image, Pressable, ScrollView} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const HomePage = () => {
    const navigation = useNavigation();
    type SensorState = 'off' | 'activating' | 'on' | 'deactivating';
    const [sensorState, setSensorState] = React.useState<SensorState>('off');

    const handleSensorPress = () => {
        if (sensorState === 'off') {
            setSensorState('activating');
            setTimeout(() => setSensorState('on'), 1500);
        } else if (sensorState === 'on') {
            setSensorState('deactivating');
            setTimeout(() => setSensorState('off'), 1500);
        }
    };

  	return (
    		<View style={styles.homePage}>
      			<View style={[styles.dashboard, styles.dashboardPosition]} />
      			<View style={styles.dashcard} />
      			<View style={[styles.topHeaeder, styles.topHeaederLayout]}>
        				<Text style={[styles.goodMorning, styles.locationClr]}>Good Morning</Text>
        				<Pressable style={[styles.userProfile, styles.topHeaederLayout]} onPress={()=>{ navigation.navigate('Settings' as never) }}>
          					<Image style={styles.icon as any} source={require('../assets/image/FarmerIcon.png')} resizeMode="cover" />
        				</Pressable>
      			</View>
      			<ScrollView style={styles.homePageInner} contentContainerStyle={{ height: 1050, paddingBottom: 40 }}>
        				<View style={styles.weatherParent}>
          					<Pressable style={styles.weather} onPress={()=>{}}>
            						<View style={styles.weatherCard} />
            						<Text style={[styles.location, styles.textFlexBox1]}>Location</Text>
            						<Text style={[styles.text, styles.textLayout]}>30°</Text>
            						<Image style={[styles.maskGroupIcon, styles.kLayout]} source={require('../assets/image/Location icon.png')} resizeMode="cover" />
            						<Text style={[styles.mostlyCleared, styles.textTypo]}>Mostly Cleared</Text>
            						<View style={styles.groupParent}>
              							<View style={[styles.weatherIconParent, styles.activeAnomaliesLayout]}>
                								<Image style={[styles.weatherIcon, styles.iconLayout]} source={require('../assets/image/SunnyCloud.png')} resizeMode="cover" />
                								<Image style={[styles.image7Icon, styles.iconLayout]} source={require('../assets/image/SunnyCloud.png')} resizeMode="cover" />
                								<Image style={[styles.sunnyWeatherIcon, styles.text4Position]} source={require('../assets/image/Sunny weather.png')} resizeMode="cover" />
                								<Image style={[styles.image9Icon, styles.text5Position]} source={require('../assets/image/Rain.png')} resizeMode="cover" />
                								<Image style={[styles.image6Icon, styles.text6Position]} source={require('../assets/image/cloud.png')} resizeMode="cover" />
                								<Image style={[styles.image3Icon, styles.text7Position]} source={require('../assets/image/cloud.png')} resizeMode="cover" />
                								<Image style={[styles.image8Icon, styles.text8Position]} source={require('../assets/image/Rain.png')} resizeMode="cover" />
              							</View>
              							<View style={[styles.monParent, styles.textParentLayout]}>
                								<Text style={[styles.mon, styles.monTypo]}>Mon</Text>
                								<Text style={[styles.tue, styles.monTypo]}>Tue</Text>
                								<Text style={[styles.wed, styles.monTypo]}>Wed</Text>
                								<Text style={[styles.thur, styles.monTypo]}>Thur</Text>
                								<Text style={[styles.fri, styles.monTypo]}>Fri</Text>
                								<Text style={[styles.sat, styles.monTypo]}>Sat</Text>
                								<Text style={[styles.sun, styles.monTypo]}>Sun</Text>
              							</View>
              							<View style={[styles.parent, styles.textParentLayout]}>
                								<Text style={[styles.text2, styles.textParentLayout]}>30°</Text>
                								<Text style={[styles.text3, styles.textParentLayout]}>30°</Text>
                								<Text style={[styles.text4, styles.textParentLayout]}>33°</Text>
                								<Text style={[styles.text5, styles.textParentLayout]}>27°</Text>
                								<Text style={[styles.text6, styles.textParentLayout]}>29°</Text>
                								<Text style={[styles.text7, styles.textParentLayout]}>28°</Text>
                								<Text style={[styles.text8, styles.textParentLayout]}>27°</Text>
              							</View>
            						</View>
            						<Image style={styles.weatherIcon2} resizeMode="cover" />
          					</Pressable>
          					<View style={styles.summaryUpdates}>
            						<Image style={styles.summaryIcon} resizeMode="cover" />
            						<Text style={[styles.summaryUpdates2, styles.textFlexBox1]}>Summary Updates</Text>
            						<Image style={[styles.summaryUpdatesChild, styles.summaryLayout]} resizeMode="cover" />
            						<Image style={[styles.summaryUpdatesItem, styles.summaryLayout]} resizeMode="cover" />
            						<Image style={styles.cropIcon} source={require('../assets/image/crop.png')} resizeMode="cover" />
            						<Image style={styles.farmerIcon} source={require('../assets/image/FarmerIcon.png')} resizeMode="cover" />
            						<Image style={styles.summaryPosition} resizeMode="cover" />
            						<Image style={styles.ellipseIconPosition} resizeMode="cover" />
            						<Image style={[styles.summaryUpdatesChild2, styles.ellipseIconPosition]} resizeMode="cover" />
            						<Image style={[styles.summaryUpdatesChild3, styles.summaryPosition]} resizeMode="cover" />
            						<Text style={[styles.text9, styles.textFlexBox]}>93%</Text>
            						<Text style={[styles.text10, styles.textFlexBox1]}>75%</Text>
            						<Text style={[styles.laborEfficiency, styles.soilTypo]}>Labor Efficiency</Text>
            						<Text style={[styles.cropHealth, styles.soilTypo]}>Crop Health</Text>
          					</View>
          					<Pressable style={[styles.safety, styles.safetyLayout]} onPress={()=>{}}>
            						<View style={[styles.safety2, styles.safety2ShadowBox]} />
            						<Image style={[styles.maskGroupIcon2, styles.maskGroupIcon2Layout]} resizeMode="cover" />
            						<Text style={[styles.safetyCheck, styles.safetyCheckLayout]}>Safety Check :</Text>
            						<Text style={[styles.activeAnomalies, styles.safetyCheckFlexBox]}>Active Anomalies : 0</Text>
          					</Pressable>
          					<Pressable style={[styles.ai, styles.aiLayout]} onPress={()=>{}}>
            						<View style={[styles.aiChild, styles.aiLayout]} />
            						<Text style={styles.geminiAiInsight}>Gemini AI Insight:</Text>
          					</Pressable>
          					<View style={[styles.sensorOff, styles.sensorLayout]}>
            						<View style={[styles.farmerSensor, styles.sensorLayout]}>
              							<View style={[styles.farmerSensor2, styles.sensorLayout]} />
              							<View style={[styles.npkContent, styles.valueLayout]} />
              							<View style={[styles.phValue, styles.valueLayout]} />
              							<View style={[styles.phValue2, styles.valueLayout]} />
              							<Text style={[styles.farmSensorData, styles.maskGroupIcon2Layout]}>Farm Sensor Data</Text>
              							<Image style={[styles.editIcon, styles.editIconLayout]} source={require('../assets/image/Edit.png')} resizeMode="cover" />
              							<Text style={[styles.soilSensor, styles.soilTypo]}>Soil Sensor</Text>
              							<Pressable style={styles.actvateButton} onPress={handleSensorPress}>
                								<View style={styles.activatePosition}>
                  									<View style={[
                                          styles.activateButton, 
                                          styles.activatePosition,
                                          { backgroundColor: (sensorState === 'on' || sensorState === 'deactivating') ? "rgba(34, 197, 94, 0.72)" : "#2d4b2a" }
                                        ]} />
                  									<Text style={[styles.iotSensor, styles.buddy2Typo]}>IoT Sensor</Text>
                  									<Image style={[styles.activateIcon, styles.activateIconLayout]} resizeMode="cover" />
                								</View>
              							</Pressable>
              							<Text style={[styles.phValue3, styles.editIconLayout]}>ph value</Text>
              							<Text style={styles.npkContent2}>NPK Content</Text>
              							<Text style={[styles.soilMoisture, styles.activateIconLayout]}>Soil Moisture</Text>
              							<Text style={[styles.text11, styles.textFlexBox]}>65%</Text>
              							<Image style={[styles.farmerSensorChild, styles.farmerPosition]} resizeMode="cover" />
              							<Image style={[styles.farmerSensorChild, styles.farmerPosition]} resizeMode="cover" />
              							<Image style={[styles.farmerSensorInner, styles.farmerPosition]} resizeMode="cover" />
              							<Image style={[styles.farmerSensorInner, styles.farmerPosition]} resizeMode="cover" />
            						</View>
            						<Text style={[styles.n, styles.nLayout]}>N</Text>
            						<Text style={[styles.p, styles.pFlexBox]}>P</Text>
            						<Text style={[styles.k, styles.nLayout]}>K</Text>
            						<View style={[styles.sensorOffChild, styles.sensorPosition]} />
            						<View style={[styles.sensorOffItem, styles.sensorPosition]} />
            						<View style={[styles.sensorOffInner, styles.rectangleViewPosition]} />
            						<View style={[styles.rectangleView, styles.rectangleViewPosition]} />
            						<View style={[styles.sensorOffChild2, styles.sensorChildPosition]} />
            						<View style={[styles.sensorOffChild3, styles.sensorChildPosition]} />
            						<LinearGradient style={[styles.wrapper, styles.icon2Layout]} locations={[0,0.14,0.26,0.39,0.5,0.63,0.75,0.84,0.98]} colors={['#dc2626','#f97316','#f59e0b','#84cc16','#22c55e','#14b8a6','#0ea5e9','#2563eb','#9333ea']} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}>
              							<Image style={styles.icon2Layout as any} resizeMode="cover" />
            						</LinearGradient>
            						<Image style={[styles.sensorOffChild4, styles.wrapperPosition]} resizeMode="cover" />
            						<Text style={[styles.text12, styles.pFlexBox]}>6.5</Text>
            						{sensorState === 'activating' && (
              							<View style={[styles.activated, styles.kLayout]}>
                							<Text style={[styles.activatedIotSensor, styles.textTypo]}>Activated IoT Sensor</Text>
              							</View>
            						)}
            						{sensorState === 'deactivating' && (
              							<View style={[styles.deactivate, styles.kLayout]}>
                							<Text style={[styles.deactivatedIotSensor, styles.textTypo]}>Deactivated IoT Sensor</Text>
              							</View>
            						)}
          					</View>
        				</View>
      			</ScrollView>
      			<Pressable style={[styles.buddy, styles.buddyLayout]} onPress={()=>{}}>
        				<View style={[styles.buddyChild, styles.buddyLayout]} />
        				<Text style={[styles.buddy2, styles.buddy2Typo]}>Buddy</Text>
        				<Image style={[styles.image10Icon, styles.safetyCheckLayout]} source={require('../assets/image/buddySmall.png')} resizeMode="cover" />
      			</Pressable>
      			<Image style={[styles.taskbarIcon, styles.dashboardPosition]} resizeMode="cover" />
    		</View>);
};

const styles = StyleSheet.create({
  	dashboardPosition: {
    		width: 440,
    		left: 0,
    		position: "absolute"
  	},
  	topHeaederLayout: {
    		height: 45,
    		position: "absolute"
  	},
  	locationClr: {
    		color: "#1f291e",
    		position: "absolute"
  	},
  	homePageInnerFlexBox: {
    		height: 800,
    		position: "absolute"
  	},
  	textFlexBox1: {
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		fontFamily: "Sansation",
    		fontWeight: "700"
  	},
  	textLayout: {
    		width: 94,
    		color: "#1f291e",
    		position: "absolute"
  	},
  	kLayout: {
    		height: 15,
    		position: "absolute"
  	},
  	textTypo: {
    		fontSize: 10,
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		color: "#1f291e",
    		fontFamily: "Sansation",
    		fontWeight: "700"
  	},
  	activeAnomaliesLayout: {
    		height: 30,
    		position: "absolute"
  	},
  	iconLayout: {
    		width: 30,
    		height: 30,
    		position: "absolute"
  	},
  	text4Position: {
    		left: 92,
    		top: 0
  	},
  	text5Position: {
    		left: 138,
    		top: 0
  	},
  	text6Position: {
    		left: 184,
    		top: 0
  	},
  	text7Position: {
    		left: 230,
    		top: 0
  	},
  	text8Position: {
    		left: 276,
    		top: 0
  	},
  	textParentLayout: {
    		height: 10,
    		position: "absolute"
  	},
  	monTypo: {
    		height: 9,
    		width: 25,
    		fontSize: 10,
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		color: "#1f291e",
    		fontFamily: "Sansation",
    		fontWeight: "700",
    		position: "absolute"
  	},
  	summaryLayout: {
    		height: 88,
    		borderRadius: 16,
    		position: "absolute"
  	},
  	ellipseIconPosition: {
    		left: 212,
    		top: 46,
    		height: 100,
    		width: 100,
    		position: "absolute"
  	},
  	summaryPosition: {
    		height: 100,
    		width: 100,
    		left: 58,
    		top: 44,
    		position: "absolute"
  	},
  	textFlexBox: {
    		width: 42,
    		color: "#000",
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		fontFamily: "Sansation",
    		fontWeight: "700",
    		position: "absolute"
  	},
  	soilTypo: {
    		fontSize: 15,
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		fontFamily: "Sansation",
    		fontWeight: "700"
  	},
  	safetyLayout: {
    		height: 93,
    		width: 381,
    		position: "absolute"
  	},
  	safety2ShadowBox: {
    		elevation: 7,
// @ts-ignore
    		boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.8)",
    		backgroundColor: "#e8ece4",
    		borderRadius: 16,
    		left: 0,
    		top: 0
  	},
  	maskGroupIcon2Layout: {
    		height: 28,
    		position: "absolute"
  	},
  	safetyCheckLayout: {
    		height: 25,
    		position: "absolute"
  	},
  	safetyCheckFlexBox: {
    		left: 29,
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		color: "#1f291e",
    		fontFamily: "Sansation",
    		fontWeight: "700"
  	},
  	aiLayout: {
    		height: 105,
    		width: 380,
    		position: "absolute"
  	},
  	sensorLayout: {
    		height: 272,
    		width: 379,
    		position: "absolute"
  	},
  	valueLayout: {
    		height: 123,
    		width: 105,
    		top: 75,
    		borderRadius: 8,
    		backgroundColor: "#fff",
    		position: "absolute"
  	},
  	editIconLayout: {
    		height: 22,
    		position: "absolute"
  	},
  	activatePosition: {
    		marginLeft: -94,
    		height: 41,
    		width: 189,
    		left: "50%",
    		top: 0,
    		position: "absolute"
  	},
  	buddy2Typo: {
    		color: "#fff",
    		fontSize: 15,
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		fontFamily: "Sansation",
    		fontWeight: "700",
    		position: "absolute"
  	},
  	activateIconLayout: {
    		height: 20,
    		position: "absolute"
  	},
  	farmerPosition: {
    		width: 64,
    		top: 117,
    		position: "absolute"
  	},
  	nLayout: {
    		width: 17,
    		left: 266,
    		fontSize: 15
  	},
  	pFlexBox: {
    		top: 139,
    		color: "#000",
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		fontFamily: "Sansation",
    		fontWeight: "700",
    		position: "absolute"
  	},
  	sensorPosition: {
    		height: 8,
    		left: 288,
    		top: 119,
    		borderRadius: 100,
    		position: "absolute"
  	},
  	rectangleViewPosition: {
    		top: 143,
    		height: 8,
    		left: 288,
    		borderRadius: 100,
    		position: "absolute"
  	},
  	sensorChildPosition: {
    		top: 167,
    		height: 8,
    		left: 288,
    		borderRadius: 100,
    		position: "absolute"
  	},
  	icon2Layout: {
    		backgroundColor: "transparent",
    		height: "100%",
    		width: "100%"
  	},
  	wrapperPosition: {
    		top: 122,
    		left: 155,
    		position: "absolute"
  	},
  	buddyLayout: {
    		height: 37,
    		width: 104,
    		position: "absolute"
  	},
  	homePage: {
    		height: 957,
    		width: "100%"
  	},
  	dashboard: {
    		backgroundColor: "#f5f8f2",
    		height: 956,
    		top: 0
  	},
  	dashcard: {
    		top: 121,
// @ts-ignore
    		boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.2)",
    		borderTopLeftRadius: 20,
    		borderTopRightRadius: 20,
    		height: 795,
    		backgroundColor: "#fff",
    		elevation: 5,
    		width: 440,
    		left: 0,
    		position: "absolute"
  	},
  	topHeaeder: {
    		top: 66,
    		left: 24,
    		width: 394
  	},
  	goodMorning: {
    		left: 265,
    		textAlign: "right",
    		fontFamily: "Sansation",
    		fontWeight: "700",
    		color: "#1f291e",
    		fontSize: 20,
    		top: 11
  	},
  	userProfile: {
    		width: 45,
    		left: 0,
    		top: 0
  	},
  	icon: {
// @ts-ignore
    		nodeWidth: 45,
// @ts-ignore
    		nodeHeight: 45,
    		height: "100%",
    		width: "100%"
  	},
  	homePageInner: {
    		marginLeft: -200,
    		top: 140,
    		width: 400,
    		maxWidth: 400,
    		left: "50%",
    		height: 800,
    		position: "absolute"
  	},
  	weatherParent: {
    		left: -4,
    		backgroundColor: "rgba(255, 255, 255, 0)",
    		width: 405,
    		maxWidth: 405,
    		top: 0
  	},
  	weather: {
    		height: 179,
    		width: 380,
    		left: 11,
    		top: 12,
    		position: "absolute"
  	},
  	weatherCard: {
// @ts-ignore
    		boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.25)",
    		backgroundColor: "#e8ece4",
    		borderRadius: 16,
    		height: 179,
    		width: 380,
    		elevation: 5,
    		left: 0,
    		top: 0,
    		position: "absolute"
  	},
  	location: {
    		left: 31,
    		width: 84,
    		height: 29,
    		top: 15,
    		color: "#1f291e",
    		position: "absolute",
    		fontSize: 20
  	},
  	text: {
    		top: 32,
    		left: 27,
    		fontSize: 50,
    		height: 94,
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		fontFamily: "Sansation",
    		fontWeight: "700"
  	},
  	maskGroupIcon: {
    		top: 23,
    		width: 15,
    		left: 16
  	},
  	mostlyCleared: {
    		top: 53,
    		left: 291,
    		width: 69,
    		height: 18,
    		position: "absolute"
  	},
  	groupParent: {
    		top: 105,
    		left: 35,
    		height: 60,
    		width: 306,
    		position: "absolute"
  	},
  	weatherIconParent: {
    		width: 306,
    		top: 15,
    		left: 0
  	},
  	weatherIcon: {
    		left: 0,
    		top: 0
  	},
  	image7Icon: {
    		left: 46,
    		top: 0
  	},
  	sunnyWeatherIcon: {
    		width: 30,
    		height: 30,
    		position: "absolute"
  	},
  	image9Icon: {
    		width: 30,
    		height: 30,
    		position: "absolute"
  	},
  	image6Icon: {
    		width: 30,
    		height: 30,
    		position: "absolute"
  	},
  	image3Icon: {
    		width: 30,
    		height: 30,
    		position: "absolute"
  	},
  	image8Icon: {
    		width: 30,
    		height: 30,
    		position: "absolute"
  	},
  	monParent: {
    		width: 306,
    		left: 0,
    		top: 0
  	},
  	mon: {
    		top: 1,
    		height: 9,
    		left: 0
  	},
  	tue: {
    		top: 1,
    		height: 9,
    		left: 46
  	},
  	wed: {
    		left: 95,
    		top: 1,
    		height: 9
  	},
  	thur: {
    		left: 141,
    		top: 0
  	},
  	fri: {
    		left: 188,
    		top: 0
  	},
  	sat: {
    		left: 232,
    		top: 0
  	},
  	sun: {
    		left: 281,
    		top: 0
  	},
  	parent: {
    		top: 50,
    		left: 6,
    		width: 295
  	},
  	text2: {
    		width: 19,
    		fontSize: 10,
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		color: "#1f291e",
    		fontFamily: "Sansation",
    		fontWeight: "700",
    		left: 0,
    		top: 0
  	},
  	text3: {
    		width: 19,
    		left: 46,
    		fontSize: 10,
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		color: "#1f291e",
    		fontFamily: "Sansation",
    		fontWeight: "700",
    		top: 0
  	},
  	text4: {
    		width: 19,
    		left: 92,
    		top: 0,
    		fontSize: 10,
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		color: "#1f291e",
    		fontFamily: "Sansation",
    		fontWeight: "700"
  	},
  	text5: {
    		width: 19,
    		left: 138,
    		top: 0,
    		fontSize: 10,
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		color: "#1f291e",
    		fontFamily: "Sansation",
    		fontWeight: "700"
  	},
  	text6: {
    		width: 19,
    		left: 184,
    		top: 0,
    		fontSize: 10,
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		color: "#1f291e",
    		fontFamily: "Sansation",
    		fontWeight: "700"
  	},
  	text7: {
    		width: 19,
    		left: 230,
    		top: 0,
    		fontSize: 10,
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		color: "#1f291e",
    		fontFamily: "Sansation",
    		fontWeight: "700"
  	},
  	text8: {
    		width: 19,
    		left: 276,
    		top: 0,
    		fontSize: 10,
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		color: "#1f291e",
    		fontFamily: "Sansation",
    		fontWeight: "700"
  	},
  	weatherIcon2: {
    		left: 325,
    		width: 36,
    		height: 36,
    		top: 16,
    		borderRadius: 16,
    		position: "absolute"
  	},
  	summaryUpdates: {
    		top: 222,
    		height: 187,
    		left: 10,
    		width: 380,
    		position: "absolute"
  	},
  	summaryIcon: {
// @ts-ignore
    		boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.8)",
    		height: 187,
    		borderRadius: 16,
    		width: 380,
    		left: 0,
    		top: 0,
    		position: "absolute"
  	},
  	summaryUpdates2: {
    		marginLeft: -91,
    		top: 4,
    		width: 181,
    		height: 35,
    		left: "50%",
    		color: "#1f291e",
    		position: "absolute",
    		fontSize: 20
  	},
  	summaryUpdatesChild: {
    		top: 52,
    		left: 63,
    		width: 88
  	},
  	summaryUpdatesItem: {
    		top: 51,
    		left: 217,
    		width: 93
  	},
  	cropIcon: {
    		top: 70,
    		left: 247,
    		height: 33,
    		width: 33,
    		borderRadius: 16,
    		position: "absolute"
  	},
  	farmerIcon: {
    		top: 67,
    		left: 90,
    		width: 31,
    		height: 31,
    		borderRadius: 16,
    		position: "absolute"
  	},
  	summaryUpdatesChild2: {
    		borderRadius: 100
  	},
  	summaryUpdatesChild3: {
    		borderRadius: 100
  	},
  	text9: {
    		top: 97,
    		left: 88,
    		fontSize: 18,
    		height: 29
  	},
  	text10: {
    		top: 100,
    		left: 240,
    		width: 47,
    		height: 24,
    		color: "#000",
    		fontSize: 18,
    		position: "absolute"
  	},
  	laborEfficiency: {
    		top: 151,
    		left: 53,
    		width: 111,
    		height: 19,
    		color: "#1f291e",
    		position: "absolute"
  	},
  	cropHealth: {
    		top: 153,
    		left: 219,
    		height: 16,
    		width: 94,
    		color: "#1f291e",
    		position: "absolute"
  	},
  	safety: {
    		top: 440,
    		left: 10
  	},
  	safety2: {
    		height: 93,
    		width: 381,
    		position: "absolute"
  	},
  	maskGroupIcon2: {
    		top: 33,
    		left: 334,
    		width: 28
  	},
  	safetyCheck: {
    		width: 137,
    		left: 29,
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		color: "#1f291e",
    		fontFamily: "Sansation",
    		fontWeight: "700",
    		top: 16,
    		fontSize: 20
  	},
  	activeAnomalies: {
    		top: 41,
    		fontSize: 24,
    		width: 228,
    		height: 30,
    		position: "absolute"
  	},
  	ai: {
    		top: 867,
    		left: 11,
    		height: 105
  	},
  	aiChild: {
    		elevation: 7,
// @ts-ignore
    		boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.8)",
    		backgroundColor: "#e8ece4",
    		borderRadius: 16,
    		left: 0,
    		top: 0
  	},
  	geminiAiInsight: {
    		left: 14,
    		width: 127,
    		height: 26,
    		fontSize: 15,
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		top: 12,
    		color: "#1f291e",
    		fontFamily: "Sansation",
    		fontWeight: "700",
    		position: "absolute"
  	},
  	sensorOff: {
    		top: 564,
    		left: 10
  	},
  	farmerSensor: {
    		left: 0,
    		top: 0
  	},
  	farmerSensor2: {
    		elevation: 7,
// @ts-ignore
    		boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.8)",
    		backgroundColor: "#e8ece4",
    		borderRadius: 16,
    		left: 0,
    		top: 0
  	},
  	npkContent: {
    		left: 16
  	},
  	phValue: {
    		left: 137
  	},
  	phValue2: {
    		left: 258
  	},
  	farmSensorData: {
    		marginLeft: -70,
    		fontSize: 17,
    		width: 143,
    		color: "#000",
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		fontFamily: "Sansation",
    		fontWeight: "700",
    		top: 12,
    		height: 28,
    		left: "50%"
  	},
  	editIcon: {
    		top: 13,
    		left: 342,
    		width: 19
  	},
  	soilSensor: {
    		marginLeft: -69,
    		width: 142,
    		height: 21,
    		color: "#000",
    		top: 44,
    		fontSize: 15,
    		left: "50%",
    		position: "absolute"
  	},
  	actvateButton: {
    		marginLeft: -90,
    		top: 217,
    		height: 41,
    		width: 189,
    		left: "50%",
    		position: "absolute"
  	},
  	activateButton: {
    		backgroundColor: "#2d4b2a",
    		borderRadius: 16
  	},
  	iotSensor: {
    		marginLeft: -50,
    		width: 77,
    		height: 18,
    		left: "50%",
    		top: 11,
    		color: "#fff"
  	},
  	activateIcon: {
    		top: 10,
    		left: 126,
    		width: 20
  	},
  	phValue3: {
    		top: 85,
    		left: 146,
    		width: 85,
    		fontSize: 15,
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		fontFamily: "Sansation",
    		fontWeight: "700",
    		color: "#000"
  	},
  	npkContent2: {
    		top: 83,
    		width: 91,
    		left: 266,
    		height: 26,
    		fontSize: 15,
    		color: "#000",
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		fontFamily: "Sansation",
    		fontWeight: "700",
    		position: "absolute"
  	},
  	soilMoisture: {
    		top: 87,
    		left: 25,
    		width: 89,
    		fontSize: 15,
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		fontFamily: "Sansation",
    		fontWeight: "700",
    		color: "#000"
  	},
  	text11: {
    		top: 131,
    		left: 49,
    		height: 38,
    		fontSize: 20
  	},
  	farmerSensorChild: {
    		height: 64,
    		left: 38
  	},
  	farmerSensorInner: {
    		right: 277,
    		height: 58,
    		borderRadius: 100
  	},
  	n: {
    		top: 114,
    		height: 17,
    		color: "#000",
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		fontFamily: "Sansation",
    		fontWeight: "700",
    		position: "absolute"
  	},
  	p: {
    		width: 17,
    		left: 266,
    		fontSize: 15,
    		height: 16
  	},
  	k: {
    		top: 163,
    		color: "#000",
    		height: 15,
    		position: "absolute",
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		fontFamily: "Sansation",
    		fontWeight: "700"
  	},
  	sensorOffChild: {
    		width: 67,
    		backgroundColor: "#d9d9d9"
  	},
  	sensorOffItem: {
    		width: 26,
    		backgroundColor: "#2d4b2a"
  	},
  	sensorOffInner: {
    		width: 67,
    		backgroundColor: "#d9d9d9"
  	},
  	rectangleView: {
    		width: 50,
    		backgroundColor: "#2d4b2a"
  	},
  	sensorOffChild2: {
    		width: 67,
    		backgroundColor: "#d9d9d9"
  	},
  	sensorOffChild3: {
    		width: 55,
    		backgroundColor: "#2d4b2a"
  	},
  	wrapper: {
    		top: 122,
    		left: 155,
    		position: "absolute"
  	},
  	sensorOffChild4: {
    		width: 70,
    		height: 70
  	},
  	text12: {
    		left: 173,
    		height: 27,
    		width: 33,
    		fontSize: 20
  	},
  	activated: {
    		marginLeft: -68,
    		top: 194,
// @ts-ignore
    		boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.4)",
    		backgroundColor: "#d4f0ff",
    		width: 140,
    		borderRadius: 16,
    		left: "50%",
    		elevation: 5,
    		height: 15
  	},
  	activatedIotSensor: {
    		marginTop: -5,
    		top: "50%",
    		left: 23,
// @ts-ignore
    		boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
    		color: "#000",
    		position: "absolute"
  	},
  	deactivate: {
    		marginLeft: -68,
    		top: 194,
// @ts-ignore
    		boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.4)",
    		backgroundColor: "#d4f0ff",
    		width: 140,
    		borderRadius: 16,
    		left: "50%",
    		elevation: 5,
    		height: 15
  	},
  	deactivatedIotSensor: {
    		marginTop: -5,
    		marginLeft: -52,
    		top: "50%",
// @ts-ignore
    		boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
    		color: "#000",
    		left: "50%",
    		position: "absolute"
  	},
  	buddy: {
    		top: 820,
    		left: 316
  	},
  	buddyChild: {
    		backgroundColor: "#a25a28",
    		borderRadius: 8,
    		height: 37,
    		width: 104,
    		left: 0,
    		top: 0
  	},
  	buddy2: {
    		top: 7,
    		width: 59,
    		left: 38,
    		height: 21
  	},
  	image10Icon: {
    		top: 5,
    		left: 13,
    		width: 25,
    		height: 25
  	},
  	taskbarIcon: {
    		top: 858,
    		height: 98
  	}
});

export default HomePage;