import React from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import ProductCard from "../../components/Cards/ProductCard";

import Container from "../../components/Container";
import theme from "../../utils/theme";

import Shape from "./Shape";

const Home = () => {
	return (
		<Container avoidTopNotch={true} avoidHomBar={true}>
			{(top) => {
				return (
					<>
						<Shape />
						<ScrollView style={{ flexGrow: 1, paddingTop: top + 30 }} showsVerticalScrollIndicator={false}>
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
							<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: theme.spacing.medium }}>
								{Array(5)
									.fill(1)
									.map((_, index) => {
										return <ProductCard key={index} containerStyle={index === 0 ? { marginLeft: 0 } : {}} />;
									})}
							</ScrollView>
						</ScrollView>
					</>
				);
			}}
		</Container>
	);
};

export default Home;