import { StyleSheet } from "react-native";
import theme from "@utils/theme";

const styles = StyleSheet.create({
	container: {
		height: 100,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.shades.gray_20,
		alignItems: "center",
		paddingHorizontal: theme.spacing.medium,
	},
	imageView: {
		width: 70,
		height: 68,
		backgroundColor: theme.colors.shades.gray_20,
		borderRadius: 5,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	productInfo: {
		justifyContent: "space-between",
		alignItems: "center",
		paddingLeft: theme.spacing.small,
	},
});

export default styles;
