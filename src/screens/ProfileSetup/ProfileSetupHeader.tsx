import React from "react";
import { Text, TextStyle, View } from "react-native";

import theme from "../../utils/theme";

interface ProfileSetupHeader {
	title: string;
	description: string;
	descriptionStyle?: TextStyle;
}

const ProfileSetupHeader: React.FC<ProfileSetupHeader> = ({ title, description, descriptionStyle, children }) => {
	return (
		<View style={{ alignItems: "center", paddingTop: theme.spacing.large }}>
			<Text style={[theme.textStyles.h3, theme.textStyles.center]}>{title}</Text>
			<Text style={[theme.textStyles.body_reg, theme.textStyles.center, { marginTop: theme.spacing.medium }, descriptionStyle]}>{description}</Text>
			{children}
		</View>
	);
};

export default ProfileSetupHeader;
