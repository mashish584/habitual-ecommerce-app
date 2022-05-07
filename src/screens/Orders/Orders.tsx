import React from "react";
import { Image } from "react-native";

import Container from "../../components/Container";
import Header from "../../components/Header/Header";
import TextInput from "../../components/TextInput/TextInput";
import Curve from "../../components/Container/Curve";
import OrderCard from "../../components/Cards/OrderCard";
import PaginatedFlatlist from "../../components/PaginatedFlatlist/PaginatedFlatlist";
import EmptyInfoCard, { EMPTY_ORDER_CARD_HEIGHT } from "../../components/Cards/EmptyInfoCard";

import theme from "../../utils/theme";

import { RootStackScreens, StackNavigationProps } from "../../navigation/types";

import { CartItem } from "../../utils/store";

const Orders: React.FC<StackNavigationProps<RootStackScreens, "BottomStack">> = () => {
	const isEmptyCard = false;

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
						<Curve isCurve={isEmptyCard} style={{ marginTop: isEmptyCard ? 180 : theme.spacing.small }}>
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

								<>
									<TextInput
										type="search"
										placeholder="Search for your order"
										containerStyle={{ marginHorizontal: theme.spacing.medium }}
										style={{ backgroundColor: theme.colors.shades.gray_20, borderWidth: 0 }}
									/>
									<PaginatedFlatlist
										url="user/orders/?take=5"
										contentContainerStyle={{ paddingBottom: bottom * 2 }}
										showsVerticalScrollIndicator={false}
										renderItem={({ item, index }) => {
											console.log({ item });
											const orderItems = item.details as Record<string, CartItem>[];
											const [id, order] = Object.entries(orderItems[0])[0];
											return <OrderCard key={id} item={order.product} />;
										}}
									/>
								</>
							</>
						</Curve>
					</>
				);
			}}
		</Container>
	);
};

export default Orders;
