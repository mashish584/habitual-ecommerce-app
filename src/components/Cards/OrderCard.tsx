import React from "react";
import { Dimensions, View, Image, Text } from "react-native";
import { generateBoxShadowStyle } from "../../utils";
import { Product } from "../../utils/schema.types";
import theme, { rgba } from "../../utils/theme";

interface OrderCard {
	item: Pick<Product, "image" | "title" | "price">;
}

const OrderCard = ({ item }: OrderCard) => {
	return (
		<View
			style={{
				width: Dimensions.get("screen").width - theme.spacing.medium * 2,
				marginHorizontal: theme.spacing.medium,
				padding: theme.spacing.small,
				backgroundColor: theme.colors.shades.white,
				height: 120,
				borderRadius: 10,
				marginVertical: theme.spacing.xxSmall,
				flexDirection: "row",
				alignItems: "center",
				...generateBoxShadowStyle(0, 10, rgba.black(0.04), 1, 10, 10, rgba.black(1)),
			}}>
			<View
				style={{
					width: "30%",
					height: 88,
					borderRadius: 10,
					backgroundColor: theme.colors.shades.gray_20,
					justifyContent: "center",
					alignItems: "center",
					...generateBoxShadowStyle(0, 10, rgba.black(0.09), 1, 20, 10, rgba.black(1)),
				}}>
				<Image source={{ uri: item.image }} style={{ width: "80%", height: "80%" }} resizeMode="contain" />
			</View>
			<View style={{ width: "70%", marginLeft: theme.spacing.small }}>
				<Text style={theme.textStyles.body_reg}>Xbox Elite Controller</Text>
				<Text style={[theme.textStyles.h6, { marginVertical: theme.spacing.xxSmall }]}>$5.99</Text>
				<Text style={theme.textStyles.link_reg}>Almost there</Text>
			</View>
		</View>
	);
};

export default OrderCard;
