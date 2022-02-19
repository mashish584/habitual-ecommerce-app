import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle, View } from "react-native";
import theme from "../../utils/theme";

type variant = "primary" | "secondary" | "transparent" | "disabled" | "bordered";

interface Button {
	variant: variant;
	text: string;
	style?: ViewStyle | ViewStyle[];
	buttonTextStyle?: TextStyle | TextStyle[];
	iconComponent?: ReactNode;
	onPress: () => void;
}

const getButtonStyles = (variant: variant) => {
	const buttonStyle: ViewStyle = {};
	const textStyle: TextStyle = {};

	switch (variant) {
		case "primary":
			buttonStyle.backgroundColor = theme.colors.primary.yellow;
			textStyle.color = theme.colors.shades.gray_80;
			break;
		case "secondary":
			buttonStyle.backgroundColor = theme.colors.shades.gray;
			textStyle.color = theme.colors.shades.white;
			break;
		case "transparent":
			buttonStyle.backgroundColor = "transparent";
			textStyle.color = theme.colors.shades.gray_40;
			break;
		case "disabled":
			buttonStyle.backgroundColor = theme.colors.shades.gray_20;
			textStyle.color = theme.colors.shades.gray_60;
			break;
		case "bordered":
			buttonStyle.borderColor = theme.colors.shades.gray_80;
			buttonStyle.borderWidth = 1;
			buttonStyle.borderRadius = 100;
			textStyle.fontFamily = theme.fonts.lato.semibold;
			break;
	}

	return { buttonStyle, textStyle };
};

const Button = ({ variant, onPress, text, style, buttonTextStyle, ...props }: Button) => {
	const { buttonStyle, textStyle } = getButtonStyles(variant);
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.button, style, buttonStyle]}>
			{props.iconComponent ? <View style={{ position: "absolute", left: theme.spacing.medium }}>{props.iconComponent}</View> : null}
			<Text style={[theme.textStyles.button, textStyle, buttonTextStyle]}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		maxWidth: "100%",
		minHeight: 48,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 15,
	},
});

export default Button;
