import * as React from "react";
import { StyleSheet, View, ScrollView, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FarmerSensorScreen = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.farmerSensor}>
			<View style={[styles.topHeader, styles.analyseLayout]}>
				<Text style={[styles.farmSensorAnalysis, styles.sensorClr]}>Farm Sensor Analysis Data</Text>
				<Pressable style={[styles.userProfile, styles.analyseLayout]} onPress={() => { navigation.navigate('Settings' as never) }}>
					<Image style={styles.icon as any} source={require("assets/image/Profile.png")} resizeMode="cover" />
				</Pressable>
			</View>

			<View style={[styles.dashcard, styles.dashcardPosition]} />
			<ScrollView style={styles.farmer1} contentContainerStyle={{ height: 1050, paddingBottom: 150 }}>
				<View style={styles.topCardParent}>
					<View style={[styles.topCard, styles.cardPosition]}>
						<View style={[styles.topCardChild, styles.cardChildPosition]} />
						<View style={[styles.moisture, styles.moistureLayout]}>
							<Image style={[styles.eclipseIcon, styles.moistureLayout]} source={require("assets/image/AnalyzeIcon.png")} resizeMode="cover" />
							<Text style={[styles.text, styles.sensorClr]}>65%</Text>
							<Text style={styles.moisture2}>Moisture</Text>
						</View>

						<View style={styles.ph}>
							<View style={[styles.phChild, styles.childLayout]} />
							<View style={[styles.phItem, styles.itemLayout1]} />
							<Text style={[styles.ph2, styles.ph2Typo]}>pH</Text>
							<Text style={styles.optimal}>Optimal</Text>
							<Text style={[styles.text2, styles.ph2Typo]}>6.5</Text>
						</View>
						<View style={styles.npk}>
							<View style={[styles.npkChild, styles.npkPosition]} />
							<View style={[styles.npkItem, styles.npkPosition]} />
							<Text style={[styles.npk2, styles.sensorClr]}>NPK</Text>
							<Text style={[styles.target, styles.sensorClr]}>Target</Text>
							<View style={[styles.npkInner, styles.npkPosition]} />
						</View>
					</View>

					<View style={[styles.middleCard, styles.cardPosition]}>
						<View style={[styles.middleCardChild, styles.cardChildPosition]} />
						<Text style={[styles.npkData, styles.npkDataTypo]}>{`NPK Data `}</Text>
						<View style={[styles.nitrogen, styles.nitrogenLayout]}>
							<Text style={[styles.nitrogen2, styles.nitrogen2Typo]}>Nitrogen</Text>
							<Image style={styles.nitrogenIcon} source={require("assets/image/AnalyzeIcon.png")} resizeMode="cover" />
							<Text style={styles.text3}>65%</Text>
						</View>
						<View style={[styles.phosphorus, styles.nitrogenLayout]}>
							<Text style={[styles.phosphorus2, styles.nitrogen2Typo]}>Phosphorus</Text>
							<Image style={styles.nitrogenIcon} resizeMode="cover" />
							<Text style={styles.text3}>65%</Text>
						</View>
						<View style={[styles.potassium, styles.nitrogenLayout]}>
							<Text style={[styles.potassium2, styles.nitrogen2Typo]}>Potassium</Text>
							<Image style={styles.nitrogenIcon} resizeMode="cover" />
							<Text style={styles.text3}>65%</Text>
						</View>
					</View>
					<Text style={[styles.defineFarmContext, styles.npkDataTypo]}>Define Farm Context  (for AI)</Text>
					<Image style={styles.cardIcon} source={require("assets/image/ActSens.png")} resizeMode="cover" />
					<View style={[styles.crop, styles.cropLayout1]}>
						<View style={[styles.cropChild, styles.cropLayout1]} />
						<View style={[styles.cropType, styles.cropLayout]}>
							<Text style={[styles.cropType2, styles.cropType2Typo]}>Crop Type</Text>
							<View style={[styles.cropTypeChild, styles.cropTypeChildBg]} />
							<Text style={[styles.egCorn, styles.egCornLayout]}>e.g. : Corn, Potatoes</Text>
						</View>
					</View>
					<View style={[styles.farm, styles.farmLayout]}>
						<View style={[styles.farmChild, styles.farmLayout]} />
						<Text style={[styles.farmType, styles.farmTypePosition]}>Farm Type</Text>
						<View style={[styles.farmItem, styles.itemLayout]} />
						<Text style={[styles.outdoorField, styles.outdoorFieldPosition]}>Outdoor Field</Text>
						<Image style={[styles.dropdownIcon, styles.dropdownIconLayout]} resizeMode="cover" />
					</View>
					<View style={[styles.growth, styles.growthLayout]}>
						<View style={[styles.growthChild, styles.growthLayout]} />
						<Text style={[styles.growthStage, styles.stagePosition]}>Growth Stage</Text>
						<View style={[styles.growthItem, styles.itemPosition]} />
						<Text style={[styles.floweringStage, styles.stagePosition]}>Flowering Stage</Text>
						<Image style={[styles.dropdownIcon2, styles.dropdownIconLayout]} resizeMode="cover" />
					</View>
					<Text style={[styles.soilSensor, styles.sensorClr]}>Soil Sensor</Text>
					<Pressable style={[styles.analyseButton, styles.analyseLayout]} onPress={() => { navigation.navigate('Report' as never) }}>
						<Image style={[styles.analyseButtonChild, styles.analyseLayout]} source={require("assets/image/AnalyzeIcon.png")} resizeMode="cover" />
						<View style={[styles.analyzeWithGeminiAiParent, styles.observation2Position]}>
							<Text style={[styles.analyzeWithGemini, styles.buddy2Typo]}>Analyze with Gemini AI</Text>
							<Image style={[styles.maskGroupIcon, styles.egCornLayout]} source={require("assets/image/MaskgroupIcon.png")} resizeMode="cover" />
						</View>
					</Pressable>
					<View style={[styles.observation, styles.observationLayout]}>
						<View style={[styles.observationChild, styles.observationLayout]} />
						<Text style={[styles.observation2, styles.observation2Position]}>Observation</Text>
						<View style={[styles.observationItem, styles.itemPosition]} />
						<Text style={[styles.addNotesEg, styles.egCornLayout]}>Add notes (e.g., yellow leaves...)</Text>
					</View>
				</View>
			</ScrollView>

			{/* Floating Buddy Button */}
			<Pressable style={[styles.buddy, styles.buddyLayout]} onPress={() => { }}>
				<View style={[styles.buddyChild, styles.buddyLayout]} />
				<Text style={[styles.buddy2, styles.buddy2Typo]}>Buddy</Text>
				<Image style={styles.buddyIcon} source={require("assets/image/buddySmall.png")} resizeMode="cover" />
			</Pressable>

		</View>);
};

const styles = StyleSheet.create({
	dashcardPosition: {
		width: 440,
		left: 0,
		position: "absolute"
	},
	cardPosition: {
		width: 371,
		marginLeft: -189,
		left: "50%",
		position: "absolute"
	},
	cardChildPosition: {
		backgroundColor: "#e8ece4",
		elevation: 7,
		marginLeft: -185,
		borderRadius: 16,
		// @ts-ignore
		boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.8)",
		width: 371,
		left: "50%",
		position: "absolute"
	},
	moistureLayout: {
		width: 100,
		position: "absolute"
	},
	sensorClr: {
		color: "#1f291e",
		fontFamily: "Sansation",
		position: "absolute"
	},
	childLayout: {
		height: 8,
		borderRadius: 100,
		// @ts-ignore
		boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",
		width: 150,
		elevation: 4,
		backgroundColor: "#fff",
		left: 0
	},
	itemLayout1: {
		backgroundColor: "#2d4b2a",
		height: 8,
		borderRadius: 100
	},
	ph2Typo: {
		left: 3,
		fontSize: 13,
		textAlign: "left",
		color: "#1f291e",
		fontFamily: "Sansation",
		position: "absolute"
	},
	npkPosition: {
		top: 16,
		position: "absolute"
	},
	npkDataTypo: {
		height: 20,
		textAlign: "left",
		color: "#1f291e",
		fontFamily: "Sansation",
		position: "absolute"
	},
	nitrogenLayout: {
		height: 90,
		top: 49,
		width: 70,
		position: "absolute"
	},
	nitrogen2Typo: {
		height: 12,
		top: 78,
		fontSize: 11,
		textAlign: "left",
		color: "#1f291e",
		fontFamily: "Sansation",
		position: "absolute"
	},
	cropLayout1: {
		height: 101,
		width: 330,
		position: "absolute"
	},
	cropLayout: {
		width: 296,
		position: "absolute"
	},
	cropType2Typo: {
		height: 19,
		textAlign: "left",
		color: "#1f291e",
		fontFamily: "Sansation"
	},
	cropTypeChildBg: {
		backgroundColor: "rgba(217, 217, 217, 0.6)",
		borderRadius: 8
	},
	egCornLayout: {
		height: 16,
		position: "absolute"
	},
	farmLayout: {
		height: 75,
		width: 180,
		position: "absolute"
	},
	farmTypePosition: {
		top: 11,
		height: 19,
		fontSize: 14,
		color: "#1f291e"
	},
	itemLayout: {
		backgroundColor: "rgba(217, 217, 217, 0.7)",
		borderRadius: 5,
		top: 36,
		height: 24
	},
	outdoorFieldPosition: {
		top: 40,
		height: 16,
		color: "#2d4b2a",
		fontSize: 13
	},
	dropdownIconLayout: {
		width: 20,
		top: 38,
		height: 20,
		position: "absolute"
	},
	growthLayout: {
		width: 140,
		height: 75,
		position: "absolute"
	},
	stagePosition: {
		left: 14,
		textAlign: "left",
		fontFamily: "Sansation",
		position: "absolute"
	},
	itemPosition: {
		left: 9,
		position: "absolute"
	},
	analyseLayout: {
		height: 45,
		position: "absolute"
	},
	observation2Position: {
		top: 14,
		position: "absolute"
	},
	buddy2Typo: {
		color: "#fff",
		fontSize: 15,
		fontFamily: "Sansation",
		position: "absolute"
	},
	observationLayout: {
		height: 151,
		width: 330,
		elevation: 4,
		position: "absolute"
	},
	buddyLayout: {
		height: 37,
		width: 104,
		position: "absolute"
	},
	farmerSensor: {
		height: 956,
		backgroundColor: "#f5f8f2",
		overflow: "hidden",
		width: "100%"
	},
	dashcard: {
		top: 121,
		// @ts-ignore
		boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.2)",
		elevation: 5,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		height: 795,
		backgroundColor: "#fff"
	},
	farmer1: {
		top: 140,
		bottom: 70,
		maxWidth: 400,
		width: 400,
		left: 20,
		position: "absolute"
	},
	topCardParent: {
		marginLeft: -200,
		top: -7,
		height: 883,
		left: "50%",
		width: 400,
		position: "absolute",
		overflow: "hidden"
	},
	topCard: {
		height: 172,
		top: 19
	},
	topCardChild: {
		top: 0,
		height: 172
	},
	moisture: {
		top: 31,
		height: 123,
		elevation: 4,
		// @ts-ignore
		boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
		left: 31
	},
	eclipseIcon: {
		height: 100,
		top: 0,
		left: 0
	},
	text: {
		left: 27,
		fontSize: 24,
		width: 46,
		height: 27,
		textAlign: "left",
		top: 37
	},
	moisture2: {
		top: 106,
		width: 62,
		height: 17,
		fontSize: 15,
		left: 19,
		textAlign: "left",
		color: "#1f291e",
		fontFamily: "Sansation",
		position: "absolute"
	},
	ph: {
		top: 47,
		left: 189,
		height: 42,
		width: 150,
		position: "absolute"
	},
	phChild: {
		top: 17,
		position: "absolute"
	},
	phItem: {
		left: 54,
		width: 30,
		top: 17,
		position: "absolute"
	},
	ph2: {
		fontSize: 13,
		top: 0
	},
	optimal: {
		left: 109,
		color: "#2d4b2a",
		fontSize: 11,
		fontWeight: "700",
		textAlign: "left",
		fontFamily: "Sansation",
		top: 0,
		position: "absolute"
	},
	text2: {
		top: 27,
		fontWeight: "700",
		fontSize: 13
	},
	npk: {
		top: 107,
		left: 188,
		height: 24,
		width: 150,
		position: "absolute"
	},
	npkChild: {
		height: 8,
		borderRadius: 100,
		// @ts-ignore
		boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",
		width: 150,
		elevation: 4,
		backgroundColor: "#fff",
		left: 0
	},
	npkItem: {
		width: 122,
		backgroundColor: "#2d4b2a",
		height: 8,
		borderRadius: 100,
		left: 0
	},
	npk2: {
		left: 4,
		fontSize: 13,
		textAlign: "left",
		top: 0
	},
	target: {
		top: 2,
		fontSize: 10,
		left: 113,
		textAlign: "left"
	},
	npkInner: {
		left: 128,
		borderStyle: "solid",
		borderColor: "rgba(45, 75, 42, 0.8)",
		borderRightWidth: 2,
		width: 2,
		height: 10
	},
	middleCard: {
		top: 201,
		height: 153
	},
	middleCardChild: {
		top: 24,
		height: 129
	},
	npkData: {
		width: 72,
		fontSize: 15,
		height: 20,
		top: 0,
		left: 20
	},
	nitrogen: {
		left: 46
	},
	nitrogen2: {
		width: 44,
		left: 13
	},
	nitrogenIcon: {
		height: 70,
		width: 70,
		top: 0,
		left: 0,
		position: "absolute"
	},
	text3: {
		top: 26,
		width: 32,
		height: 18,
		fontSize: 16,
		left: 19,
		textAlign: "left",
		color: "#1f291e",
		fontFamily: "Sansation",
		position: "absolute"
	},
	phosphorus: {
		left: 151
	},
	phosphorus2: {
		left: 7,
		width: 61
	},
	potassium: {
		left: 256
	},
	potassium2: {
		left: 8,
		width: 54
	},
	defineFarmContext: {
		top: 369,
		width: 229,
		fontSize: 16,
		left: 31
	},
	cardIcon: {
		top: 398,
		height: 412,
		borderRadius: 16,
		// @ts-ignore
		boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.8)",
		width: 371,
		marginLeft: -189,
		left: "50%",
		position: "absolute"
	},
	crop: {
		top: 422,
		left: 35,
		elevation: 4,
		// @ts-ignore
		boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)"
	},
	cropChild: {
		borderRadius: 16,
		top: 0,
		backgroundColor: "#fff",
		left: 0
	},
	cropType: {
		height: 62,
		left: 17,
		top: 19
	},
	cropType2: {
		width: 81,
		fontSize: 14,
		height: 19,
		top: 0,
		left: 0,
		position: "absolute"
	},
	cropTypeChild: {
		height: 35,
		width: 296,
		position: "absolute",
		top: 27,
		left: 0
	},
	egCorn: {
		width: 119,
		color: "rgba(45, 75, 42, 0.6)",
		height: 16,
		textAlign: "left",
		fontFamily: "Sansation",
		left: 13,
		fontSize: 13,
		top: 37
	},
	farm: {
		top: 544,
		left: 35
	},
	farmChild: {
		elevation: 4,
		// @ts-ignore
		boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
		borderRadius: 16,
		top: 0,
		backgroundColor: "#fff",
		left: 0
	},
	farmType: {
		width: 68,
		left: 17,
		textAlign: "left",
		fontFamily: "Sansation",
		position: "absolute"
	},
	farmItem: {
		width: 146,
		left: 17,
		position: "absolute"
	},
	outdoorField: {
		left: 25,
		width: 82,
		textAlign: "left",
		fontFamily: "Sansation",
		position: "absolute"
	},
	dropdownIcon: {
		left: 136
	},
	growth: {
		left: 225,
		top: 544
	},
	growthChild: {
		elevation: 4,
		// @ts-ignore
		boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
		borderRadius: 16,
		top: 0,
		backgroundColor: "#fff",
		left: 0
	},
	growthStage: {
		width: 87,
		top: 11,
		height: 19,
		fontSize: 14,
		color: "#1f291e"
	},
	growthItem: {
		width: 124,
		backgroundColor: "rgba(217, 217, 217, 0.7)",
		borderRadius: 5,
		top: 36,
		height: 24
	},
	floweringStage: {
		width: 98,
		top: 40,
		height: 16,
		color: "#2d4b2a",
		fontSize: 13
	},
	dropdownIcon2: {
		left: 113
	},
	soilSensor: {
		top: 25,
		width: 86,
		height: 15,
		fontSize: 16,
		textAlign: "left",
		left: 31
	},
	analyseButton: {
		top: 825,
		width: "100%",
		height: 45,
		position: "absolute"
	},
	analyseButtonChild: {
		marginLeft: -103,
		width: 206,
		height: 45,
		left: "50%",
		borderRadius: 16,
		top: 0,
		backgroundColor: "#2d4b2a"
	},
	analyzeWithGeminiAiParent: {
		left: "50%",
		marginLeft: -90,
		width: 180,
		top: 14,
		height: 17,
		position: "absolute"
	},
	analyzeWithGemini: {
		left: 21,
		textAlign: "left",
		top: 0
	},
	maskGroupIcon: {
		top: 1,
		width: 16,
		left: 0
	},
	observation: {
		top: 640,
		// @ts-ignore
		boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.3)",
		left: 35
	},
	observationChild: {
		// @ts-ignore
		boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
		height: 151,
		borderRadius: 16,
		top: 0,
		backgroundColor: "#fff",
		left: 0
	},
	observation2: {
		width: 99,
		height: 19,
		textAlign: "left",
		color: "#1f291e",
		fontFamily: "Sansation",
		left: 17,
		fontSize: 16
	},
	observationItem: {
		top: 33,
		width: 312,
		height: 106,
		backgroundColor: "rgba(217, 217, 217, 0.6)",
		borderRadius: 8
	},
	addNotesEg: {
		top: 42,
		fontSize: 12,
		width: 186,
		color: "rgba(45, 75, 42, 0.6)",
		height: 16,
		textAlign: "left",
		fontFamily: "Sansation",
		left: 17
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
		top: 0,
		left: 0
	},
	buddy2: {
		top: 7,
		left: 38,
		textAlign: "center",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: 59,
		height: 21,
		fontWeight: "700"
	},
	buddyIcon: {
		top: 5,
		width: 25,
		height: 25,
		left: 13,
		position: "absolute"
	},
	topHeader: {
		top: 66,
		left: 24,
		width: 392
	},
	farmSensorAnalysis: {
		top: 18,
		left: 146,
		fontSize: 20,
		textAlign: "right",
		fontWeight: "700"
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
	}
});

export default FarmerSensorScreen;
