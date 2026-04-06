import * as React from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, PanResponder, Animated, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ReportScreen = () => {
	const navigation = useNavigation();
	const translateY = React.useRef(new Animated.Value(0)).current;

	const panResponder = React.useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
			onPanResponderMove: (_, gestureState) => {
				if (gestureState.dy > 0) {
					translateY.setValue(gestureState.dy);
				}
			},
			onPanResponderRelease: (_, gestureState) => {
				if (gestureState.dy > 100) {
					Animated.timing(translateY, {
						toValue: SCREEN_HEIGHT,
						duration: 250,
						useNativeDriver: true,
					}).start(() => navigation.goBack());
				} else {
					Animated.spring(translateY, {
						toValue: 0,
						useNativeDriver: true,
					}).start();
				}
			},
		})
	).current;

	return (
		<View style={styles.root}>
			<TouchableOpacity
				style={styles.backdrop}
				activeOpacity={1}
				onPress={() => navigation.goBack()}
			/>
			<Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
				<View {...panResponder.panHandlers} style={styles.dragHandleArea}>
					<View style={styles.dragHandle} />
				</View>
				<View style={styles.analysisReport}>
					<View style={styles.dashcard} />
					<View style={[styles.topic, styles.topicPosition]}>
						<Text style={[styles.title, styles.titlePosition]}>ANALYSIS REPORT</Text>
						<Text style={[styles.analysisDateText, styles.titleTypo]}>Analysis Date: 11 July 2025</Text>
					</View>
					<ScrollView style={[styles.container, styles.containerPosition]} contentContainerStyle={{ minHeight: 700 }} showsVerticalScrollIndicator={false}>
						<ScrollView style={[styles.container2, styles.containerPosition]} contentContainerStyle={{ minHeight: 700 }} horizontal={false}>
							<View style={styles.reportContent}>
								<View style={[styles.issuesBackground, styles.backgroundLayout1]} />
								<View style={[styles.recommendedStepsBackground, styles.backgroundLayout1]} />
								<View style={[styles.issuesHeader, styles.alertIconLayout]}>
									<Image style={[styles.alertIcon, styles.alertIconLayout]} source={require("assets/image/AlertIcon.png")} resizeMode="cover" />
									<Text style={[styles.issuesFoundText, styles.textTypo]}>Issues Found</Text>
								</View>
								<View style={[styles.soilMoistureBackground, styles.backgroundLayout]} />
								<View style={[styles.nitrogenDeficiencyBackground, styles.backgroundLayout]} />
								<View style={[styles.aphidInfestationBackground, styles.backgroundLayout]} />
								<View style={[styles.irrigationScheduleBackground, styles.backgroundLayout]} />
								<View style={[styles.nFertilizerBackground, styles.backgroundLayout]} />
								<View style={[styles.fieldSpotCheckBackground, styles.backgroundLayout]} />
								<Image style={[styles.dehydrationIcon, styles.iconLayout]} source={require("assets/image/DehydrationIcon.png")} resizeMode="cover" />
								<Image style={[styles.lowNIcon, styles.iconLayout]} source={require("assets/image/LowNIcon.png")} resizeMode="cover" />
								<Image style={[styles.bugIcon, styles.iconLayout]} source={require("assets/image/BugIcon.png")} resizeMode="cover" />
								<View style={styles.stepsHeader}>
									<Text style={[styles.recommendedStepsText, styles.textTypo]}>Recommended Steps</Text>
									<Image style={[styles.solutionIcon, styles.titlePosition]} source={require("assets/image/SolutionIcon.png")} resizeMode="cover" />
								</View>
								<Image style={[styles.wateringIcon, styles.iconLayout]} source={require("assets/image/WateringIcon.png")} resizeMode="cover" />
								<Image style={[styles.fertilizerIcon, styles.iconLayout]} source={require("assets/image/FertilizerIcon.png")} resizeMode="cover" />
								<Image style={[styles.searchIcon, styles.iconLayout]} source={require("assets/image/SearchIcon.png")} resizeMode="cover" />
								<Text style={[styles.soilMoistureTextContainer, styles.textContainerLayout]}>
									<Text style={styles.soilMoistureLowbelow}>Soil Moisture: Low(Below Threshold){'\n'}</Text>
									<Text style={styles.currentLevelOf}>{`Current level of 65% is marginally low for [Crop Type Bla bla bla bla bla `}</Text>
								</Text>
								<Text style={[styles.nitrogenDeficiencyTextContainer, styles.textContainerLayout]}>
									<Text style={styles.soilMoistureLowbelow}>NPK Content: Nitrogen Deficiency{'\n'}</Text>
									<Text style={styles.currentLevelOf}>{`Current level of 65% is marginally low for [Crop Type Bla bla bla bla bla `}</Text>
								</Text>
								<Text style={[styles.aphidInfestationTextContainer, styles.textContainerLayout]}>
									<Text style={styles.soilMoistureLowbelow}>Observation Note: Potential Aphid Infestation{'\n'}</Text>
									<Text style={styles.currentLevelOf}>{`Current level of 65% is marginally low for [Crop Type Bla bla bla bla bla `}</Text>
								</Text>
								<Text style={[styles.irrigationScheduleTextContainer, styles.textContainerPosition]}>
									<Text style={styles.soilMoistureLowbelow}>1.Adjust Irrigation Schedule{'\n'}</Text>
									<Text style={styles.currentLevelOf}>{`Current level of 65% is marginally low for [Crop Type Bla bla bla bla bla `}</Text>
								</Text>
								<Text style={[styles.nFertilizerText, styles.textContainerPosition]}>
									<Text style={styles.soilMoistureLowbelow}>2.Apply Balanced N-Fertilizer{'\n'}</Text>
									<Text style={styles.currentLevelOf}>{`Current level of 65% is marginally low for [Crop Type Bla bla bla bla bla `}</Text>
								</Text>
								<Text style={[styles.fieldSpotCheckContainer, styles.textContainerPosition]}>
									<Text style={styles.soilMoistureLowbelow}>3.Conduct Field Spot Check{'\n'}</Text>
									<Text style={styles.currentLevelOf}>{`Current level of 65% is marginally low for [Crop Type Bla bla bla bla bla `}</Text>
								</Text>
							</View>
						</ScrollView>
					</ScrollView>
				</View>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: "flex-end",
	},
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.45)",
	},
	sheet: {
		alignItems: "center",
		width: "100%"
	},
	dragHandleArea: {
		alignItems: "center",
		paddingVertical: 12,
		width: "100%",
		zIndex: 10,
	},
	dragHandle: {
		width: 44,
		height: 5,
		borderRadius: 3,
		backgroundColor: "#e8ece4",
	},
	topicPosition: {
		width: 220,
		left: "50%",
		marginLeft: -110
	},
	titlePosition: {
		height: 23,
		top: 0,
		position: "absolute"
	},
	titleTypo: {
		textAlign: "left",
		color: "#1f291e",
		fontFamily: "Sansation"
	},
	containerPosition: {
		maxWidth: 400,
		flex: 1,
		width: 400,
		marginLeft: -200,
		left: "50%",
		position: "absolute"
	},
	backgroundLayout1: {
		height: 330,
		backgroundColor: "#d9d9d9",
		borderRadius: 16,
		marginLeft: -181,
		width: 363,
		left: "50%",
		position: "absolute"
	},
	alertIconLayout: {
		height: 24,
		position: "absolute"
	},
	textTypo: {
		fontSize: 16,
		top: 3,
		textAlign: "left",
		color: "#1f291e",
		fontFamily: "Sansation",
		position: "absolute"
	},
	backgroundLayout: {
		height: 78,
		width: 321,
		borderRadius: 8,
		left: 19,
		backgroundColor: "#fff",
		position: "absolute"
	},
	iconLayout: {
		height: 28,
		width: 28,
		left: 30,
		position: "absolute"
	},
	textContainerLayout: {
		height: 63,
		width: 264,
		color: "#041438",
		left: 70,
		textAlign: "left",
		position: "absolute"
	},
	textContainerPosition: {
		left: 67,
		height: 63,
		width: 264,
		textAlign: "left",
		color: "#1f291e",
		position: "absolute"
	},
	analysisReport: {
		width: 440,
		height: 795,
		alignSelf: "center",
	},
	dashcard: {
		elevation: 5,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		width: 440,
		backgroundColor: "#fff",
		left: 0,
		top: 0,
		position: "absolute",
		height: 795
	},
	topic: {
		top: 29,
		height: 49,
		position: "absolute"
	},
	title: {
		fontSize: 24,
		textAlign: "left",
		color: "#1f291e",
		fontFamily: "Sansation",
		width: 220,
		left: "50%",
		marginLeft: -110
	},
	analysisDateText: {
		top: 34,
		left: 22,
		fontSize: 14,
		width: 169,
		height: 15,
		position: "absolute"
	},
	container: {
		top: 82
	},
	container2: {
		top: 0
	},
	reportContent: {
		marginLeft: -182,
		top: 24,
		height: 681,
		width: 363,
		left: "50%",
		position: "absolute"
	},
	issuesBackground: {
		top: 0
	},
	recommendedStepsBackground: {
		top: 351
	},
	issuesHeader: {
		top: 18,
		left: 17,
		width: 130
	},
	alertIcon: {
		width: 24,
		left: 0,
		top: 0
	},
	issuesFoundText: {
		left: 32,
		width: 99,
		height: 17
	},
	soilMoistureBackground: {
		top: 52
	},
	nitrogenDeficiencyBackground: {
		top: 138
	},
	aphidInfestationBackground: {
		top: 225
	},
	irrigationScheduleBackground: {
		top: 405
	},
	nFertilizerBackground: {
		top: 491
	},
	fieldSpotCheckBackground: {
		top: 578
	},
	dehydrationIcon: {
		top: 59
	},
	lowNIcon: {
		top: 147
	},
	bugIcon: {
		top: 232
	},
	stepsHeader: {
		top: 370,
		width: 198,
		left: 19,
		height: 23,
		position: "absolute"
	},
	recommendedStepsText: {
		left: 31,
		width: 167,
		height: 18
	},
	solutionIcon: {
		width: 23,
		left: 0
	},
	wateringIcon: {
		top: 413
	},
	fertilizerIcon: {
		top: 502
	},
	searchIcon: {
		top: 586
	},
	soilMoistureTextContainer: {
		top: 59
	},
	soilMoistureLowbelow: {
		fontSize: 15,
		fontWeight: "700",
		fontFamily: "Sansation"
	},
	currentLevelOf: {
		fontSize: 13,
		fontFamily: "Sansation"
	},
	nitrogenDeficiencyTextContainer: {
		top: 146
	},
	aphidInfestationTextContainer: {
		top: 232
	},
	irrigationScheduleTextContainer: {
		top: 413
	},
	nFertilizerText: {
		top: 501
	},
	fieldSpotCheckContainer: {
		top: 586
	}
});

export default ReportScreen;
