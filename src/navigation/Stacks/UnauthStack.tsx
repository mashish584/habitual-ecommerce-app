import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SignIn, SignUp } from "@screens/Auth";
import { Onboarding } from "@screens/Onboarding";
import { UnauthStackScreens } from "@nav/types";

const UnauthStack = createStackNavigator<UnauthStackScreens>();

export default () => {
	return (
		<UnauthStack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
			<UnauthStack.Screen name="Onboarding" component={Onboarding} />
			<UnauthStack.Screen name="SignIn" component={SignIn} />
			<UnauthStack.Screen name="SignUp" component={SignUp} />
		</UnauthStack.Navigator>
	);
};
