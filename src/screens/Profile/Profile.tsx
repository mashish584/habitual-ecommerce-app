import React, { useEffect } from "react";
import { Image, Text, View, ScrollView, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import Container from "../../components/Container";
import Header from "../../components/Header/Header";
import { Back, MapPin, Lock } from "../../components/Svg";
import Curve from "../../components/Container/Curve";
import Button from "../../components/Button/Button";
import SectionHeading from "../../components/SectionHeading";
import EmptyInfoCard from "../../components/Cards/EmptyInfoCard";
import { Card, ColorCard } from "../../components/Cards";

import theme, { rgba } from "../../utils/theme";
import { COLOR_CARD_WIDTH, defaultAvatar, generateBoxShadowStyle } from "../../utils";
import { useUI, useUser } from "../../utils/store";
import { BottomStackScreens, RootStackScreens, StackNavigationProps, UnauthStackScreens } from "../../navigation/types";

import useProfileUpdate from "../../hooks/logic/useProfileUpdate";
import { Category } from "../../utils/schema.types";

const AccountSettingOptions = [
	// {
	// 	Icon: Payment,
	// 	label: "Payment",
	// },
	{
		Icon: MapPin,
		label: "Address",
		type: "ADDRESS",
	},
	{
		Icon: Lock,
		label: "Log Out",
		type: "LOGOUT",
	},
	// {
	// 	Icon: () => <Bag fill={theme.colors.shades.gray_60} />,
	// 	label: "Buy Again",
	// },
];

const Profile: React.FC<StackNavigationProps<RootStackScreens & UnauthStackScreens & BottomStackScreens, "Profile">> = ({ navigation }) => {
	const { profile, removeToken } = useUser((store) => ({ profile: store.user, removeToken: store.removeToken }));
	const { fetchUserInfo } = useProfileUpdate(profile);
	const updateValue = useUI((store) => store.updateValue);

	useEffect(() => {
		if (profile?.id) {
			fetchUserInfo();
		}
	}, [profile?.id]);

	const parentCategories = profile.interests?.reduce((prev, category) => {
		const data = { ...prev };
		const parentCategory = category.parentCategory || category;
		if (!data[parentCategory?.id]) {
			data[parentCategory.id] = parentCategory;
		}
		return data;
	}, {} as Record<string, Pick<Category, "id" | "name" | "image">>);

	return (
		<Container avoidHomBar={true} viewContainerStyle={{ backgroundColor: profile?.id ? theme.colors.primary.yellow : theme.colors.shades.white }}>
			{(top) => (
				<>
					{profile.id ? (
						<>
							<Header
								variant="primary"
								title="Profile"
								leftIcon={<Back fill={theme.colors.shades.gray_80} />}
								headerStyle={{ marginTop: top / 2, borderBottomWidth: 0 }}
								onAction={(type) => {
									if (type === "left") {
										navigation.goBack();
									}
								}}
							/>
							<Curve isCurve={false}>
								<ScrollView showsVerticalScrollIndicator={false}>
									{/* User Info */}
									<View>
										<View style={styles.profile}>
											<Image source={{ uri: profile.profile || defaultAvatar }} style={{ width: "100%", height: "100%" }} />
										</View>

										{profile.fullname && (
											<Text style={[theme.textStyles.h4, theme.textStyles.center, { marginTop: theme.spacing.small }]}>{profile.fullname}</Text>
										)}
										{profile.email && (
											<Text style={[theme.textStyles.h5, theme.textStyles.center, { marginTop: theme.spacing.small }]}>{profile.email}</Text>
										)}
										{profile.bio && (
											<Text
												style={[
													theme.textStyles.body_reg,
													theme.textStyles.center,
													{ color: theme.colors.shades.gray_60, marginTop: theme.spacing.xxSmall },
												]}>
												Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia.
											</Text>
										)}
										<Button
											variant="primary"
											text="Edit my profile"
											onPress={() =>
												navigation.navigate("EditProfile", {
													profile,
												})
											}
											iconStyle={{ position: "relative", left: 0, marginRight: theme.spacing.xxSmall }}
											iconComponent={<FontAwesomeIcon icon={faPen as IconProp} />}
											style={{
												width: 175,
												backgroundColor: theme.colors.shades.white,
												marginTop: theme.spacing.small,
												alignSelf: "center",
												...generateBoxShadowStyle(0, 5, rgba.black(1), 0.1, 15, 10, rgba.black(1)),
											}}
										/>
									</View>
									{/* Interests */}
									<SectionHeading
										title="My Interests"
										// actionText="Edit"
										containerStyle={{ marginTop: theme.spacing.medium, marginBottom: theme.spacing.small }}
									/>
									{profile.interestIds?.length === 0 && (
										<EmptyInfoCard
											title="Tell us what interests you!"
											description="You don’t have any interests listed. Tell us what you love the most and we’ll recommend relevant products to you."
											buttonText="Add my interests"
											onAction={() => {}}
										/>
									)}
									<View style={styles.interestsSection}>
										{Object.keys(parentCategories || {})
											?.slice(0, 4)
											?.map((categoryId, index) => {
												const category = parentCategories[categoryId];
												const colors = [
													theme.colors.accents.red,
													theme.colors.accents.indigo,
													theme.colors.accents.orange,
													theme.colors.accents.teal,
												];
												return (
													<ColorCard
														key={categoryId}
														variant="fixed"
														text={category.name}
														image={{ uri: category.image }}
														width={COLOR_CARD_WIDTH}
														cardColor={colors[index]}
														cardStyle={{ marginBottom: theme.spacing.small, aspectRatio: 0.78 }}
													/>
												);
											})}
									</View>
									{/* Account settings */}
									<SectionHeading title="My Account" containerStyle={{ marginTop: theme.spacing.large }} />
									<ScrollView
										style={{ minHeight: 140, marginBottom: theme.spacing.medium }}
										contentContainerStyle={{ alignItems: "center" }}
										horizontal={true}
										showsHorizontalScrollIndicator={false}>
										{AccountSettingOptions.map(({ label, Icon, type }, index) => (
											<Card
												key={`${label}_${index}`}
												onPress={() => {
													if (type === "LOGOUT") {
														updateValue({
															showConfirmationModal: true,
															message: "Are you sure you want to logout?",
															onAction: (action) => {
																if (action === "Yes") {
																	updateValue({ showConfirmationModal: false });
																	removeToken();
																} else {
																	updateValue({ showConfirmationModal: false });
																}
															},
														});
													}

													if (type === "ADDRESS") {
														navigation.navigate("Addresses");
														return;
													}
												}}
												cardStyle={{
													width: 113,
													height: 108,
													backgroundColor: theme.colors.shades.white,
													marginRight: theme.spacing.small,
													marginLeft: index === 0 ? theme.spacing.medium : 0,
													borderWidth: 1,
													borderColor: theme.colors.shades.gray_20,
												}}>
												<Icon />
												<Text style={[theme.textStyles.h6, { marginTop: theme.spacing.small }]}>{label}</Text>
											</Card>
										))}
									</ScrollView>
								</ScrollView>
							</Curve>
						</>
					) : (
						<View style={{ marginHorizontal: theme.spacing.medium, marginTop: theme.spacing.large }}>
							<Text style={theme.textStyles.h4}>Profile</Text>
							<Text style={[theme.textStyles.body_reg, { marginTop: theme.spacing.small }]}>
								Log in to start and explore your personalized shopping experience.
							</Text>
							<Button variant="primary" text={"Login"} style={{ marginTop: theme.spacing.small }} onPress={() => navigation.replace("UnauthStack")} />
							<Button variant="transparent" text={"Go to Home"} style={{ marginTop: theme.spacing.small }} onPress={() => navigation.goBack()} />
						</View>
					)}
				</>
			)}
		</Container>
	);
};

export const styles = StyleSheet.create({
	profile: {
		width: 80,
		height: 80,
		borderRadius: 50,
		alignSelf: "center",
		backgroundColor: theme.colors.shades.white,
		borderWidth: 4,
		borderColor: theme.colors.shades.gray_20,
		overflow: "hidden",
	},
	interestsSection: {
		...theme.rowStyle,
		paddingHorizontal: theme.spacing.medium,
		justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "wrap",
	},
});

export default Profile;
