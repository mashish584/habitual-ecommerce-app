import React from "react";
import { View, ViewStyle, ScrollView } from "react-native";

import theme from "../../utils/theme";

interface Curve {
	isCurve: boolean;
	style?: ViewStyle;
}

const Curve: React.FC<Curve> = ({ isCurve, style, children }) => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: theme.colors.shades.white,
				marginTop: theme.spacing.small,
				borderTopLeftRadius: isCurve ? 0 : 20,
				borderTopRightRadius: isCurve ? 0 : 20,
				paddingTop: theme.spacing.medium,
				...style,
			}}>
			<ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
		</View>
	);
};

export default Curve;
