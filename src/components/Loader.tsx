import React from "react";
import { ActivityIndicator, View, StyleSheet, ViewStyle } from "react-native";
import theme from "../utils/theme";

interface Loader {
	style?: ViewStyle;
}

const Loader = (props: Loader) => {
	return (
		<View style={[styles.loading, props.style]}>
			<ActivityIndicator size={"small"} color={theme.colors.shades.gray_80} />
		</View>
	);
};

const styles = StyleSheet.create({
	loading: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Loader;
