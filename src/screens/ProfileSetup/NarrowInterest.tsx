import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";

import CheckBoxItem from "@components/Checkbox/CheckBoxItem";
import Pill from "@components/Pill/Pill";
import { TextInput } from "@components/TextInput";

import { debounce, showToast } from "@utils/index";
import theme from "@utils/theme";
import { Category, User } from "@utils/schema.types";
import { useCategories } from "@hooks/api";
import { useProfileUpdate } from "@hooks/logic";
import { ProfileSetupStackScreens, RootStackScreens, StackNavigationProps } from "@nav/types";

import ProfileContainer, { containerStyle } from "./ProfileContainer";
import ProfileSetupFooter from "./ProfileSetupFooter";
import ProfileSetupHeader from "./ProfileSetupHeader";

type SubCategory = {
	id: string;
	name: string;
	selected?: boolean;
};

type Interest = {
	id: string;
	category: string;
	subCategory: SubCategory[];
};

const NarrowInterest: React.FC<StackNavigationProps<ProfileSetupStackScreens & Pick<RootStackScreens, "ProfileSetupComplete">, "NarrowInterest">> = ({
	navigation,
	route,
}) => {
	const query = route.params.query;
	const categoriesQuery = useCategories<"", Category[]>(`${query}&childLimit=3`);
	const { updateUserInfo, isLoading } = useProfileUpdate<keyof Pick<User, "interests">>();
	const excludeCategories = React.useRef<string[]>([]);

	const hideSteps = route.params?.showSteps == false;

	const [interests, setInterests] = React.useState<Interest[]>([]);
	const [additionalInterests, setAdditionalInterests] = React.useState<SubCategory[]>([]);
	const [searchResults, setSearchResults] = React.useState<SubCategory[] | null>(null);
	const [selectedInterestsIds, setSelectedInterests] = React.useState<string[]>([]);

	const searchInterests = debounce(async (text) => {
		if (text?.trim() === "") {
			return;
		}

		const query = excludeCategories.current.reduce((prev, category, index) => {
			prev += `exclude=${category}`;
			if (index !== excludeCategories.current.length) {
				prev += "&";
			}
			return prev;
		}, "");

		const response = await categoriesQuery.mutateAsync(`?${query}&search=${text}`);

		//👀 for selected interests in searchResults
		let results = searchResults || [];
		const selectedInterests: Record<string, SubCategory> = results.reduce((prev, interest) => {
			const data = { ...prev } as Record<string, SubCategory>;
			if (selectedInterestsIds.includes(interest.id)) {
				excludeCategories.current.push(interest.id);
				data[interest.id] = interest;
			}
			return data;
		}, {});

		//→ remove already selected item from search results
		const filterResults = response.data.filter((category) => !Object.keys(selectedInterests).includes(category.id));

		if (Object.keys(selectedInterests).length) {
			setAdditionalInterests((prev) => [...prev, ...Object.values(selectedInterests)]);
		}

		setSearchResults(filterResults.map((category) => ({ ...category, selected: false })));
	}, 1000);

	const updateInterestSelection = (value: string) => {
		const selectedIds = [...selectedInterestsIds];
		const index = selectedIds.indexOf(value);
		if (index !== -1) {
			selectedIds.splice(index, 1);
		} else {
			selectedIds.push(value);
		}
		setSelectedInterests(selectedIds);
	};

	const saveUserInterests = async () => {
		if (selectedInterestsIds.length) {
			await updateUserInfo({ interests: JSON.stringify(selectedInterestsIds) });
			if (hideSteps) {
				showToast("success", { title: "Habitual Ecommerce", message: "Interest saved successfully." });
				navigation.getParent()?.goBack();
			} else {
				navigation.replace("ProfileSetupComplete");
			}
		}
	};

	React.useEffect(() => {
		(async () => {
			const response = await categoriesQuery.mutateAsync(null);
			if (response.data.length) {
				const categories = {} as Record<string, Interest>;
				response.data.map((category) => {
					const { id, name } = category.parentCategory;
					excludeCategories.current.push(category.id);
					if (categories[id]) {
						categories[id].subCategory.push({ id: category.id, name: category.name, selected: false });
					} else {
						categories[id] = {
							id: id,
							category: name,
							subCategory: [{ id: category.id, name: category.name, selected: false }],
						};
					}
				});
				setInterests(Object.values(categories));
			}
		})();
	}, []);

	return (
		<ProfileContainer title={hideSteps ? null : "Step 4 of 4"}>
			<View style={[containerStyle, { paddingHorizontal: 0 }]}>
				<ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
					<View style={{ marginBottom: theme.spacing.medium }}>
						<ProfileSetupHeader title="Now, narrow it down." description="We have some recommended options for the interests that you have chosen." />
					</View>
					{interests.map(({ id, category, subCategory }) => {
						return (
							<View key={id} style={styles.categoryContainer}>
								<Text style={[theme.textStyles.h4, { marginBottom: theme.spacing.small }]}>{category}</Text>
								{subCategory.map((subCategory) => {
									return (
										<CheckBoxItem
											key={subCategory.id}
											text={subCategory.name}
											checked={selectedInterestsIds.includes(subCategory.id)}
											onPress={() => updateInterestSelection(subCategory.id)}
										/>
									);
								})}
							</View>
						);
					})}
					{interests.length === 0 && <Text style={styles.noText}>No sub-interest found. Please search below to select sub-categories.</Text>}
					<View>
						<Text style={[theme.textStyles.h4, { marginBottom: theme.spacing.xSmall }]}>Did we miss something?</Text>
						<Text style={theme.textStyles.body_reg}>Add other interests and sub-interests below if we missed something. </Text>
						<TextInput
							type="search"
							label="Interests"
							containerStyle={{ marginTop: 8 }}
							onChangeText={searchInterests}
							isLoading={categoriesQuery.isLoading}
						/>
						<View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: theme.spacing.medium }}>
							{searchResults?.map((result) => {
								return (
									<Pill
										variant="default"
										key={result.id}
										text={result.name}
										selected={selectedInterestsIds.includes(result.id)}
										onPress={() => updateInterestSelection(result.id)}
									/>
								);
							})}
							{searchResults?.length === 0 && <Text style={styles.noText}>No results found.</Text>}
						</View>
						{additionalInterests.map((interest) => {
							return (
								<CheckBoxItem
									key={interest.id}
									text={interest.name}
									checked={selectedInterestsIds.includes(interest.id)}
									onPress={() => updateInterestSelection(interest.id)}
								/>
							);
						})}
					</View>
				</ScrollView>
				<ProfileSetupFooter
					containerStyle={styles.footerContainer}
					button1={{
						variant: "transparent",
						text: "Back",
						style: { paddingRight: theme.spacing.medium },
						onPress: navigation.goBack,
					}}
					button2={{
						variant: selectedInterestsIds.length ? "primary" : "disabled",
						text: "Get Started →",
						onPress: saveUserInterests,
						isLoading,
					}}
				/>
			</View>
		</ProfileContainer>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		paddingHorizontal: theme.spacing.medium,
		paddingBottom: 50,
	},
	categoryContainer: {
		paddingBottom: theme.spacing.small,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.shades.gray_40,
		marginBottom: theme.spacing.medium,
	},
	noText: {
		color: theme.colors.shades.gray_60,
		marginBottom: theme.spacing.medium,
		textAlign: "center",
		flex: 1,
	},
	footerContainer: {
		marginHorizontal: theme.spacing.medium,
		paddingTop: theme.spacing.xSmall,
	},
});

export default NarrowInterest;
