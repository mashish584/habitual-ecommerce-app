import React, { useCallback, useRef, useState } from "react";
import { Dimensions, View, FlatList, ViewStyle, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { generateBoxShadowStyle } from "@utils/index";
import theme, { rgba } from "@utils/theme";
import { ScrollToIndexParams } from "@utils/types";
import { Product } from "@utils/schema.types";

import { ScreenNavigationProp } from "@nav/types";

import ProductCard from "../Cards/ProductCard";
import CategoryMenu, { CategoryMenuAPI } from "./CategoryMenu";

interface CategorySlider {
	data: Record<string, Product[]>;
	margin: number;
}

export const CategoryContainerStyle: ViewStyle = {
	maxWidth: "100%",
	minHeight: 386,
	backgroundColor: theme.colors.shades.white,
	borderRadius: 10,
	paddingVertical: theme.spacing.small,
	margin: theme.spacing.medium,
	...generateBoxShadowStyle(0, 1, rgba.black(0.1), 1, 7, 10, rgba.black(1)),
};

const WIDTH = Dimensions.get("screen").width;

const CategorySlider = ({ margin, data }: CategorySlider) => {
	const navigation = useNavigation<ScreenNavigationProp>();

	const categoryMenuApi = useRef<CategoryMenuAPI | null>(null);
	const categoryContentRef = useRef<FlatList>(null);

	const [index, setIndex] = useState(0);

	const scrollTo = (ref: React.RefObject<FlatList<any>>, index: number, viewPosition?: number) => {
		const config: ScrollToIndexParams = { index, animated: true };

		if (viewPosition) config.viewPosition = viewPosition;

		ref.current?.scrollToIndex(config);
	};

	const onScrollChange = (index: number) => {
		scrollTo(categoryContentRef, index);
		setIndex(index);
	};

	const onMomentumScrollEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const step = Math.round(e.nativeEvent.contentOffset.x / (WIDTH - margin * 2));
		categoryMenuApi.current?.updateMenuPosition(step);
		setIndex(step);
	}, []);

	const categories = Object.keys(data);
	const productsData = categories?.map((category) => {
		return data[category];
	});

	return (
		<View style={[CategoryContainerStyle, { margin }]}>
			<View style={{ marginTop: theme.spacing.xSmall }}>
				<CategoryMenu
					ref={categoryMenuApi}
					containerWidth={WIDTH - margin * 2}
					items={categories}
					activeIndex={index}
					onScrollChange={onScrollChange}
				/>
			</View>
			<FlatList
				ref={categoryContentRef}
				horizontal
				showsHorizontalScrollIndicator={false}
				bounces={false}
				pagingEnabled={true}
				contentContainerStyle={{ marginTop: theme.spacing.medium, justifyContent: "center" }}
				data={productsData}
				onMomentumScrollEnd={onMomentumScrollEnd}
				renderItem={({ item }) => {
					return (
						<View style={{ width: WIDTH - margin * 2, paddingHorizontal: theme.spacing.small }}>
							{item.map((product: Product, index: number) => {
								product.image = product.images[0].url;
								return (
									<ProductCard
										key={product?.id}
										variant="wide"
										item={product}
										onPress={() => navigation.navigate("Product", { product })}
										containerStyle={{ marginBottom: 10, marginHorizontal: 0 }}
									/>
								);
							})}
						</View>
					);
				}}
			/>
		</View>
	);
};

export default CategorySlider;
