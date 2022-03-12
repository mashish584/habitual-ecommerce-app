import React from "react";
import { Image, StyleSheet, View } from "react-native";

import theme from "../../utils/theme";
import { RootStackScreens, StackNavigationProps } from "../../navigation/types";

import ProfileContainer, { containerStyle } from "./ProfileContainer";
import ProfileSetupFooter from "./ProfileSetupFooter";
import ProfileSetupHeader from "./ProfileSetupHeader";

const ProfileImage: React.FC<StackNavigationProps<RootStackScreens, "ProfileImage">> = ({ navigation }) => {
	return (
		<ProfileContainer title="Step 1 of 4">
			<View style={containerStyle}>
				<ProfileSetupHeader title="Welcome!" description={"Add a photo so other members\n know who you are."}>
					<Image source={require("../../assets/images/avatar.png")} style={styles.profileImage} />
				</ProfileSetupHeader>

				<ProfileSetupFooter
					button1={{
						variant: "transparent",
						text: "Skip for now",
						onPress: () => navigation.navigate("JoiningReason"),
					}}
					button2={{
						variant: "primary",
						text: "Uploda a photo",
						onPress: () => {},
					}}
				/>
			</View>
		</ProfileContainer>
	);
};

const styles = StyleSheet.create({
	profileImage: {
		width: 124,
		height: 124,
		marginTop: theme.spacing.medium,
	},
});

export default ProfileImage;
