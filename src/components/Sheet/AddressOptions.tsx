import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import theme from "../../utils/theme";
import { BottomSheet, BottomSheetI } from "../BottomSheet";
import Line from "../Line";

type AddressOptionActions = "edit" | "delete";

interface AddressOptions extends BottomSheetI {
	onAction: (type: AddressOptionActions) => void;
}

const AddressOptions = (props: AddressOptions) => {
	const insets = useSafeAreaInsets();
	return (
		<BottomSheet {...{ ...props }}>
			<View
				style={{
					height: Dimensions.get("window").height * 0.2,
					backgroundColor: theme.colors.shades.white,
					paddingHorizontal: theme.spacing.medium,
					justifyContent: "center",
					paddingBottom: insets.bottom,
				}}>
				<View>
					<TouchableOpacity onPress={() => props.onAction("edit")} style={{ paddingVertical: theme.spacing.small }}>
						<Text style={[theme.textStyles.h5, { fontFamily: theme.fonts.lato.regular, textAlign: "center", color: theme.colors.shades.gray_80 }]}>
							Update Address
						</Text>
					</TouchableOpacity>
					<Line />
					<TouchableOpacity onPress={() => props.onAction("delete")} style={{ paddingVertical: theme.spacing.small }}>
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
