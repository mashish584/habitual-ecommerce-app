import React from "react";
import { ScrollView, Text, TouchableOpacity, View, Image, Dimensions } from "react-native";

import ColorCard from "../../components/Cards/ColorCard";
import ProductCard from "../../components/Cards/ProductCard";
import { CategorySlider } from "../../components/CategorySlider";
import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";

import { useHome } from "../../hooks/api";
import { RootStackScreens, StackNavigationProps } from "../../navigation/types";
import { Product } from "../../utils/schema.types";
import { useUser } from "../../utils/store";
import theme from "../../utils/theme";

import Shape from "./Shape";

const COLOR_CARD_WIDTH = (Dimensions.get("screen").width - (theme.spacing.medium * 2 + theme.spacing.xxSmall * 2)) / 2;

interface HomeInfo {
	featuredProducts: Product[];
	hotDeals: Product[];
	userInterests: Record<string, Product[]>;
}

const Home: React.FC<StackNavigationProps<RootStackScreens, "BottomStack">> = ({ navigation }) => {
	const { data } = useHome<"", HomeInfo>();

	const profile = useUser((store) => store.user.profile);
	const { featuredProducts, hotDeals, userInterests } = data?.data || ({} as HomeInfo);

	return (
		<Container avoidTopNotch={true} avoidHomBar={true}>
			{(top) => {
				return (
					<>
						<Shape />
						<ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: top + 30 }} showsVerticalScrollIndicator={false}>
							{/* Header */}
							<View style={{ paddingHorizontal: theme.spacing.medium }}>
								<View style={[theme.rowStyle, { alignItems: "center", justifyContent: "space-between" }]}>
									<Text style={theme.textStyles.pill_sm}>Suggested For You</Text>
									<TouchableOpacity
										style={{ width: 32, height: 32, borderRadius: 50, overflow: "hidden", backgroundColor: theme.colors.shades.white }}
										onPress={() => navigation.push("Profile")}>
										<Image
											source={{ uri: profile || "https://avatars.dicebear.com/api/identicon/your-custom-seed.png" }}
											style={{ width: "100%", height: "100%" }}
										/>
									</TouchableOpacity>
								</View>
								<Text style={theme.textStyles.h3}>Find the stuff you love.</Text>
							</View>
							{/* Horizontal Products Listing */}
							<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: theme.spacing.medium }}>
								{featuredProducts?.map((product, index) => {
									product.image = product.images[0].url;
									return (
										<ProductCard
											variant="large"
											key={product.id}
											onPress={() => {
												navigation.navigate("Product", { product });
											}}
											item={product}
											containerStyle={index === 0 ? { marginLeft: 0 } : {}}
										/>
									);
								})}
							</ScrollView>
							{/* Hot Deals */}
							<SectionHeading title="Hot Deals" actionText="See All" onPress={() => {}} />
							<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: theme.spacing.medium }}>
								{hotDeals?.map((product, index) => {
									product.image = product.images[0].url;
									return (
										<ProductCard
											key={product?.id}
											variant="small"
											onPress={() => navigation.navigate("Product", { product })}
											item={product}
											containerStyle={index === 0 ? { marginLeft: 0 } : {}}
										/>
									);
								})}
							</ScrollView>
							{/* Your Interests */}
							{typeof userInterests === "object" && Object.keys(userInterests)?.length > 0 && (
								<>
									<SectionHeading title="Your Interests" actionText="See All" onPress={() => {}} />
									<CategorySlider margin={theme.spacing.medium} data={userInterests} />
								</>
							)}
							{/* Sections */}
							<View
								style={{
									flexDirection: "row",
									paddingHorizontal: theme.spacing.medium,
									justifyContent: "space-between",
									marginBottom: 50,
									flexWrap: "wrap",
								}}>
								<ColorCard
									variant="fixed"
									text="Shopping habits and interests"
									width={COLOR_CARD_WIDTH}
									cardColor={theme.colors.accents.red}
									cardStyle={{ marginBottom: theme.spacing.small }}
								/>
								<ColorCard
									variant="fixed"
									text="Today's trending items"
									width={COLOR_CARD_WIDTH}
									cardColor={theme.colors.accents.teal}
									cardStyle={{ marginBottom: theme.spacing.small }}
								/>
								<ColorCard
									variant="fixed"
									text="Incoming! Flash deals"
									width={COLOR_CARD_WIDTH}
									cardColor={theme.colors.accents.indigo}
									cardStyle={{ marginBottom: theme.spacing.small }}
								/>
								<ColorCard
									variant="fixed"
									text="Browse our categories"
									width={COLOR_CARD_WIDTH}
									cardColor={theme.colors.accents.orange}
									cardStyle={{ marginBottom: theme.spacing.small }}
								/>
							</View>
						</ScrollView>
					</>
				);
			}}
		</Container>
	);
};

export default Home;
