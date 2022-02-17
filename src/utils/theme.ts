import { TextStyle, ViewStyle } from "react-native";

export const rgba = {
	yellow: (alpha: number) => `rgba(255, 226, 2, ${alpha})`,
	blue: (alpha: number) => `rgba(95, 161, 213, ${alpha})`,
	green: (alpha: number) => `rgba(81, 185, 96, ${alpha})`,
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
	},
	h2: {
		fontFamily: fonts.lato.bold,
		fontSize: fontSizes.lg,
		lineHeight: fontSizes.lg + 4,
	},
	h3: {
		fontFamily: fonts.lato.bold,
		fontSize: fontSizes.md,
		lineHeight: fontSizes.md + 4,
	},
	h4: {
		fontFamily: fonts.lato.bold,
		fontSize: fontSizes.normal,
		lineHeight: fontSizes.normal + 4,
	},
	h5: {
		fontFamily: fonts.lato.heavy,
		fontSize: fontSizes.sm,
		lineHeight: fontSizes.sm + 4,
	},
	h6: {
		fontFamily: fonts.lato.heavy,
		fontSize: fontSizes.xs,
		lineHeight: fontSizes.xs + 4,
	},

	//@text
	body_lg: {
		fontFamily: fonts.lato.regular,
		fontSize: fontSizes.normal,
		lineHeight: fontSizes.normal + 4,
	},
	body_reg: {
		fontFamily: fonts.lato.regular,
		fontSize: fontSizes.sm,
		lineHeight: fontSizes.sm + 8,
	},
	body_sm: {
		fontFamily: fonts.lato.regular,
		fontSize: fontSizes.xs,
		lineHeight: fontSizes.xs + 4,
	},
	body_sm_alt: {
		fontFamily: fonts.lato.semibold,
		fontSize: fontSizes.xs,
		lineHeight: fontSizes.xs + 4,
	},
	label: {
		fontFamily: fonts.lato.heavy,
		fontSize: fontSizes.xs,
		lineHeight: fontSizes.xs + 4,
	},
	hint: {
		fontFamily: fonts.lato.medium,
		fontSize: fontSizes.xxs,
		lineHeight: fontSizes.xxs + 6,
	},

	//@interactions
	link_reg: {
		fontFamily: fonts.lato.heavy,
		fontSize: fontSizes.sm,
		lineHeight: fontSizes.sm + 4,
		textDecorationLine: "underline",
	},
	link_sm: {
		fontFamily: fonts.lato.heavy,
		fontSize: fontSizes.xs,
		lineHeight: fontSizes.xs + 4,
		textDecorationLine: "underline",
	},
	strikethrough_reg: {
		fontFamily: fonts.lato.bold,
		fontSize: fontSizes.sm,
		textDecorationLine: "line-through",
	},
	strikethrough_sm: {
		fontFamily: fonts.lato.heavy,
		fontSize: fontSizes.xs,
		textDecorationLine: "line-through",
	},
	pill_reg: {
		fontFamily: fonts.lato.heavy,
		fontSize: fontSizes.sm,
	},
	pill_sm: {
		fontFamily: fonts.lato.heavy,
		fontSize: fontSizes.xs,
	},
};

const containerStyle: ViewStyle = {
	flex: 1,
	backgroundColor: rgba.white(1),
};

const theme = {
	colors: {
		primary: {
			yellow: "#FFE202",
			yellow_20: rgba.yellow(0.2),
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
			gray: rgba.black(1),
			gray_80: rgba.black(0.8),
			gray_60: rgba.black(0.6),
			gray_40: rgba.black(0.4),
			gray_20: rgba.black(0.2),
			white: "#FFFFFF",
		},
	},
	spacing: {
		large: 30,
		medium: 25,
		normal: 20,
		small: 15,
	},
	fonts,
	fontSizes,
	textStyles,
	containerStyle,
};

export default theme;
