import React from "react";
import { useNavigation } from "@react-navigation/native";

import NoNetwork from "../components/Sheet/NoNetwork";
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
				headerTitle="My Cart"
				onCheckout={() => {
					toggleCart(false);
					navigation.navigate("Checkout");
				}}
				onClose={() => {
					toggleCart(false);
				}}
			/>
			<NoNetwork />
		</>
	);
};

export default GlobalUI;
