import React from "react";
import { ScrollView } from "react-native";

import ProfileContainer, { containerStyle } from "./ProfileContainer";
import ProfileSetupHeader from "./ProfileSetupHeader";

const PickInterest = () => {
	return (
		<ProfileContainer title="Step 3 of 4">
			<ScrollView {...{ ...containerStyle }}>
				<ProfileSetupHeader title="Get started by picking some interests." />
			</ScrollView>
		</ProfileContainer>
	);
};

export default PickInterest;
