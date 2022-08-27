import React, { ReactNode, useEffect, useRef } from "react";
import { TouchableOpacity, View, ViewStyle, Text, Image, Pressable, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import LottieView from "lottie-react-native";

import Pill from "../Pill/Pill";

import { calculateOriginalPrice, generateBoxShadowStyle } from "../../utils";
import theme, { rgba } from "../../utils/theme";
import { Product } from "../../utils/schema.types";

type CardVariant = "large" | "small" | "wide";
export type PressAction = "heart" | "card";

interface ProductCard {
	item: Partial<Product>;
	variant: CardVariant;
	containerStyle?: ViewStyle;
	contentStyle?: ViewStyle;
	extraContent?: ReactNode;
	isFavouriteProduct?: boolean;
	onPress?: (action: PressAction) => void;
}

const ProductCard = ({ item, variant, containerStyle, contentStyle, extraContent, ...props }: ProductCard) => {
	const heartRef = useRef<LottieView>(null);

	const fullPrice = item?.discount ? calculateOriginalPrice(item.price, item.discount) : null;

	const previousValue = React.useRef<boolean | null>(null);

	useEffect(() => {
		// eslint-disable-next-line no-undefined
		if (previousValue.current !== props.isFavouriteProduct && heartRef.current && props.isFavouriteProduct !== undefined) {
			previousValue.current = props.isFavouriteProduct;
			if (props.isFavouriteProduct) {
				heartRef.current.play();
			} else {
				heartRef.current.reset();
			}
		}
	}, [props.isFavouriteProduct]);

	return (
		<Pressable
			onPress={() => props?.onPress?.("card")}
			style={[
				variant === "wide" ? styles.wideContainer : styles.container,
				variant === "large" && styles.largeContainer,
				variant === "small" && styles.smallContainer,
				containerStyle,
			]}>
			{/* Image Section */}
			<View
				style={[
					styles.imageContainer,
					variant === "large" && styles.largeContainerImage,
					variant === "small" && styles.smallContainerImage,
					variant === "wide" && styles.wideContainerImage,
					{ justifyContent: "center", padding: theme.spacing.small },
				]}>
				<Image source={{ uri: item?.image }} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
				{variant !== "wide" && (
					<TouchableOpacity onPress={() => props?.onPress?.("heart")} activeOpacity={0.9} style={styles.heartContainer}>
						{!props.isFavouriteProduct && <FontAwesomeIcon icon={faHeart as IconProp} />}
						<LottieView
							ref={heartRef}
							style={{ height: props.isFavouriteProduct ? 70 : 0 }}
							speed={2}
							source={require("../../assets/lottie/heart.json")}
							loop={false}
						/>
					</TouchableOpacity>
				)}
			</View>
			{/* Content Section */}
			<View
				style={[
					{ flex: 1, padding: theme.spacing.small, justifyContent: "space-between" },
					variant === "wide" && { alignItems: "center", padding: 0, paddingLeft: theme.spacing.small, justifyContent: "center" },
					contentStyle,
				]}>
				<View style={{ width: "100%" }}>
					<Text style={variant === "large" ? theme.textStyles.body_lg : theme.textStyles.body_reg}>{item?.title}</Text>
					<View style={[theme.rowStyle, { alignItems: "center", justifyContent: "space-between", marginTop: theme.spacing.xxSmall / 2 }]}>
						<View style={[theme.rowStyle, { alignItems: "center" }]}>
							<Text style={[variant === "large" ? theme.textStyles.h5 : theme.textStyles.h6]}>${item?.price}</Text>
							{item?.discount && (
								<Text style={[theme.textStyles.strikethrough_sm, { color: theme.colors.shades.gray_40, marginLeft: theme.spacing.xxSmall }]}>
									${fullPrice}
								</Text>
							)}
						</View>
						{/* Discount pills for large and wide cards */}
						{["large", "wide"].includes(variant) && item?.discount && <Pill variant="saved" text={`${item?.discount}%off`} />}
					</View>
					{/* Show description for large variant */}
					{variant === "large" && (
						<Text numberOfLines={2} style={[theme.textStyles.body_sm, { marginTop: theme.spacing.xxSmall, color: theme.colors.shades.gray_60 }]}>
							{item?.description}
						</Text>
					)}
					{extraContent}
				</View>

				{/* Product Meta for large and small card variant */}
				{variant !== "wide" && (
					<View style={[theme.rowStyle, { justifyContent: "space-between", alignItems: "center" }]}>
						<View style={[theme.rowStyle, { marginTop: variant === "large" ? 0 : theme.spacing.xxSmall }]}>
							{["large", "small"].includes(variant) && (
								<>
									<FontAwesomeIcon
										icon={faStar as IconProp}
										style={{ width: 10, height: 10, marginRight: theme.spacing.xxSmall / 2 }}
										color={theme.colors.primary.yellow}
									/>
									<Text style={theme.textStyles.body_sm_alt}>0</Text>
								</>
							)}
							{variant === "large" && (
								<>
									<Text style={theme.textStyles.body_sm}> (0)</Text>
									<Text style={[theme.textStyles.body_sm_alt, { marginLeft: theme.spacing.xxSmall }]}>
										{item?.category?.map((category) => category.name).join(", ")}
									</Text>
								</>
							)}
						</View>
						{/* {variant === "large" && (
								<Pill
									variant="saved"
									text="Staff Pick"
									colors={{ pillColor: theme.colors.secondary.blue_20, textColor: theme.colors.secondary.blue }}
								/>
							)} */}
					</View>
				)}
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		marginHorizontal: theme.spacing.xxSmall,
		...generateBoxShadowStyle(0, 10, rgba.black(0.04), 1, 10, 10, rgba.black(1)),
		overflow: "visible",
		backgroundColor: theme.colors.shades.white,
		borderRadius: 10,
	},
	largeContainer: {
		width: 284,
		height: 312,
	},
	smallContainer: {
		width: 156,
		height: 253,
	},
	wideContainer: {
		width: "100%",
		height: 88,
		borderRadius: 0,
		...theme.rowStyle,
		overflow: "visible",
		marginHorizontal: theme.spacing.xxSmall,
	},
	imageContainer: {
		backgroundColor: theme.colors.shades.gray_20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	wideContainerImage: {
		width: "30%",
		height: "100%",
		...generateBoxShadowStyle(0, 10, rgba.black(0.04), 1, 20, 10, rgba.black(1)),
		borderRadius: 10,
	},
	largeContainerImage: {
		height: 160,
	},
	smallContainerImage: {
		height: 136,
	},
	image: {
		width: "80%",
		height: "80%",
		alignSelf: "center",
		position: "absolute",
		top: "10%",
	},
	heartContainer: {
		width: 32,
		height: 32,
		borderRadius: 50,
		backgroundColor: theme.colors.shades.white,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		top: theme.spacing.small,
		right: theme.spacing.small,
		...generateBoxShadowStyle(0, 1, rgba.black(0.1), 1, 7, 10, rgba.black(1)),
	},
});

export default ProductCard;
