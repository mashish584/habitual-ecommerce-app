import { ViewStyle } from "react-native";

export type MessageType = "success" | "error" | "null";
export type InputType = "text" | "search" | "password";

export interface Label {
	label: string;
	isOptional?: boolean;
	mb?: number;
}

export interface TextInput extends Omit<Label, "label"> {
	type: InputType;
	messageType?: MessageType;
	message?: string;
	containerStyle?: ViewStyle;
	label?: string;
}
