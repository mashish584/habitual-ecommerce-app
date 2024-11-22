import React, { useEffect } from "react";
import { Image, ImageURISource, TouchableOpacity, View } from "react-native";

import { generateBoxShadowStyle } from "@utils/index";
import theme, { rgba } from "@utils/theme";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export type CategoryInfo = {
	label: string;
	image: ImageURISource;
	aspectRatio: number;
	selected: boolean;
};

interface CategoryCard {
	category: CategoryInfo;
	width: number;
	spacing: number;
	onPress: () => void;
}

const CategoryCard = ({ category, width, spacing, onPress }: CategoryCard) => {
	const transitionValue = useSharedValue(0);

	const rCardStyle = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(transitionValue.value, [0, 1], [theme.colors.shades.white, theme.colors.shades.gray_80]);
		return {
			backgroundColor,
		};
	}, []);

	const rTextStyle = useAnimatedStyle(() => {
		const color = interpolateColor(transitionValue.value, [0, 1], [theme.colors.shades.gray, theme.colors.shades.white]);
		return {
			color,
		};
	}, []);

	useEffect(() => {
		transitionValue.value = withTiming(category.selected ? 1 : 0);
	}, [category.selected]);

	return (
		<TouchableOpacity activeOpacity={0.9} onPress={onPress}>
			<Animated.View
				style={[
					{
						width: width,
						borderWidth: 1,
						borderRadius: 10,
						borderColor: theme.colors.shades.gray_80,
						marginBottom: spacing,
						// overflow: "hidden",
						height: width * category.aspectRatio,
						...generateBoxShadowStyle(0, 20, rgba.black(1), 0.04, 20, 10, rgba.black(1)),
					},
					rCardStyle,
				]}>
				<Animated.Text
					style={[theme.textStyles.h4, { margin: theme.spacing.small }, category.selected && { color: theme.colors.shades.white }, rTextStyle]}>
					{category.label}
				</Animated.Text>
				<View style={{ width: "100%", overflow: "hidden" }}>
					<Image source={category.image} style={{ alignSelf: "center", width: "80%", height: "80%", resizeMode: "contain" }} />
				</View>
			</Animated.View>
		</TouchableOpacity>
	);
};

export default CategoryCard;
