import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Image, View, Text, Pressable, StyleProp, ViewStyle } from "react-native";
import Animated, {
	Easing,
	WithTimingConfig,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	interpolateColor,
	runOnJS,
} from "react-native-reanimated";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import Container from "@components/Container";
import { Review } from "@components/Product";
import { Header } from "@components/Header";
import { SmallBag, Back } from "@components/Svg";

import { ProductFooterActions } from "@utils/types";
import { Product as ProductType, SlideColors } from "@utils/schema.types";
import theme from "@utils/theme";
import { useCart } from "@utils/store";
import { useProductInfo } from "@hooks/api";
import { RootStackScreens, StackNavigationProps } from "@nav/types";
import images from "@assets/images";

import { updateStatusBarColor } from "@components/StatusBarUI";
import Dot from "../Onboarding/Dot";
import ProductPriceInfo from "./ProductPriceInfo";
import styles from "./styles";
// import ColorCircle from "./ColorCircle";

const SLIDER_WIDTH = Dimensions.get("screen").width;

function getSlideColors(slideColors: SlideColors[], length: number) {
	const slides: Array<{ color: string }> = [];
	const textColors: Array<{ color: string }> = [];

	if (slideColors?.length) {
		slideColors.map((slideColor) => {
			slides.push({ color: slideColor.backgroundColor });
			textColors.push({ color: slideColor.color });
		});

		if (slideColors.length < 2) {
			slides.push({ color: theme.colors.shades.gray_20 });
			textColors.push({ color: theme.colors.shades.gray_80 });
		}
	} else {
		if (length < 2) {
			length = 2;
		}

		for (let i = 0; i < length; i++) {
			slides.push({ color: theme.colors.shades.gray_20 });
			textColors.push({ color: theme.colors.shades.gray_80 });
		}
	}

	return { slides, textColors };
}

const Product: React.FC<StackNavigationProps<RootStackScreens, "Product">> = ({ navigation, route }) => {
	const sliderRef = useRef<Animated.ScrollView>(null);

	const product = route.params.product;
	const [] = useState(product);

	const toggleCart = useCart((store) => store.toggleCart);
	const fetchProductInfo = useProductInfo<string, ProductType>();

	const translateX = useSharedValue(0);
	const productInfoPosition = useSharedValue(0);
	const productInfoSlideTiming = useSharedValue(0);
	const productContentHeight = useSharedValue(95);
	const slideImagePosition = useSharedValue(0);

	// const [productColors, setProductColors] = useState([...productColorVariants]);
	const [showCartActions, setShowCartActions] = useState(false);
	const [isSlideOn, setIsSlideOn] = useState(true);
	// const [showCart, setShowCart] = useState(false);

	const productInfo = fetchProductInfo.data?.data || product;

	const { slides, textColors } = getSlideColors(product?.slideColors, product?.images?.length || 2);

	const scrollHandler = useAnimatedScrollHandler((e) => {
		translateX.value = e.contentOffset.x;
	});

	// → Slide Transitions
	const rSlideContainerStyle = useAnimatedStyle(() => {
		const slideBackgroundColor = interpolateColor(
			translateX.value,
			slides.map((_, i) => i * SLIDER_WIDTH),
			slides.map((_) => _.color),
		);

		const activeSlide = translateX.value / SLIDER_WIDTH;
		const activeSlideColor = slides[activeSlide]?.color;
		if (activeSlideColor) {
			runOnJS(updateStatusBarColor)(activeSlideColor);
		}

		return {
			backgroundColor: slideBackgroundColor,
		};
	});

	const rSlideTextStyle = useAnimatedStyle(() => {
		const slideTextColor = interpolateColor(
			translateX.value,
			textColors.map((_, i) => i * SLIDER_WIDTH),
			textColors.map((_) => _.color),
		);

		return {
			color: slideTextColor,
		};
	});

	// → Price Info Transitions
	const rProductContentLayerStyle = useAnimatedStyle(() => {
		const opacity = interpolate(productContentHeight.value, [95, 220], [0, 1]);
		return {
			opacity,
		};
	});

	const transitionProductInfo = (isSlide: boolean) => {
		const config: WithTimingConfig = {
			duration: 500,
			easing: Easing.linear,
		};

		//timer for interpolating styles
		productInfoPosition.value = withTiming(200, { ...config, duration: 100 }, (isFinished) => {
			if (isFinished) {
				productInfoSlideTiming.value = withTiming(isSlide ? 1 : 0, { ...config, duration: 100 });
				productInfoPosition.value = withTiming(0, { ...config, duration: 100 });
			}
		});

		// slide image up if isSlide false vice versa
		slideImagePosition.value = withTiming(isSlide ? -50 : 0, { ...config, duration: 100 });
		// section height transition from min to max
		productContentHeight.value = withTiming(isSlide ? 220 : 95, { ...config, duration: 200, easing: Easing.elastic(1) });

		setIsSlideOn(!isSlide);
	};

	const rProductImageStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: slideImagePosition.value }],
		};
	});

	const rProductContentStyle = useAnimatedStyle(() => {
		return {
			height: productContentHeight.value,
		};
	});

	const priceInfo = {
		id: product.id,
		image: product.image,
		title: product.title,
		price: productInfo.price,
		discount: productInfo.discount,
		quantity: productInfo.quantity,
		buttonChild: !isSlideOn ? (
			<FontAwesomeIcon icon={faArrowRight as IconProp} />
		) : (
			<Image source={images.bagIcon} style={{ tintColor: theme.colors.shades.white }} />
		),
	};

	const onPriceInfoAction = useCallback(
		(actionType: ProductFooterActions) => {
			// 🔥 Action 1
			//→ when user click on shopping bag we will slide screen up
			//→ and action image will replaced with arrow
			if (isSlideOn && actionType === "slideUp") {
				transitionProductInfo(isSlideOn);
				return;
			}

			// 🔥 Action 2
			//→ when screen is slide up & action image is arrow
			//→ display cart actions with GotoCart and Remove action
			if (!isSlideOn) {
				transitionProductInfo(isSlideOn);
				setShowCartActions(true);
				return;
			}

			// 🔥 Action 3
			//→ when user click on Remove will back to Action 1
			//→ if click on GoToCart open Cart Modal
			if (actionType === "removeCart") {
				setShowCartActions(false);
				return;
			}

			if (actionType === "showCartModal") {
				toggleCart(true);
				return;
			}
		},
		[isSlideOn],
	);

	useEffect(() => {
		fetchProductInfo.mutateAsync(product.id);
	}, []);

	return (
		<Container avoidTopNotch={true} avoidHomBar={true}>
			{(top) => {
				return (
					<>
						{/* Slider  */}
						<Animated.View style={[{ flex: 0.85 }, rSlideContainerStyle]}>
							<Header
								variant="secondary"
								leftIcon={<Back style={rSlideTextStyle as StyleProp<ViewStyle>} />}
								rightIcon={
									<Pressable onPress={() => toggleCart(true)}>
										<SmallBag style={rSlideTextStyle as StyleProp<ViewStyle>} />
									</Pressable>
								}
								headerStyle={{ position: "absolute", top, width: "100%", zIndex: 1 }}
								onAction={(type) => {
									if (type === "left") {
										navigation.goBack();
									}
								}}
							/>
							<Animated.ScrollView
								horizontal
								ref={sliderRef}
								onScroll={scrollHandler}
								scrollEnabled={isSlideOn}
								bounces={false}
								scrollEventThrottle={16}
								showsHorizontalScrollIndicator={false}
								decelerationRate="fast"
								snapToInterval={SLIDER_WIDTH}>
								{productInfo.images?.map((image: any) => {
									return (
										<View key={image.fileId} style={{ width: SLIDER_WIDTH, justifyContent: "center", alignItems: "center" }}>
											<Animated.Image
												source={{ uri: image.url }}
												style={[{ width: "100%", height: "100%" }, rProductImageStyle]}
												resizeMode="contain"
											/>
										</View>
									);
								})}
							</Animated.ScrollView>
							{/* Product Content */}

							{/* Slide Indicator */}
							{productInfo?.images?.length > 1 && (
								<View style={[theme.rowStyle, styles.slideIndicators]}>
									{productInfo.images.map((file: any, index: number) => {
										return <Dot key={file.fileId} currentIndex={index} width={SLIDER_WIDTH} scrollX={translateX} mh={index === 1 ? 6 : 0} />;
									})}
								</View>
							)}
							<Animated.View style={[styles.productContent, rProductContentStyle]}>
								{/* Product Info */}
								<Animated.View style={[styles.contentLayer, rProductContentLayerStyle]} />
								<View>
									<Animated.Text
										style={[
											theme.textStyles.h4,
											{ color: !isSlideOn ? theme.colors.shades.gray_80 : textColors[0].color, marginBottom: theme.spacing.xxSmall },
											isSlideOn && rSlideTextStyle,
										]}>
										{productInfo.title}
									</Animated.Text>
									<Review stars={0} transitionTextStyle={rSlideTextStyle} />
									{!isSlideOn && <Text style={[theme.textStyles.body_sm, { marginTop: theme.spacing.small }]}>{productInfo?.description}</Text>}
									{/* {!isSlideOn && (
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
									)} */}
								</View>
							</Animated.View>
						</Animated.View>
						{/* Product Price Container  */}
						<ProductPriceInfo
							priceInfo={priceInfo}
							slideAnimate={productInfoSlideTiming}
							translateY={productInfoPosition}
							showCartAction={showCartActions}
							onPress={onPriceInfoAction}
						/>
					</>
				);
			}}
		</Container>
	);
};

export default Product;
