import React from "react";
import { Text, View } from "react-native";
import theme from "../utils/theme";

function getHighlightText(word, text) {
	const split = text.toLowerCase().split(word.toLowerCase());
	const startIndex = split[0].length;

	return {
		prefix: text.substr(0, startIndex),
		highlight: text.substr(startIndex, word.length),
		suffix: text.substr(startIndex + word.length),
	};
}

const HighlightText = ({ word, text }) => {
	const { prefix, highlight, suffix } = getHighlightText(word, text);
	return (
		<View style={{ flexDirection: "row" }}>
			<Text style={theme.textStyles.body_reg}>{prefix}</Text>
			<Text style={theme.textStyles.hightlightText}>{highlight}</Text>
			<Text style={theme.textStyles.body_reg}>{suffix}</Text>
		</View>
	);
};

export default HighlightText;
