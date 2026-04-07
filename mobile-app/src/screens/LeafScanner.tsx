import * as React from "react";
import { StyleSheet, View, Pressable, Text, Button, Dimensions, Platform } from "react-native";
import { CameraView, useCameraPermissions, FlashMode } from 'expo-camera';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DiagnoseOverlay from "../components/DiagnoseOverlay";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const LeafScanner = () => {
	const [permission, requestPermission] = useCameraPermissions();
	const navigation = useNavigation();
	const [isOverlayVisible, setIsOverlayVisible] = React.useState(false);

	// Flash Logic: off -> on -> auto
	const [flash, setFlash] = React.useState<FlashMode>('off');

	const toggleFlash = () => {
		setFlash((current) => {
			if (current === 'off') return 'on';
			if (current === 'on') return 'auto';
			return 'off';
		});
	};

	const getFlashIcon = () => {
		if (flash === 'on') return "flash";
		if (flash === 'auto') return "flash-outline";
		return "flash-off";
	};

	if (!permission) return <View style={styles.scanIcon} />;

	if (!permission.granted) {
		return (
			<View style={styles.permissionContainer}>
				<Ionicons name="camera" size={60} color="#2d4b2a" style={{ alignSelf: 'center', marginBottom: 20 }} />
				<Text style={styles.permissionText}>We need your permission to show the camera</Text>
				<Pressable style={styles.grantBtn} onPress={requestPermission}>
					<Text style={styles.grantBtnText}>Grant Permission</Text>
				</Pressable>
			</View>
		);
	}

	return (
		<View style={styles.scanIcon}>
			{/* Camera View */}
			<CameraView
				style={StyleSheet.absoluteFill}
				facing="back"
				enableTorch={flash === 'on'}
				flash={flash}
			/>

			{/* Scanning Overlay UI (Positions constant from Figma) */}
			<View style={[styles.scannerFrame, styles.iconLayout1]}>
				<View style={styles.cornerTopLeft} />
				<View style={styles.cornerTopRight} />
				<View style={styles.cornerBottomLeft} />
				<View style={styles.cornerBottomRight} />
			</View>

			{/* Animated-style scan line */}
			<View style={styles.scanItem} />

			{/* Semi-transparent Header/Footer overlays */}
			<View style={[styles.cameraTopHeader, styles.scanInnerPosition]} />
			<View style={[styles.scanInner, styles.scanInnerPosition]} />

			{/* Instruction Box */}
			<View style={styles.rectangleView}>
				<Text style={styles.fitYouPlant}>Fit your plant leaf inside the frame</Text>
			</View>

			{/* Top Header Controls */}
			<View style={[styles.topHeader, styles.topHeaderLayout]}>
				<Pressable style={styles.back} onPress={() => navigation.goBack()}>
					<View style={styles.headerIconBg}>
						<Ionicons name="chevron-back" size={20} color="#fff" />
					</View>
				</Pressable>

				<Pressable style={styles.flashIcon} onPress={toggleFlash}>
					<View style={[styles.headerIconBg, flash !== 'off' && { backgroundColor: '#22c55e' }]}>
						<Ionicons name={getFlashIcon()} size={20} color="#fff" />
						{flash === 'auto' && <Text style={styles.autoText}>A</Text>}
					</View>
				</Pressable>
			</View>

			{/* Bottom Controls */}
			<Pressable style={styles.galleryGroup}>
				<View style={styles.galleryIconBox}>
					<Ionicons name="images" size={28} color="#2d4b2a" />
				</View>
				<Text style={styles.gallery}>Gallery</Text>
			</Pressable>

			{/* Capture Button */}
			<Pressable style={styles.button} onPress={() => setIsOverlayVisible(true)}>
				<View style={styles.shutterOuter}>
					<View style={styles.shutterInner} />
				</View>
			</Pressable>

			{/* History */}
			<Pressable style={styles.historyGroup}>
				<View style={styles.historyIconBox}>
					<Ionicons name="time" size={28} color="#2d4b2a" />
				</View>
				<Text style={styles.history}>History</Text>
			</Pressable>

			{/* AI Diagnose Modal */}
			<DiagnoseOverlay
				visible={isOverlayVisible}
				onClose={() => setIsOverlayVisible(false)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	scanIcon: { flex: 1, backgroundColor: "#000" },
	permissionContainer: { flex: 1, justifyContent: 'center', padding: 40, backgroundColor: '#f5f8f2' },
	permissionText: { textAlign: 'center', fontSize: 16, fontFamily: 'Sansation', color: '#1f291e', marginBottom: 30 },
	grantBtn: { backgroundColor: '#2d4b2a', paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
	grantBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

	scanInnerPosition: {
		width: 440,
		left: "50%",
		marginLeft: -220,
		position: "absolute"
	},
	iconLayout1: {
		height: 300,
		width: 300,
		position: "absolute"
	},

	// Top Header Section
	cameraTopHeader: { backgroundColor: "rgba(0, 0, 0, 0.3)", height: 120, top: 0 },
	topHeader: { top: 60, left: 22, width: SCREEN_WIDTH - 44, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute' },
	topHeaderLayout: { height: 40 },
	headerIconBg: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: 'center', alignItems: 'center' },
	back: {}, // Fixed: Added missing property
	flashIcon: {}, // Fixed: Added missing property
	autoText: { position: 'absolute', right: 8, bottom: 8, fontSize: 8, color: '#fff', fontWeight: 'bold' },

	// Scanner Frame
	scannerFrame: {
		top: '50%', left: '50%', marginTop: -200, marginLeft: -150,
		borderWidth: 0,
	},
	cornerTopLeft: { position: 'absolute', top: 0, left: 0, width: 40, height: 40, borderLeftWidth: 4, borderTopWidth: 4, borderColor: '#22c55e' },
	cornerTopRight: { position: 'absolute', top: 0, right: 0, width: 40, height: 40, borderRightWidth: 4, borderTopWidth: 4, borderColor: '#22c55e' },
	cornerBottomLeft: { position: 'absolute', bottom: 0, left: 0, width: 40, height: 40, borderLeftWidth: 4, borderBottomWidth: 4, borderColor: '#22c55e' },
	cornerBottomRight: { position: 'absolute', bottom: 0, right: 0, width: 40, height: 40, borderRightWidth: 4, borderBottomWidth: 4, borderColor: '#22c55e' },

	// Scan Line
	scanItem: {
		top: '50%', left: '50%', marginLeft: -150, marginTop: -50,
		width: 300, height: 2, backgroundColor: '#22c55e', position: "absolute",
		shadowColor: "#22c55e", shadowOpacity: 1, shadowRadius: 10, elevation: 10
	},

	// Bottom Dashcard
	scanInner: { top: 786, borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: "rgba(255, 255, 255, 0.9)", height: 300 },
	rectangleView: {
		top: 740, left: "50%", marginLeft: -111, borderRadius: 20,
		backgroundColor: "rgba(0,0,0, 0.6)", width: 222, height: 30, position: "absolute",
		justifyContent: 'center', alignItems: 'center'
	},
	fitYouPlant: { fontSize: 12, color: "#fff", fontFamily: 'Sansation', fontWeight: 'bold' },

	// Controls
	button: { left: "50%", marginLeft: -45, top: 815, width: 90, height: 90, position: "absolute" },
	shutterOuter: { flex: 1, backgroundColor: "transparent", borderRadius: 45, borderWidth: 6, borderColor: "#2d4b2a", padding: 5 },
	shutterInner: { flex: 1, backgroundColor: "#22c55e", borderRadius: 40 },

	galleryGroup: { position: 'absolute', top: 830, left: 45, alignItems: 'center' },
	galleryIconBox: { width: 55, height: 55, borderRadius: 15, backgroundColor: '#e8ece4', justifyContent: 'center', alignItems: 'center', elevation: 2 },
	gallery: { marginTop: 8, fontSize: 12, fontWeight: '700', color: '#2d4b2a', fontFamily: "Sansation" },

	historyGroup: { position: 'absolute', top: 830, right: 45, alignItems: 'center' },
	historyIconBox: { width: 55, height: 55, borderRadius: 30, backgroundColor: '#e8ece4', justifyContent: 'center', alignItems: 'center', elevation: 2 },
	history: { marginTop: 8, fontSize: 12, fontWeight: '700', color: '#2d4b2a', fontFamily: "Sansation" }
});

export default LeafScanner;