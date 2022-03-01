import React from "react";
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import theme from "../../utils/theme";

type PillVariant = "saved" | "default";
type PillColors = { textColor?: string | Animated.Node<Number>; pillColor?: string | Animated.Node<Number> };
type PillValue = {
	containerStyle: ViewStyle;
	textStyle: TextStyle;
};
interface Pill {
	variant: PillVariant;
	text: string;
	selected?: boolean;
	colors?: PillColors;
}

const getPillStyle = (variant: PillVariant, colors?: PillColors, selected?: boolean): PillValue => {
	const styles = {
		containerStyle: {},
		textStyle: {},
	};

	switch (variant) {
		case "saved":
			styles.containerStyle = {
				minWidth: 60,
				height: 20,
				backgroundColor: colors?.pillColor || theme.colors.secondary.green_20,
				borderRadius: 10,
				paddingHorizontal: theme.spacing.xSmall,
			};

			styles.textStyle = [theme.textStyles.pill_sm, { color: colors?.textColor || theme.colors.secondary.green }];
			break;
		default:
			styles.containerStyle = {
				minWidth: 70,
				height: 40,
				backgroundColor: selected ? theme.colors.shades.gray_80 : "transparent",
				borderWidth: 1,
				borderColor: theme.colors.shades.gray_80,
				borderRadius: 100,
				marginBottom: theme.spacing.xSmall,
				marginRight: theme.spacing.xSmall,
				paddingHorizontal: theme.spacing.medium,
			};
			styles.textStyle = {
				...theme.textStyles.body_reg,
			};

			if (selected) styles.textStyle = { ...styles.textStyle, color: theme.colors.shades.white };

			break;
	}

	return styles;
};

const Pill = ({ text, selected, variant, colors }: Pill) => {
	const pillStyle = getPillStyle(variant, colors, selected);

	return (
		<TouchableOpacity>
			<Animated.View style={[pillStyle.containerStyle, { justifyContent: "center", alignItems: "center" }]}>
				<Animated.Text style={pillStyle.textStyle}>{text}</Animated.Text>
			</Animated.View>
		</TouchableOpacity>
	);
};

export default Pill;
