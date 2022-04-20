import React from "react";
import { View, Text } from "react-native";
import Animated from "react-native-reanimated";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import theme from "../../utils/theme";

interface Rating {
	stars: number;
	color: Animated.Node<number>;
}

const Review = ({ stars, color }: Rating) => {
	return (
		<View style={theme.rowStyle}>
			<View style={theme.rowStyle}>
				{new Array(5).fill(1).map((_, index) => {
					return (
						<FontAwesomeIcon
							key={index}
							icon={faStar as IconProp}
							color={index < stars ? theme.colors.primary.yellow : theme.colors.shades.gray_60}
						/>
					);
				})}
			</View>
			<Animated.Text style={[theme.textStyles.h6, { marginLeft: theme.spacing.xxSmall / 2, color }] as any}>0</Animated.Text>
			<Text
				style={[
					theme.textStyles.body_sm_alt,
					{ color: theme.colors.shades.gray_60, marginLeft: theme.spacing.xxSmall / 2, textDecorationLine: "underline" },
				]}>
				0 Reviews
			</Text>
		</View>
	);
};

export default Review;
