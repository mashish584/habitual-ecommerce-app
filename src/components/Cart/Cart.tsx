import React, { useCallback } from "react";
import { View, Image, Text, ScrollView } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BottomSheet, BottomSheetI } from "@components/BottomSheet";
import { Button } from "@components/Button";

import theme from "@utils/theme";
import { useCart } from "@utils/store";
import { deviceHeight } from "@utils/index";
import images from "@assets/images";

import styles, { CART_FOOTER_HEIGHT } from "./styles";
import CartItem from "./CartItem";

interface Cart extends BottomSheetI {
	onCheckout: () => void;
}

interface CartFooter extends Pick<Cart, "onCheckout"> {
	total: number;
}

const CartFooter = ({ total, onCheckout }: CartFooter) => {
	return (
		<View style={[theme.rowStyle, styles.footerContainer]}>
			<View>
				<Text style={[theme.textStyles.pill_sm, styles.footerTextLabel]}>Total</Text>
				<Text style={[theme.textStyles.h4, { color: theme.colors.shades.gray_80 }]}>${total}</Text>
			</View>
			<Button variant={total > 0 ? "primary" : "disabled"} text="Checkout →" onPress={onCheckout} style={{ flex: 0.7 }} />
		</View>
	);
};

const Cart = (props: Cart) => {
	const { items, updateQuantity, total } = useCart();
	const { bottom } = useSafeAreaInsets();

	const Footer = useCallback(() => {
		return <CartFooter total={total} onCheckout={props.onCheckout} />;
	}, [total, props.onCheckout]);

	const cartItems = Object.keys(items);
	const isCartEmpty = cartItems.length === 0;

	return (
		<BottomSheet {...{ ...props }} footerComponent={Footer}>
			<ScrollView
				style={{
					maxHeight: deviceHeight * 0.5,
					marginBottom: CART_FOOTER_HEIGHT - bottom,
				}}
				scrollEnabled={!isCartEmpty}
				showsVerticalScrollIndicator={false}>
				{cartItems.map((id) => {
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

				{isCartEmpty && (
					<View style={styles.emptyView}>
						<Image source={images.emptyCart} />
						<Text style={[theme.textStyles.body_sm, styles.emptyViewText]}>Hey you! There is no items in your cart.</Text>
					</View>
				)}
			</ScrollView>
		</BottomSheet>
	);
};

export default Cart;
