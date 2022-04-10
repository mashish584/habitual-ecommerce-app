import React, { useEffect, useState } from "react";
import { ScrollView, View, Dimensions } from "react-native";

import CategoryCard, { CategoryInfo } from "../../components/Cards/CategoryCard";
import { useCategories } from "../../hooks/api";

import { ProfileSetupStackScreens, StackNavigationProps } from "../../navigation/types";
import { Category } from "../../utils/schema.types";
import theme from "../../utils/theme";

import ProfileContainer, { containerStyle } from "./ProfileContainer";
import ProfileSetupFooter from "./ProfileSetupFooter";
import ProfileSetupHeader from "./ProfileSetupHeader";

const windowWidth = Dimensions.get("screen").width;

const aspectRatios = [201 / 156, 156 / 156, 175 / 156, 152 / 156, 160 / 156, 176 / 156];

const GRID_SPACING = theme.spacing.small;
const CARD_WIDTH = (windowWidth - (theme.spacing.medium * 2 + GRID_SPACING)) / 2;

const PickInterest: React.FC<StackNavigationProps<ProfileSetupStackScreens, "PickInterest">> = ({ navigation }) => {
	const [interests, setInterests] = useState<Record<"string", CategoryInfo>>({} as Record<"string", CategoryInfo>);

	const categoriesQuery = useCategories<"", Category[]>("?parent=true");

	const selectedInterestIds = Object.keys(interests).filter((id) => {
		if (interests[id].selected) {
			return id;
		}
	});

	const onInterestSelect = () => {
		if (selectedInterestIds.length) {
			let query = "?";

			selectedInterestIds.map((id, index) => {
				query += `parentId=${id}`;
				if (index !== selectedInterestIds.length) {
					query += "&";
				}
			});

			navigation.navigate("NarrowInterest", {
				query,
			});
		}
	};

	useEffect(() => {
		(async () => {
			const response = await categoriesQuery.mutateAsync();
			const categories = response.data;
			if (categories.length) {
				const data = { ...interests };
				categories.map((category, index) => {
					data[category.id] = {
						label: category.name,
						image: { uri: category.image },
						aspectRatio: aspectRatios[index],
						selected: false,
					};
				});
				setInterests(data);
			}
		})();
	}, []);

	return (
		<ProfileContainer title="Step 3 of 4">
			<View style={[containerStyle, { paddingHorizontal: 0 }]}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ marginBottom: theme.spacing.medium, paddingHorizontal: theme.spacing.medium }}>
						<ProfileSetupHeader title="Get started by picking some interests." />
					</View>
					<View style={{ flexDirection: "row", marginHorizontal: theme.spacing.medium }}>
						<View style={{ marginRight: GRID_SPACING }}>
							{Object.keys(interests)
								.filter((_, i) => i % 2 === 0)
								.map((key) => {
									const interest = interests[key];
									return (
										<CategoryCard
											key={key}
											category={{ ...interest }}
											width={CARD_WIDTH}
											spacing={GRID_SPACING}
											onPress={() => {
												setInterests((prev) => {
													const previousInterests = { ...prev };
													prev[key].selected = !prev[key].selected;
													return previousInterests;
												});
											}}
										/>
									);
								})}
						</View>
						<View>
							{Object.keys(interests)
								.filter((_, i) => i % 2 !== 0)
								.map((key) => {
									const interest = interests[key];
									return (
										<CategoryCard
											key={key}
											category={{ ...interest }}
											width={CARD_WIDTH}
											spacing={GRID_SPACING}
											onPress={() => {
												setInterests((prev) => {
													const previousInterests = { ...prev };
													prev[key].selected = !prev[key].selected;
													return previousInterests;
												});
											}}
										/>
									);
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
						variant: !selectedInterestIds.length ? "disabled" : "primary",
						text: "Continue",
						style: { width: 120 },
						onPress: onInterestSelect,
					}}
				/>
			</View>
		</ProfileContainer>
	);
};

export default PickInterest;
