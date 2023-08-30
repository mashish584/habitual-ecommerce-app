import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, ImageURISource, StyleSheet, TouchableOpacity, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BottomStackScreens, MergedRoutes, RootStackScreens } from "../types";
import { generateBoxShadowStyle } from "../../utils";
import theme, { rgba } from "../../utils/theme";
import { useCart, useUI, useUser } from "../../utils/store";
import { getPasswordConfirmationModal } from "../../utils/media";

type Screens = keyof RootStackScreens | keyof BottomStackScreens;

type MenuOption = {
	label: String;
	image: ImageURISource;
	route: keyof BottomStackScreens;
};

const menuOptions: MenuOption[] = [
	{
		label: "Home",
		image: require("../../assets/images/tabs/home.png"),
		route: "Home",
	},
	{
		label: "Wishlist",
		image: require("../../assets/images/tabs/heart.png"),
		route: "Wishlist",
	},
	{
		label: "Search",
		image: require("../../assets/images/search.png"),
		route: "Search",
	},
	{
		label: "Orders",
		image: require("../../assets/images/tabs/order.png"),
		route: "Orders",
	},
	{
		label: "Cart",
		image: require("../../assets/images/tabs/bag.png"),
		route: "Cart",
	},
];

const SPACING = theme.spacing.medium;
const TAB_WIDTH = (Dimensions.get("screen").width - SPACING * 2) / menuOptions.length;

const BottomTab: React.FC<BottomTabBarProps> = (props) => {
	const barPosition = useRef(new Animated.Value(0)).current;

	const { bottom } = useSafeAreaInsets();
	const toggleCart = useCart((store) => store.toggleCart);
	const userId = useUser((store) => store.user.id);
	const updateValue = useUI((store) => store.updateValue);
	const { index: routeIndex } = props.state;

	const searchBackgroundColor = routeIndex === 2 ? theme.colors.shades.gray : theme.colors.primary.yellow;

	const getTintColor = (index: number) => {
		return routeIndex === index && index === 2
			? theme.colors.shades.white
			: (routeIndex === index && index !== 2) || index === 2
			? theme.colors.shades.gray
			: theme.colors.shades.gray_40;
	};

	const onNavigate = (route: keyof MergedRoutes) => {
		props.navigation.navigate(route);
	};

	const translateBarPosition = (index: number) => {
		Animated.timing(barPosition, {
			toValue: index * TAB_WIDTH,
			useNativeDriver: true,
			duration: 200,
		}).start();
	};

	useEffect(() => {
		translateBarPosition(routeIndex);
	}, [routeIndex]);

	return (
		<View style={[styles.container, theme.rowStyle]}>
			{routeIndex !== 2 && (
				<Animated.View
					style={{
						...styles.bar,
						transform: [{ translateX: barPosition }],
					}}
				/>
			)}
			{menuOptions.map((option, index) => {
				return (
					<TouchableOpacity
						key={`bottom-tab-${index}`}
						activeOpacity={1}
						onPress={() => {
							if (option.route === "Cart") {
								toggleCart(true);
								return;
							}

							if (["Wishlist", "Orders"].includes(option.route) && !userId) {
								updateValue(getPasswordConfirmationModal(updateValue, onNavigate));
								return;
							}

							onNavigate(option.route);
						}}
						style={[styles.tab, { marginBottom: bottom / 2 }]}>
						{index === 2 && <View style={[styles.background, { backgroundColor: searchBackgroundColor }]} />}
						<Image
							source={option.image}
							style={{
								tintColor: getTintColor(index),
							}}
						/>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.shades.white,
		paddingHorizontal: theme.spacing.medium,
		justifyContent: "center",
		alignItems: "center",
		height: 80,
		...theme.rowStyle,
		...generateBoxShadowStyle(0, -2, rgba.black(0.1), 1, 10, 4, rgba.black(0.1)),
	},
	tab: {
		width: TAB_WIDTH,
		height: 50,
		alignItems: "center",
		paddingVertical: theme.spacing.small,
	},
	bar: {
		width: TAB_WIDTH,
		position: "absolute",
		top: 0,
		left: theme.spacing.medium,
		height: 2,
		backgroundColor: theme.colors.shades.gray_80,
	},
	background: {
		width: 40,
		height: 40,
		position: "absolute",
		top: theme.spacing.xxSmall / 2,
		borderRadius: 50,
	},
});

export default BottomTab;
