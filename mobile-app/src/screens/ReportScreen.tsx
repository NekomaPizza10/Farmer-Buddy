import * as React from "react";
import {
	StyleSheet, View, Text, ScrollView, Image,
	TouchableOpacity, PanResponder, Animated, Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const ReportScreen = () => {
	const navigation = useNavigation();
	const translateY = React.useRef(new Animated.Value(0)).current;

	const panResponder = React.useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
			onPanResponderMove: (_, gestureState) => {
				if (gestureState.dy > 0) translateY.setValue(gestureState.dy);
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

	// Helper to render report items
	const ReportItem = ({ icon, title, description, type }: any) => (
		<View style={styles.itemCard}>
			<Image style={styles.itemIcon} source={icon} resizeMode="contain" />
			<View style={styles.itemTextContent}>
				<Text style={[styles.itemTitle, type === 'issue' ? styles.issueText : styles.stepText]}>
					{title}
				</Text>
				<Text style={styles.itemDescription}>{description}</Text>
			</View>
		</View>
	);

	return (
		<View style={styles.root}>
			<TouchableOpacity
				style={styles.backdrop}
				activeOpacity={1}
				onPress={() => navigation.goBack()}
			/>
			<Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
				{/* Drag Handle Section */}
				<View {...panResponder.panHandlers} style={styles.dragHandleArea}>
					<View style={styles.dragHandle} />
				</View>

				<ScrollView
					style={styles.scrollContainer}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.scrollContent}
				>
					{/* Header */}
					<View style={styles.header}>
						<Text style={styles.mainTitle}>Analysis Report</Text>
						<Text style={styles.dateText}>Generated: 11 July 2025</Text>
					</View>

					{/* Section: Issues */}
					<View style={styles.sectionContainer}>
						<View style={styles.sectionHeader}>
							<Image style={styles.headerIcon} source={require("assets/image/Warning.png")} />
							<Text style={styles.sectionTitle}>Critical Issues</Text>
						</View>

						<ReportItem
							type="issue"
							icon={require("assets/image/DehydrationIcon.png")}
							title="Soil Moisture: Low"
							description="Current level of 65% is marginally low for Corn. Increase irrigation immediately."
						/>
						<ReportItem
							type="issue"
							icon={require("assets/image/LowNIcon.png")}
							title="Nitrogen Deficiency"
							description="Low NPK levels detected. Leaf yellowing is likely starting at the base."
						/>
					</View>

					{/* Section: Steps */}
					<View style={[styles.sectionContainer, styles.stepsContainer]}>
						<View style={styles.sectionHeader}>
							<Image style={styles.headerIcon} source={require("assets/image/SolutionIcon.png")} />
							<Text style={styles.sectionTitle}>Action Plan</Text>
						</View>

						<ReportItem
							type="step"
							icon={require("assets/image/WateringIcon.png")}
							title="1. Adjust Irrigation"
							description="Schedule extra 20 mins of watering during early morning hours."
						/>
						<ReportItem
							type="step"
							icon={require("assets/image/FertilizerIcon.png")}
							title="2. Apply N-Fertilizer"
							description="Use a balanced 10-10-10 mix to stabilize Nitrogen levels."
						/>
					</View>
				</ScrollView>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: 'transparent',
	},
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.6)",
	},
	sheet: {
		backgroundColor: "#F9FBF9", // Very light green/white
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		height: SCREEN_HEIGHT * 0.85,
		width: SCREEN_WIDTH,
		marginTop: SCREEN_HEIGHT * 0.15,
	},
	dragHandleArea: {
		alignItems: "center",
		paddingVertical: 15,
	},
	dragHandle: {
		width: 50,
		height: 6,
		borderRadius: 3,
		backgroundColor: "#D1D5DB",
	},
	scrollContainer: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingBottom: 40,
	},
	header: {
		marginBottom: 25,
		alignItems: 'center'
	},
	mainTitle: {
		fontSize: 26,
		fontWeight: "bold",
		color: "#1F2937",
		fontFamily: "Sansation",
	},
	dateText: {
		fontSize: 14,
		color: "#6B7280",
		marginTop: 4,
	},
	sectionContainer: {
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
		padding: 16,
		marginBottom: 20,
		// Shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		// Elevation for Android
		elevation: 3,
	},
	stepsContainer: {
		borderLeftWidth: 4,
		borderLeftColor: "#2D4B2A",
	},
	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#F3F4F6",
		paddingBottom: 10,
	},
	headerIcon: {
		width: 24,
		height: 24,
		marginRight: 10,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#374151",
	},
	itemCard: {
		flexDirection: "row",
		marginBottom: 20,
	},
	itemIcon: {
		width: 35,
		height: 35,
		marginRight: 15,
	},
	itemTextContent: {
		flex: 1,
	},
	itemTitle: {
		fontSize: 16,
		fontWeight: "700",
		marginBottom: 2,
	},
	issueText: {
		color: "#B91C1C", // Reddish for issues
	},
	stepText: {
		color: "#2D4B2A", // Green for steps
	},
	itemDescription: {
		fontSize: 14,
		color: "#4B5563",
		lineHeight: 20,
	},
});

export default ReportScreen;