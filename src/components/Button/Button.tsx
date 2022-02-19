import React from "react";
import { StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import theme from "../../utils/theme";

type variant = "primary" | "secondary" | "transparent";

interface Button {
	variant: variant;
	text: string;
	style?: ViewStyle | ViewStyle;
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
	}

	return { buttonStyle, textStyle };
};

const Button = ({ variant, onPress, text, style }: Button) => {
	const { buttonStyle, textStyle } = getButtonStyles(variant);
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.button, style, buttonStyle]}>
			<Text style={[theme.textStyles.button, textStyle]}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		maxWidth: "100%",
		minHeight: 48,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Button;
