import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SignIn, SignUp } from "../../screens/Auth";

const UnauthStack = createStackNavigator();

export default () => {
	return (
		<UnauthStack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
			<UnauthStack.Screen name="SignIn" component={SignIn} />
			<UnauthStack.Screen name="SignUp" component={SignUp} />
		</UnauthStack.Navigator>
	);
};
