import React from "react";
import Animated, { interpolate, Extrapolate } from "react-native-reanimated";
import { interpolateColor } from "react-native-redash";

import theme from "../../utils/theme";

interface Dot {
	currentIndex: number;
	scrollX: Animated.Value<number>;
	width: number;
	mh: number;
	activeColor?: string;
}

const Dot = ({ currentIndex, scrollX, mh, width, activeColor = theme.colors.shades.gray_60 }: Dot) => {
	const interpolateWidth = interpolate(scrollX, {
		inputRange: [(currentIndex - 0.5) * width, currentIndex * width, (currentIndex + 0.5) * width],
		outputRange: [6, 16, 6],
		extrapolate: Extrapolate.CLAMP,
	});

	const color = interpolateColor(scrollX, {
		inputRange: [(currentIndex - 0.5) * width, currentIndex * width, (currentIndex + 0.5) * width],
		outputRange: [theme.colors.shades.gray_40, activeColor, theme.colors.shades.gray_40],
	});

	return (
		<Animated.View
			style={
				{
					width: interpolateWidth,
					height: 6,
					borderRadius: 6 / 2,
					backgroundColor: color,
					marginHorizontal: mh,
				} as any
			}
		/>
	);
};

export default Dot;
