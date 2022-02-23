import React from "react";
import { Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleInfo, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import theme from "../../utils/theme";
import { TextInput } from "./types";

type Message = Pick<TextInput, "message" | "messageType"> & { message: string; mt?: number };

const Message = ({ message, messageType }: Message) => {
	const color = messageType === "success" ? theme.colors.secondary.green : theme.colors.accents.red;

	return (
		<View style={[theme.rowStyle, { marginTop: 8 || 0, alignItems: "center" }]}>
			<FontAwesomeIcon icon={messageType === "success" ? faCircleCheck : faCircleInfo} color={color} />
			<Text style={[theme.textStyles.body_sm_alt, { marginLeft: 3, color }]}>{message}</Text>
		</View>
	);
};

export default Message;
