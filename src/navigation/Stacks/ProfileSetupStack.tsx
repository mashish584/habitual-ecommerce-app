import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileSetupStackScreens } from "../types";
import { JoiningReason, NarrowInterest, PickInterest, ProfileImage } from "../../screens/ProfileSetup";

const ProfileSetupStack = createStackNavigator<ProfileSetupStackScreens>();

export default () => {
	return (
		<ProfileSetupStack.Navigator initialRouteName="ProfileImage" screenOptions={{ headerShown: false }}>
			<ProfileSetupStack.Screen name="ProfileImage" component={ProfileImage} />
			<ProfileSetupStack.Screen name="JoiningReason" component={JoiningReason} />
			<ProfileSetupStack.Screen name="PickInterest" component={PickInterest} />
			<ProfileSetupStack.Screen name="NarrowInterest" component={NarrowInterest} />
		</ProfileSetupStack.Navigator>
	);
};
