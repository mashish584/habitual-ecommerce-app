import React from "react";
import { View, ViewStyle } from "react-native";

import theme from "@utils/theme";

interface LineI {
	style?: ViewStyle;
}

export default function Line({ style }: LineI) {
	return <View style={{ width: "100%", height: 2, backgroundColor: theme.colors.shades.gray_40, ...style }} />;
}
