import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { Button } from "@components/Button";

import theme from "@utils/theme";
import { User } from "@utils/schema.types";
import { useProfileUpdate } from "@hooks/logic";
import { ProfileSetupStackScreens, StackNavigationProps } from "@nav/types";

import ProfileContainer, { containerStyle } from "./ProfileContainer";
import ProfileSetupFooter from "./ProfileSetupFooter";
import ProfileSetupHeader from "./ProfileSetupHeader";

const reasons = ["Discover new products", "Make monthly shopping easier", "Relevant recommendations", "Get notified of deals"];

const emptyObj = {};

const JoiningReason: React.FC<StackNavigationProps<ProfileSetupStackScreens, "JoiningReason">> = ({ navigation }) => {
	const { updateUserInfo, joining_reasons, isLoading } = useProfileUpdate<keyof Pick<User, "joining_reasons">>();
	const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

	const addJoiningReasons = async () => {
		if (selectedReasons.length) {
			await updateUserInfo({ joining_reasons: JSON.stringify(selectedReasons) });
			navigation.navigate("PickInterest", {});
		}
	};

	useEffect(() => {
		if (joining_reasons.length) {
			setSelectedReasons(joining_reasons);
		}
	}, [joining_reasons]);

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
					{reasons.map((reason) => {
						const reasons = [...selectedReasons];
						const index = reasons.indexOf(reason);
						return (
							<Button
								key={reason}
								variant="bordered"
								text={reason}
								onPress={() => {
									if (index !== -1) {
										reasons.splice(index, 1);
									} else {
										reasons.push(reason);
									}
									setSelectedReasons(reasons);
								}}
								style={[
									{
										width: "100%",
										marginBottom: theme.spacing.small,
									},
									index !== -1 ? { backgroundColor: theme.colors.shades.gray_80 } : emptyObj,
								]}
								buttonTextStyle={index !== -1 ? { color: theme.colors.shades.white } : emptyObj}
							/>
						);
					})}
				</ProfileSetupHeader>
				<ProfileSetupFooter
					button1={{
						variant: "transparent",
						text: "Back",
						onPress: navigation.goBack,
					}}
					button2={{
						variant: selectedReasons.length === 0 ? "disabled" : "primary",
						text: "Continue",
						style: { width: 115 },
						onPress: addJoiningReasons,
						isLoading,
					}}
				/>
			</View>
		</ProfileContainer>
	);
};

export default JoiningReason;
