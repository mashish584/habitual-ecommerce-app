import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "react-query";
import Toast from "react-native-toast-message";
import "react-native-gesture-handler";

import Navigation from "./navigation";

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
