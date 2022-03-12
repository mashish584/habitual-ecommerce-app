import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SignIn, SignUp } from "../screens/Auth";
import { Onboarding } from "../screens/Onboarding";
import { Home } from "../screens/Home";
import Product from "../screens/Product/Product";
import { Checkout } from "../screens/Checkout";
import CheckoutSuccess from "../screens/Checkout/CheckoutSuccess";
import Orders from "../screens/Orders/Orders";

import { PickInterest, ProfileImage, JoiningReason, NarrowInterest, ProfileSetupComplete } from "../screens/ProfileSetup/";
import { Profile } from "../screens/Profile";

import { navigationRef } from "./service";
import { BottomStackScreens, RootStackScreens } from "./types";
import { BottomTab } from "./BottomTab";

const defaultOptions: StackNavigationOptions = {
	headerShown: false,
};

const BottomTabStack = createBottomTabNavigator<BottomStackScreens>();

const BottamTabScreen = () => {
	return (
		<BottomTabStack.Navigator
			tabBar={(props) => <BottomTab {...props} />}
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
			}}>
			<BottomTabStack.Screen name="Home" component={Home} />
			<BottomTabStack.Screen name="Wishlist" component={SignIn} />
			<BottomTabStack.Screen name="Search" component={SignUp} />
			<BottomTabStack.Screen name="Orders" component={ProfileImage} />
			<BottomTabStack.Screen name="Cart" component={ProfileSetupComplete} />
		</BottomTabStack.Navigator>
	);
};

const RootStack = createStackNavigator<RootStackScreens>();

const RootStackScreen = () => {
	return (
		<RootStack.Navigator initialRouteName="Profile">
			<RootStack.Screen name="Onboarding" component={Onboarding} options={defaultOptions} />
			<RootStack.Screen name="SignIn" component={SignIn} options={defaultOptions} />
			<RootStack.Screen name="SignUp" component={SignUp} options={defaultOptions} />
			<RootStack.Screen name="ProfileImage" component={ProfileImage} options={defaultOptions} />
			<RootStack.Screen name="JoiningReason" component={JoiningReason} options={defaultOptions} />
			<RootStack.Screen name="PickInterest" component={PickInterest} options={defaultOptions} />
			<RootStack.Screen name="NarrowInterest" component={NarrowInterest} options={defaultOptions} />
			<RootStack.Screen name="ProfileSetupComplete" component={ProfileSetupComplete} options={defaultOptions} />
			<RootStack.Screen name="Product" component={Product} options={defaultOptions} />
			<RootStack.Screen name="Checkout" component={Checkout} options={defaultOptions} />
			<RootStack.Screen name="CheckoutSuccess" component={CheckoutSuccess} options={defaultOptions} />
			<RootStack.Screen name="Orders" component={Orders} options={defaultOptions} />
			<RootStack.Screen name="Profile" component={Profile} options={defaultOptions} />
			<RootStack.Screen name="BottomStack" component={BottamTabScreen} options={defaultOptions} />
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
