import { Alert, Platform } from "react-native";
import { openSettings, PERMISSIONS, request } from "react-native-permissions";

const isIOS = Platform.OS === "ios";

const showSettingsDialogue = (permissionText: string) => {
	Alert.alert("Permission Required", permissionText, [
		{
			text: "Settings",
			onPress: openSettings,
		},
		{
			text: "Cancel",
			onPress: () => {},
		},
	]);
};

const checkCameraPermission = async () => {
	const permission = isIOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
	const response = await request(permission);

	if (["blocked", "denied"].includes(response)) {
		showSettingsDialogue("Please provide camera permission from settings.");
	}

	if (["unavailable"].includes(response)) {
		Alert.alert("EP", "Can't access camera on this device.");
	}

	return response === "granted";
};

const checkGalleryPermission = async () => {
	const permission = isIOS ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
	const response = await request(permission);

	if (["blocked", "denied"].includes(response)) {
		showSettingsDialogue("Please provide gallery permission from settings.");
	}

	if (["unavailable"].includes(response)) {
		Alert.alert("EP", "Can't access gallery on this device.");
	}

	return response === "granted";
};

export { checkCameraPermission, checkGalleryPermission };
