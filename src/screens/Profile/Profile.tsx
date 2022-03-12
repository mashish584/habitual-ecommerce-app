import React from "react";
import { Image, Text, View, ScrollView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import Container from "../../components/Container";
import Header from "../../components/Header/Header";
import { Back, Bag, MapPin, Payment } from "../../components/Svg";
import Curve from "../../components/Container/Curve";
import Button from "../../components/Button/Button";

import theme, { rgba } from "../../utils/theme";
import { generateBoxShadowStyle } from "../../utils";
import SectionHeading from "../../components/SectionHeading";
import EmptyInfoCard from "../../components/Cards/EmptyInfoCard";
import Card from "../../components/Cards/Card";
import { RootStackScreens, StackNavigationProps } from "../../navigation/types";

const AccountSettingOptions = [
	{
		Icon: Payment,
		label: "Payment",
	},
	{
		Icon: MapPin,
		label: "Address",
	},
	{
		Icon: () => <Bag fill={theme.colors.shades.gray_60} />,
		label: "Buy Again",
	},
];

const Profile: React.FC<StackNavigationProps<RootStackScreens, "Profile">> = ({ navigation }) => {
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
						{/* User Info */}
						<View>
							<Image source={{ uri: "https://unsplash.it/100/100" }} style={{ width: 80, height: 80, borderRadius: 50, alignSelf: "center" }} />
							<Text style={[theme.textStyles.h4, theme.textStyles.center, { marginTop: theme.spacing.small }]}>Leslie Flores</Text>
							<Text
								style={[
									theme.textStyles.body_reg,
									theme.textStyles.center,
									{ color: theme.colors.shades.gray_60, marginTop: theme.spacing.xxSmall },
								]}>
								Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia.
							</Text>
							<Button
								variant="primary"
								text="Edit my profile"
								onPress={() => {}}
								iconStyle={{ position: "relative", left: 0, marginRight: theme.spacing.xxSmall }}
								iconComponent={<FontAwesomeIcon icon={faPen} />}
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
							actionText="Edit"
							containerStyle={{ marginTop: theme.spacing.medium, marginBottom: theme.spacing.small }}
						/>
						<EmptyInfoCard
							title="Tell us what interests you!"
							description="You don’t have any interests listed. Tell us what you love the most and we’ll recommend relevant products to you."
							buttonText="Add my interests"
							onAction={() => {}}
						/>
						{/* Account settings */}
						<SectionHeading title="My Account" containerStyle={{ marginTop: theme.spacing.large }} />
						<ScrollView
							style={{ paddingVertical: theme.spacing.medium, marginBottom: theme.spacing.medium }}
							horizontal={true}
							showsHorizontalScrollIndicator={false}>
							{AccountSettingOptions.map(({ label, Icon }, index) => (
								<Card
									key={`${label}_${index}`}
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
					</Curve>
				</>
			)}
		</Container>
	);
};

export default Profile;
