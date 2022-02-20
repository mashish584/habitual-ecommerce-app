import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import Navigation from "./src/navigation";

const App = () => {
	return (
		<SafeAreaProvider>
			<Navigation />
			<Toast />
		</SafeAreaProvider>
	);
};

export default App;
