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
import { useUser } from "../../utils/store";
import { RootStackScreens, StackNavigationProps } from "../../navigation/types";

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

const Profile: React.FC<StackNavigationProps<RootStackScreens, "Profile">> = ({ navigation }) => {
	const { profile, removeToken } = useUser((store) => ({ profile: store.user, removeToken: store.removeToken }));
	const { fetchUserInfo } = useProfileUpdate(profile);

	useEffect(() => {
		fetchUserInfo();
	}, []);

	const parentCategories = profile.interests?.reduce((prev, category) => {
		const data = { ...prev };
		const parentCategory = category.parentCategory;
		if (!data[parentCategory.id]) {
			data[parentCategory.id] = parentCategory;
		}
		return data;
	}, {} as Record<string, Pick<Category, "id" | "name" | "image">>);

	return (
		<Container avoidHomBar={true} viewContainerStyle={{ backgroundColor: theme.colors.primary.yellow }}>
			{(top) => (
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
									?.map((categoryId) => {
										const category = parentCategories[categoryId];
										return (
											<ColorCard
												key={categoryId}
												variant="fixed"
												text={category.name}
												image={{ uri: category.image }}
												width={COLOR_CARD_WIDTH}
												cardColor={theme.colors.accents.red}
												cardStyle={{ marginBottom: theme.spacing.small, aspectRatio: 0.78 }}
											/>
										);
									})}
							</View>
							{/* Account settings */}
							<SectionHeading title="My Account" containerStyle={{ marginTop: theme.spacing.large }} />
							<ScrollView
								style={{ paddingVertical: theme.spacing.medium, marginBottom: theme.spacing.medium }}
								horizontal={true}
								showsHorizontalScrollIndicator={false}>
								{AccountSettingOptions.map(({ label, Icon, type }, index) => (
									<Card
										key={`${label}_${index}`}
										onPress={() => {
											if (type === "LOGOUT") {
												navigation.replace("UnauthStack");
												removeToken();
											}
										}}
										cardStyle={{
											width: 113,
											height: 108,
											backgroundColor: theme.colors.shades.white,
											marginRight: theme.spacing.small,
											marginLeft: index === 0 ? theme.spacing.medium : 0,
										}}>
										<Icon />
										<Text style={[theme.textStyles.h6, { marginTop: theme.spacing.small }]}>{label}</Text>
									</Card>
								))}
							</ScrollView>
						</ScrollView>
					</Curve>
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
