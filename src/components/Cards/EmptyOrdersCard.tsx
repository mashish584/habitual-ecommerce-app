import React from "react";
import { Dimensions, Image, Text, View, ViewStyle } from "react-native";
import { generateBoxShadowStyle } from "../../utils";
import theme, { rgba } from "../../utils/theme";
import { Button } from "../Button";

const aspectRatio = 292 / 327;
const SCREEN_WIDTH = Dimensions.get("screen").width - theme.spacing.medium * 2;
export const EMPTY_ORDER_CARD_HEIGHT = SCREEN_WIDTH * aspectRatio;

interface EmptyOrderCard {
	style?: ViewStyle;
}

const EmptyOrdersCard = ({ style }: EmptyOrderCard) => {
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
				...generateBoxShadowStyle(0, 2, rgba.black(1), 0.04, 6, 10, rgba.black(1)),
				...style,
			}}>
			<View style={{ justifyContent: "center", alignItems: "center", marginTop: theme.spacing.small }}>
				<Image source={require("../../assets/images/empty-illustration.png")} />
				<Text style={[theme.textStyles.h4, theme.textStyles.center, { marginTop: theme.spacing.small, marginBottom: theme.spacing.xxSmall }]}>
					Uh oh! You have no orders.
				</Text>
				<Text style={[theme.textStyles.body_reg, theme.textStyles.center, { color: theme.colors.shades.gray_60 }]}>
					You have no orders at the moment. Go take a look at what we have an we’ll get your delivery to you asap!
				</Text>
			</View>
			<Button variant="primary" text="View recommended products" style={{ width: "100%" }} onPress={() => {}} />
		</View>
	);
};

export default EmptyOrdersCard;
