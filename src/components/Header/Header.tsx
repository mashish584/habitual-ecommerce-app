import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import theme from "../../utils/theme";

interface Header {
	title: string;
}

const Header = ({ title }: Header) => {
	return (
		<View
			style={[
				theme.rowStyle,
				{
					minHeight: 50,
					position: "relative",
					paddingHorizontal: theme.spacing.medium,
					alignItems: "center",
					justifyContent: "center",
					borderBottomColor: theme.colors.shades.gray_20,
					borderBottomWidth: 1,
				},
			]}>
			<TouchableOpacity style={[theme.iconButtonStyle, { position: "absolute", left: 12.5 }]}>
				<FontAwesomeIcon icon={faClose} />
			</TouchableOpacity>
			<Text style={theme.textStyles.h5}>{title}</Text>
		</View>
	);
};

export default Header;
