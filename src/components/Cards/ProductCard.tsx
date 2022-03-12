import React, { ReactNode } from "react";
import { TouchableOpacity, View, ViewStyle, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import { generateBoxShadowStyle } from "../../utils";
import theme, { rgba } from "../../utils/theme";
import Pill from "../Pill/Pill";

type CardVariant = "large" | "small" | "wide";
interface ProductCard {
	variant: CardVariant;
	containerStyle?: ViewStyle;
	contentStyle?: ViewStyle;
	extraContent?: ReactNode;
}

const ProductCard = ({ variant, containerStyle, contentStyle, extraContent }: ProductCard) => {
	const width = variant === "large" ? 284 : 156;
	const height = variant === "large" ? 312 : 253;
	const imageSectionHeight = variant === "large" ? 160 : 136;

	return (
		<TouchableOpacity
			activeOpacity={0.9}
			style={[
				{
					width: variant === "wide" ? "100%" : width,
					height: variant === "wide" ? 88 : height,
					marginHorizontal: theme.spacing.xxSmall,
				},
				["large", "small"].includes(variant) && generateBoxShadowStyle(0, 10, rgba.black(0.04), 1, 10, 10, rgba.black(1)),
				containerStyle,
			]}>
			<View
				style={[
					{ borderRadius: variant === "wide" ? 0 : 10, flex: 1, backgroundColor: theme.colors.shades.white, overflow: "hidden" },
					variant === "wide" && [theme.rowStyle, { overflow: "visible" }],
				]}>
				{/* Image Section */}
				<View
					style={[
						{
							width: variant === "wide" ? "30%" : "100%",
							minHeight: variant === "wide" ? "100%" : imageSectionHeight,
							backgroundColor: theme.colors.shades.gray_20,
						},
						variant === "wide" && { ...generateBoxShadowStyle(0, 10, rgba.black(0.04), 1, 20, 10, rgba.black(1)), borderRadius: 10 },
					]}>
					{variant !== "wide" && (
						<TouchableOpacity
							activeOpacity={0.9}
							style={{
								width: 32,
								height: 32,
								borderRadius: 50,
								backgroundColor: theme.colors.shades.white,
								justifyContent: "center",
								alignItems: "center",
								position: "absolute",
								top: 8,
								right: 8,
								...generateBoxShadowStyle(0, 1, rgba.black(0.1), 1, 7, 10, rgba.black(1)),
							}}>
							<FontAwesomeIcon icon={faHeart} />
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
						<Text style={variant === "large" ? theme.textStyles.body_lg : theme.textStyles.body_reg}>Bose Headphones</Text>
						<View style={[theme.rowStyle, { alignItems: "center", justifyContent: "space-between", marginTop: theme.spacing.xxSmall / 2 }]}>
							<View style={[theme.rowStyle, { alignItems: "center" }]}>
								<Text style={[variant === "large" ? theme.textStyles.h5 : theme.textStyles.h6]}>$265.99</Text>
								<Text style={[theme.textStyles.strikethrough_sm, { color: theme.colors.shades.gray_40, marginLeft: theme.spacing.xxSmall }]}>
									$279.99
								</Text>
							</View>
							{/* Discount pills for large and wide cards */}
							{["large", "wide"].includes(variant) && <Pill variant="saved" text="10%off" />}
						</View>
						{/* Show description for large variant */}
						{variant === "large" && (
							<Text style={[theme.textStyles.body_sm, { marginTop: theme.spacing.xxSmall, color: theme.colors.shades.gray_60 }]}>
								Lorem ipsum dolor sit amet consectetur adipisicing elit...
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
											icon={faStar}
											style={{ width: 10, height: 10, marginRight: theme.spacing.xxSmall / 2 }}
											color={theme.colors.primary.yellow}
										/>
										<Text style={theme.textStyles.body_sm_alt}>5.0</Text>
									</>
								)}
								{variant === "large" && (
									<>
										<Text style={theme.textStyles.body_sm}> (43)</Text>
										<Text style={[theme.textStyles.body_sm_alt, { marginLeft: theme.spacing.xxSmall }]}>Category</Text>
									</>
								)}
							</View>
							{variant === "large" && (
								<Pill
									variant="saved"
									text="Staff Pick"
									colors={{ pillColor: theme.colors.secondary.blue_20, textColor: theme.colors.secondary.blue }}
								/>
							)}
						</View>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ProductCard;
