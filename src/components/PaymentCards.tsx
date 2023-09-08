import React from "react";
import { Dimensions, View, Text } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import Dot from "@screens/Onboarding/Dot";

import { useCards } from "@hooks/api";
import { Card } from "@utils/schema.types";
import theme from "@utils/theme";

import CreditCard from "./Cards/CreditCard";

const width = Dimensions.get("screen").width;

const PaymentCards = () => {
	const translateX = useSharedValue(0);
	const scrollHandler = useAnimatedScrollHandler((e) => {
		translateX.value = e.contentOffset.x;
	});
	const { data, isLoading } = useCards<"", Card[]>();

	if (isLoading) {
		return null;
	}

	if (!data?.data?.length) {
		return (
			<Text style={[theme.textStyles.h6, { color: theme.colors.shades.gray_60, marginTop: theme.spacing.small, marginLeft: theme.spacing.medium }]}>
				{'No cards available. Tap on "Pay Now" to add card.'}
			</Text>
		);
	}

	return (
		<>
			<Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} decelerationRate="fast" snapToInterval={width} {...scrollHandler}>
				{data?.data?.map((card, index) => (
					<CreditCard key={index} card={card} />
				))}
			</Animated.ScrollView>
			<View style={[theme.rowStyle, { marginTop: theme.spacing.medium, justifyContent: "center" }]}>
				{new Array(data?.data?.length).fill(1).map((_, index) => {
					return (
						<Dot
							key={index}
							currentIndex={index}
							width={width}
							scrollX={translateX}
							mh={index === 1 ? 6 : 0}
							activeColor={theme.colors.shades.gray_80}
						/>
					);
				})}
			</View>
		</>
	);
};

export default PaymentCards;
