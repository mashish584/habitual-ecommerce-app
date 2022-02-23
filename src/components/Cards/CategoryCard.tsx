import React from "react";
import { Image, ImageURISource, Text, TouchableOpacity, View } from "react-native";
import { generateBoxShadowStyle } from "../../utils";
import theme, { rgba } from "../../utils/theme";

export type Category = {
	label: string;
	image: ImageURISource;
	aspectRatio: number;
	selected: boolean;
};

interface CategoryCard {
	category: Category;
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
					<Image source={category.image} style={{ alignSelf: "center" }} />
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default CategoryCard;
