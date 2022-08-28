import React from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import NoNetwork from "../components/Sheet/NoNetwork";
import Confirmation from "../components/Sheet/Confirmation";

import { ScreenNavigationProp } from "../navigation/types";
import { useCart, useUI, useUser } from "../utils/store";
import theme from "../utils/theme";

import Cart from "./Product/Cart";

const GlobalUI = () => {
	const navigation = useNavigation<ScreenNavigationProp>();
	const insets = useSafeAreaInsets();
	const { toggleCart, visible } = useCart();
	const userId = useUser().user.id;
	const { showConfirmationModal, message, onAction, updateValue, acceptText, rejectText, headerTitle } = useUI();

	return (
		<>
			{/* Cart */}
			<Cart
				visible={visible}
				headerTitle="My Cart"
				onCheckout={() => {
					toggleCart(false);
					navigation.navigate(userId ? "Checkout" : "Profile");
				}}
				onClose={() => {
					toggleCart(false);
				}}
			/>
			<Confirmation
				visible={showConfirmationModal}
				message={message}
				headerTitle={headerTitle}
				onClose={() => updateValue({ showConfirmationModal: false })}
				onAction={onAction}
				acceptText={acceptText}
				rejectText={rejectText}
			/>
			<NoNetwork />
			<Toast topOffset={insets.top + theme.spacing.xSmall} />
		</>
	);
};

export default GlobalUI;
