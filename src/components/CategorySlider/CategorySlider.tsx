import React, { useRef, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ProductCard from "../Cards/ProductCard";

import { generateBoxShadowStyle } from "../../utils";
import theme, { rgba } from "../../utils/theme";
import { ScrollToIndexParams } from "../../utils/types";
import { Product } from "../../utils/schema.types";

import { ScreenNavigationProp } from "../../navigation/types";

interface CategorySlider {
	data: Record<string, Product[]>;
	margin: number;
}

const WIDTH = Dimensions.get("screen").width;

const CategorySlider = ({ margin, data }: CategorySlider) => {
	const navigation = useNavigation<ScreenNavigationProp>();

	const categoryListRef = useRef<FlatList>(null);
	const categoryContentRef = useRef<FlatList>(null);
	const [index, setIndex] = useState(0);

	const scrollTo = (ref: React.RefObject<FlatList<any>>, index: number, viewPosition?: number) => {
		const config: ScrollToIndexParams = { index, animated: true };

		if (viewPosition) config.viewPosition = viewPosition;

		ref.current?.scrollToIndex(config);
	};

	const productsData = Object.keys(data)?.map((category) => {
		return data[category];
	});

	return (
		<View
			style={{
				maxWidth: "100%",
				minHeight: 386,
				backgroundColor: theme.colors.shades.white,
				margin,
				borderRadius: 10,
				paddingVertical: theme.spacing.small,
				...generateBoxShadowStyle(0, 1, rgba.black(0.1), 1, 7, 10, rgba.black(1)),
			}}>
			<View style={{ height: 25, marginTop: theme.spacing.xSmall }}>
				<FlatList
					ref={categoryListRef}
					horizontal
					showsHorizontalScrollIndicator={false}
					bounces={false}
					snapToInterval={WIDTH - margin * 2}
					decelerationRate="fast"
					contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
					data={Object.keys(data)}
					renderItem={({ item, index: fIndex }) => {
						const selected = fIndex === index;
						return (
							<TouchableOpacity
								onPress={() => {
									scrollTo(categoryListRef, fIndex, 0.5);
									scrollTo(categoryContentRef, fIndex);
									setIndex(fIndex);
								}}
								style={{ paddingHorizontal: 20 }}>
								<Text style={selected ? theme.textStyles.h5 : { ...theme.textStyles.body_reg, color: theme.colors.shades.gray_40 }}>{item}</Text>

								<View
									style={{
										width: "100%",
										height: 2,
										borderRadius: 1,
										backgroundColor: selected ? theme.colors.shades.gray_80 : "transparent",
										marginTop: 2,
									}}
								/>
							</TouchableOpacity>
						);
					}}
				/>
			</View>
			<FlatList
				ref={categoryContentRef}
				horizontal
				showsHorizontalScrollIndicator={false}
				bounces={false}
				snapToInterval={WIDTH - margin * 2}
				decelerationRate="fast"
				contentContainerStyle={{ marginTop: theme.spacing.medium, justifyContent: "center" }}
				data={productsData}
				onMomentumScrollEnd={(e) => {
					const step = e.nativeEvent.contentOffset.x / (WIDTH - margin * 2);
					scrollTo(categoryListRef, step, 0.5);
					setIndex(step);
				}}
				renderItem={({ item }) => {
					return (
						<View style={{ width: WIDTH - margin * 2, paddingHorizontal: theme.spacing.small }}>
							{item.map((product: Product, index) => {
								product.image = product.images[0].url;
								return (
									<ProductCard
										key={product?.id}
										variant="wide"
										item={product}
										onPress={() => navigation.navigate("Product", { product })}
										containerStyle={{ marginBottom: index === productsData.length - 1 ? 0 : 10, marginHorizontal: 0 }}
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
