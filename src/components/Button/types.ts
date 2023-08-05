import { ReactNode } from "react";
import { TextStyle, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

export type variant = "primary" | "secondary" | "transparent" | "disabled" | "bordered";

export interface ButtonI {
	variant: variant;
	text?: string;
	animatedText?: Animated.Node<string>;
	style?: ViewStyle | ViewStyle[];
	buttonTextStyle?: TextStyle | TextStyle[];
	iconComponent?: ReactNode;
	iconStyle?: ViewStyle;
	isLoading?: boolean;
	onPress: () => void;
}
