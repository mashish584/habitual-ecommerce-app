import React from "react";
import { View, Image, Text, Animated, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { BottomSheet, BottomSheetI } from "../../components/BottomSheet";
import theme from "../../utils/theme";

interface Cart extends BottomSheetI {
	items: any;
}

const AddCartActions = ({ dragX }) => {
	const translateX = dragX.interpolate({
		inputRange: [-100, 0],
		outputRange: [0, 100],
		extrapolate: "clamp",
	});

	const opacity = dragX.interpolate({
		inputRange: [-100, 0],
		outputRange: [1, 0],
		extrapolate: "clamp",
	});

	return (
		<Animated.View
			style={[
				theme.rowStyle,
				{
					width: "40%",
					height: "100%",
					backgroundColor: theme.colors.shades.gray_80,
					opacity,
					transform: [{ translateX }],
					justifyContent: "space-evenly",
					alignItems: "center",
				},
			]}>
			<TouchableOpacity
				style={{
					width: 22,
					height: 22,
					justifyContent: "center",
					alignItems: "center",
					borderColor: theme.colors.shades.white,
					borderWidth: 2,
					borderRadius: 50,
				}}>
				<FontAwesomeIcon icon={faMinus} color={theme.colors.shades.white} />
			</TouchableOpacity>
			<Text style={[theme.textStyles.h5, { color: theme.colors.shades.white }]}>1</Text>
			<TouchableOpacity
				style={{
					width: 22,
					height: 22,
					justifyContent: "center",
					alignItems: "center",
					borderColor: theme.colors.shades.white,
					borderWidth: 2,
					borderRadius: 50,
				}}>
				<FontAwesomeIcon icon={faPlus} color={theme.colors.shades.white} />
			</TouchableOpacity>
		</Animated.View>
	);
};

const CartItem = () => {
	return (
		<Swipeable renderRightActions={(progress, dragX) => <AddCartActions dragX={dragX} />}>
			<View
				style={[
					theme.rowStyle,
					{
						minHeight: 100,
						borderBottomWidth: 1,
						borderBottomColor: theme.colors.shades.gray_20,
						alignItems: "center",
						paddingHorizontal: theme.spacing.medium,
					},
				]}>
				<View style={{ width: 70, height: 68, backgroundColor: theme.colors.shades.gray_40, borderRadius: 5 }}>
					<Image source={require("../../assets/images/example/product-sample.png")} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
				</View>
				<View style={[theme.rowStyle, { justifyContent: "space-between", alignItems: "center", paddingLeft: theme.spacing.small }]}>
					<Text style={[theme.textStyles.body_reg, { flex: 0.6 }]}>Xbox Elite controller</Text>
					<Text style={theme.textStyles.h6}>x1</Text>
					<Text style={theme.textStyles.h5}>$59.99</Text>
				</View>
			</View>
		</Swipeable>
	);
};

const Cart = ({ items, ...props }: Cart) => {
	return (
		<BottomSheet {...{ ...props }}>
			{new Array(5).fill(1).map((_, index) => (
				<CartItem key={index} />
			))}
		</BottomSheet>
	);
};

export default Cart;
