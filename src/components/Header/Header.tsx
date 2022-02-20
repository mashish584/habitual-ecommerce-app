import React from "react";
import { Text, TouchableOpacity, View, Image, TextStyle } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import theme from "../../utils/theme";

/**
 * @variant
 * 		primary - Header with cross and center title
 * 		secondary - Header with bag icon and text on right
 */
interface Header {
	variant: "primary" | "secondary";
	title: string;
	titleStyle?: TextStyle | TextStyle[];
}

const { shades } = theme.colors;

const Header = ({ title, variant, titleStyle }: Header) => {
	const isPrimary = variant === "primary";

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
			]}>
			{variant === "primary" ? (
				<TouchableOpacity style={[theme.iconButtonStyle, { position: "absolute", left: 12.5 }]}>
					<FontAwesomeIcon icon={faClose} />
				</TouchableOpacity>
			) : (
				<Image source={require("../../assets/images/bag.png")} style={{ width: 30, height: 32 }} resizeMode={"contain"} />
			)}
			<Text style={[isPrimary ? theme.textStyles.h5 : theme.textStyles.h6, { color: isPrimary ? shades.gray_80 : shades.gray_60 }, titleStyle]}>
				{title}
			</Text>
		</View>
	);
};

export default Header;
