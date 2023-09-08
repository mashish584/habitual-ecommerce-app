import React from "react";
import { View, Text } from "react-native";

import theme from "@utils/theme";
import { Label as ILabel } from "./types";

const Label = ({ label, isOptional, mb }: ILabel) => {
	return (
		<View style={[theme.rowStyle, { marginBottom: mb || 8 }]}>
			<Text style={[theme.textStyles.h6, { color: theme.colors.shades.gray }]}>{label}</Text>
			{isOptional && <Text style={[theme.textStyles.body_sm, { color: theme.colors.shades.gray }]}>(optional)</Text>}
		</View>
	);
};

export default Label;
