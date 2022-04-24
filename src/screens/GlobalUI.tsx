import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScreenNavigationProp } from "../navigation/types";
import { useCart } from "../utils/store";
import Cart from "./Product/Cart";

const GlobalUI = () => {
	const navigation = useNavigation<ScreenNavigationProp>();
	const { toggleCart, visible } = useCart();

	return (
		<>
			{/* Cart */}
			<Cart
				visible={visible}
				maxHeight={0.5}
				headerTitle="My Cart"
				onCheckout={() => {
					toggleCart(false);
					navigation.navigate("Checkout");
				}}
				onClose={() => {
					toggleCart(false);
				}}
			/>
		</>
	);
};

export default GlobalUI;
