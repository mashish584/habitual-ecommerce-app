import React from "react";
import { View } from "react-native";
import { Button } from "../../components/Button";

import Container from "../../components/Container";
import { Header } from "../../components/Header";

import theme from "../../utils/theme";
import ProfileSetupFooter from "./ProfileSetupFooter";

import ProfileSetupHeader from "./ProfileSetupHeader";

const reasons = ["Discover new products", "Make monthly shopping easier", "Relevant recommendations", "Get notified of deals"];

const JoiningReason = () => {
	return (
		<Container>
			{() => {
				return (
					<>
						<Header variant="secondary" title="Step 2 of 4" />
						<View style={{ paddingHorizontal: theme.spacing.medium, justifyContent: "space-between", flex: 1 }}>
							<ProfileSetupHeader
								title={"What’s your main reason\n for joining?"}
								description="This will help us make great recommendations."
								descriptionStyle={{
									fontSize: theme.fontSizes.sm - 1,
									marginBottom: theme.spacing.normal,
								}}>
								{reasons.map((reason, index) => (
									<Button
										key={index}
										variant="bordered"
										text={reason}
										onPress={() => {}}
										style={{ width: "100%", marginBottom: theme.spacing.small }}
									/>
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
					</>
				);
			}}
		</Container>
	);
};

export default JoiningReason;
