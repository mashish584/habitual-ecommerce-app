import { StyleSheet } from "react-native";
import { deviceHeight } from "../../utils";
import theme from "../../utils/theme";

export const CART_FOOTER_HEIGHT = 100;

const styles = StyleSheet.create({
	emptyView: {
		height: deviceHeight * 0.3,
		justifyContent: "center",
		alignItems: "center",
	},
	emptyViewText: {
		marginTop: theme.spacing.medium,
	},
	footerContainer: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		justifyContent: "space-between",
		backgroundColor: theme.colors.shades.white,
		height: CART_FOOTER_HEIGHT,
		alignItems: "center",
		paddingHorizontal: theme.spacing.medium,
	},
	footerTextLabel: {
		color: theme.colors.shades.gray_60,
		textTransform: "uppercase",
	},
});

export default styles;
