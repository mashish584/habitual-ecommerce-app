import React from "react";
import { ImageURISource, Text, TouchableOpacity, ViewStyle } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import theme, { rgba } from "../../utils/theme";
import { generateBoxShadowStyle } from "../../utils";
import Card from "./Card";

interface ColorCard {
	variant: "defaul" | "fixed";
	width: number;
	text: string;
	cardStyle?: ViewStyle;
	cardColor?: string;
	image?: ImageURISource;
	hideButtton?: boolean;
}

const ColorCard = ({ variant, width, text, ...props }: ColorCard) => {
	return (
		<Card
			cardStyle={{
				width,
				height: "100%",
				aspectRatio: 1,
				borderRadius: 10,
				backgroundColor: props.cardColor || theme.colors.shades.white,
				justifyContent: "space-between",
				...generateBoxShadowStyle(0, 10, rgba.black(0.04), 1, 10, 10, rgba.black(1)),
				...props.cardStyle,
			}}>
			<Text style={[theme.textStyles.h4, { margin: theme.spacing.small, color: theme.colors.shades.white }]}>{text}</Text>
			{!props.hideButtton && (
				<TouchableOpacity
					style={{
						width: 32,
						height: 32,
						borderRadius: 50,
						backgroundColor: theme.colors.shades.white,
						justifyContent: "center",
						alignItems: "center",
						alignSelf: "flex-end",
						margin: theme.spacing.small,
						...generateBoxShadowStyle(0, 5, rgba.black(0.1), 1, 15, 10, rgba.black(1)),
					}}>
					<FontAwesomeIcon icon={faAngleRight} />
				</TouchableOpacity>
			)}
		</Card>
	);
};

export default ColorCard;
