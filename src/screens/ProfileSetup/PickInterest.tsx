import React from "react";
import { ScrollView, View, Dimensions } from "react-native";

import CategoryCard from "../../components/Cards/CategoryCard";
import theme from "../../utils/theme";

import ProfileContainer, { containerStyle } from "./ProfileContainer";
import ProfileSetupFooter from "./ProfileSetupFooter";
import ProfileSetupHeader from "./ProfileSetupHeader";

const windowWidth = Dimensions.get("window").width;

const interests = [
	{
		label: "Gaming",
		image: require("../../assets/images/categories/gamepad.png"),
		aspectRatio: 201 / 156,
	},
	{
		label: "Music",
		image: require("../../assets/images/categories/music.png"),
		aspectRatio: 159 / 156,
	},
	{
		label: "Electronics",
		image: require("../../assets/images/categories/electronics.png"),
		aspectRatio: 175 / 156,
	},
	{
		label: "Fashion",
		image: require("../../assets/images/categories/fashion.png"),
		aspectRatio: 152 / 156,
	},
	{
		label: "Work",
		image: require("../../assets/images/categories/work.png"),
		aspectRatio: 160 / 156,
	},
	{
		label: "Books",
		image: require("../../assets/images/categories/books.png"),
		aspectRatio: 176 / 156,
	},
];

const GRID_SPACING = theme.spacing.small;
const CARD_WIDTH = (windowWidth - (theme.spacing.medium * 2 + GRID_SPACING)) / 2;

const PickInterest = () => {
	return (
		<ProfileContainer title="Step 3 of 4">
			<View style={[containerStyle, { paddingHorizontal: 0 }]}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ marginBottom: theme.spacing.medium, paddingHorizontal: theme.spacing.medium }}>
						<ProfileSetupHeader title="Get started by picking some interests." />
					</View>
					<View style={{ flexDirection: "row", marginHorizontal: theme.spacing.medium }}>
						<View style={{ marginRight: GRID_SPACING }}>
							{interests
								.filter((_, i) => i % 2 === 0)
								.map((interest, index) => {
									return <CategoryCard category={{ ...interest }} width={CARD_WIDTH} spacing={GRID_SPACING} />;
								})}
						</View>
						<View>
							{interests
								.filter((_, i) => i % 2 !== 0)
								.map((interest) => {
									return <CategoryCard category={{ ...interest }} width={CARD_WIDTH} spacing={GRID_SPACING} />;
								})}
						</View>
					</View>
				</ScrollView>
				<ProfileSetupFooter
					containerStyle={{ paddingHorizontal: theme.spacing.medium, paddingTop: theme.spacing.xSmall }}
					button1={{
						variant: "transparent",
						text: "Back",
						style: { paddingRight: theme.spacing.medium },
						onPress: () => {},
					}}
					button2={{
						variant: "primary",
						text: "Continue",
						style: { width: 120 },
						onPress: () => {},
					}}
				/>
			</View>
		</ProfileContainer>
	);
};

export default PickInterest;
