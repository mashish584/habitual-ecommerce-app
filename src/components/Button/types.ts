import { ReactNode } from "react";
import { TextStyle, ViewStyle } from "react-native";

export type variant = "primary" | "secondary" | "transparent" | "disabled" | "bordered";

export interface ButtonI {
	variant: variant;
	text: string;
	style?: ViewStyle | ViewStyle[];
	buttonTextStyle?: TextStyle | TextStyle[];
	iconComponent?: ReactNode;
	onPress: () => void;
}
