import React from "react";

import EmptyInfoCard, { EMPTY_ORDER_CARD_HEIGHT } from "../../components/Cards/EmptyInfoCard";
import ProductCard, { PressAction } from "../../components/Cards/ProductCard";
import Container from "../../components/Container";
import Curve from "../../components/Container/Curve";
import Header from "../../components/Header/Header";
import { PaginatedFlatlist } from "../../components/PaginatedFlatlist";
import ProfileImage from "../../components/ProfileImage";
import { ProductCardSkelton } from "../../components/Skeltons/ProductCardSkelton";
import useProfileUpdate from "../../hooks/logic/useProfileUpdate";

import { BottomStackScreens, RootStackScreens, StackNavigationProps } from "../../navigation/types";
import { Product } from "../../utils/schema.types";
import theme from "../../utils/theme";

const Wishlist: React.FC<StackNavigationProps<BottomStackScreens & RootStackScreens, "Wishlist">> = ({ navigation }) => {
	const { markProductAsFavourite, favouriteProductIds } = useProfileUpdate();

	const isEmptyList = !favouriteProductIds || favouriteProductIds?.length === 0;

	const handleCardAction = async (type: PressAction, product: Product) => {
		try {
			if (type === "card") {
				navigation.navigate("Product", { product });
			} else {
				await markProductAsFavourite(product?.id);
			}
		} catch (error) {
			console.log({ error });
		}
	};

	return (
		<Container viewContainerStyle={{ backgroundColor: theme.colors.primary.yellow }} avoidHomBar={true}>
			{(top, bottom) => {
				return (
					<>
						<Header
							variant="secondary"
							title="Wishlist"
							headerStyle={{ marginTop: top / 2 }}
							titleStyle={theme.textStyles.h3}
							rightIcon={<ProfileImage />}
						/>
						<Curve isCurve={isEmptyList} style={{ marginTop: isEmptyList ? 180 : theme.spacing.small }}>
							{isEmptyList ? (
								<EmptyInfoCard
									style={{ marginTop: -EMPTY_ORDER_CARD_HEIGHT / 2 }}
									illustration={require("../../assets/images/person-in-box-illustration.png")}
									title="You have no saved products."
									description="You have no saved products. Start saving to add to wishlists or create one now."
									buttonText="+ Create a wishlist"
									onAction={() => navigation.navigate("Home")}
								/>
							) : (
								<PaginatedFlatlist
									url="user/favourites/"
									contentContainerStyle={{ paddingBottom: bottom * 2, alignItems: "center" }}
									showsVerticalScrollIndicator={false}
									keyExtractor={(item) => item.id}
									renderItem={({ item }) => {
										const product = item as Product;
										product.image = product.images[0].url;
										if (!favouriteProductIds.includes(product?.id)) {
											return null;
										}
										return (
											<ProductCard
												variant="large"
												key={item.id}
												isFavouriteProduct={favouriteProductIds?.includes(item.id)}
												onPress={(action) => handleCardAction(action, product)}
												item={item}
												containerStyle={{ marginBottom: theme.spacing.medium, marginLeft: 0 }}
											/>
										);
									}}
									skelton={() => <ProductCardSkelton width={284} height={312} mb={theme.spacing.medium} />}
									skeltonContainerStyle={{ alignItems: "center" }}
								/>
							)}
						</Curve>
					</>
				);
			}}
		</Container>
	);
};

export default Wishlist;
