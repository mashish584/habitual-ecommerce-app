import React from "react";
import { Dimensions, Image, ScrollView, Text } from "react-native";

import ProductCard from "../../components/Cards/ProductCard";
import Container from "../../components/Container";
import Header from "../../components/Header/Header";
import TextInput from "../../components/TextInput/TextInput";
import EmptyInfoCard, { EMPTY_ORDER_CARD_HEIGHT } from "../../components/Cards/EmptyInfoCard";

import { generateBoxShadowStyle } from "../../utils";
import theme, { rgba } from "../../utils/theme";
import Curve from "../../components/Container/Curve";

const Orders = () => {
	const isEmptyCard = true;

	return (
		<Container viewContainerStyle={{ backgroundColor: theme.colors.primary.yellow }} avoidHomBar={true}>
			{(top, bottom) => {
				return (
					<>
						<Header
							variant="secondary"
							title="Orders"
							headerStyle={{ marginTop: top / 2 }}
							titleStyle={theme.textStyles.h3}
							rightIcon={<Image source={{ uri: "https://unsplash.it/100/100" }} style={{ width: 32, height: 32, borderRadius: 50 }} />}
						/>
						<Curve isCurve={isEmptyCard} style={isEmptyCard && { marginTop: 180 }}>
							<>
								{isEmptyCard && (
									<>
										<EmptyInfoCard
											style={{ marginTop: -EMPTY_ORDER_CARD_HEIGHT / 2 }}
											title="Uh oh! You have no orders."
											description="You have no orders at the moment. Go take a look at what we have an we’ll get your delivery to you asap!"
											buttonText="View recommended products"
											onAction={() => {}}
										/>
									</>
								)}

								{!isEmptyCard && (
									<>
										<TextInput
											type="search"
											placeholder="Search for your order"
											containerStyle={{ marginHorizontal: theme.spacing.medium }}
											style={{ backgroundColor: theme.colors.shades.gray_20, borderWidth: 0 }}
										/>
										<ScrollView contentContainerStyle={{ paddingBottom: bottom * 2 }} showsVerticalScrollIndicator={false}>
											{new Array(5).fill(1).map((_, index) => {
												return (
													<ProductCard
														variant="wide"
														containerStyle={{
															width: Dimensions.get("screen").width - theme.spacing.medium * 2,
															marginHorizontal: theme.spacing.medium,
															padding: theme.spacing.small,
															backgroundColor: theme.colors.shades.white,
															height: 120,
															borderRadius: 10,
															marginVertical: theme.spacing.xxSmall,
															...generateBoxShadowStyle(0, 10, rgba.black(0.04), 1, 10, 10, rgba.black(1)),
														}}
														contentStyle={{ justifyContent: "flex-start" }}
														extraContent={<Text>Delivered Yesterday</Text>}
													/>
												);
											})}
										</ScrollView>
									</>
								)}
							</>
						</Curve>
					</>
				);
			}}
		</Container>
	);
};

export default Orders;
