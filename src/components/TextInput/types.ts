export type MessageType = "success" | "error" | "null";

export interface Label {
	label: string;
	isOptional?: boolean;
	mb?: number;
}

export interface TextInput extends Label {
	type: MessageType;
	message?: string;
}
