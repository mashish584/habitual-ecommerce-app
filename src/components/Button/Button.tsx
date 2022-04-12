import React from "react";
import { StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle, View, ActivityIndicator } from "react-native";

import theme from "../../utils/theme";
import { ButtonI, variant } from "./types";

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

const Button = ({ variant, onPress, text, style, buttonTextStyle, ...props }: ButtonI) => {
	const { buttonStyle, textStyle } = getButtonStyles(variant);
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={() => {
				if (props.isLoading) return;
				onPress();
			}}
			style={[styles.button, buttonStyle, style]}>
			{props.iconComponent ? (
				<View style={[{ position: "absolute", left: theme.spacing.medium }, props.iconStyle]}>{props.iconComponent}</View>
			) : null}
			<Text style={[theme.textStyles.button, textStyle, buttonTextStyle]}>{text}</Text>
			{props.isLoading && <ActivityIndicator size="small" color={theme.colors.shades.gray} style={{ marginLeft: 10 }} />}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		maxWidth: "100%",
		height: 48,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 15,
		flexDirection: "row",
	},
});

export default Button;
