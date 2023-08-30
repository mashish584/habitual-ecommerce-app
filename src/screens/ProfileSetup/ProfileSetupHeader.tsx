import React, { PropsWithChildren } from "react";
import { Text, TextStyle, View } from "react-native";

import theme from "../../utils/theme";

interface ProfileSetupHeader {
	title: string;
	titleStyle?: TextStyle;
	description?: string;
	descriptionStyle?: TextStyle;
}

const ProfileSetupHeader = ({ title, titleStyle, description, descriptionStyle, children }: PropsWithChildren<ProfileSetupHeader>) => {
	return (
		<View style={{ alignItems: "center", paddingTop: theme.spacing.large }}>
			<Text style={[theme.textStyles.h3, theme.textStyles.center, titleStyle]}>{title}</Text>
			{description ? (
				<Text style={[theme.textStyles.body_reg, theme.textStyles.center, { marginTop: theme.spacing.medium }, descriptionStyle]}>{description}</Text>
			) : null}
			{children}
		</View>
	);
};

export default ProfileSetupHeader;
