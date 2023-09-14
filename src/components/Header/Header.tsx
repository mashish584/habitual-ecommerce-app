import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View, TextStyle, ViewStyle } from "react-native";

import theme from "@utils/theme";

/**
 * @variant
 * 		primary - Header with cross and center title
 * 		secondary - Header with bag icon and text on right
 */

export type ActionType = "left" | "right";

interface Header {
	variant: "primary" | "secondary";
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	title?: string | null;
	titleStyle?: TextStyle | TextStyle[];
	headerStyle?: ViewStyle;
	onAction?: (type: ActionType) => void;
}

const { shades } = theme.colors;

const Header = ({ title, variant, titleStyle, headerStyle, ...props }: Header) => {
	const isPrimary = variant === "primary";

	const onLeftIconPress = () => {
		if (props.onAction) {
			props.onAction("left");
		}
	};

	const onRightIconPress = () => {
		if (props.onAction) {
			props.onAction("right");
		}
	};

	return (
		<View
			style={[
				theme.rowStyle,
				{
					minHeight: 50,
					position: "relative",
					paddingHorizontal: theme.spacing.medium,
					alignItems: "center",
					justifyContent: variant === "secondary" ? "space-between" : "center",
					borderBottomColor: theme.colors.shades.gray_20,
					borderBottomWidth: isPrimary ? 1 : 0,
				},
				headerStyle,
			]}>
			{props.leftIcon && (
				<TouchableOpacity
					activeOpacity={!onLeftIconPress ? 1 : 0.8}
					disabled={!onLeftIconPress}
					onPress={onLeftIconPress}
					style={[theme.iconButtonStyle, { position: "absolute", left: theme.spacing.medium }]}>
					{props.leftIcon}
				</TouchableOpacity>
			)}

			{title && (
				<Text style={[isPrimary ? theme.textStyles.h5 : theme.textStyles.h6, { color: isPrimary ? shades.gray_80 : shades.gray_60 }, titleStyle]}>
					{title}
				</Text>
			)}

			{props.rightIcon && (
				<TouchableOpacity onPress={onRightIconPress} style={[theme.iconButtonStyle, { position: "absolute", right: theme.spacing.medium }]}>
					{props.rightIcon}
				</TouchableOpacity>
			)}
		</View>
	);
};

export default Header;
