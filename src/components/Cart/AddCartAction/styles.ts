import { StyleSheet } from "react-native";
import theme from "@utils/theme";

const styles = StyleSheet.create({
	container: {
		width: "40%",
		height: "100%",
		backgroundColor: theme.colors.shades.gray_80,
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	button: {
		width: 22,
		height: 22,
		justifyContent: "center",
		alignItems: "center",
		borderColor: theme.colors.shades.white,
		borderWidth: 2,
		borderRadius: 50,
	},
});

export default styles;
