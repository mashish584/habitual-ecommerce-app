import React from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import theme from "../../utils/theme";

export interface CheckboxI {
	checked: boolean;
	checkBoxStyle?: ViewStyle;
	onPress?: () => void;
}

const Checkbox = ({ checked, checkBoxStyle, onPress }: CheckboxI) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={{
					width: 24,
					height: 24,
					borderWidth: 1,
					borderRadius: 5,
					justifyContent: "center",
					alignItems: "center",
					borderColor: theme.colors.shades.gray_60,
					backgroundColor: checked ? theme.colors.shades.gray_60 : "transparent",
					...checkBoxStyle,
				}}>
				{checked && <FontAwesomeIcon icon={faCheck as IconProp} color={theme.colors.shades.white} />}
			</View>
		</TouchableOpacity>
	);
};

export default Checkbox;
