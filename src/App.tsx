import React, { useEffect } from "react";
import { LogBox, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "react-query";
import { StripeProvider } from "@stripe/stripe-react-native";
import SplashScreen from "react-native-splash-screen";

import KeyboardManager from "react-native-keyboard-manager";
import "react-native-gesture-handler";

import { STRIPE_PUBLIC_KEY } from "@env";

import Navigation from "./navigation";

LogBox.ignoreLogs([
	"Sending `onAnimatedValueUpdate` with no listeners registered.",
	"[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
	"Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).",
]);

const queryClient = new QueryClient();

const App = () => {
	useEffect(() => {
		if (Platform.OS === "ios") {
			KeyboardManager.setEnable(true);
		}
		SplashScreen.hide();
	}, []);

	return (
		<SafeAreaProvider>
			<StripeProvider publishableKey={STRIPE_PUBLIC_KEY} merchantIdentifier="merchant.identifier">
				<QueryClientProvider client={queryClient}>
					<Navigation />
				</QueryClientProvider>
			</StripeProvider>
		</SafeAreaProvider>
	);
};

export default App;
