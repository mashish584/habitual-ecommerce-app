import React from "react";
import { ScrollView, Text, View } from "react-native";

import CheckBoxItem from "../../components/Checkbox/CheckBoxItem";
import Pill from "../../components/Pill/Pill";
import { TextInput } from "../../components/TextInput";

import { debounce } from "../../utils";
import theme from "../../utils/theme";
import { useCategories } from "../../hooks/api";
import { Category } from "../../utils/schema.types";
import { ProfileSetupStackScreens, StackNavigationProps } from "../../navigation/types";

import ProfileContainer, { containerStyle } from "./ProfileContainer";
import ProfileSetupFooter from "./ProfileSetupFooter";
import ProfileSetupHeader from "./ProfileSetupHeader";

type SubCategory = {
	id: string;
	name: string;
	selected: boolean;
};

const NarrowInterest: React.FC<StackNavigationProps<ProfileSetupStackScreens, "NarrowInterest">> = ({ navigation, route }) => {
	const query = route.params.query;
	const categoriesQuery = useCategories<"", Category[]>(`${query}&childLimit=3`);
	const excludeCategories = React.useRef([]);

	const [interests, setInterests] = React.useState([]);
	const [searchResults, setSearchResults] = React.useState<SubCategory[]>([]);

	const searchInterests = debounce(async (text) => {
		const query = excludeCategories.current.reduce((prev, category, index) => {
			prev += `exclude=${category}`;
			return prev;
		}, "?");
		const response = await categoriesQuery.mutateAsync(`${query}&search=${text}`);
		setSearchResults(response.data.map((category) => ({ ...category, selected: false })));
	}, 1000);

	React.useEffect(() => {
		(async () => {
			const response = await categoriesQuery.mutateAsync(null);
			if (response.data.length) {
				const categories = {};
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
						<TextInput type="search" label="Interests" containerStyle={{ marginTop: 8 }} onChangeText={searchInterests} />
						<View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: theme.spacing.medium }}>
							{searchResults.map((result, index) => {
								return (
									<Pill
										variant="default"
										key={result.id}
										text={result.name}
										selected={result.selected}
										onPress={() => {
											const results = [...searchResults];
											const item = { ...searchResults[index] };
											item.selected = !item.selected;
											results[index] = item;
											setSearchResults(results);
										}}
									/>
								);
							})}
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
						onPress: () => navigation.navigate("ProfileSetupComplete"),
					}}
				/>
			</View>
		</ProfileContainer>
	);
};

export default NarrowInterest;
