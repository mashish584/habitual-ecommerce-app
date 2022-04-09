import React from "react";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "react-query";
import Toast from "react-native-toast-message";
import "react-native-gesture-handler";

import Navigation from "./navigation";

LogBox.ignoreLogs(["[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!"]);

const queryClient = new QueryClient();

const App = () => {
	return (
		<SafeAreaProvider>
			<QueryClientProvider client={queryClient}>
				<Navigation />
				<Toast />
			</QueryClientProvider>
		</SafeAreaProvider>
	);
};

export default App;
