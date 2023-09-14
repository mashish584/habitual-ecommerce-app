import React from "react";
import { View } from "react-native";

import Container from "@components/Container";
import Header from "@components/Header/Header";
import Curve from "@components/Container/Curve";
import OrderCard, { ORDER_CARD_WIDTH } from "@components/Cards/OrderCard";
import { PaginatedFlatlist } from "@components/PaginatedFlatlist";
import EmptyInfoCard, { EMPTY_ORDER_CARD_HEIGHT } from "@components/Cards/EmptyInfoCard";
import ProfileImage from "@components/ProfileImage";
import { ProductCardSkelton } from "@components/Skeltons/ProductCardSkelton";

import theme from "@utils/theme";
import { MergedRoutes, StackNavigationProps } from "@nav/types";
import { CartItem } from "@utils/store";
import images from "@assets/images";

const Orders: React.FC<StackNavigationProps<MergedRoutes, "Orders">> = ({ navigation }) => {
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
							rightIcon={<ProfileImage />}
						/>
						<Curve isCurve={false} style={{ marginTop: isEmptyCard ? 180 : theme.spacing.small }}>
							{/* <TextInput
										type="search"
										placeholder="Search for your order"
										containerStyle={{ marginHorizontal: theme.spacing.medium }}
										style={{ backgroundColor: theme.colors.shades.gray_20, borderWidth: 0 }}
									/> */}
							<PaginatedFlatlist
								queryName="Order listing"
								url="user/orders/"
								query="?take=5"
								contentContainerStyle={{ paddingBottom: bottom * 2 }}
								isRefresh={true}
								showsVerticalScrollIndicator={false}
								keyExtractor={(item) => item.id}
								ListEmptyComponent={() => (
									<View style={{ flex: 1, paddingVertical: theme.spacing.xSmall, marginTop: EMPTY_ORDER_CARD_HEIGHT * 0.2 }}>
										<EmptyInfoCard
											illustration={images.emptyList}
											title="Uh oh! You have no orders."
											description="You have no orders at the moment. Go take a look at what we have an we’ll get your delivery to you asap!"
											buttonText="View recommended products"
											onAction={() => navigation.navigate("Home")}
										/>
									</View>
								)}
								renderItem={({ item, index }) => {
									const orderItems = item.details[0] as Record<string, CartItem>;
									return <OrderCard amount={item.amount} status={item.orderStatus} date={item.createdAt} orders={orderItems} />;
								}}
								skelton={() => <ProductCardSkelton width={ORDER_CARD_WIDTH} height={120} mh={theme.spacing.medium} mb={theme.spacing.xxSmall} />}
							/>
						</Curve>
					</>
				);
			}}
		</Container>
	);
};

export default Orders;
