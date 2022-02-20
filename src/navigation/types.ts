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
	PickInterest: undefined;
	NarrowInterest: undefined;
};

export type BottomStackScreens = {
	Home: undefined;
	Search: undefined;
	Notifications: undefined;
	Settings: undefined;
};

export type ScreenNavigationProp = StackNavigationProp<RootStackScreens & BottomStackScreens>;
