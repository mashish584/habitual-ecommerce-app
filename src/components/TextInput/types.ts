import { ViewStyle, KeyboardType, ImageStyle } from "react-native";

export type MessageType = "success" | "error" | "null";
export type InputType = KeyboardType | "text" | "search" | "password";

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
	isLoading?: boolean;
	searchIconStyle?: ImageStyle;
}
