import React from "react";
import { Image, ImageURISource, Text, TouchableOpacity, View } from "react-native";

import { generateBoxShadowStyle } from "@utils/index";
import theme, { rgba } from "@utils/theme";

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
	return (
		<TouchableOpacity activeOpacity={0.9} onPress={onPress}>
			<View
				style={{
					width: width,
					borderWidth: 1,
					borderRadius: 10,
					backgroundColor: category.selected ? theme.colors.shades.gray_80 : theme.colors.shades.white,
					borderColor: theme.colors.shades.gray_80,
					marginBottom: spacing,
					// overflow: "hidden",
					height: width * category.aspectRatio,
					...generateBoxShadowStyle(0, 20, rgba.black(1), 0.04, 20, 10, rgba.black(1)),
				}}>
				<Text style={[theme.textStyles.h4, { margin: theme.spacing.small }, category.selected && { color: theme.colors.shades.white }]}>
					{category.label}
				</Text>
				<View style={{ width: "100%", overflow: "hidden" }}>
					<Image source={category.image} style={{ alignSelf: "center", width: "80%", height: "80%", resizeMode: "contain" }} />
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default CategoryCard;
