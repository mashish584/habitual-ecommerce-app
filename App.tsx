import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Text } from "react-native";

import theme from "./src/utils/theme";

const App = () => {
	return (
		<SafeAreaProvider>
			<Text style={theme.textStyles.h1}>Habitual Ecommerce</Text>
			<Toast />
		</SafeAreaProvider>
	);
};

export default App;
