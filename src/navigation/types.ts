import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface StackNavigationProps<ParamList extends ParamListBase, RouteName extends keyof ParamList = string> {
	navigation: StackNavigationProp<ParamList, RouteName>;
	route: RouteProp<ParamList, RouteName>;
}

export type RootStackScreens = {
	Onboarding: undefined;
	SignIn: undefined;
	SignUp: undefined;
	ProfileImage: undefined;
	JoiningReason: undefined;
	PickInterest: undefined;
	NarrowInterest: undefined;
	ProfileSetupComplete: undefined;
	Product: undefined;
	Checkout: undefined;
	CheckoutSuccess: undefined;
	Profile: undefined;
	BottomStack: BottomStackScreens;
};

export type BottomStackScreens = {
	Home: undefined;
	Wishlist: undefined;
	Search: undefined;
	Orders: undefined;
	Cart: undefined;
};

export type ScreenNavigationProp = StackNavigationProp<RootStackScreens & BottomStackScreens>;
