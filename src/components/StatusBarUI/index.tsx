import React, { ForwardedRef, useEffect, useImperativeHandle } from "react";
import { StatusBar } from "react-native";
import { ScreenNames } from "@nav/types";
import { getTextColorForBackground } from "@utils/index";

export type StatusBarApi = {
	updateActiveRoute: (screenName: ScreenNames) => void;
};

export const updateStatusBarColor = (color: string) => {
	const barStyle = getTextColorForBackground(color);
	StatusBar.setBarStyle(barStyle, true);
};

const StatusBarUI = React.forwardRef((_, ref: ForwardedRef<StatusBarApi>) => {
	function updateStatusBar() {
		StatusBar.setTranslucent(true);
		StatusBar.setBackgroundColor("transparent");
		StatusBar.setBarStyle("dark-content");
	}

	function updateActiveRoute(screenName: ScreenNames) {
		if (screenName !== "Product") {
			StatusBar.setBarStyle("dark-content", true);
		}
	}

	useEffect(() => {
		updateStatusBar();
	}, []);

	useImperativeHandle(
		ref,
		() => {
			return {
				updateActiveRoute,
			};
		},
		[],
	);

	return null;
});

export default React.memo(StatusBarUI);
