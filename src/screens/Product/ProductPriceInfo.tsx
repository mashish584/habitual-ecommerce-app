import React from "react";
import { Text, View, TouchableOpacity, ViewStyle } from "react-native";
import Animated, { SharedValue, interpolate, interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import Button from "@components/Button/Button";

import Pill from "@components/Pill/Pill";
import { calculateOriginalPrice } from "@utils/index";
import { Product } from "@utils/schema.types";
import { useCart } from "@utils/store";
import theme from "@utils/theme";
import { ProductFooterActions } from "@utils/types";

type PriceInfo = Pick<Product, "id" | "title" | "image" | "price" | "quantity"> & {
	buttonChild?: JSX.Element;
	discount?: number | null;
};

interface ProductPriceInfo {
	priceInfo: PriceInfo;
	slideAnimate: SharedValue<number>;
	translateY: SharedValue<number>;
	showCartAction: boolean;
	onPress: (actions: ProductFooterActions) => any;
}

const ProductPriceInfo = ({ priceInfo, slideAnimate, translateY, ...props }: ProductPriceInfo) => {
	const { addItem, removeItem } = useCart();

	const pillContainerStyle = useAnimatedStyle(() => {
		const pillContainerColor = interpolateColor(slideAnimate.value, [0, 1], [theme.colors.secondary.green_20, theme.colors.primary.yellow_20]);
		return {
			backgroundColor: pillContainerColor,
		};
	});

	const pillTextStyle = useAnimatedStyle(() => {
		const pillTextColor = interpolateColor(slideAnimate.value, [0, 1], [theme.colors.secondary.green, theme.colors.shades.gray_80]);
		return {
			color: pillTextColor,
		};
	});

	const rButtonBackgroundStyle = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(slideAnimate.value, [0, 1], [theme.colors.shades.gray_80, theme.colors.shades.white]);
		return {
			backgroundColor,
		};
	});

	const rHeadingStyle = useAnimatedStyle(() => {
		const color = interpolateColor(slideAnimate.value, [0, 1], [theme.colors.shades.gray_60, theme.colors.shades.gray]);
		return { color };
	});

	const rProductPriceContainerStyle = useAnimatedStyle(() => {
		const opacity = interpolate(translateY.value, [0, 1], [1, 0]);
		const borderRadius = interpolate(slideAnimate.value, [0, 1], [15, 0]);
		const backgroundColor = interpolateColor(slideAnimate.value, [0, 1], [theme.colors.shades.white, theme.colors.primary.yellow]);
		return {
			opacity,
			backgroundColor,
			borderTopLeftRadius: borderRadius,
			borderTopRightRadius: borderRadius,
			transform: [{ translateY: translateY.value }],
		};
	});

	return (
		<Animated.View
			style={
				[
					{
						flex: 0.15,
						justifyContent: "center",
						paddingHorizontal: theme.spacing.medium,
						marginTop: -15,
					},
					rProductPriceContainerStyle,
				] as any
			}>
			{props.showCartAction ? (
				<View style={[theme.rowStyle, { justifyContent: "space-between" }]}>
					<Button
						variant="transparent"
						text="Remove"
						style={{ flex: 0.2 }}
						onPress={() => {
							removeItem(priceInfo.id);
							props.onPress("removeCart");
						}}
					/>
					<Button
						variant="primary"
						text={`Go to cart - $${priceInfo.price} →`}
						style={{ flex: 0.7 }}
						onPress={() => props.onPress("showCartModal")}
					/>
				</View>
			) : (
				<View style={[theme.rowStyle, { justifyContent: "space-between", alignItems: "center" }]}>
					<View>
						<Animated.Text
							style={[theme.textStyles.hint, { textTransform: "uppercase", marginBottom: theme.spacing.xxSmall } as ViewStyle, rHeadingStyle]}>
							Starting At
						</Animated.Text>
						<View style={[theme.rowStyle, { alignItems: "center" }]}>
							<Text style={[theme.textStyles.h4, { fontFamily: theme.fonts.lato.heavy }]}>${priceInfo?.price}</Text>
							<Animated.Text
								style={[theme.textStyles.strikethrough_reg, { color: theme.colors.shades.gray_60, marginHorizontal: theme.spacing.xxSmall }]}>
								${calculateOriginalPrice(priceInfo.price, priceInfo.discount || 0)}
							</Animated.Text>
							<Pill variant="saved" text={`${priceInfo?.discount}% OFF`} pillContainerStyle={pillContainerStyle} pillTextStyle={pillTextStyle} />
						</View>
					</View>
					{priceInfo.quantity > 0 ? (
						<TouchableOpacity
							onPress={() => {
								//add item to cart
								const item = { ...priceInfo };
								delete item.buttonChild;
								delete item.discount;
								addItem(item);
								props.onPress("slideUp");
							}}>
							<Animated.View
								style={[
									{
										width: 48,
										height: 48,
										borderRadius: 50,
										justifyContent: "center",
										alignItems: "center",
									},
									rButtonBackgroundStyle,
								]}>
								{priceInfo.buttonChild}
							</Animated.View>
						</TouchableOpacity>
					) : (
						<Text style={{ color: theme.colors.accents.red, fontFamily: theme.fonts.lato.heavy }}>Out of Stock</Text>
					)}
				</View>
			)}
		</Animated.View>
	);
};

export default ProductPriceInfo;
