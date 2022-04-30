import React from "react";
import { ScrollView, StyleSheet, View, Image, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import Container from "../../components/Container";
import Header from "../../components/Header/Header";
import { Back } from "../../components/Svg";
import Curve from "../../components/Container/Curve";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";

import { defaultAvatar, generateBoxShadowStyle, isValidJSONString } from "../../utils";
import theme, { rgba } from "../../utils/theme";
import { RootStackScreens, StackNavigationProps } from "../../navigation/types";
import useProfileUpdate from "../../hooks/logic/useProfileUpdate";

import { openGallery } from "../../utils/media";
import { UserProfile } from "../../utils/validation";

import { styles as profileStyles } from "./Profile";

const EditProfile: React.FC<StackNavigationProps<RootStackScreens, "EditProfile">> = ({ navigation, route }) => {
	const profile = route.params?.profile;
	const { formik, isLoading } = useProfileUpdate<keyof Pick<UserProfile, "firstName" | "lastName" | "email" | "bio"> & "| profile">(profile);
	const { values, handleChange, handleSubmit, submitCount, errors, setFieldValue } = formik;

	const isFormSubmit = submitCount > 0;

	const pickImage = async () => {
		if (isLoading) return;

		const images = await openGallery({ cropping: true });
		setFieldValue("profile", JSON.stringify(images[0]));
	};

	const selectedImage = isValidJSONString(values.profile) ? JSON.parse(values.profile).uri : null;

	return (
		<Container avoidHomBar={true} viewContainerStyle={{ backgroundColor: theme.colors.primary.yellow }}>
			{(top, bottom) => (
				<>
					<Header
						variant="primary"
						title="Edit Profile"
						leftIcon={<Back fill={theme.colors.shades.gray_80} />}
						headerStyle={{ marginTop: top / 2, borderBottomWidth: 0 }}
						onAction={(type) => {
							if (type === "left") {
								navigation.goBack();
							}
						}}
					/>
					<Curve isCurve={false}>
						<ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: theme.spacing.medium }}>
							<View style={[profileStyles.profile, styles.profile]}>
								<Pressable onPress={pickImage} style={styles.uploadAction}>
									<FontAwesomeIcon icon={faCamera as IconProp} color={theme.colors.shades.gray_80} />
								</Pressable>
								<Image
									source={{ uri: selectedImage || profile?.profile || defaultAvatar }}
									style={{ width: "100%", height: "100%", borderRadius: 50 }}
								/>
							</View>
							<View style={styles.formGroup}>
								<TextInput
									label="First Name"
									type="text"
									onChangeText={handleChange("firstName")}
									value={values.firstName}
									messageType={isFormSubmit && errors.firstName ? "error" : "null"}
									returnKeyType="next"
									onSubmitEditing={() => {}}
									message={isFormSubmit && errors.firstName ? errors.firstName : ""}
									containerStyle={{ flex: 0.48 }}
								/>
								<TextInput
									label="Last Name"
									type="text"
									onChangeText={handleChange("lastName")}
									value={values.lastName}
									messageType={isFormSubmit && errors.lastName ? "error" : "null"}
									returnKeyType="next"
									onSubmitEditing={() => {}}
									message={isFormSubmit && errors.lastName ? errors.lastName : ""}
									containerStyle={{ flex: 0.48 }}
								/>
							</View>
							<TextInput
								label="Email"
								type="text"
								onChangeText={handleChange("email")}
								value={values.email}
								messageType={isFormSubmit && errors.email ? "error" : "null"}
								returnKeyType="next"
								onSubmitEditing={() => {}}
								message={isFormSubmit && errors.email ? errors.email : ""}
								containerStyle={{ flex: 0.48 }}
								editable={false}
							/>
							<TextInput
								label="Bio"
								type="text"
								onChangeText={handleChange("bio")}
								value={values.bio}
								messageType={isFormSubmit && errors.bio ? "error" : "null"}
								returnKeyType="next"
								onSubmitEditing={() => {}}
								message={isFormSubmit && errors.bio ? errors.bio : ""}
								containerStyle={{ flex: 0.48 }}
								numberOfLines={3}
								multiline={true}
								style={{ minHeight: 100, paddingBottom: theme.spacing.small, paddingTop: theme.spacing.small, textAlignVertical: "center" }}
							/>
						</ScrollView>
						<Button
							variant="primary"
							isLoading={isLoading}
							text={"Save"}
							style={{ marginBottom: bottom, marginHorizontal: theme.spacing.medium }}
							onPress={handleSubmit}
						/>
					</Curve>
				</>
			)}
		</Container>
	);
};

const styles = StyleSheet.create({
	profile: {
		width: 120,
		height: 120,
		borderRadius: 60,
		position: "relative",
		overflow: "visible",
		marginBottom: theme.spacing.large,
	},
	uploadAction: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: theme.colors.shades.white,
		position: "absolute",
		bottom: -5,
		right: 5,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 99,
		...generateBoxShadowStyle(0, 4, rgba.black(0.2), 1, 10, 10, rgba.black(1)),
	},
	formGroup: {
		...theme.rowStyle,
		justifyContent: "space-between",
	},
});

export default EditProfile;
