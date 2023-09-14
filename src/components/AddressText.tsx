import React from "react";
import { Text } from "react-native";

import theme from "@utils/theme";
import { Address } from "@utils/types";

interface AddressText {
	address: Address;
}

const AddressText: React.FC<AddressText> = ({ address }) => {
	const { firstName, lastName, streetName, city, state, pin, mobileNumber } = address;

	return (
		<>
			<Text style={theme.textStyles.h5}>
				{firstName} {lastName}
			</Text>
			<Text style={[theme.textStyles.body_reg, { width: "70%", marginTop: theme.spacing.xxSmall, color: theme.colors.shades.gray_60 }]}>
				{`${streetName}, ${city}, ${state} ${pin}, \n${mobileNumber}`}
			</Text>
		</>
	);
};

export default AddressText;
