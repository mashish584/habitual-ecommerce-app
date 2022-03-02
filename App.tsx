import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "react-native-gesture-handler";
import crashlytics from "@react-native-firebase/crashlytics";

import Navigation from "./src/navigation";

const App = () => {
	useEffect(() => {
		crashlytics().log("App Mounted");
	}, []);

	return (
		<SafeAreaProvider>
			<Navigation />
			<Toast />
		</SafeAreaProvider>
	);
};

export default App;
