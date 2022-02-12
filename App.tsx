import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Text } from "react-native";

const App = () => {
	return (
		<SafeAreaProvider>
			<Text>Habitual Ecommerce</Text>
			<Toast />
		</SafeAreaProvider>
	);
};

export default App;
