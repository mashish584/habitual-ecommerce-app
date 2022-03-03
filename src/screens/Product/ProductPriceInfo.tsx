import React from "react";
import { Text, View, TouchableOpacity, ViewStyle } from "react-native";
import Animated, { interpolate } from "react-native-reanimated";
import { interpolateColor } from "react-native-redash";
import Button from "../../components/Button/Button";

import Pill from "../../components/Pill/Pill";
import theme from "../../utils/theme";

type PriceInfo = {
	price: string;
	originalPrice: string;
	discount: string;
	buttonChild: JSX.Element;
};

interface ProductPriceInfo {
	priceInfo: PriceInfo;
	slideAnimate: Animated.Value<any>;
	translateY: Animated.Value<any>;
	borderRadius: Animated.Node<Number>;
	showCartAction: boolean;
	onPress: (removeCart?: boolean) => void;
}

const ProductPriceInfo = ({ priceInfo, slideAnimate, translateY, borderRadius, ...props }: ProductPriceInfo) => {
	const productInfoBackground = interpolateColor(slideAnimate, {
		inputRange: [0, 1],
		outputRange: [theme.colors.shades.white, theme.colors.primary.yellow],
	});

	const headingColor = interpolateColor(slideAnimate, {
		inputRange: [0, 1],
		outputRange: [theme.colors.shades.gray_60, theme.colors.shades.gray],
	});

	const pillContainerColor = interpolateColor(slideAnimate, {
		inputRange: [0, 1],
		outputRange: [theme.colors.secondary.green_20, theme.colors.primary.yellow_20],
	});

	const buttonBackground = interpolateColor(slideAnimate, {
		inputRange: [0, 1],
		outputRange: [theme.colors.shades.gray_80, theme.colors.shades.white],
	});

	const pillTextColor = interpolateColor(slideAnimate, {
		inputRange: [0, 1],
		outputRange: [theme.colors.secondary.green, theme.colors.shades.gray_80],
	});

	const opacity = interpolate(translateY, {
		inputRange: [0, 1],
		outputRange: [1, 0],
	});

	return (
		<Animated.View
			style={
				[
					{
						flex: 0.15,
						backgroundColor: productInfoBackground,
						borderTopLeftRadius: borderRadius,
						borderTopRightRadius: borderRadius,
						justifyContent: "center",
						paddingHorizontal: theme.spacing.medium,
						transform: [{ translateY: translateY }],
						marginTop: -15,
						opacity,
					},
				] as any
			}>
			{props.showCartAction ? (
				<View style={[theme.rowStyle, { justifyContent: "space-between" }]}>
					<Button variant="transparent" text="Remove" style={{ flex: 0.2 }} onPress={() => props.onPress(true)} />
					<Button variant="primary" text="Go to cart - 59.99 →" style={{ flex: 0.7 }} onPress={() => props.onPress()} />
				</View>
			) : (
				<View style={[theme.rowStyle, { justifyContent: "space-between" }]}>
					<View>
						<Animated.Text
							style={[theme.textStyles.hint, { textTransform: "uppercase", color: headingColor, marginBottom: theme.spacing.xxSmall } as ViewStyle]}>
							Starting At
						</Animated.Text>
						<View style={[theme.rowStyle, { alignItems: "center" }]}>
							<Text style={[theme.textStyles.h4, { fontFamily: theme.fonts.lato.heavy }]}>${priceInfo?.price}</Text>
							<Animated.Text
								style={
									[theme.textStyles.strikethrough_reg, { color: theme.colors.shades.gray_60, marginHorizontal: theme.spacing.xxSmall }] as ViewStyle
								}>
								${priceInfo?.originalPrice}
							</Animated.Text>
							<Pill
								variant="saved"
								text={priceInfo?.discount}
								colors={{
									textColor: pillTextColor,
									pillColor: pillContainerColor,
								}}
							/>
						</View>
					</View>
					<TouchableOpacity onPress={() => props.onPress()}>
						<Animated.View
							style={
								{
									width: 48,
									height: 48,
									backgroundColor: buttonBackground,
									borderRadius: 50,
									justifyContent: "center",
									alignItems: "center",
								} as any
							}>
							{priceInfo.buttonChild}
						</Animated.View>
					</TouchableOpacity>
				</View>
			)}
		</Animated.View>
	);
};

export default ProductPriceInfo;
