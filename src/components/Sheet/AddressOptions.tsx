import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import theme from "@utils/theme";

import { BottomSheet, BottomSheetI } from "../BottomSheet";
import Line from "../Line";

type AddressOptionActions = "edit" | "delete";

interface AddressOptions extends BottomSheetI {
	onAction: (type: AddressOptionActions) => void;
}

const AddressOptions = (props: AddressOptions) => {
	const onEdit = () => {
		if (props.onAction) {
			props.onAction("edit");
		}
	};

	const onDelete = () => {
		if (props.onAction) {
			props.onAction("delete");
		}
	};

	return (
		<BottomSheet {...{ ...props }}>
			<View
				style={{
					backgroundColor: theme.colors.shades.white,
					paddingHorizontal: theme.spacing.medium,
					justifyContent: "center",
				}}>
				<View>
					<TouchableOpacity onPress={onEdit} style={{ paddingVertical: theme.spacing.small }}>
						<Text style={[theme.textStyles.h5, { fontFamily: theme.fonts.lato.regular, textAlign: "center", color: theme.colors.shades.gray_80 }]}>
							Update Address
						</Text>
					</TouchableOpacity>
					<Line />
					<TouchableOpacity onPress={onDelete} style={{ paddingVertical: theme.spacing.small }}>
						<Text style={[theme.textStyles.h5, { fontFamily: theme.fonts.lato.regular, textAlign: "center", color: theme.colors.accents.red }]}>
							Remove Address
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</BottomSheet>
	);
};

export default AddressOptions;
