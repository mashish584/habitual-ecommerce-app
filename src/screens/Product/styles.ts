import { StyleSheet } from "react-native";
import theme from "@utils/theme";

const styles = StyleSheet.create({
	slideIndicators: {
		justifyContent: "center",
		width: "100%",
		transform: [{ translateY: -130 }],
	},
	productContent: {
		paddingHorizontal: theme.spacing.medium,
		paddingVertical: theme.spacing.small,
		position: "absolute",
		width: "100%",
		bottom: 0,
		justifyContent: "flex-start",
	},
	contentLayer: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: theme.colors.shades.white,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
	colorContainer: {
		width: 32,
		height: 32,
		backgroundColor: theme.colors.shades.white,
		borderRadius: 50,
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
		marginRight: theme.spacing.small,
		borderColor: theme.colors.primary.yellow,
	},
	color: {
		width: 26,
		height: 26,
		borderRadius: 50,
		borderColor: theme.colors.shades.gray_40,
	},

	// ProductPriceInfo
	priceInfoContainer: {
		flex: 0.15,
		justifyContent: "center",
		paddingHorizontal: theme.spacing.medium,
		marginTop: -15,
	},
	startingAtLabel: {
		textTransform: "uppercase",
		marginBottom: theme.spacing.xxSmall,
	},
	strikePrice: {
		color: theme.colors.shades.gray_60,
		marginHorizontal: theme.spacing.xxSmall,
	},
	priceInfoButton: {
		width: 48,
		height: 48,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default styles;
