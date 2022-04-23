import React from "react";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "react-query";
import { StripeProvider } from "@stripe/stripe-react-native";
import Toast from "react-native-toast-message";
import "react-native-gesture-handler";

import { STRIPE_PUBLIC_KEY } from "@env";

import Navigation from "./navigation";

LogBox.ignoreLogs(["[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!"]);

const queryClient = new QueryClient();

console.log({ STRIPE_PUBLIC_KEY });

const App = () => {
	return (
		<SafeAreaProvider>
			<StripeProvider publishableKey={STRIPE_PUBLIC_KEY} merchantIdentifier="merchant.identifier">
				<QueryClientProvider client={queryClient}>
					<Navigation />
					<Toast />
				</QueryClientProvider>
			</StripeProvider>
		</SafeAreaProvider>
	);
};

export default App;
