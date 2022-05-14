import React from "react";
import { Pressable, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import theme from "../../utils/theme";

const SearchItem = () => {
	return (
		<Pressable
			style={[
				theme.rowStyle,
				{
					minHeight: 57,
					justifyContent: "space-between",
					paddingHorizontal: theme.spacing.medium,
					alignItems: "center",
					borderBottomWidth: 2,
					borderBottomColor: theme.colors.shades.gray_20,
				},
			]}>
			<Text>Music</Text>
			<FontAwesomeIcon icon={faAngleRight as IconProp} color={theme.colors.shades.gray_40} />
		</Pressable>
	);
};

export default SearchItem;
