import React from "react";
import { View, Image, Text, Animated, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Swipeable, GestureHandlerRootView } from "react-native-gesture-handler";

import { BottomSheet, BottomSheetI } from "../../components/BottomSheet";
import { Button } from "../../components/Button";

import theme from "../../utils/theme";
import { CartItem as CartItemT, QuantityAction, useCart } from "../../utils/store";

interface Cart extends BottomSheetI {
	onCheckout: () => void;
}

interface ShoppingCartItem {
	item: CartItemT;
	onUpdate: (type: QuantityAction) => void;
}

interface AddCartActions {
	dragX: Animated.AnimatedInterpolation<string | number>;
	quantity: number;
	onUpdate: (type: QuantityAction) => void;
}

const AddCartActions = ({ dragX, quantity, onUpdate }: AddCartActions) => {
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
				onPress={() => onUpdate("-")}
				style={{
					width: 22,
					height: 22,
					justifyContent: "center",
					alignItems: "center",
					borderColor: theme.colors.shades.white,
					borderWidth: 2,
					borderRadius: 50,
				}}>
				<FontAwesomeIcon icon={faMinus as IconProp} color={theme.colors.shades.white} />
			</TouchableOpacity>
			<Text style={[theme.textStyles.h5, { color: theme.colors.shades.white }]}>{quantity}</Text>
			<TouchableOpacity
				onPress={() => onUpdate("+")}
				style={{
					width: 22,
					height: 22,
					justifyContent: "center",
					alignItems: "center",
					borderColor: theme.colors.shades.white,
					borderWidth: 2,
					borderRadius: 50,
				}}>
				<FontAwesomeIcon icon={faPlus as IconProp} color={theme.colors.shades.white} />
			</TouchableOpacity>
		</Animated.View>
	);
};

const CartItem = ({ item, onUpdate }: ShoppingCartItem) => {
	const product = item.product;

	return (
		<GestureHandlerRootView>
			<Swipeable renderRightActions={(progress, dragX) => <AddCartActions dragX={dragX} quantity={item.quantity} onUpdate={onUpdate} />}>
				<View
					style={[
						theme.rowStyle,
						{
							height: 100,
							borderBottomWidth: 1,
							borderBottomColor: theme.colors.shades.gray_20,
							alignItems: "center",
							paddingHorizontal: theme.spacing.medium,
						},
					]}>
					<View style={{ width: 70, height: 68, backgroundColor: theme.colors.shades.gray_20, borderRadius: 5 }}>
						<Image source={{ uri: product.image }} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
					</View>
					<View style={[theme.rowStyle, { justifyContent: "space-between", alignItems: "center", paddingLeft: theme.spacing.small }]}>
						<Text style={[theme.textStyles.body_reg, { flex: 0.6 }]}>{product.title}</Text>
						<Text style={theme.textStyles.h6}>x{item.quantity}</Text>
						<Text style={theme.textStyles.h5}>${product.price}</Text>
					</View>
				</View>
			</Swipeable>
		</GestureHandlerRootView>
	);
};

const Cart = ({ ...props }: Cart) => {
	const { items, updateQuantity, total } = useCart();
	return (
		<BottomSheet {...{ ...props }}>
			<ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 100, height: Dimensions.get("window").height * 0.3 }}>
				{Object.keys(items).map((id) => {
					return (
						<CartItem
							key={id}
							item={items[id]}
							onUpdate={(type) => {
								updateQuantity(id, type);
							}}
						/>
					);
				})}
				{Object.keys(items).length === 0 && (
					<View style={{ height: Dimensions.get("window").height * 0.3, justifyContent: "center", alignItems: "center" }}>
						<Image source={require("../../assets/images/empty-illustration.png")} />
						<Text style={[theme.textStyles.body_sm, { marginTop: theme.spacing.medium }]}>Hey you! There is no items in your cart.</Text>
					</View>
				)}
			</ScrollView>
			<View
				style={[
					theme.rowStyle,
					{
						position: "absolute",
						bottom: 0,
						width: "100%",
						justifyContent: "space-between",
						backgroundColor: theme.colors.shades.white,
						height: 100,
						alignItems: "center",
						paddingHorizontal: theme.spacing.medium,
					},
				]}>
				<View>
					<Text style={[theme.textStyles.pill_sm, { color: theme.colors.shades.gray_60, textTransform: "uppercase" }]}>Total</Text>
					<Text style={[theme.textStyles.h4, { color: theme.colors.shades.gray_80 }]}>${total}</Text>
				</View>
				<Button variant={total > 0 ? "primary" : "disabled"} text="Checkout →" onPress={props.onCheckout} style={{ flex: 0.7 }} />
			</View>
		</BottomSheet>
	);
};

export default Cart;
