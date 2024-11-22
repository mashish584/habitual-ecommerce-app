import React from "react";
import { LayoutRectangle } from "react-native";
import Animated, { useAnimatedStyle, useDerivedValue, withDelay, withSpring } from "react-native-reanimated";
import theme from "@utils/theme";

export type MenuLayout = Record<string, LayoutRectangle>;

interface IndicatorI {
	layouts: MenuLayout;
	activeIndex: number;
}

const ActiveBar = ({ layouts, activeIndex }: IndicatorI) => {
	const width = useDerivedValue(() => {
		const activeTabWidth = layouts[activeIndex].width;
		const barWidth = activeTabWidth * 0.5;
		return withDelay(300, withSpring(barWidth));
	});

	const translateX = useDerivedValue(() => {
		const activeTabWidth = layouts[activeIndex].width;
		const offset = (activeTabWidth - width.value) / 2;
		let x = offset;

		for (let i = activeIndex - 1; i >= 0; i--) {
			x += layouts[i].width;
		}
		return withSpring(x);
	});

	const rStyle = useAnimatedStyle(() => {
		return {
			width: width.value,
			transform: [{ translateX: translateX.value }],
		};
	}, [translateX.value, width.value]);

	return (
		<Animated.View
			style={[
				{
					position: "absolute",
					height: 2,
					borderRadius: 1,
					backgroundColor: theme.colors.shades.gray_80,
					bottom: 0,
				},
				rStyle,
			]}
		/>
	);
};

export default ActiveBar;
