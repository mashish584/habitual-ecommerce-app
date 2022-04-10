import React from "react";
import { View, ViewStyle } from "react-native";
import { generateBoxShadowStyle } from "../../utils";
import theme, { rgba } from "../../utils/theme";

interface Card {
	cardStyle?: ViewStyle;
}

const Card: React.FC<Card> = ({ cardStyle, children }) => {
	return (
		<View
			style={{
				height: "100%",
				aspectRatio: 1,
				borderRadius: 10,
				backgroundColor: theme.colors.shades.white,
				justifyContent: "center",
				alignItems: "center",
				...generateBoxShadowStyle(0, 4, rgba.black(0.1), 1, 10, 10, rgba.black(1)),
				...cardStyle,
			}}>
			{children}
		</View>
	);
};

export default Card;
