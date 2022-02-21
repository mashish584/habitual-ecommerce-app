import React from "react";
import { View } from "react-native";
import { Button } from "../../components/Button";

import theme from "../../utils/theme";

import ProfileContainer, { containerStyle } from "./ProfileContainer";
import ProfileSetupFooter from "./ProfileSetupFooter";
import ProfileSetupHeader from "./ProfileSetupHeader";

const reasons = ["Discover new products", "Make monthly shopping easier", "Relevant recommendations", "Get notified of deals"];

const JoiningReason = () => {
	return (
		<ProfileContainer title="Step 2 of 4">
			<View style={containerStyle}>
				<ProfileSetupHeader
					title={"What’s your main reason\n for joining?"}
					description="Get started by picking some interests."
					descriptionStyle={{
						fontSize: theme.fontSizes.sm - 1,
						marginBottom: theme.spacing.normal,
					}}>
					{reasons.map((reason, index) => (
						<Button key={index} variant="bordered" text={reason} onPress={() => {}} style={{ width: "100%", marginBottom: theme.spacing.small }} />
					))}
				</ProfileSetupHeader>
				<ProfileSetupFooter
					button1={{
						variant: "transparent",
						text: "Back",
						onPress: () => {},
					}}
					button2={{
						variant: "disabled",
						text: "Continue",
						style: { width: 115 },
						onPress: () => {},
					}}
				/>
			</View>
		</ProfileContainer>
	);
};

export default JoiningReason;
