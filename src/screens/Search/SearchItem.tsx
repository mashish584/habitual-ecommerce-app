import React from "react";
import { Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import HighlightText from "../../components/HighlightText";

import theme from "../../utils/theme";

interface SearchItem {
	query: string;
	text: string;
	onAction: () => void;
}

const SearchItem = ({ text, onAction, query }: SearchItem) => {
	return (
		<Pressable
			onPress={onAction}
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
			<HighlightText word={query} text={text} />
			<FontAwesomeIcon icon={faAngleRight as IconProp} color={theme.colors.shades.gray_40} />
		</Pressable>
	);
};

export default SearchItem;
