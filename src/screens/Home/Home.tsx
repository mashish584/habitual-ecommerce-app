import React from "react";
import { ScrollView, Text, View } from "react-native";

import ProductCard, { PressAction } from "../../components/Cards/ProductCard";
import { CategorySlider } from "../../components/CategorySlider";
import Container from "../../components/Container";
import ProfileImage from "../../components/ProfileImage";
import SectionHeading from "../../components/SectionHeading";
import { HotDealListing, InterestsSkelton, ProductCardListingSkelton } from "../../components/Skeltons/ProductCardSkelton";

import { useHome } from "../../hooks/api";
import useProfileUpdate from "../../hooks/logic/useProfileUpdate";
import { RootStackScreens, StackNavigationProps } from "../../navigation/types";
import { Product } from "../../utils/schema.types";
import theme from "../../utils/theme";

import Shape from "./Shape";

interface HomeInfo {
	featuredProducts: Product[];
	hotDeals: Product[];
	userInterests: Record<string, Product[]>;
}

const Home: React.FC<StackNavigationProps<RootStackScreens, "BottomStack">> = ({ navigation }) => {
	const { data, isLoading } = useHome<"", HomeInfo>();
	const { markProductAsFavourite, favouriteProductIds } = useProfileUpdate();
	const { featuredProducts, hotDeals, userInterests } = data?.data || ({} as HomeInfo);

	const handleCardAction = async (type: PressAction, product: Product) => {
		try {
			if (type === "card") {
				navigation.navigate("Product", { product });
			} else {
				await markProductAsFavourite(product?.id);
			}
		} catch (error) {}
	};

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
									<ProfileImage />
								</View>
								<Text style={theme.textStyles.h3}>Find the stuff you love.</Text>
							</View>
							{/* Horizontal Products Listing */}
							<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: theme.spacing.medium }}>
								{isLoading && <ProductCardListingSkelton />}
								{featuredProducts?.map((product, index) => {
									product.image = product.images[0].url;
									return (
										<ProductCard
											variant="large"
											key={product.id}
											isFavouriteProduct={favouriteProductIds?.includes(product.id)}
											onPress={handleCardAction}
											item={product}
											containerStyle={index === 0 ? { marginLeft: 0 } : {}}
										/>
									);
								})}
							</ScrollView>
							{/* Hot Deals */}
							<SectionHeading title="Hot Deals" />
							<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: theme.spacing.medium }}>
								{isLoading && <HotDealListing />}
								{hotDeals?.map((product, index) => {
									product.image = product.images[0].url;
									return (
										<ProductCard
											key={product?.id}
											variant="small"
											isFavouriteProduct={favouriteProductIds?.includes(product?.id)}
											onPress={(action) => handleCardAction(action, product)}
											item={product}
											containerStyle={index === 0 ? { marginLeft: 0 } : {}}
										/>
									);
								})}
							</ScrollView>
							{/* Your Interests */}
							{isLoading && <InterestsSkelton />}
							{typeof userInterests === "object" && Object.keys(userInterests)?.length > 0 && (
								<>
									<SectionHeading title="Your Interests" />
									<CategorySlider margin={theme.spacing.medium} data={userInterests} />
								</>
							)}
							{/* Sections */}
							{/* <View
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
							</View> */}
						</ScrollView>
					</>
				);
			}}
		</Container>
	);
};

export default Home;
