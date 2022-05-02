import React from "react";
import { Image, TouchableOpacity, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ScreenNavigationProp } from "../navigation/types";

import { defaultAvatar } from "../utils";
import { useUser } from "../utils/store";
import theme from "../utils/theme";

interface ProfileImage {
	containerStyle?: ViewStyle;
}

const ProfileImage: React.FC<ProfileImage> = ({ containerStyle }) => {
	const profile = useUser((store) => store.user.profile);
	const navigation = useNavigation<ScreenNavigationProp>();

	return (
		<TouchableOpacity
			style={{ width: 32, height: 32, borderRadius: 50, overflow: "hidden", backgroundColor: theme.colors.shades.white, ...containerStyle }}
			onPress={() => navigation.push("Profile")}
		>
			<Image source={{ uri: profile || defaultAvatar }} style={{ width: "100%", height: "100%" }} />
		</TouchableOpacity>
	);
};

export default ProfileImage;
