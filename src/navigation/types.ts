import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Product, User } from "@utils/schema.types";
import { Address } from "@utils/types";

export interface StackNavigationProps<ParamList extends ParamListBase, RouteName extends keyof ParamList = string> {
	navigation: StackNavigationProp<ParamList, RouteName>;
	route: RouteProp<ParamList, RouteName>;
}

export type RootStackScreens = {
	Start: undefined;
	UnauthStack?: {
		screen: keyof UnauthStackScreens;
	};
	ProfileSetup: undefined;
	AddInterest: undefined;
	Product: {
		product: Product;
	};
	Checkout: undefined;
	CheckoutSuccess: undefined;
	Profile: undefined;
	EditProfile: {
		profile: User;
	};
	Address: {
		address?: Address;
	};
	Addresses: undefined;
	ProfileSetupComplete: undefined;
	BottomStack?: BottomStackScreens;
};

export type BottomStackScreens = {
	BottomStack?: undefined;
	Home: undefined;
	Wishlist: undefined;
	Search: undefined;
	Orders: undefined;
	Cart: undefined;
};

export type UnauthStackScreens = {
	UnauthStack?: UnauthStackScreenParams;
	Onboarding: undefined;
	SignIn: undefined;
	SignUp: undefined;
};

export type UnauthStackScreenParams = {
	screen: "SignIn" | "SignUp";
};
export type UnauthStackNavigationProp = StackNavigationProp<UnauthStackScreens, "UnauthStack">;

export type ProfileSetupStackScreens = {
	ProfileImage: undefined;
	JoiningReason: undefined;
	PickInterest: {
		showSteps?: boolean;
	};
	NarrowInterest: {
		query: string;
		showSteps?: boolean;
	};
};

export type AddInterestStackScreens = {
	PickInterest: {
		showSteps?: boolean;
	};
	NarrowInterest: {
		query: string;
		showSteps?: boolean;
	};
};

export type MergedRoutes = RootStackScreens & BottomStackScreens & UnauthStackScreens;
export type ScreenNavigationProp = StackNavigationProp<MergedRoutes>;
