import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import theme from "../../utils/theme";

interface Pill {
	text: string;
	selected: boolean;
}

const Pill = ({ text, selected }: Pill) => {
	return (
		<TouchableOpacity>
			<View
				style={{
					minHeight: 40,
					minWidth: 70,
					paddingHorizontal: theme.spacing.medium,
					backgroundColor: selected ? theme.colors.shades.gray_80 : "transparent",
					borderWidth: 1,
					borderColor: theme.colors.shades.gray_80,
					borderRadius: 100,
					justifyContent: "center",
					alignItems: "center",
					marginBottom: theme.spacing.xSmall,
					marginRight: theme.spacing.xSmall,
				}}>
				<Text style={[theme.textStyles.body_reg, selected && { color: theme.colors.shades.white }]}>{text}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Pill;
