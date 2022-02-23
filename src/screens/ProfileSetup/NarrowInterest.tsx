import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import CheckBoxItem from "../../components/Checkbox/CheckBoxItem";
import Pill from "../../components/Pill/Pill";
import { TextInput } from "../../components/TextInput";

import theme from "../../utils/theme";

import ProfileContainer, { containerStyle } from "./ProfileContainer";
import ProfileSetupFooter from "./ProfileSetupFooter";
import ProfileSetupHeader from "./ProfileSetupHeader";

const categories = [
	{
		id: 1,
		category: "Music",
		subCategory: [
			{ id: 1, name: "Vinyl", selected: false },
			{ id: 2, name: "Live Music", selected: false },
			{ id: 3, name: "Home Listing", selected: false },
		],
	},
	{
		id: 2,
		category: "Fashion",
		subCategory: [
			{ id: 1, name: "Vinyl", selected: false },
			{ id: 2, name: "Live Music", selected: true },
			{ id: 3, name: "Home Listing", selected: false },
		],
	},
];

const NarrowInterest = () => {
	const [interests, setInterests] = useState(categories);

	return (
		<ProfileContainer title="Step 4 of 4">
			<View style={[containerStyle, { paddingHorizontal: 0 }]}>
				<ScrollView contentContainerStyle={{ paddingHorizontal: theme.spacing.medium, paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
					<View style={{ marginBottom: theme.spacing.medium }}>
						<ProfileSetupHeader title="Now, narrow it down." description="We have some recommended options for the interests that you have chosen." />
					</View>
					{interests.map(({ id, category, subCategory }, cIndex) => {
						return (
							<View
								key={id}
								style={{
									paddingBottom: theme.spacing.small,
									borderBottomWidth: 1,
									borderBottomColor: theme.colors.shades.gray_40,
									marginBottom: theme.spacing.medium,
								}}>
								<Text style={[theme.textStyles.h4, { marginBottom: theme.spacing.small }]}>{category}</Text>
								{subCategory.map((subCategory, sIndex) => {
									return (
										<CheckBoxItem
											key={subCategory.id}
											text={subCategory.name}
											checked={subCategory.selected}
											onPress={() => {
												setInterests((prev) => {
													const categories = [...prev];
													const childCategory = { ...subCategory };
													childCategory.selected = !childCategory.selected;
													categories[cIndex].subCategory[sIndex] = childCategory;
													return categories;
												});
											}}
										/>
									);
								})}
							</View>
						);
					})}
					<View>
						<Text style={[theme.textStyles.h4, { marginBottom: theme.spacing.xSmall }]}>Did we miss something?</Text>
						<Text style={theme.textStyles.body_reg}>Add other interests and sub-interests below if we missed something. </Text>
						<TextInput type="search" label="Interests" containerStyle={{ marginTop: 8 }} />
						<View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: theme.spacing.medium }}>
							{["Console Gaming", "PC Gaming", "Racing Gaming", "MMORPG", "PS4", "XBOX"].map((pill, index) => (
								<Pill key={index} text={pill} selected={[3, 4].includes(index)} />
							))}
						</View>
						<View>
							<CheckBoxItem text="MMORPG" checked={true} checkBoxStyle={{ backgroundColor: theme.colors.shades.gray_80 }} />
							<CheckBoxItem text="PS4" checked={true} checkBoxStyle={{ backgroundColor: theme.colors.shades.gray_80 }} />
						</View>
					</View>
				</ScrollView>
				<ProfileSetupFooter
					containerStyle={{ marginHorizontal: theme.spacing.medium, paddingTop: theme.spacing.xSmall }}
					button1={{
						variant: "transparent",
						text: "Back",
						style: { paddingRight: theme.spacing.medium },
						onPress: () => {},
					}}
					button2={{
						variant: "primary",
						text: "Get Started →",
						onPress: () => {},
					}}
				/>
			</View>
		</ProfileContainer>
	);
};

export default NarrowInterest;
