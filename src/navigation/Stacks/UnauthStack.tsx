import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Onboarding } from "../../screens/Onboarding";
import { SignIn, SignUp } from "../../screens/Auth";

const UnauthStack = createStackNavigator();

export default () => {
	return (
		<UnauthStack.Navigator screenOptions={{ headerShown: false }}>
			<UnauthStack.Screen name="Onboarding" component={Onboarding} />
			<UnauthStack.Screen name="SignIn" component={SignIn} />
			<UnauthStack.Screen name="SignUp" component={SignUp} />
		</UnauthStack.Navigator>
	);
};
