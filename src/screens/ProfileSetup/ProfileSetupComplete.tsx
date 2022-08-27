import React from "react";
import Success from "../../components/Success";
import { StackNavigationProps, MergedRoutes } from "../../navigation/types";

const ProfileSetupComplete: React.FC<StackNavigationProps<MergedRoutes, "ProfileSetupComplete">> = ({ navigation }) => {
	return (
		<Success
			title="Woohoo!"
			description={"Registration complete! Get ready to have the\n best shopping experiences of your life."}
			buttonText="Let the shopping begin!"
			buttonVariant="primary"
			onAction={() => navigation.navigate("Home")}
		/>
	);
};

export default ProfileSetupComplete;
