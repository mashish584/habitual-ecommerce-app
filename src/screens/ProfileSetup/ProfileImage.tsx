import React from "react";
import { Image, StyleSheet, View } from "react-native";

import Loader from "../../components/Loader";

import { openGallery } from "../../utils/media";
import theme from "../../utils/theme";
import { User } from "../../utils/schema.types";
import { ProfileSetupStackScreens, StackNavigationProps } from "../../navigation/types";
import useProfileUpdate from "../../hooks/logic/useProfileUpdate";

import ProfileContainer, { containerStyle } from "./ProfileContainer";
import ProfileSetupFooter from "./ProfileSetupFooter";
import ProfileSetupHeader from "./ProfileSetupHeader";

const timeoutIds = [];

const ProfileImage: React.FC<StackNavigationProps<ProfileSetupStackScreens, "ProfileImage">> = ({ navigation }) => {
	const { profile, updateUserInfo, isLoading } = useProfileUpdate<keyof Pick<User, "profile">>();

	console.log("Profile Image [Rerender]", { profile });

	const pickImage = async () => {
		if (isLoading) return;

		const images = await openGallery({ cropping: true });
		const response = await updateUserInfo({ profile: images[0] });

		if (response.data) {
			const id = setTimeout(() => {
				navigation.navigate("JoiningReason");
			}, 1500);
			timeoutIds.push(id);
		}
	};

	const userProfileImage = profile ? { uri: profile } : require("../../assets/images/avatar.png");

	React.useEffect(() => {
		return () => {
			timeoutIds.map((id) => {
				clearTimeout(id);
			});
		};
	}, []);

	return (
		<ProfileContainer title="Step 1 of 4">
			<View style={containerStyle}>
				<ProfileSetupHeader title="Welcome!" description={"Add a photo so other members\n know who you are."}>
					<View style={[styles.profileImage]}>
						<Image source={userProfileImage} style={{ width: "100%", height: "100%" }} />
						{isLoading && <Loader />}
					</View>
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
						onPress: pickImage,
						style: isLoading && { backgroundColor: theme.colors.primary.yellow_20 },
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
		borderRadius: 62,
		backgroundColor: theme.colors.shades.gray_20,
		overflow: "hidden",
	},
});

export default ProfileImage;
