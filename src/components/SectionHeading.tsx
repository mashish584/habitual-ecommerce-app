import React from "react";
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";

import { containerStyle } from "../screens/ProfileSetup/ProfileContainer";
import theme from "../utils/theme";

interface Section {
	title: string;
	actionText?: string;
	containerStyle?: ViewStyle;
	headingStyle?: TextStyle;
	onPress?: () => void;
}

const SectionHeading = ({ title, actionText, onPress, ...props }: Section) => {
	return (
		<View style={[containerStyle, theme.rowStyle, { marginTop: theme.spacing.small }, props.containerStyle]}>
			<Text style={[theme.textStyles.pill_sm, props.headingStyle]}>{title}</Text>
			<TouchableOpacity onPress={onPress}>
				<Text style={[theme.textStyles.link_sm, { color: theme.colors.shades.gray_60, textTransform: "uppercase" }]}>{actionText}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SectionHeading;
