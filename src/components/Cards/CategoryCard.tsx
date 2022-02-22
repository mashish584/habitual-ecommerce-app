import React from "react";
import { Image, ImageURISource, Text, View } from "react-native";
import { generateBoxShadowStyle } from "../../utils";
import theme, { rgba } from "../../utils/theme";

interface CategoryCard {
	category: { aspectRatio: number; image: ImageURISource; label: string };
	width: number;
	spacing: number;
}

const CategoryCard = ({ category, width, spacing }: CategoryCard) => {
	return (
		<View
			style={{
				width: width,
				borderWidth: 1,
				borderRadius: 10,
				backgroundColor: theme.colors.shades.white,
				borderColor: theme.colors.shades.gray_80,
				marginBottom: spacing,
				// overflow: "hidden",
				height: width * category.aspectRatio,
				...generateBoxShadowStyle(0, 20, rgba.black(1), 0.04, 20, 10, rgba.black(1)),
			}}>
			<Text style={[theme.textStyles.h4, { margin: theme.spacing.small }]}>{category.label}</Text>
			<View style={{ width: "100%", overflow: "hidden" }}>
				<Image source={category.image} style={{ alignSelf: "center" }} />
			</View>
		</View>
	);
};

export default CategoryCard;
