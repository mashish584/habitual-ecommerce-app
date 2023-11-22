import React, { useEffect } from "react";
import { Alert, LogBox, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "react-query";
import { StripeProvider } from "@stripe/stripe-react-native";
import analytics from "@react-native-firebase/analytics";
import codePush, { CodePushOptions } from "react-native-code-push";
import { Singular, SingularConfig } from "singular-react-native";

import KeyboardManager from "react-native-keyboard-manager";
import "react-native-gesture-handler";

import { STRIPE_PUBLIC_KEY } from "@env";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "./navigation";
import { showToast } from "./utils";

LogBox.ignoreLogs([
	"Sending `onAnimatedValueUpdate` with no listeners registered.",
	"[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
	"Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).",
]);

console.warn = () => {};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: (failureCount, error) => {
				if (failureCount === 0) {
					showToast("error", { title: "Network Error", message: (error as Error)?.message });
				}
				return true;
			},
		},
	},
});

const App = () => {
	const appInit = async () => {
		await analytics().logAppOpen();
	};

	useEffect(() => {
		appInit();
		if (Platform.OS === "ios") {
			KeyboardManager.setEnable(true);
		}

		//Singular initialization
		const config = new SingularConfig("bytelearn_8f969cad", "7e886327d8e9434cb87c9ad3ff007e4a");
		config.withLoggingEnabled();
		config.withCustomUserId("ashishmehra@bytelearn.ai");
		config.withManualSkanConversionManagement();
		config.withSingularLink((singularLinksParams) => {
			// const deeplink = singularLinksParams.deeplink;
			// const passthrough = singularLinksParams.passthrough;
			// const isDeferred = singularLinksParams.isDeferred;
			// const urlParameters = singularLinksParams.urlParameters;
			Alert.alert("Deep link", JSON.stringify({ singularLinksParams }, null, 2));
			// Add your code here to handle the deep link
		});
		Singular.init(config);
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
