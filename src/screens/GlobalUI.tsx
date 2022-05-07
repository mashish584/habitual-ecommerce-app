import React from "react";
import { useNavigation } from "@react-navigation/native";

import NoNetwork from "../components/Sheet/NoNetwork";
import Confirmation from "../components/Sheet/Confirmation";

import { ScreenNavigationProp } from "../navigation/types";
import { useCart, useUI } from "../utils/store";

import Cart from "./Product/Cart";

const GlobalUI = () => {
	const navigation = useNavigation<ScreenNavigationProp>();
	const { toggleCart, visible } = useCart();
	const { showConfirmationModal, message, onAction, updateValue } = useUI();

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
			<Confirmation
				visible={showConfirmationModal}
				message={message}
				headerTitle="Confirmation"
				onClose={() => updateValue({ showConfirmationModal: false })}
				onAction={onAction}
			/>
			<NoNetwork />
		</>
	);
};

export default GlobalUI;
