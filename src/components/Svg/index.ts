import Animated from "react-native-reanimated";
import Svg, { G, Path } from "react-native-svg";

export const AnimatedSVG = Animated.createAnimatedComponent(Svg);
export const AnimatedPath = Animated.createAnimatedComponent(Path);
export const AnimatedG = Animated.createAnimatedComponent(G);

export { default as Back } from "./Back";
export { default as Bag } from "./Bag";
export { default as Payment } from "./Payment";
export { default as MapPin } from "./MapPin";
export { default as Chip } from "./Chip";
