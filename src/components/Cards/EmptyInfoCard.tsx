import React from "react";
import { Dimensions, Image, Text, View, ViewStyle } from "react-native";

import { generateBoxShadowStyle } from "../../utils";
import theme, { rgba } from "../../utils/theme";
import { Button } from "../Button";

const aspectRatio = 292 / 327;
const SCREEN_WIDTH = Dimensions.get("screen").width - theme.spacing.medium * 2;
export const EMPTY_ORDER_CARD_HEIGHT = SCREEN_WIDTH * aspectRatio;

interface EmptyOrderCard {
	title: string;
	description: string;
	buttonText: string;
	onAction: () => void;
	style?: ViewStyle;
}

const EmptyInfoCard = ({ title, description, buttonText, style, ...props }: EmptyOrderCard) => {
	return (
		<View
			style={{
				width: SCREEN_WIDTH,
				height: EMPTY_ORDER_CARD_HEIGHT,
				backgroundColor: theme.colors.shades.white,
				marginHorizontal: theme.spacing.medium,
				justifyContent: "space-between",
				alignItems: "center",
				padding: theme.spacing.small,
				borderRadius: 10,
				...generateBoxShadowStyle(0, 4, rgba.black(0.1), 1, 10, 10, rgba.black(1)),
				...style,
			}}>
			<View style={{ justifyContent: "center", alignItems: "center", marginTop: theme.spacing.small }}>
				<Image source={require("../../assets/images/empty-illustration.png")} />
				<Text style={[theme.textStyles.h4, theme.textStyles.center, { marginTop: theme.spacing.small, marginBottom: theme.spacing.xxSmall }]}>
					{title}
				</Text>
				<Text style={[theme.textStyles.body_reg, theme.textStyles.center, { color: theme.colors.shades.gray_60 }]}>{description}</Text>
			</View>
			<Button variant="primary" text={buttonText} style={{ width: "100%" }} onPress={props.onAction} />
		</View>
	);
};

export default EmptyInfoCard;
