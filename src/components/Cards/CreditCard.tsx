import React from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Card } from "../../utils/schema.types";

import theme from "../../utils/theme";
import Chip from "../Svg/Chip";

const aspectRatio = 192 / 327;
const CARD_WIDTH = Dimensions.get("screen").width - theme.spacing.medium * 2;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;

interface CreditCard {
	card: Card;
}

const CreditCard = ({ card }: CreditCard) => {
	console.log({ card });
	return (
		<View
			style={{
				width: CARD_WIDTH,
				height: CARD_HEIGHT,
				borderRadius: 10,
				overflow: "hidden",
				marginHorizontal: theme.spacing.medium,
				justifyContent: "space-between",
				padding: theme.spacing.small,
			}}>
			<LinearGradient
				start={{ x: -0.2, y: 0.1 }}
				end={{ x: 0.4, y: 0.9 }}
				colors={["#686A6B", "#262323"]}
				style={{ ...StyleSheet.absoluteFillObject }}
			/>
			{/* Header */}
			<View style={[theme.rowStyle, { justifyContent: "space-between" }]}>
				<Chip />
				<View style={{ alignItems: "flex-end" }}>
					<Text style={[theme.textStyles.h4, { color: theme.colors.shades.white }]}>{card?.brand}</Text>
					<Text style={[theme.textStyles.h5, { color: theme.colors.shades.white }]}>{card?.expiry}</Text>
				</View>
			</View>
			{/* Footer */}
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Text style={[theme.textStyles.body_reg, { color: theme.colors.shades.white, top: 5 }]}>****</Text>
				<Text style={[theme.textStyles.body_reg, { color: theme.colors.shades.white, marginLeft: theme.spacing.xxSmall }]}>{card?.last4}</Text>
			</View>
		</View>
	);
};

export default CreditCard;
