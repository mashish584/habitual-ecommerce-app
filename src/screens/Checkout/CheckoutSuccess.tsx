import React from "react";
import Success from "../../components/Success";

import { BottomStackScreens, RootStackScreens, StackNavigationProps } from "../../navigation/types";
import { generateBoxShadowStyle } from "../../utils";
import theme, { rgba } from "../../utils/theme";

const CheckoutSuccess: React.FC<StackNavigationProps<RootStackScreens & BottomStackScreens, "CheckoutSuccess">> = ({ navigation }) => {
	return (
		<Success
			title="Woohoo!"
			description="Your order has been placed and you will get a shipping confirmation soon."
			buttonVariant="primary"
			buttonText="Continue"
			buttonStyle={{ backgroundColor: theme.colors.shades.white, ...generateBoxShadowStyle(0, 5, rgba.black(1), 0.1, 15, 10, rgba.black(1)) }}
			onAction={() => navigation.navigate("Home")}
		/>
	);
};

export default CheckoutSuccess;
