import dayjs from "dayjs";
import { Dimensions, Platform } from "react-native";
import Toast from "react-native-toast-message";
import EncryptedStorage from "react-native-encrypted-storage";

import theme from "./theme";
import { DateFormats } from "./types";

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";

export const deviceHeight = Dimensions.get("screen").height;
export const deviceWidth = Dimensions.get("screen").width;
export const getSecureStorage = () => EncryptedStorage;

export const generateBoxShadowStyle = (
	xOffset: number,
	yOffset: number,
	shadowColorIos: string,
	shadowOpacity: number,
	shadowRadius: number,
	elevation: number,
	shadowColorAndroid: string,
) => {
	if (isIOS) {
		return {
			shadowColor: shadowColorIos,
			shadowOffset: { width: xOffset, height: yOffset },
			shadowOpacity,
			shadowRadius,
		};
	} else if (isAndroid) {
		return {
			elevation: 1,
			shadowColor: shadowColorAndroid,
		};
	}
};

export const formatTimeStamp = (timestamp: string, format: DateFormats) => {
	return dayjs(timestamp).format(format);
};

export const formatToIso = (timestamp: string, format: DateFormats) => dayjs(timestamp, format).toISOString();

export const debounce = (fn: (...args: any) => void, duration: number) => {
	let timer: any = null;

	return (...args: any) => {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
		timer = setTimeout(() => {
			fn(...args);
		}, duration);
	};
};

export const calculateOriginalPrice = (currentPrice: number, discount: number) => ((currentPrice / (100 - discount)) * 100).toFixed(2);

export const defaultAvatar = "https://ik.imagekit.io/imashish/avatar_3x_1izETN4cA.png";

export const COLOR_CARD_WIDTH = (Dimensions.get("screen").width - (theme.spacing.medium * 2 + theme.spacing.xxSmall * 2)) / 2;

export const breakFullName = (fullName: string | null) => {
	if (!fullName) return ["", ""];
	const name = fullName.split(" ");
	const lastName = name.pop() || "";
	const firstName = name.join(" ") || "";

	return [firstName, lastName];
};

export const isValidJSONString = (value: string) => {
	try {
		JSON.parse(value);
	} catch (error) {
		return false;
	}
	return true;
};

export const showToast = (type: "success" | "error", data: { title: string; message: string }) => {
	Toast.show({
		text1: data.title,
		text2: data.message,
		type,
		autoHide: true,
	});
};

export const saveDataInSecureStorage = async (key: string, value: string) => {
	await EncryptedStorage.setItem(key, value);
};

export const getDataFromSecureStorage = async (key: string) => {
	let result = await EncryptedStorage.getItem(key);
	return result;
};

export const getTextColorForBackground = (colorString: string) => {
	let rgba: [number, number, number, number];

	if (colorString.startsWith("#")) {
		// Handle hex format
		const hex = colorString.slice(1); // Remove '#'
		let r: number, g: number, b: number;

		if (hex.length === 6) {
			// Full hex format (RRGGBB)
			r = parseInt(hex.slice(0, 2), 16);
			g = parseInt(hex.slice(2, 4), 16);
			b = parseInt(hex.slice(4, 6), 16);
		} else if (hex.length === 3) {
			// Short hex format (RGB)
			r = parseInt(hex[0] + hex[0], 16);
			g = parseInt(hex[1] + hex[1], 16);
			b = parseInt(hex[2] + hex[2], 16);
		} else {
			throw new Error("Invalid hex color format");
		}

		rgba = [r, g, b, 1];
	} else {
		rgba = colorString
			.replace(/rgba?\(/, "")
			.replace(/\)/, "")
			.split(",")
			.map((v) => parseFloat(v.trim())) as [number, number, number, number];
	}

	const [r, g, b] = rgba;

	// Convert RGB to sRGB
	const srgb = [r, g, b].map((v) => {
		const value = v / 255;
		return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
	});

	// Calculate relative luminance
	const luminance = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];

	// Return 'dark-content' or 'light-content' based on luminance
	return luminance > 0.5 ? "dark-content" : "light-content";
};
