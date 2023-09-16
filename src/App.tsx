import React, { useEffect } from "react";
import { LogBox, Platform, Text, TextInput } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "react-query";
import { StripeProvider } from "@stripe/stripe-react-native";
import analytics from "@react-native-firebase/analytics";
import codePush, { CodePushOptions } from "react-native-code-push";

import KeyboardManager from "react-native-keyboard-manager";
import "react-native-gesture-handler";

import { STRIPE_PUBLIC_KEY } from "@env";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "./navigation";

LogBox.ignoreLogs([
	"Sending `onAnimatedValueUpdate` with no listeners registered.",
	"[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
	"Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).",
]);

console.warn = () => {};

//⚠️ Disabling font-scaling for now
const RNText = Text as typeof Text & { defaultProps: any };
const RNTextInput = TextInput as typeof TextInput & { defaultProps: any };
if (RNText.defaultProps == null) {
	RNText.defaultProps = {};
	RNText.defaultProps.allowFontScaling = false;
}

if (RNTextInput.defaultProps == null) {
	RNTextInput.defaultProps = {};
	RNTextInput.defaultProps.allowFontScaling = false;
}

const queryClient = new QueryClient();

const App = () => {
	const appInit = async () => {
		await analytics().logAppOpen();
	};

	useEffect(() => {
		appInit();
		if (Platform.OS === "ios") {
			KeyboardManager.setEnable(true);
		}
	}, []);

	return (
		<SafeAreaProvider>
			<StripeProvider publishableKey={STRIPE_PUBLIC_KEY} merchantIdentifier="merchant.identifier">
				<QueryClientProvider client={queryClient}>
					<GestureHandlerRootView style={{ flex: 1 }}>
						<Navigation />
					</GestureHandlerRootView>
				</QueryClientProvider>
			</StripeProvider>
		</SafeAreaProvider>
	);
};

export default codePush({
	checkFrequency: codePush.CheckFrequency.ON_APP_START,
	mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART,
} as CodePushOptions)(App);
