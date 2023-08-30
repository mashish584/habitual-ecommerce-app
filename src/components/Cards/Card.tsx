import React, { PropsWithChildren } from "react";
import { Pressable, ViewStyle } from "react-native";
import { generateBoxShadowStyle } from "../../utils";
import theme, { rgba } from "../../utils/theme";

interface Card {
	cardStyle?: ViewStyle;
	onPress?: () => void;
}

const Card = ({ cardStyle, onPress, children }: PropsWithChildren<Card>) => {
	return (
		<Pressable
			onPress={onPress}
			style={{
				// height: "100%",
				aspectRatio: 1,
				borderRadius: 10,
				backgroundColor: theme.colors.shades.white,
				justifyContent: "center",
				alignItems: "center",
				...generateBoxShadowStyle(0, 4, rgba.black(0.04), 1, 10, 10, rgba.black(1)),
				...cardStyle,
			}}>
			{children}
		</Pressable>
	);
};

export default Card;
