import * as React from "react";
import { StyleSheet, View, Text, Image, Pressable, ScrollView, Dimensions, Platform, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import BuddyChatPopup from "../components/BuddyChatPopup";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const HomePage = () => {
	const navigation = useNavigation();
	type SensorState = 'off' | 'activating' | 'on' | 'deactivating';
	const [sensorState, setSensorState] = React.useState<SensorState>('off');
	const [isBuddyOpen, setIsBuddyOpen] = React.useState(false);

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
			{/* Background Dashboard Color */}
			<View style={[styles.dashboard, styles.dashboardPosition]} />

			{/* Top Header Section - Constant as requested */}
			<View style={[styles.topHeaeder, styles.topHeaederLayout]}>
				<Pressable
					style={styles.userProfile}
					onPress={() => navigation.navigate('Settings' as never)}
				>
					<Image
						style={styles.icon}
						source={require('assets/image/Profile.png')}
						resizeMode="cover"
					/>
				</Pressable>
				<Text style={[styles.goodMorning, styles.locationClr]}>Good Morning</Text>
			</View>

			{/* Main Dashcard */}
			<View style={styles.dashcard} />

			{/* Scrollable Content */}
			<ScrollView
				style={[styles.homePageInner, styles.homePageInnerFlexBox]}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 150 }}
			>
				<View style={styles.contentWrapper}>

					{/* Weather Section - Enhanced with subtle depth */}
					<Pressable style={styles.weather} onPress={() => navigation.navigate('WeatherScreen' as never)}>
						<View style={styles.weatherCard} />
						<View style={styles.weatherTopRow}>
							<View style={styles.locationWrapper}>
								<Image style={styles.maskGroupIcon} source={require('assets/image/Locationicon.png')} />
								<Text style={styles.locationText}>Location</Text>
							</View>
							<Text style={styles.mostlyClearedText}>Mostly Cleared</Text>
						</View>

						<View style={styles.weatherMainContent}>
							<Text style={styles.bigTempText}>30°</Text>
							<Image style={styles.weatherIcon2} source={require('assets/image/Sunnyweather.png')} />
						</View>

						<View style={styles.forecastContainer}>
							<View style={styles.forecastDays}>
								{['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'].map((day, i) => (
									<View key={day} style={styles.forecastDayItem}>
										<Text style={styles.monTypo}>{day}</Text>
										<Image style={styles.forecastIcon} source={require('assets/image/SunnyCloud.png')} />
										<Text style={styles.forecastTemp}>{[30, 30, 33, 27, 29, 28, 27][i]}°</Text>
									</View>
								))}
							</View>
						</View>
					</Pressable>

					{/* Summary Updates - Modernized Gauges */}
					<View style={styles.summaryUpdates}>
						<View style={styles.summaryCardBg} />
						<Text style={styles.sectionTitle}>Summary Updates</Text>

						<View style={styles.gaugesRow}>
							<View style={styles.gaugeItem}>
								<View style={[styles.circleBase, { borderColor: '#2d4b2a' }]}>
									<Image style={styles.gaugeIcon} source={require('assets/image/FarmerIcon.png')} />
									<Text style={styles.gaugePercent}>93%</Text>
								</View>
								<Text style={styles.gaugeLabel}>Labor Efficiency</Text>
							</View>

							<View style={styles.gaugeItem}>
								<View style={[styles.circleBase, { borderColor: '#a25a28' }]}>
									<Image style={styles.gaugeIcon} source={require('assets/image/crop.png')} />
									<Text style={styles.gaugePercent}>75%</Text>
								</View>
								<Text style={styles.gaugeLabel}>Crop Health</Text>
							</View>
						</View>
					</View>

					{/* Safety Check Bar - Status Indicating */}
					<Pressable style={styles.safetyCard} onPress={() => { }}>
						<View style={styles.safetyStatusIndicator} />
						<View style={styles.safetyTextContainer}>
							<Text style={styles.safetyTitle}>Safety Check :</Text>
							<Text style={styles.safetyDetail}>Active Anomalies : <Text style={{ color: '#2d4b2a' }}>0</Text></Text>
						</View>
						<Image style={styles.chevronIcon} source={require('assets/image/Locationicon.png')} />
					</Pressable>

					{/* Sensor Data Section - Grid Style */}
					<Pressable
						style={styles.sensorContainer}
						onPress={() => navigation.navigate('FarmerSensor' as never)}
					>
						<View style={styles.sensorHeader}>
							<Text style={styles.sensorMainTitle}>Farm Sensor Data</Text>
							<Image style={styles.editIcon} source={require('assets/image/Edit.png')} />
						</View>
						<Text style={styles.sensorSubTitle}>Soil Sensor</Text>

						<View style={styles.sensorGrid}>
							{/* Moisture Tile */}
							<View style={styles.sensorTile}>
								<Text style={styles.tileLabel}>Moisture</Text>
								<Text style={styles.tileValue}>65%</Text>
								<View style={styles.statusBadgeGreen}><Text style={styles.statusBadgeText}>Good</Text></View>
							</View>

							{/* pH Tile */}
							<View style={styles.sensorTile}>
								<Text style={styles.tileLabel}>pH Level</Text>
								<LinearGradient
									style={styles.phCircleGradient}
									colors={['#dc2626', '#22c55e', '#9333ea']}
									start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
								>
									<View style={styles.phCircleWhite}>
										<Text style={styles.phText}>6.5</Text>
									</View>
								</LinearGradient>
							</View>

							{/* NPK Tile */}
							<View style={styles.sensorTile}>
								<Text style={styles.tileLabel}>NPK Content</Text>
								<View style={styles.npkList}>
									{['N', 'P', 'K'].map((label) => (
										<View key={label} style={styles.npkRow}>
											<Text style={styles.npkLabel}>{label}</Text>
											<View style={styles.npkBarBg}><View style={[styles.npkBarFill, { width: '70%' }]} /></View>
										</View>
									))}
								</View>
							</View>
						</View>

						<Pressable style={styles.actvateButton} onPress={handleSensorPress}>
							<LinearGradient
								colors={sensorState === 'on' ? ['#22C55E', '#16a34a'] : ['#2d4b2a', '#1f351d']}
								style={styles.activateButtonGradient}
							>
								<Text style={styles.iotSensorText}>
									{sensorState === 'activating' ? 'CONNECTING...' : sensorState === 'on' ? 'SENSOR ACTIVE' : 'ACTIVATE IOT'}
								</Text>
							</LinearGradient>
						</Pressable>
					</Pressable>

					{/* Gemini AI Bar */}
					<Pressable style={styles.aiInsightBar} onPress={() => { }}>
						<Text style={styles.aiInsightText}>✨ Gemini AI Insight: <Text style={{ fontWeight: '400' }}>Soil is optimal.</Text></Text>
					</Pressable>

				</View>
			</ScrollView>

			<BuddyChatPopup 
				isVisible={isBuddyOpen} 
				onClose={() => setIsBuddyOpen(false)} 
				initialMessage="Good morning! How can I assist you with your farm today?"
				placeholder="Ask Buddy anything..."
			/>

			{!isBuddyOpen && (
				<Pressable style={styles.buddyButton} onPress={() => setIsBuddyOpen(true)}>
					<LinearGradient colors={['#a25a28', '#8b4a1f']} style={styles.buddyGradient}>
						<Image style={styles.buddyBotIcon} source={require('assets/image/buddySmall.png')} />
						<Text style={styles.buddyText}>Buddy</Text>
					</LinearGradient>
				</Pressable>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	homePage: {
		flex: 1,
		backgroundColor: "#f5f8f2",
	},
	dashboardPosition: {
		width: '100%',
		left: 0,
		position: "absolute"
	},
	dashboard: {
		backgroundColor: "#f5f8f2",
		height: 300,
		top: 0
	},
	dashcard: {
		top: 130,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		height: '100%',
		backgroundColor: "#fff",
		width: SCREEN_WIDTH,
		position: "absolute",
		...Platform.select({
			ios: { shadowColor: "#000", shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.1, shadowRadius: 10 },
			android: { elevation: 15 }
		})
	},
	topHeaeder: {
		top: 60,
		paddingHorizontal: 25,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'absolute',
		zIndex: 10,
	},
	topHeaederLayout: { height: 50 },
	goodMorning: {
		fontFamily: "Sansation",
		fontWeight: "700",
		color: "#1f291e",
		fontSize: 22,
	},
	userProfile: { width: 45, height: 45 },
	icon: { height: 45, width: 45, borderRadius: 22.5, backgroundColor: '#e0e0e0' },
	homePageInner: { marginTop: 140, width: SCREEN_WIDTH },
	homePageInnerFlexBox: { flex: 1 },
	contentWrapper: { paddingHorizontal: 15 },

	// Weather Section Refinement
	weather: { height: 190, marginBottom: 15, padding: 15 },
	weatherCard: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "#e8ece4",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#dae0d5'
	},
	weatherTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	locationWrapper: { flexDirection: 'row', alignItems: 'center' },
	maskGroupIcon: { width: 14, height: 14, marginRight: 6, tintColor: '#1f291e' },
	locationText: { fontSize: 16, fontWeight: '700', color: '#1f291e' },
	mostlyClearedText: { fontSize: 11, fontWeight: '600', color: '#555' },
	weatherMainContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 },
	bigTempText: { fontSize: 52, fontWeight: '800', color: '#1f291e' },
	weatherIcon2: { width: 55, height: 55 },
	forecastContainer: { marginTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)', paddingTop: 10 },
	forecastDays: { flexDirection: 'row', justifyContent: 'space-between' },
	forecastDayItem: { alignItems: 'center' },
	monTypo: { fontSize: 10, fontWeight: '700', color: '#777', marginBottom: 4 },
	forecastIcon: { width: 20, height: 20 },
	forecastTemp: { fontSize: 11, fontWeight: '700', color: '#1f291e', marginTop: 2 },

	// Summary Refinement
	summaryUpdates: { backgroundColor: '#e8ece4', borderRadius: 20, padding: 15, marginBottom: 15 },
	summaryCardBg: { ...StyleSheet.absoluteFillObject },
	sectionTitle: { textAlign: 'center', fontSize: 17, fontWeight: '700', color: '#1f291e', marginBottom: 15 },
	gaugesRow: { flexDirection: 'row', justifyContent: 'space-around' },
	gaugeItem: { alignItems: 'center' },
	circleBase: {
		width: 80, height: 80, borderRadius: 40, borderWidth: 6,
		backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'
	},
	gaugeIcon: { width: 18, height: 18, marginBottom: 2 },
	gaugePercent: { fontSize: 16, fontWeight: '800', color: '#1f291e' },
	gaugeLabel: { marginTop: 8, fontSize: 12, fontWeight: '700', color: '#555' },

	// Safety Refinement
	safetyCard: {
		height: 85, backgroundColor: '#e8ece4', borderRadius: 20,
		flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15
	},
	safetyStatusIndicator: { width: 6, height: '60%', backgroundColor: '#22C55E', borderRadius: 3, marginRight: 15 },
	safetyTextContainer: { flex: 1 },
	safetyTitle: { fontSize: 14, fontWeight: '600', color: '#555' },
	safetyDetail: { fontSize: 18, fontWeight: '700', color: '#1f291e' },
	chevronIcon: { width: 20, height: 20, transform: [{ rotate: '90deg' }], tintColor: '#2d4b2a' },

	// Sensor Section Refinement
	sensorContainer: { backgroundColor: '#e8ece4', borderRadius: 20, padding: 15, marginBottom: 15 },
	sensorHeader: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
	sensorMainTitle: { fontSize: 16, fontWeight: '700', color: '#1f291e' },
	editIcon: { position: 'absolute', right: 0, width: 18, height: 18, tintColor: '#2d4b2a' },
	sensorSubTitle: { textAlign: 'center', fontSize: 13, color: '#666', marginBottom: 15 },
	sensorGrid: { flexDirection: 'row', justifyContent: 'space-between' },
	sensorTile: {
		width: '31%', height: 110, backgroundColor: '#fff', borderRadius: 15,
		padding: 8, alignItems: 'center', justifyContent: 'space-between'
	},
	tileLabel: { fontSize: 10, fontWeight: '700', color: '#888', textAlign: 'center' },
	tileValue: { fontSize: 22, fontWeight: '800', color: '#1f291e' },
	statusBadgeGreen: { backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
	statusBadgeText: { fontSize: 9, fontWeight: '700', color: '#166534' },
	phCircleGradient: { width: 60, height: 60, borderRadius: 30, padding: 4 },
	phCircleWhite: { flex: 1, backgroundColor: '#fff', borderRadius: 26, justifyContent: 'center', alignItems: 'center' },
	phText: { fontSize: 16, fontWeight: '800' },
	npkList: { width: '100%', paddingHorizontal: 4 },
	npkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
	npkLabel: { width: 12, fontSize: 9, fontWeight: '700' },
	npkBarBg: { flex: 1, height: 4, backgroundColor: '#eee', borderRadius: 2, marginLeft: 4 },
	npkBarFill: { height: '100%', backgroundColor: '#2d4b2a', borderRadius: 2 },
	actvateButton: { marginTop: 20, height: 45, borderRadius: 12, overflow: 'hidden' },
	activateButtonGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	iotSensorText: { color: '#fff', fontWeight: '800', fontSize: 13, letterSpacing: 0.5 },

	// AI Bar
	aiInsightBar: { backgroundColor: '#f0f4f0', padding: 15, borderRadius: 15, borderStyle: 'dashed', borderWidth: 1, borderColor: '#2d4b2a' },
	aiInsightText: { fontSize: 14, fontWeight: '700', color: '#2d4b2a' },

	// Buddy Button
	buddyButton: {
		position: 'absolute', bottom: 100, right: 20,
		height: 44, width: 105, borderRadius: 12, elevation: 8, overflow: 'hidden'
	},
	buddyGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
	buddyText: { color: "#fff", fontWeight: "700", marginLeft: 6, fontSize: 14 },
	buddyBotIcon: { width: 18, height: 18 },
	locationClr: { color: "#1f291e" },
});

export default HomePage;