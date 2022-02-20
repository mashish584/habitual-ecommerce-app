import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";

import { SignIn, SignUp } from "../screens/Auth";
import { Onboarding } from "../screens/Onboarding";
import { navigationRef } from "./service";
import { RootStackScreens } from "./types";

const defaultOptions: StackNavigationOptions = {
	headerShown: false,
};

const RootStack = createStackNavigator<RootStackScreens>();

const RootStackScreen = () => {
	return (
		<RootStack.Navigator initialRouteName="Onboarding">
			<RootStack.Screen name="Onboarding" component={Onboarding} options={defaultOptions} />
			<RootStack.Screen name="SignIn" component={SignIn} options={defaultOptions} />
			<RootStack.Screen name="SignUp" component={SignUp} options={defaultOptions} />
		</RootStack.Navigator>
	);
};

export default () => {
	return (
		<NavigationContainer ref={navigationRef}>
			<RootStackScreen />
		</NavigationContainer>
	);
};
