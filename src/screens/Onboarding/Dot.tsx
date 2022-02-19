import React from "react";
import { Animated } from "react-native";
import { rgba } from "../../utils/theme";

interface Dot {
	currentIndex: number;
	scrollX: Animated.AnimatedDivision;
	mh: number;
}

const Dot = ({ currentIndex, scrollX, mh }: Dot) => {
	const width = scrollX.interpolate({
		inputRange: [currentIndex - 1, currentIndex, currentIndex + 1],
		outputRange: [6, 16, 6],
		extrapolate: "clamp",
	});

	const color = scrollX.interpolate({
		inputRange: [currentIndex - 1, currentIndex, currentIndex + 1],
		outputRange: [rgba.black(0.4), rgba.yellow(1), rgba.black(0.4)],
		extrapolate: "clamp",
	});

	return (
		<Animated.View
			style={{
				width,
				height: 6,
				borderRadius: 6 / 2,
				backgroundColor: color,
				marginHorizontal: mh,
			}}
		/>
	);
};

export default Dot;
