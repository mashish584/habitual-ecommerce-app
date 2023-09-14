import React from "react";
import { Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleInfo, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import theme from "@utils/theme";
import { TextInput } from "./types";

type Message = Pick<TextInput, "message" | "messageType"> & { message: string; mt?: number };

const Message = ({ message, messageType }: Message) => {
	const color = messageType === "success" ? theme.colors.secondary.green : theme.colors.accents.red;
	const icon = messageType === "success" ? faCircleCheck : faCircleInfo;

	return (
		<View style={[theme.rowStyle, { marginTop: 8 || 0, alignItems: "center" }]}>
			<FontAwesomeIcon icon={icon as IconProp} color={color} />
			<Text style={[theme.textStyles.body_sm_alt, { marginLeft: 3, color }]}>{message}</Text>
		</View>
	);
};

export default Message;
