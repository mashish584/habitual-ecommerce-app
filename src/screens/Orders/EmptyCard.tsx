import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import EmptyInfoCard, { EMPTY_ORDER_CARD_HEIGHT } from "@components/Cards/EmptyInfoCard";
import images from "@assets/images";
import { BottomStackScreens } from "@nav/types";
import theme from "@utils/theme";

const EmptyCard = () => {
	const navigation = useNavigation<StackNavigationProp<BottomStackScreens, "BottomStack">>();
	return (
		<View style={{ flex: 1, paddingVertical: theme.spacing.xSmall, marginTop: EMPTY_ORDER_CARD_HEIGHT * 0.2 }}>
			<EmptyInfoCard
				illustration={images.emptyList}
				title="Uh oh! You have no orders."
				description="You have no orders at the moment. Go take a look at what we have an we’ll get your delivery to you asap!"
				buttonText="View recommended products"
				onAction={() => navigation.navigate("Home")}
			/>
		</View>
	);
};

export default EmptyCard;
