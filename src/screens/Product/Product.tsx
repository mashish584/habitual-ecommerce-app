import React, { useRef, useState } from "react";
import { Dimensions, Image, TextStyle, View, Text } from "react-native";
import Animated, { Easing, interpolate, timing } from "react-native-reanimated";
import { interpolateColor, useScrollHandler, useValue } from "react-native-redash";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import crashlytics from "@react-native-firebase/crashlytics";

import Container from "../../components/Container";
import { Review } from "../../components/Product";

import theme from "../../utils/theme";
import Dot from "../Onboarding/Dot";

import ProductPriceInfo from "./ProductPriceInfo";
import styles from "./styles";
import ColorCircle from "./ColorCircle";
import Cart from "./Cart";

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
	const slideImagePosition = useValue(0);

	const [productColors, setProductColors] = useState([...productColorVariants]);
	const [showCartActions, setShowCartActions] = useState(false);
	const [isSlideOn, setIsSlideOn] = useState(true);
	const [showCart, setShowCart] = useState(false);

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
		setShowCart(true);
		return;

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

		// slide image up if isSlide false vice versa
		const imageTransition = timing(slideImagePosition, { ...config, duration: 100, toValue: isSlide ? -50 : 0 });

		// section height transition from min to max
		const productContentTransition = timing(productContentHeight, {
			...config,
			duration: 200,
			easing: Easing.elastic(1),
			toValue: isSlide ? 220 : 95,
		});

		setIsSlideOn(!isSlide);

		productContentTransition.start();
		imageTransition.start();
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
									<Animated.Image
										source={require("../../assets/images/example/product-sample.png")}
										style={{ transform: [{ translateY: slideImagePosition }] }}
									/>
								</View>
								<View style={{ width: SLIDER_WIDTH, justifyContent: "center", alignItems: "center" }}>
									<Animated.Image
										source={require("../../assets/images/example/product-sample.png")}
										style={{ transform: [{ translateY: slideImagePosition }] }}
									/>
								</View>
							</Animated.ScrollView>
							{/* Product Content */}

							{/* Slide Indicator */}
							<View style={[theme.rowStyle, styles.slideIndicators]}>
								{slides.map((_, index) => {
									return <Dot key={index} currentIndex={index} width={SLIDER_WIDTH} scrollX={x} mh={index === 1 ? 6 : 0} />;
								})}
							</View>
							<Animated.View
								style={{
									...styles.productContent,
									height: productContentHeight,
								}}>
								{/* Product Info */}
								<Animated.View
									style={{
										...styles.contentLayer,
										opacity: productContentLayerOpacity,
									}}
								/>
								<View>
									<Animated.Text
										onPress={() => {
											alert("as");
											crashlytics().crash();
										}}
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
												{productColorVariants.map(({ color, selected }, index) => {
													return (
														<ColorCircle
															key={index}
															onPress={() => {
																const variants = [...productColorVariants];
																variants.map((variant) => {
																	variant.selected = variant.color === color;
																	return variant;
																});

																setProductColors(variants);
															}}
															{...{ color, selected }}
														/>
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
								buttonChild: !isSlideOn ? (
									<FontAwesomeIcon icon={faArrowRight} />
								) : (
									<Image source={require("../../assets/images/tabs/bag.png")} style={{ tintColor: theme.colors.shades.white }} />
								),
							}}
							slideAnimate={productInfoSlideTiming}
							translateY={productInfoPosition}
							borderRadius={productInfoBorderRadius}
							showCartAction={showCartActions}
							onPress={(removeCart) => {
								//→ show cart action f slide is on
								if (!isSlideOn) {
									setShowCartActions(true);
								}

								//→ remove cart action when user tap on remove from cart actions
								//→ & when show cart actions is true
								if (removeCart || showCartActions) setShowCartActions(false);

								transitionProductInfo(isSlideOn);
							}}
						/>
						{/* Cart */}
						<Cart visible={showCart} maxHeight={0.5} headerTitle="My Cart" items={[]} onClose={() => setShowCart(false)} />
					</>
				);
			}}
		</Container>
	);
};

export default Product;
