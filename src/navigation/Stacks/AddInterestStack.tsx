import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { NarrowInterest, PickInterest } from "@screens/ProfileSetup";
import { AddInterestStackScreens } from "../types";

const AddInterestStack = createStackNavigator<AddInterestStackScreens>();

export default () => {
	return (
		<AddInterestStack.Navigator initialRouteName="PickInterest" screenOptions={{ headerShown: false }}>
			<AddInterestStack.Screen name="PickInterest" component={PickInterest} initialParams={{ showSteps: false }} />
			<AddInterestStack.Screen name="NarrowInterest" component={NarrowInterest} initialParams={{ showSteps: false }} />
		</AddInterestStack.Navigator>
	);
};
