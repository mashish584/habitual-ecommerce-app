import { TextStyle, ViewStyle } from "react-native";

export const rgba = {
	yellow: (alpha: number) => `rgba(255, 226, 2, ${alpha})`,
	blue: (alpha: number) => `rgba(95, 161, 213, ${alpha})`,
	teal: (alpha: number) => `rgba(48, 214, 176, ${alpha})`,
	green: (alpha: number) => `rgba(81, 185, 96, ${alpha})`,
	orange: (alpha: number) => `rgba(254, 134, 104, ${alpha})`,
	black: (alpha: number) => `rgba(0,0,0,${alpha})`,
	white: (alpha: number) => `rgba(255,255,255,${alpha})`,
};

/**
 * Font Family as per size
 * @regular 400
 * @medium 500
 * @semibold 600
 * @bold 700
 * @heavy 800
 */
const fonts = {
	lato: {
		regular: "Lato-Regular",
		medium: "Lato-Medium",
		semibold: "Lato-Semibold",
		bold: "Lato-Bold",
		heavy: "Lato-Heavy",
	},
};

const fontSizes = {
	xxl: 40,
	lg: 32,
	md: 28,
	normal: 20,
	sm: 16,
	xs: 12,
	xxs: 10,
};

const textStyles: Record<string, TextStyle> = {
	//@headings
	h1: {
		fontFamily: fonts.lato.bold,
		fontSize: fontSizes.xxl,
		color: rgba.black(0.8),
	},
	h2: {
		fontFamily: fonts.lato.bold,
		fontSize: fontSizes.lg,
		lineHeight: fontSizes.lg + 4,
		color: rgba.black(0.8),
	},
	h3: {
		fontFamily: fonts.lato.bold,
		fontSize: fontSizes.md,
		lineHeight: fontSizes.md + 4,
		color: rgba.black(0.8),
	},
	h4: {
		fontFamily: fonts.lato.bold,
		fontSize: fontSizes.normal,
		lineHeight: fontSizes.normal + 4,
		color: rgba.black(0.8),
	},
	h5: {
		fontFamily: fonts.lato.heavy,
		fontSize: fontSizes.sm,
		lineHeight: fontSizes.sm + 4,
		color: rgba.black(0.8),
	},
	h6: {
		fontFamily: fonts.lato.heavy,
		fontSize: fontSizes.xs,
		lineHeight: fontSizes.xs + 4,
		color: rgba.black(0.8),
	},

	//@text
	body_lg: {
		fontFamily: fonts.lato.regular,
		fontSize: fontSizes.normal,
		lineHeight: fontSizes.normal + 4,
		color: rgba.black(0.8),
	},
	body_reg: {
		fontFamily: fonts.lato.regular,
		fontSize: fontSizes.sm,
		lineHeight: fontSizes.sm + 8,
		color: rgba.black(0.8),
	},
	body_sm: {
		fontFamily: fonts.lato.regular,
		fontSize: fontSizes.xs,
		lineHeight: fontSizes.xs + 4,
		color: rgba.black(0.8),
	},
	body_sm_alt: {
		fontFamily: fonts.lato.semibold,
		fontSize: fontSizes.xs,
		lineHeight: fontSizes.xs + 4,
		color: rgba.black(0.8),
	},
	label: {
		fontFamily: fonts.lato.heavy,
		fontSize: fontSizes.xs,
		lineHeight: fontSizes.xs + 4,
		color: rgba.black(0.8),
	},
	hint: {
		fontFamily: fonts.lato.medium,
		fontSize: fontSizes.xxs,
		lineHeight: fontSizes.xxs + 6,
		color: rgba.black(0.8),
	},

	//@interactions
	link_reg: {
		fontFamily: fonts.lato.heavy,
		fontSize: fontSizes.sm,
		lineHeight: fontSizes.sm + 4,
		textDecorationLine: "underline",
		color: rgba.black(0.8),
	},
	link_sm: {
		fontFamily: fonts.lato.heavy,
		fontSize: fontSizes.xs,
		lineHeight: fontSizes.xs + 4,
		textDecorationLine: "underline",
		color: rgba.black(0.8),
	},
	strikethrough_reg: {
		fontFamily: fonts.lato.bold,
		fontSize: fontSizes.sm,
		textDecorationLine: "line-through",
		color: rgba.black(0.8),
	},
	strikethrough_sm: {
		fontFamily: fonts.lato.heavy,
		fontSize: fontSizes.xs,
		textDecorationLine: "line-through",
		color: rgba.black(0.8),
	},
	pill_reg: {
		fontFamily: fonts.lato.heavy,
		fontSize: fontSizes.sm,
		color: rgba.black(0.8),
	},
	pill_sm: {
		fontFamily: fonts.lato.heavy,
		fontSize: fontSizes.xs,
		color: rgba.black(0.8),
	},
	button: {
		fontFamily: fonts.lato.bold,
		fontSize: fontSizes.sm,
		lineHeight: fontSizes.sm + 4,
		color: rgba.black(0.8),
	},
	center: {
		textAlign: "center",
	},
	hightlightText: {
		fontFamily: fonts.lato.heavy,
		fontSize: fontSizes.sm,
		lineHeight: fontSizes.sm + 8,
		color: "#FE8668",
	},
};

const containerStyle: ViewStyle = {
	flex: 1,
	backgroundColor: rgba.white(1),
};

const rowStyle: ViewStyle = {
	flexDirection: "row",
};

const iconButtonStyle: ViewStyle = {
	width: 25,
	height: 25,
	justifyContent: "center",
	alignItems: "center",
};

const theme = {
	colors: {
		primary: {
			yellow: "#FFE202",
			yellow_20: "#FFF9CC",
		},
		secondary: {
			blue: "#5FA1D5",
			blue_20: rgba.blue(0.2),
			green: "#51B960",
			green_20: rgba.green(0.2),
		},
		accents: {
			red: "#FE8668",
			orange: "#FDBC1F",
			teal: "#30D6B0",
			indigo: "#4269F2",
		},
		shades: {
			gray: "#000000",
			gray_80: "#3A3A3A",
			gray_60: "#A6A6AA",
			gray_40: "#CBCBD4",
			gray_20: "#F8F7FA",
			white: "#FFFFFF",
			w_transparent: "#FFFFFF00",
			b_transparent: "#00000000",
		},
	},
	spacing: {
		large: 30,
		medium: 25,
		normal: 20,
		small: 15,
		xSmall: 10,
		xxSmall: 8,
	},
	fonts,
	fontSizes,
	textStyles,
	containerStyle,
	rowStyle,
	iconButtonStyle,
};

//border-radius -> 15,10

export default theme;
