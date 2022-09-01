import React from "react";
import { Dimensions, Text, View } from "react-native";

import theme from "../../utils/theme";
import { BottomSheet, BottomSheetI } from "../BottomSheet";
import Button from "../Button/Button";

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
				<Text style={[theme.textStyles.body_reg, { marginBottom: theme.spacing.normal }]}>{props.message}</Text>
				<Button variant="primary" text={props.acceptText} onPress={() => props.onAction?.("Yes")} style={{ width: "100%" }} />
				<Button variant="transparent" text={props.rejectText} onPress={() => props.onAction?.("No")} style={{ width: "100%" }} />
			</View>
		</BottomSheet>
	);
};

export default Confirmation;
