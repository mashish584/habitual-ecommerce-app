import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Product } from "../utils/schema.types";

export interface StackNavigationProps<ParamList extends ParamListBase, RouteName extends keyof ParamList = string> {
	navigation: StackNavigationProp<ParamList, RouteName>;
	route: RouteProp<ParamList, RouteName>;
}

export type RootStackScreens = {
	Start: undefined;
	UnauthStack: undefined;
	ProfileSetup: undefined;
	Product: {
		product: Product;
	};
	Checkout: undefined;
	CheckoutSuccess: undefined;
	Profile: undefined;
	Address: {
		id: number;
	};
	ProfileSetupComplete: undefined;
	BottomStack: BottomStackScreens;
};

export type BottomStackScreens = {
	Home: undefined;
	Wishlist: undefined;
	Search: undefined;
	Orders: undefined;
	Cart: undefined;
};

export type UnauthStackScreens = {
	Onboarding: undefined;
	SignIn: undefined;
	SignUp: undefined;
};

export type ProfileSetupStackScreens = {
	ProfileImage: undefined;
	JoiningReason: undefined;
	PickInterest: undefined;
	NarrowInterest: {
		query: string;
	};
};

export type ScreenNavigationProp = StackNavigationProp<RootStackScreens & BottomStackScreens & UnauthStackScreens>;
