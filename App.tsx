import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { SignIn } from "./src/screens/Auth";

const App = () => {
	return (
		<SafeAreaProvider>
			<SignIn />
			<Toast />
		</SafeAreaProvider>
	);
};

export default App;
