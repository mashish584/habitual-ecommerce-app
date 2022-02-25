import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";

import { SignIn, SignUp } from "../screens/Auth";
import { Onboarding } from "../screens/Onboarding";
import { Home } from "../screens/Home";

import { PickInterest, ProfileImage, JoiningReason, NarrowInterest } from "../screens/ProfileSetup/";

import { navigationRef } from "./service";
import { RootStackScreens } from "./types";

const defaultOptions: StackNavigationOptions = {
	headerShown: false,
};

const RootStack = createStackNavigator<RootStackScreens>();

const RootStackScreen = () => {
	return (
		<RootStack.Navigator initialRouteName="ProfileSetupComplete">
			<RootStack.Screen name="Onboarding" component={Onboarding} options={defaultOptions} />
			<RootStack.Screen name="SignIn" component={SignIn} options={defaultOptions} />
			<RootStack.Screen name="SignUp" component={SignUp} options={defaultOptions} />
			<RootStack.Screen name="ProfileImage" component={ProfileImage} options={defaultOptions} />
			<RootStack.Screen name="JoiningReason" component={JoiningReason} options={defaultOptions} />
			<RootStack.Screen name="PickInterest" component={PickInterest} options={defaultOptions} />
			<RootStack.Screen name="NarrowInterest" component={NarrowInterest} options={defaultOptions} />
			<RootStack.Screen name="ProfileSetupComplete" component={Home} options={defaultOptions} />
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
