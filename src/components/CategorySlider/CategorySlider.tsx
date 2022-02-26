import React, { useRef, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View, FlatList } from "react-native";

import ProductCard from "../Cards/ProductCard";

import { generateBoxShadowStyle } from "../../utils";
import theme, { rgba } from "../../utils/theme";
import { ScrollToIndexParams } from "../../utils/types";

interface CategorySlider {
	margin: number;
}

const WIDTH = Dimensions.get("screen").width;

const CategorySlider = ({ margin }: CategorySlider) => {
	const data = new Array(10).fill(1);
	const categoryListRef = useRef<FlatList>(null);
	const categoryContentRef = useRef<FlatList>(null);
	const [index, setIndex] = useState(0);

	const scrollTo = (ref: React.RefObject<FlatList<any>>, index: number, viewPosition?: number) => {
		const config: ScrollToIndexParams = { index, animated: true };

		if (viewPosition) config.viewPosition = viewPosition;

		ref.current?.scrollToIndex(config);
	};

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
					data={data}
					renderItem={({ index: fIndex }) => {
						const selected = fIndex === index;
						return (
							<TouchableOpacity
								onPress={() => {
									scrollTo(categoryListRef, fIndex, 0.5);
									scrollTo(categoryContentRef, fIndex);
									setIndex(fIndex);
								}}
								style={{ paddingHorizontal: 20 }}>
								<Text
									style={
										selected ? theme.textStyles.h5 : { ...theme.textStyles.body_reg, color: theme.colors.shades.gray_40 }
									}>{`Category ${fIndex}`}</Text>

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
				contentContainerStyle={{ marginTop: theme.spacing.medium, justifyContent: "center", alignItems: "center" }}
				data={data}
				onMomentumScrollEnd={(e) => {
					const step = e.nativeEvent.contentOffset.x / (WIDTH - margin * 2);
					scrollTo(categoryListRef, step, 0.5);
					setIndex(step);
				}}
				renderItem={({ index }) => {
					return (
						<View style={{ width: WIDTH - margin * 2, paddingHorizontal: theme.spacing.small }}>
							<ProductCard variant="wide" containerStyle={{ marginBottom: 10, marginHorizontal: 0 }} />
							<ProductCard variant="wide" containerStyle={{ marginBottom: 10, marginHorizontal: 0 }} />
							<ProductCard variant="wide" containerStyle={{ marginHorizontal: 0 }} />
						</View>
					);
				}}
			/>
		</View>
	);
};

export default CategorySlider;
