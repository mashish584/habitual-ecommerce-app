import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { Onboarding } from "./src/screens/Onboarding";

const App = () => {
	return (
		<SafeAreaProvider>
			<Onboarding />
			<Toast />
		</SafeAreaProvider>
	);
};

export default App;
