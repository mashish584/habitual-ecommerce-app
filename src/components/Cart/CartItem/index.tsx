import React from "react";
import { View, Image, Text } from "react-native";
import { Swipeable, GestureHandlerRootView } from "react-native-gesture-handler";

import theme from "../../../utils/theme";
import { CartItem as CartItemT, QuantityAction } from "../../../utils/store";

import AddCartActions from "../AddCartAction";
import styles from "./styles";

interface ShoppingCartItem {
	item: CartItemT;
	onUpdate: (type: QuantityAction) => void;
}

const CartItem = ({ item, onUpdate }: ShoppingCartItem) => {
	const product = item.product;

	return (
		<GestureHandlerRootView>
			<Swipeable renderRightActions={(_, dragX) => <AddCartActions dragX={dragX} quantity={item.quantity} onUpdate={onUpdate} />}>
				<View style={[theme.rowStyle, styles.container]}>
					<View style={styles.imageView}>
						<Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
					</View>
					<View style={[theme.rowStyle, styles.productInfo]}>
						<Text style={[theme.textStyles.body_reg, { flex: 0.6 }]}>{product.title}</Text>
						<Text style={theme.textStyles.h6}>x{item.quantity}</Text>
						<Text style={theme.textStyles.h5}>${product.price}</Text>
					</View>
				</View>
			</Swipeable>
		</GestureHandlerRootView>
	);
};

export default CartItem;
