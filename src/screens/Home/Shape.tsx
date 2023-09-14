import React from "react";
import { Animated, Dimensions } from "react-native";
import theme from "@utils/theme";

export const WIDTH = Dimensions.get("screen").width * 2;

const Shape = () => {
	return (
		<Animated.View
			style={{
				width: WIDTH,
				height: WIDTH,
				backgroundColor: theme.colors.primary.yellow,
				borderRadius: WIDTH / 2,
				top: -WIDTH * 0.5,
				left: -WIDTH * 0.1,
				position: "absolute",
			}}
		/>
	);
};

export default Shape;
