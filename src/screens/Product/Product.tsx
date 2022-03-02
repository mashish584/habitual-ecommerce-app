import React, { useRef, useState } from "react";
import { Dimensions, Image, TextStyle, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, { Easing, interpolate, timing } from "react-native-reanimated";
import { interpolateColor, useScrollHandler, useValue } from "react-native-redash";

import Container from "../../components/Container";
import { Review } from "../../components/Product";

import theme from "../../utils/theme";
import Dot from "../Onboarding/Dot";

import ProductPriceInfo from "./ProductPriceInfo";

const SLIDER_WIDTH = Dimensions.get("screen").width;

const slides = [{ color: theme.colors.shades.gray_20 }, { color: theme.colors.shades.gray }];
const textColors = [{ color: theme.colors.shades.gray_80 }, { color: theme.colors.shades.white }];
const productColorVariants = [
	{ label: "Black", color: theme.colors.shades.gray, selected: false },
	{ label: "White", color: theme.colors.shades.white, selected: false },
	{ label: "Blue", color: theme.colors.secondary.blue, selected: false },
];

const Product = () => {
	const sliderRef = useRef<Animated.ScrollView>(null);

	const productInfoPosition = useValue(0);
	const productInfoSlideTiming = useValue(0);
	const productContentHeight = useValue(95);

	const [productColors, setProductColors] = useState([...productColorVariants]);
	const [isSlideOn, setIsSlideOn] = useState(true);

	const { scrollHandler, x } = useScrollHandler();

	// → Slide Transitions
	const slideBackgroundColor = interpolateColor(x, {
		inputRange: slides.map((_, i) => i * SLIDER_WIDTH),
		outputRange: slides.map((_) => _.color),
	});

	const slideTextColor = interpolateColor(x, {
		inputRange: textColors.map((_, i) => i * SLIDER_WIDTH),
		outputRange: textColors.map((_) => _.color),
	});

	// → Price Info Transitions
	const productInfoBorderRadius = interpolate(productInfoSlideTiming, {
		inputRange: [0, 1],
		outputRange: [15, 0],
	});

	const productContentLayerOpacity = interpolate(productContentHeight, {
		inputRange: [95, 220],
		outputRange: [0, 1],
	});

	const transitionProductInfo = (isSlide: boolean) => {
		const config: Animated.TimingConfig = {
			duration: 500,
			toValue: null,
			easing: Easing.linear,
		};

		//timer for interpolating styles
		const timingTransition = timing(productInfoSlideTiming, { ...config, duration: 100, toValue: isSlide ? 1 : 0 });

		//top -> bottom
		const priceInfoTransition1 = timing(productInfoPosition, { ...config, duration: 100, toValue: 200 });

		//bottom -> top
		const priceInfoTransition2 = timing(productInfoPosition, { ...config, duration: 100, toValue: 0 });

		// section height transition from min to max
		const productContentTransition = timing(productContentHeight, {
			...config,
			duration: 200,
			easing: Easing.elastic(1),
			toValue: isSlide ? 220 : 95,
		});

		setIsSlideOn(!isSlide);

		productContentTransition.start();
		priceInfoTransition1.start(() => {
			timingTransition.start();
			priceInfoTransition2.start();
		});
	};

	return (
		<Container avoidTopNotch={true} avoidHomBar={true}>
			{() => {
				return (
					<>
						{/* Slider  */}
						<Animated.View style={{ flex: 0.85, backgroundColor: slideBackgroundColor } as any}>
							<Animated.ScrollView
								horizontal
								ref={sliderRef}
								scrollEnabled={isSlideOn}
								bounces={false}
								showsHorizontalScrollIndicator={false}
								decelerationRate="fast"
								snapToInterval={SLIDER_WIDTH}
								{...scrollHandler}>
								<View style={{ width: SLIDER_WIDTH, justifyContent: "center", alignItems: "center" }}>
									<Image source={require("../../assets/images/example/product-sample.png")} />
								</View>
								<View style={{ width: SLIDER_WIDTH, justifyContent: "center", alignItems: "center" }}>
									<Image source={require("../../assets/images/example/product-sample.png")} />
								</View>
							</Animated.ScrollView>
							{/* Product Content */}

							{/* Slide Indicator */}
							<View style={[theme.rowStyle, { justifyContent: "center", width: "100%", transform: [{ translateY: -130 }] }]}>
								{slides.map((_, index) => {
									return <Dot key={index} currentIndex={index} width={SLIDER_WIDTH} scrollX={x} mh={index === 1 ? 6 : 0} />;
								})}
							</View>
							<Animated.View
								style={{
									paddingHorizontal: theme.spacing.medium,
									paddingVertical: theme.spacing.small,
									position: "absolute",
									width: "100%",
									bottom: 0,
									height: productContentHeight,
									justifyContent: "flex-start",
								}}>
								{/* Product Info */}
								<Animated.View
									style={{
										...StyleSheet.absoluteFillObject,
										backgroundColor: theme.colors.shades.white,
										borderTopLeftRadius: 15,
										borderTopRightRadius: 15,
										opacity: productContentLayerOpacity,
									}}
								/>
								<View style={{}}>
									<Animated.Text
										style={
											[
												theme.textStyles.h4,
												{ color: !isSlideOn ? textColors[0].color : slideTextColor, marginBottom: theme.spacing.xxSmall },
											] as TextStyle[]
										}>
										Xbox One Elite Series 2 Controller
									</Animated.Text>
									<Review stars={2} color={slideTextColor} />
									{!isSlideOn && (
										<View style={{ marginTop: theme.spacing.medium }}>
											<Text style={[theme.textStyles.label, { color: theme.colors.shades.gray_60 }]}>Color</Text>
											<Text style={[theme.textStyles.body_reg, { fontFamily: theme.fonts.lato.bold, marginTop: theme.spacing.xxSmall }]}>
												{productColors[0].label}
											</Text>
											<View style={[theme.rowStyle, { marginTop: theme.spacing.xxSmall }]}>
												{productColorVariants.map(({ label, color, selected }, index) => {
													return (
														<TouchableOpacity
															key={index}
															onPress={() => {
																const variants = [...productColorVariants];
																variants.map((variant) => {
																	variant.selected = variant.color === color;

																	return variant;
																});

																setProductColors(variants);
															}}
															style={{
																width: 32,
																height: 32,
																backgroundColor: theme.colors.shades.white,
																borderRadius: 50,
																overflow: "hidden",
																justifyContent: "center",
																alignItems: "center",
																marginRight: theme.spacing.small,
																borderWidth: selected ? 2 : 0,
																borderColor: theme.colors.primary.yellow,
															}}>
															<View
																style={{
																	width: 28,
																	height: 28,
																	backgroundColor: color,
																	borderRadius: 50,
																	borderWidth: selected ? 0 : 1,
																	borderColor: theme.colors.shades.gray_40,
																}}
															/>
														</TouchableOpacity>
													);
												})}
											</View>
										</View>
									)}
								</View>
							</Animated.View>
						</Animated.View>
						{/* Product Price Container  */}

						<ProductPriceInfo
							priceInfo={{
								price: "59.99",
								originalPrice: "79.99",
								discount: "20% OFF",
								image: require("../../assets/images/tabs/bag.png"),
							}}
							slideAnimate={productInfoSlideTiming}
							translateY={productInfoPosition}
							borderRadius={productInfoBorderRadius}
							onPress={() => transitionProductInfo(isSlideOn)}
						/>
					</>
				);
			}}
		</Container>
	);
};

export default Product;
