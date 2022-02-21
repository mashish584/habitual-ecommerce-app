import React from "react";
import { Image, StyleSheet, View } from "react-native";

import Container from "../../components/Container";
import { Header } from "../../components/Header";

import theme from "../../utils/theme";

import ProfileSetupFooter from "./ProfileSetupFooter";
import ProfileSetupHeader from "./ProfileSetupHeader";

const ProfileImage = () => {
	return (
		<Container>
			{() => {
				return (
					<>
						<Header variant="secondary" title="Step 1 of 4" />
						<View style={{ paddingHorizontal: theme.spacing.medium, justifyContent: "space-between", flex: 1 }}>
							<ProfileSetupHeader title="Welcome!" description={"Add a photo so other members\n know who you are."}>
								<Image source={require("../../assets/images/avatar.png")} style={styles.profileImage} />
							</ProfileSetupHeader>

							<ProfileSetupFooter
								button1={{
									variant: "transparent",
									text: "Skip for now",
									onPress: () => {},
								}}
								button2={{
									variant: "primary",
									text: "Uploda a photo",
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

const styles = StyleSheet.create({
	profileImage: {
		width: 124,
		height: 124,
		marginTop: theme.spacing.medium,
	},
});

export default ProfileImage;
