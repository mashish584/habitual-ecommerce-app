import React from "react";
import { View, ViewStyle } from "react-native";

import { Button } from "../../components/Button";
import { ButtonI } from "../../components/Button/types";

import theme from "../../utils/theme";

interface ProfileSetupFooter {
	button1: ButtonI;
	button2: ButtonI;
	containerStyle?: ViewStyle;
}

const ProfileSetupFooter = ({ button1, button2, containerStyle }: ProfileSetupFooter) => {
	return (
		<View style={[theme.rowStyle, { justifyContent: "space-between" }, containerStyle]}>
			<Button {...button1} />
			<Button style={{ flex: 0.6 }} {...button2} />
		</View>
	);
};

export default ProfileSetupFooter;
