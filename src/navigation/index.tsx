import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "react-native-splash-screen";

import { Home } from "@screens/Home";
import Product from "@screens/Product/Product";
import { Checkout, Address } from "@screens/Checkout";
import CheckoutSuccess from "@screens/Checkout/CheckoutSuccess";
import Orders from "@screens/Orders/Orders";
import { EditProfile, Profile, Addresses } from "@screens/Profile";
import { ProfileSetupComplete } from "@screens/ProfileSetup";
import { Wishlist } from "@screens/Wishlist";
import { Search } from "@screens/Search";
import GlobalUI from "@screens/GlobalUI";

import { UserState, useUser } from "@utils/store";

import { getDataFromSecureStorage } from "@utils/index";
import { navigationRef } from "./service";
import { BottomTab } from "./BottomTab";
import ProfileSetupStack from "./Stacks/ProfileSetupStack";
import UnauthStack from "./Stacks/UnauthStack";
import { BottomStackScreens, MergedRoutes, RootStackScreens, StackNavigationProps } from "./types";
import AddInterestStack from "./Stacks/AddInterestStack";

/**
 * Where ot navigation user
 */
const Start: React.FC<StackNavigationProps<MergedRoutes, "Start">> = ({ navigation }) => {
	useEffect(() => {
		(async () => {
			try {
				const user = await getDataFromSecureStorage("user");
				let data;

				if (user) {
					data = JSON.parse(user)?.state as Pick<UserState, "token" | "user">;
				}

				if (data && data.token && data.user) {
					const route = data.user.joining_reasons?.length === 0 ? "ProfileSetup" : "BottomStack";
					SplashScreen.hide();
					navigation.replace(route);
				} else {
					navigation.replace("UnauthStack");
					SplashScreen.hide();
				}
			} catch (err) {
				navigation.replace("UnauthStack");
				SplashScreen.hide();
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
			}}
		>
			<BottomTabStack.Screen name="Home" component={Home} />
			<BottomTabStack.Screen name="Wishlist" component={Wishlist} />
			<BottomTabStack.Screen name="Search" component={Search} />
			<BottomTabStack.Screen name="Orders" component={Orders} />
			<BottomTabStack.Screen name="Cart" component={() => null} />
		</BottomTabStack.Navigator>
	);
};

const RootStack = createStackNavigator<RootStackScreens>();

const RootStackScreen = () => {
	const isUserId = useUser((store) => !!store.user?.id);
	return (
		<RootStack.Navigator initialRouteName={"Start"} screenOptions={{ headerShown: false }}>
			<RootStack.Screen name="Start" component={Start} />
			{!isUserId && <RootStack.Screen name="UnauthStack" component={UnauthStack} />}
			<RootStack.Screen name="ProfileSetup" component={ProfileSetupStack} />
			<RootStack.Screen name="AddInterest" component={AddInterestStack} />
			<RootStack.Screen name="ProfileSetupComplete" component={ProfileSetupComplete} />
			<RootStack.Screen name="Product" component={Product} />
			<RootStack.Screen name="Checkout" component={Checkout} />
			<RootStack.Screen name="CheckoutSuccess" component={CheckoutSuccess} />
			<RootStack.Screen name="Profile" component={Profile} />
			<RootStack.Screen name="Addresses" component={Addresses} />
			<RootStack.Screen name="EditProfile" component={EditProfile} />
			<RootStack.Screen name="Address" component={Address} />
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
