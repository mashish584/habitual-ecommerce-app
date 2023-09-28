import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import NoNetwork from "@components/NoNetwork";
import Confirmation from "@components/Sheet/Confirmation";
import { Cart } from "@components/Cart";

import { ScreenNavigationProp } from "@nav/types";
import { useCart, useUI, useUser } from "@utils/store";
import theme from "@utils/theme";

const GlobalUI = () => {
	const navigation = useNavigation<ScreenNavigationProp>();
	const insets = useSafeAreaInsets();
	const { toggleCart, visible } = useCart();
	const userId = useUser().user.id;
	const { showConfirmationModal, message, onAction, updateValue, acceptText, rejectText, headerTitle } = useUI();

	const onCheckout = useCallback(() => {
		toggleCart(false);
		navigation.navigate(userId ? "Checkout" : "Profile");
	}, [userId]);

	const onCartClose = useCallback(() => {
		toggleCart(false);
	}, []);

	const onConfirmationSheetClose = useCallback(() => {
		updateValue({ showConfirmationModal: false });
	}, []);

	return (
		<>
			{/* Cart */}
			<Cart visible={visible} headerTitle="My Cart" onCheckout={onCheckout} onClose={onCartClose} />
			<Confirmation
				visible={showConfirmationModal}
				message={message}
				headerTitle={headerTitle}
				onClose={onConfirmationSheetClose}
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
