import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import theme from "../../utils/theme";
import { CategoryContainerStyle } from "../CategorySlider/CategorySlider";

interface ProductCardSkelton {
	width: number;
	height: number;
	children?: JSX.Element;
}

const ProductCardSkelton = (props: ProductCardSkelton) => {
	return (
		<SkeletonPlaceholder>
			<SkeletonPlaceholder.Item width={props.width} minHeight={props.height} borderRadius={10} marginHorizontal={theme.spacing.xxSmall}>
				{props.children}
			</SkeletonPlaceholder.Item>
		</SkeletonPlaceholder>
	);
};

const ProductCardListingSkelton = () => {
	return (
		<>
			{new Array(5).fill(1).map((_, index) => (
				<ProductCardSkelton key={index} width={284} height={312} />
			))}
		</>
	);
};

const HotDealListing = () => {
	return (
		<>
			{new Array(5).fill(1).map((_, index) => (
				<ProductCardSkelton key={index} width={156} height={253} />
			))}
		</>
	);
};

const InterestsSkelton = () => {
	return (
		<View style={CategoryContainerStyle}>
			<SkeletonPlaceholder>
				<SkeletonPlaceholder.Item flexDirection="row" marginLeft={theme.spacing.normal}>
					<SkeletonPlaceholder.Item width={100} height={20} borderRadius={10} marginTop={theme.spacing.xSmall} />
					<SkeletonPlaceholder.Item width={100} height={20} borderRadius={10} marginTop={theme.spacing.xSmall} marginLeft={theme.spacing.normal} />
				</SkeletonPlaceholder.Item>
				<>
					{new Array(2).fill(1).map((_, index) => (
						<SkeletonPlaceholder.Item key={index} marginTop={theme.spacing.medium} flexDirection={"row"} marginHorizontal={theme.spacing.normal}>
							<SkeletonPlaceholder.Item width={100} height={88} borderRadius={10} />
							<SkeletonPlaceholder.Item marginLeft={20} justifyContent="center">
								<SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
								<SkeletonPlaceholder.Item marginTop={6} width={80} height={20} borderRadius={4} />
							</SkeletonPlaceholder.Item>
						</SkeletonPlaceholder.Item>
					))}
				</>
			</SkeletonPlaceholder>
		</View>
	);
};

export { ProductCardListingSkelton, HotDealListing, InterestsSkelton };
