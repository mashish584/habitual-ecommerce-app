import React from "react";
import { Dimensions, View } from "react-native";
import { useScrollHandler } from "react-native-redash";
import Animated from "react-native-reanimated";

import Dot from "../screens/Onboarding/Dot";

import { useCards } from "../hooks/api";
import { Card } from "../utils/schema.types";
import theme from "../utils/theme";

import CreditCard from "./Cards/CreditCard";

const width = Dimensions.get("screen").width;

const PaymentCards = () => {
	const { scrollHandler, x } = useScrollHandler();
	const cards = useCards<"", Card[]>();

	return (
		<>
			<Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} decelerationRate="fast" snapToInterval={width} {...scrollHandler}>
				{cards.data?.data.map((card) => (
					<CreditCard card={card} />
				))}
			</Animated.ScrollView>
			<View style={[theme.rowStyle, { marginTop: theme.spacing.medium, justifyContent: "center" }]}>
				{new Array(cards?.data?.data?.length).fill(1).map((_, index) => {
					return (
						<Dot key={index} currentIndex={index} width={width} scrollX={x} mh={index === 1 ? 6 : 0} activeColor={theme.colors.shades.gray_80} />
					);
				})}
			</View>
		</>
	);
};

export default PaymentCards;
