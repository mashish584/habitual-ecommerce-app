import React from "react";
import { ScrollView, Text, TouchableOpacity, View, Image, Dimensions } from "react-native";

import ColorCard from "../../components/Cards/ColorCard";
import ProductCard from "../../components/Cards/ProductCard";
import { CategorySlider } from "../../components/CategorySlider";
import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";

import theme from "../../utils/theme";

import Shape from "./Shape";

const COLOR_CARD_WIDTH = (Dimensions.get("screen").width - (theme.spacing.medium * 2 + theme.spacing.xxSmall * 2)) / 2;

const Home = () => {
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
									<TouchableOpacity style={{ width: 32, height: 32, borderRadius: 50, overflow: "hidden" }}>
										<Image source={{ uri: "https://unsplash.it/50/50" }} style={{ width: "100%", height: "100%" }} />
									</TouchableOpacity>
								</View>
								<Text style={theme.textStyles.h3}>Find the stuff you love.</Text>
							</View>
							{/* Horizontal Products Listing */}
							<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: theme.spacing.medium }}>
								{Array(5)
									.fill(1)
									.map((_, index) => {
										return <ProductCard variant="large" key={index} containerStyle={index === 0 ? { marginLeft: 0 } : {}} />;
									})}
							</ScrollView>
							{/* Your Interests */}
							<SectionHeading title="Hot Deals" actionText="See All" onPress={() => {}} />
							<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: theme.spacing.medium }}>
								{Array(5)
									.fill(1)
									.map((_, index) => {
										return <ProductCard variant="small" key={index} containerStyle={index === 0 ? { marginLeft: 0 } : {}} />;
									})}
							</ScrollView>
							{/* Hot Deals */}
							<SectionHeading title="Your Interests" actionText="See All" onPress={() => {}} />
							<CategorySlider margin={theme.spacing.medium} />
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
