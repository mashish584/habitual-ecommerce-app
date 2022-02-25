import React from "react";
import { TouchableOpacity, View, ViewStyle, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { generateBoxShadowStyle } from "../../utils";
import theme, { rgba } from "../../utils/theme";
import Pill from "../Pill/Pill";

interface ProductCard {
	containerStyle?: ViewStyle;
}

const ProductCard = ({ containerStyle }: ProductCard) => {
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			style={[
				{
					width: 284,
					height: 312,
					marginHorizontal: theme.spacing.xxSmall,
					...generateBoxShadowStyle(0, 10, rgba.black(0.04), 1, 10, 10, rgba.black(1)),
				},
				containerStyle,
			]}>
			<View style={{ borderRadius: 10, flex: 1, backgroundColor: theme.colors.shades.white, overflow: "hidden" }}>
				<View style={{ width: "100%", height: 160, backgroundColor: theme.colors.shades.gray_20 }}></View>
				<View style={{ flex: 1, padding: theme.spacing.small, justifyContent: "space-between" }}>
					<View>
						<Text style={theme.textStyles.body_lg}>Bose Headphones</Text>
						<View style={[theme.rowStyle, { alignItems: "center", justifyContent: "space-between", marginTop: theme.spacing.xxSmall / 2 }]}>
							<View style={[theme.rowStyle, { alignItems: "center" }]}>
								<Text style={[theme.textStyles.h5]}>$265.99</Text>
								<Text style={[theme.textStyles.strikethrough_sm, { color: theme.colors.shades.gray_40, marginLeft: theme.spacing.xxSmall }]}>
									$279.99
								</Text>
							</View>
							<Pill variant="saved" text="10%off" />
						</View>
						<Text style={[theme.textStyles.body_sm, { marginTop: theme.spacing.xxSmall, color: theme.colors.shades.gray_60 }]}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit...
						</Text>
					</View>
					<View style={[theme.rowStyle, { justifyContent: "space-between", alignItems: "center" }]}>
						<View style={theme.rowStyle}>
							<FontAwesomeIcon
								icon={faStar}
								style={{ width: 10, height: 10, marginRight: theme.spacing.xxSmall / 2 }}
								color={theme.colors.primary.yellow}
							/>
							<Text style={theme.textStyles.body_sm_alt}>5.0</Text>
							<Text style={theme.textStyles.body_sm}> (43)</Text>
							<Text style={[theme.textStyles.body_sm_alt, { marginLeft: theme.spacing.xxSmall }]}>Category</Text>
						</View>
						<Pill variant="saved" text="Staff Pick" colors={{ pillColor: theme.colors.secondary.blue_20, textColor: theme.colors.secondary.blue }} />
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ProductCard;
