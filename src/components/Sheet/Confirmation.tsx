import React from "react";
import { Dimensions, Text, TouchableOpacity, View, StyleSheet } from "react-native";

import Line from "../Line";

import theme from "../../utils/theme";
import { BottomSheet, BottomSheetI } from "../BottomSheet";

interface Confirmation extends BottomSheetI {
	message: string;
	onAction: (type: "Yes" | "No") => void;
}

const Confirmation = (props: Confirmation) => {
	return (
		<BottomSheet {...{ ...props }}>
			<View
				style={{
					height: Dimensions.get("window").height * 0.23,
					backgroundColor: theme.colors.shades.white,
					paddingHorizontal: theme.spacing.medium,
					alignItems: "center",
				}}>
				<Text style={[theme.textStyles.body_reg, { marginBottom: theme.spacing.small }]}>{props.message}</Text>
				<TouchableOpacity style={styles.action} onPress={() => props.onAction("Yes")}>
					<Text style={[theme.textStyles.body_reg, theme.textStyles.center, { color: theme.colors.accents.teal }]}>Yes</Text>
				</TouchableOpacity>
				<Line />
				<TouchableOpacity style={styles.action} onPress={() => props.onAction("No")}>
					<Text style={[theme.textStyles.body_reg, theme.textStyles.center, { color: theme.colors.accents.red }]}>No</Text>
				</TouchableOpacity>
			</View>
		</BottomSheet>
	);
};

const styles = StyleSheet.create({
	action: {
		width: "100%",
		padding: theme.spacing.small,
	},
});

export default Confirmation;
