import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SignIn, SignUp } from "../../screens/Auth";
import { Onboarding } from "../../screens/Onboarding";
import { UnauthStackScreens } from "../types";

const OnboardingStack = createStackNavigator<UnauthStackScreens>();

export default () => {
	return (
		<OnboardingStack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
			<OnboardingStack.Screen name="Onboarding" component={Onboarding} />
			<OnboardingStack.Screen name="SignIn" component={SignIn} />
			<OnboardingStack.Screen name="SignUp" component={SignUp} />
		</OnboardingStack.Navigator>
	);
};
