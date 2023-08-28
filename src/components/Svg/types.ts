import { AnimateProps, AnimatedStyle } from "react-native-reanimated";
import { SvgProps } from "react-native-svg";

export interface SVG extends AnimateProps<SvgProps> {
	xmlns?: any;
	fill?: any;
	style?: any;
}
