import * as React from "react";
import {Image, StyleSheet, View, Pressable, Text, Button} from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from "@react-navigation/native";
import DiagnoseOverlay from "../components/DiagnoseOverlay";

const LeafScanner = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const navigation = useNavigation();
    const [isOverlayVisible, setIsOverlayVisible] = React.useState(false);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={{ textAlign: 'center', marginBottom: 20 }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }
  	
  	return (
        <View style={styles.scanIcon}>
            <CameraView style={StyleSheet.absoluteFill} facing="back" />
            
            <Image style={[styles.leafIcon, styles.iconLayout1]} resizeMode="cover" />
            <Image style={styles.scanChild} resizeMode="cover" />
            <Image style={styles.scanItem} resizeMode="cover" />
            <Image style={[styles.scannerIcon, styles.iconLayout1]} resizeMode="cover" />
            
            <View style={[styles.cameraTopHeader, styles.scanInnerPosition]} />
            <View style={[styles.scanInner, styles.scanInnerPosition]} />
            
            {/* The Capture Button */}
            <Pressable style={styles.button} onPress={() => setIsOverlayVisible(true)}>
                <View style={[styles.icon, styles.iconLayout]} />
            </Pressable>
            
            <Image style={styles.galleryBackgroundIcon} resizeMode="cover" />
            <Image style={styles.galleryIcon} resizeMode="cover" />
            <Text style={[styles.gallery, styles.galleryTypo]}>Gallery</Text>
            
            <Text style={[styles.history, styles.historyPosition]}>History</Text>
            <Image style={[styles.historyicon, styles.historyPosition]} resizeMode="cover" />
            
            <View style={styles.rectangleView} />
            <Text style={styles.fitYouPlant}>Fit your plant leaf inside the frame</Text>
            
            <View style={[styles.topHeader, styles.topHeaderLayout]}>
                <Pressable style={styles.back} onPress={() => navigation.goBack()}>
                    <View style={[styles.icon2, styles.iconLayout]} />
                </Pressable>
                <Image style={[styles.flashIcon, styles.topHeaderLayout]} resizeMode="cover" />
            </View>

            {/* AI Diagnose Output Modal */}
            <DiagnoseOverlay 
                visible={isOverlayVisible} 
                onClose={() => setIsOverlayVisible(false)} 
            />
        </View>);
};

const styles = StyleSheet.create({
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
  	scanInnerPosition: {
    		width: 440,
    		left: "50%",
            marginLeft: -220,
    		position: "absolute"
  	},
  	iconLayout1: {
    		height: 364,
    		width: 364,
    		position: "absolute"
  	},
  	iconLayout: {
    		height: "100%",
    		width: "100%"
  	},
  	galleryTypo: {
    		textShadowOffset: {
      			width: 0,
      			height: 0
    		},
    		textShadowColor: "rgba(0, 0, 0, 0.25)",
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		color: "#3f3f3f",
    		fontFamily: "Sansation",
    		fontWeight: "700",
    		fontSize: 15
  	},
  	historyPosition: {
    		left: 336,
    		position: "absolute"
  	},
  	topHeaderLayout: {
    		height: 31,
    		position: "absolute"
  	},
  	scanIcon: {
            flex: 1,
    		overflow: "hidden",
            backgroundColor: "#000"
  	},
  	leafIcon: {
    		marginTop: -182,
    		marginLeft: -182,
    		top: "50%",
    		left: "50%"
  	},
  	scanChild: {
    		top: 338,
    		left: 111,
            // @ts-ignore
    		filter: "drop-shadow(0px 0px 4px #fff) drop-shadow(0px 0px 18px rgba(255, 255, 255, 0.25))",
    		width: 218,
    		height: 280,
    		position: "absolute"
  	},
  	scanItem: {
    		top: 616,
    		left: 35,
    		width: 365,
    		height: 6,
    		position: "absolute"
  	},
  	scannerIcon: {
    		top: 296,
    		left: 38,
            // @ts-ignore
    		filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
  	},
  	cameraTopHeader: {
    		backgroundColor: "rgba(217, 217, 217, 0.4)",
    		height: 108,
    		top: 0
  	},
  	scanInner: {
    		top: 786,
    		borderTopLeftRadius: 40,
    		borderTopRightRadius: 40,
    		backgroundColor: "rgba(217, 217, 217, 0.8)",
    		height: 300,
  	},
  	button: {
    		left: "50%",
            marginLeft: -50,
    		top: 816,
    		width: 100,
    		height: 100,
    		position: "absolute"
  	},
  	icon: {
            // @ts-ignore
    		nodeWidth: 100,
            // @ts-ignore
    		nodeHeight: 100,
            backgroundColor: "#22c55e",
            borderRadius: 50,
            borderWidth: 4,
            borderColor: "#fff"
  	},
  	galleryBackgroundIcon: {
    		top: 834,
    		left: 40,
            // @ts-ignore
    		filter: "blur(0.8px)",
    		borderRadius: 10,
    		width: 64,
    		height: 64,
    		position: "absolute"
  	},
  	galleryIcon: {
    		top: 846,
    		left: 52,
            // @ts-ignore
    		filter: "drop-shadow(0px -1px 4px rgba(0, 0, 0, 0.5))",
    		width: 40,
    		height: 40,
    		position: "absolute",
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: 8
  	},
  	gallery: {
    		top: 905,
    		left: 42,
    		width: 62,
    		height: 16,
    		textShadowRadius: 5,
    		position: "absolute"
  	},
  	history: {
    		top: 898,
    		width: 53,
    		height: 15,
    		textShadowRadius: 10,
    		textShadowOffset: {
      			width: 0,
      			height: 0
    		},
    		textShadowColor: "rgba(0, 0, 0, 0.25)",
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		color: "#3f3f3f",
    		fontFamily: "Sansation",
    		fontWeight: "700",
    		fontSize: 15
  	},
  	historyicon: {
    		top: 841,
            // @ts-ignore
    		filter: "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25))",
    		width: 50,
    		height: 50,
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: 25
  	},
  	rectangleView: {
    		top: 751,
    		left: "50%",
            marginLeft: -111,
    		borderRadius: 8,
    		backgroundColor: "rgba(217,217,217, 0.8)",
    		width: 222,
    		height: 23,
    		position: "absolute"
  	},
  	fitYouPlant: {
    		marginLeft: -96,
    		top: 754,
    		fontSize: 12,
    		color: "#000",
    		textAlign: "center",
    		width: 192,
    		height: 13,
    		left: "50%",
    		position: "absolute"
  	},
  	topHeader: {
    		top: 66,
    		left: 22,
    		width: 394
  	},
  	back: {
    		top: 5,
    		width: 22,
    		height: 22,
    		left: 0,
    		position: "absolute"
  	},
  	icon2: {
            // @ts-ignore
    		filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))",
            // @ts-ignore
    		nodeWidth: 22,
            // @ts-ignore
    		nodeHeight: 22,
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 11
  	},
  	flashIcon: {
    		left: 363,
            // @ts-ignore
    		filter: "drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.25)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    		width: 31,
    		top: 0
  	}
});

export default LeafScanner;
