import React from "react";
import { Image, Text, View, TouchableOpacity, ImageSourcePropType, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { interpolateColor } from "react-native-redash";

import Pill from "../../components/Pill/Pill";
import theme from "../../utils/theme";

type PriceInfo = {
	price: string;
	originalPrice: string;
	discount: string;
	image: ImageSourcePropType;
};

interface ProductPriceInfo {
	priceInfo: PriceInfo;
	slideAnimate: Animated.Value<any>;
	translateY: Animated.Value<any>;
	onPress: () => void;
}

const ProductPriceInfo = ({ priceInfo, slideAnimate, translateY, onPress }: ProductPriceInfo) => {
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

	const pillTextColor = interpolateColor(slideAnimate, {
		inputRange: [0, 1],
		outputRange: [theme.colors.secondary.green, theme.colors.shades.gray_80],
	});

	return (
		<Animated.View
			style={
				[
					{
						flex: 0.15,
						backgroundColor: productInfoBackground,
						borderTopLeftRadius: 15,
						borderTopRightRadius: 15,
						justifyContent: "center",
						paddingHorizontal: theme.spacing.medium,
						transform: [{ translateY: translateY }],
					},
				] as any
			}>
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
				<TouchableOpacity
					onPress={onPress}
					style={{
						width: 48,
						height: 48,
						backgroundColor: theme.colors.shades.gray_80,
						borderRadius: 50,
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Image source={priceInfo?.image} style={{ tintColor: theme.colors.shades.white }} />
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
};

export default ProductPriceInfo;
