import React from "react";
import { Text, View } from "react-native";
import theme from "../utils/theme";

interface Seperator {
	mt: number;
}

const Seperator = ({ mt }: Seperator) => {
	return (
		<View style={{ minHeight: 20, alignItems: "center", marginTop: mt || 0 }}>
			<View style={{ width: "100%", borderWidth: 1, borderColor: theme.colors.shades.gray_40, position: "absolute", top: 10 }} />
			<View style={{ width: 40, height: 20, backgroundColor: theme.colors.shades.white }}>
				<Text style={[theme.textStyles.h5, { textAlign: "center", lineHeight: theme.fontSizes.sm + 2 }]}>or</Text>
			</View>
		</View>
	);
};

export default Seperator;
