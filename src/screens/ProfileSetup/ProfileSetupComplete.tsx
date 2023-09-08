import React from "react";
import Success from "@components/Success";
import { StackNavigationProps, RootStackScreens } from "@nav/types";

const ProfileSetupComplete: React.FC<StackNavigationProps<RootStackScreens, "ProfileSetupComplete">> = ({ navigation }) => {
	return (
		<Success
			title="Woohoo!"
			description={"Registration complete! Get ready to have the\n best shopping experiences of your life."}
			buttonText="Let the shopping begin!"
			buttonVariant="primary"
			onAction={() => navigation.navigate("BottomStack")}
		/>
	);
};

export default ProfileSetupComplete;
