import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Home } from "../screens/Home";
import Product from "../screens/Product/Product";
import { Checkout } from "../screens/Checkout";
import CheckoutSuccess from "../screens/Checkout/CheckoutSuccess";
import Orders from "../screens/Orders/Orders";
import { Profile } from "../screens/Profile";
import { ProfileSetupComplete } from "../screens/ProfileSetup";
import GlobalUI from "../screens/GlobalUI";

import { UserState } from "../utils/store";

import { navigationRef } from "./service";
import { BottomTab } from "./BottomTab";
import ProfileSetupStack from "./Stacks/ProfileSetupStack";
import UnauthStack from "./Stacks/UnauthStack";
import { BottomStackScreens, RootStackScreens, StackNavigationProps } from "./types";

/**
 * Where ot navigation user
 */
const Start: React.FC<StackNavigationProps<RootStackScreens, null>> = ({ navigation }) => {
	useEffect(() => {
		(async () => {
			try {
				const user = await AsyncStorage.getItem("user");
				const data = JSON.parse(user)?.state as Pick<UserState, "token" | "user">;
				if (data.token && data.user && data.user.joining_reasons?.length !== 0) {
					navigation.replace("BottomStack");
				} else {
					navigation.replace("UnauthStack");
				}
			} catch (err) {
				navigation.replace("UnauthStack");
			}
		})();
	}, []);

	return null;
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
			<BottomTabStack.Screen name="Wishlist" component={Home} />
			<BottomTabStack.Screen name="Search" component={Home} />
			<BottomTabStack.Screen name="Orders" component={Orders} />
			<BottomTabStack.Screen name="Cart" component={Home} />
		</BottomTabStack.Navigator>
	);
};

const RootStack = createStackNavigator<RootStackScreens>();

const RootStackScreen = () => {
	return (
		<RootStack.Navigator initialRouteName={"Start"} screenOptions={{ headerShown: false }}>
			<RootStack.Screen name="Start" component={Start} />
			<RootStack.Screen name="UnauthStack" component={UnauthStack} />
			<RootStack.Screen name="ProfileSetup" component={ProfileSetupStack} />
			<RootStack.Screen name="ProfileSetupComplete" component={ProfileSetupComplete} />
			<RootStack.Screen name="Product" component={Product} />
			<RootStack.Screen name="Checkout" component={Checkout} />
			<RootStack.Screen name="CheckoutSuccess" component={CheckoutSuccess} />
			<RootStack.Screen name="Profile" component={Profile} />
			<RootStack.Screen name="BottomStack" component={BottamTabScreen} />
		</RootStack.Navigator>
	);
};

export default () => {
	return (
		<NavigationContainer ref={navigationRef}>
			<RootStackScreen />
			<GlobalUI />
		</NavigationContainer>
	);
};
