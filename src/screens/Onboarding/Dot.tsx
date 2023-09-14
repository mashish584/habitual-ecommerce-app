import React from "react";
import Animated, { interpolate, Extrapolate, interpolateColor, useAnimatedStyle, SharedValue } from "react-native-reanimated";
import theme from "@utils/theme";

interface Dot {
	currentIndex: number;
	scrollX: SharedValue<number>;
	width: number;
	mh: number;
	activeColor?: string;
}

const Dot = ({ currentIndex, scrollX, mh, width, activeColor = theme.colors.shades.gray_60 }: Dot) => {
	const rDotStyle = useAnimatedStyle(() => {
		const interpolateWidth = interpolate(
			scrollX.value,
			[(currentIndex - 0.5) * width, currentIndex * width, (currentIndex + 0.5) * width],
			[6, 16, 6],
			Extrapolate.CLAMP,
		);
		const color = interpolateColor(
			scrollX.value,
			[(currentIndex - 0.5) * width, currentIndex * width, (currentIndex + 0.5) * width],
			[theme.colors.shades.gray_40, activeColor, theme.colors.shades.gray_40],
		);
		return {
			width: interpolateWidth,
			backgroundColor: color,
		};
	});

	return (
		<Animated.View
			style={[
				{
					height: 6,
					borderRadius: 6 / 2,
					marginHorizontal: mh,
				},
				rDotStyle,
			]}
		/>
	);
};

export default Dot;
