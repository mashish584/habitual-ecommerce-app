import { useEffect } from "react";
import { navigationRef } from "@nav/service";
import { EventListenerCallback, NavigationContainerEventMap } from "@react-navigation/native";

const StatusBarUI = () => {
	useEffect(() => {
		const onStateChange: EventListenerCallback<NavigationContainerEventMap, "state"> = (event) => {
			const state = event.data.state;
			const activeIndex = typeof state?.index === "number" ? state?.index : -1;
			if (activeIndex !== -1) {
				const activeRoute = state?.routes[activeIndex];
				const routeName = activeRoute?.name;
				console.log({ routeName });
			}
		};
		navigationRef.addListener("state", onStateChange);
		return () => navigationRef.removeListener("state", onStateChange);
	}, []);
	return null;
};

export default StatusBarUI;
