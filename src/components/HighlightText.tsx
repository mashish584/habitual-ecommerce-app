import React from "react";
import { Text, View } from "react-native";
import theme from "../utils/theme";

interface HighlightText {
	word: string;
	text: string;
}

function getHighlightText(word: string, text: string) {
	const split = text.toLowerCase().split(word.toLowerCase());
	const startIndex = split[0].length;

	return {
		prefix: text.substring(0, startIndex),
		highlight: text.substring(startIndex, word.length),
		suffix: text.substring(startIndex + word.length),
	};
}

const HighlightText = ({ word, text }: HighlightText) => {
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
