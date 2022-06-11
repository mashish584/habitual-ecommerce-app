import React from "react";
import { Dimensions, Text, TouchableOpacity, View, StyleSheet } from "react-native";

import Line from "../Line";

import theme from "../../utils/theme";
import { BottomSheet, BottomSheetI } from "../BottomSheet";

interface Confirmation extends BottomSheetI {
	message: string;
	acceptText: string;
	rejectText: string;
	onAction: ((type: "Yes" | "No") => void) | null;
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
				<TouchableOpacity
					style={styles.action}
					onPress={() => {
						if (props.onAction) {
							props.onAction("Yes");
						}
					}}>
					<Text style={[theme.textStyles.body_reg, theme.textStyles.center, { color: theme.colors.accents.teal }]}>{props.acceptText}</Text>
				</TouchableOpacity>
				<Line />
				<TouchableOpacity
					style={styles.action}
					onPress={() => {
						if (props.onAction) {
							props.onAction("No");
						}
					}}>
					<Text style={[theme.textStyles.body_reg, theme.textStyles.center, { color: theme.colors.accents.red }]}>{props.rejectText}</Text>
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
