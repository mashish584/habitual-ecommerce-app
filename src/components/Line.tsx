import React from "react";
import { View } from "react-native";
import theme from "../utils/theme";

export default function Line() {
	return <View style={{ width: "100%", height: 2, backgroundColor: theme.colors.shades.gray_40 }} />;
}
