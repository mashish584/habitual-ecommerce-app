import React, { useRef } from "react";
import { Dimensions, Image, TextStyle, View } from "react-native";
import Animated, { Easing, timing } from "react-native-reanimated";
import { interpolateColor, useScrollHandler, useValue } from "react-native-redash";

import Container from "../../components/Container";
import { Review } from "../../components/Product";

import theme from "../../utils/theme";
import Dot from "../Onboarding/Dot";

import ProductPriceInfo from "./ProductPriceInfo";

const SLIDER_WIDTH = Dimensions.get("screen").width;

const slides = [{ color: theme.colors.shades.gray_20 }, { color: theme.colors.shades.gray }];
const textColors = [{ color: theme.colors.shades.gray_80 }, { color: theme.colors.shades.white }];

const Product = () => {
	const sliderRef = useRef<Animated.ScrollView>(null);
	const productInfoPosition = useValue(0);
	const productInfoSlideTiming = useValue(0);
	const isSlideOn = useRef(true);

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

	// → Product Info Transitions

	const transitionProductInfo = (isSlide: boolean) => {
		const config: Animated.TimingConfig = {
			duration: 500,
			toValue: null,
			easing: Easing.inOut(Easing.ease),
		};

		const timingTransition = timing(productInfoSlideTiming, { ...config, duration: 100, toValue: isSlide ? 1 : 0 });
		const transition1 = timing(productInfoPosition, { ...config, toValue: 200 });
		const transition2 = timing(productInfoPosition, { ...config, toValue: 0 });

		isSlideOn.current = !isSlide;

		transition1.start(() => {
			timingTransition.start();
			transition2.start();
		});
	};

	return (
		<Container avoidTopNotch={true} avoidHomBar={true} backgroundColor={slideBackgroundColor}>
			{() => {
				return (
					<>
						{/* Slider  */}
						<Animated.View style={{ flex: 0.85, slideBackgroundColor } as any}>
							<Animated.ScrollView
								horizontal
								ref={sliderRef}
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
							<View
								style={{
									paddingHorizontal: theme.spacing.medium,
									paddingVertical: theme.spacing.small,
									position: "absolute",
									width: "100%",
									bottom: 0,
									height: 130,
									justifyContent: "space-between",
								}}>
								{/* Slider Indicators */}
								<View style={[theme.rowStyle, { justifyContent: "center", width: "100%" }]}>
									{slides.map((_, index) => {
										return <Dot key={index} currentIndex={index} width={SLIDER_WIDTH} scrollX={x} mh={index === 1 ? 6 : 0} />;
									})}
								</View>
								{/* Product Info */}
								<View>
									<Animated.Text style={[theme.textStyles.h4, { color: slideTextColor, marginBottom: theme.spacing.xxSmall }] as TextStyle[]}>
										Xbox One Elite Series 2 Controller
									</Animated.Text>
									<Review stars={2} color={slideTextColor} />
								</View>
							</View>
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
							onPress={() => transitionProductInfo(isSlideOn.current)}
						/>
					</>
				);
			}}
		</Container>
	);
};

export default Product;
