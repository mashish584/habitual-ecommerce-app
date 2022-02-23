import React from "react";
import { Text, View } from "react-native";

import theme from "../../utils/theme";
import Checkbox, { CheckboxI } from "./Checkbox";

interface CheckBoxItem extends Pick<CheckboxI, "checkBoxStyle" | "checked"> {
	text: string;
	onPress?: () => void;
}

const CheckBoxItem = ({ text, ...props }: CheckBoxItem) => {
	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				marginBottom: theme.spacing.small,
				alignItems: "center",
			}}>
			<Text style={theme.textStyles.body_reg}>{text}</Text>
			<Checkbox {...props} />
		</View>
	);
};

export default CheckBoxItem;
