import React, { useRef } from "react";
import { Dimensions, Image, Text, TextStyle, TouchableOpacity, View } from "react-native";
import Animated, { Easing, timing } from "react-native-reanimated";
import { interpolateColor, useScrollHandler } from "react-native-redash";

import Container from "../../components/Container";
import Pill from "../../components/Pill/Pill";
import { Review } from "../../components/Product";

import theme from "../../utils/theme";
import Dot from "../Onboarding/Dot";

const SLIDER_WIDTH = Dimensions.get("screen").width;

const slides = [{ color: theme.colors.shades.gray_20 }, { color: theme.colors.shades.gray }];
const textColors = [{ color: theme.colors.shades.gray_80 }, { color: theme.colors.shades.white }];

const Product = () => {
	const sliderRef = useRef<Animated.ScrollView>(null);
	const productInfoPosition = new Animated.Value(0);
	const isSlideOff = useRef(false);

	const { scrollHandler, x } = useScrollHandler();

	const backgroundColor = interpolateColor(x, {
		inputRange: slides.map((_, i) => i * SLIDER_WIDTH),
		outputRange: slides.map((_) => _.color),
	});

	const textColor = interpolateColor(x, {
		inputRange: textColors.map((_, i) => i * SLIDER_WIDTH),
		outputRange: textColors.map((_) => _.color),
	});

	const transitionProductInfo = (isSlideOn: boolean) => {
		const config: Animated.TimingConfig = {
			duration: 500,
			toValue: null,
			easing: Easing.inOut(Easing.ease),
		};

		const transition1 = timing(productInfoPosition, { ...config, toValue: !isSlideOn ? 0 : 200 });
		const transition2 = timing(productInfoPosition, { ...config, toValue: !isSlideOn ? 200 : 0 });

		isSlideOff.current = !isSlideOn;

		transition1.start(() => transition2.start());
	};

	return (
		<Container avoidTopNotch={true} avoidHomBar={true} backgroundColor={backgroundColor}>
			{() => {
				return (
					<>
						{/* Slider  */}
						<Animated.View style={{ flex: 0.85, backgroundColor } as any}>
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
									<Animated.Text style={[theme.textStyles.h4, { color: textColor, marginBottom: theme.spacing.xxSmall }] as TextStyle[]}>
										Xbox One Elite Series 2 Controller
									</Animated.Text>
									<Review stars={2} color={textColor} />
								</View>
							</View>
						</Animated.View>
						{/* Product Price Container  */}
						<Animated.View
							style={{
								flex: 0.15,
								backgroundColor: theme.colors.shades.white,
								borderTopLeftRadius: 15,
								borderTopRightRadius: 15,
								justifyContent: "center",
								paddingHorizontal: theme.spacing.medium,
								transform: [{ translateY: productInfoPosition }],
							}}>
							<View style={[theme.rowStyle, { justifyContent: "space-between" }]}>
								<View>
									<Text
										style={[
											theme.textStyles.hint,
											{ textTransform: "uppercase", color: theme.colors.shades.gray_60, marginBottom: theme.spacing.xxSmall },
										]}>
										Starting At
									</Text>
									<View style={[theme.rowStyle, { alignItems: "center" }]}>
										<Text style={[theme.textStyles.h4, { fontFamily: theme.fonts.lato.heavy }]}>$59.99</Text>
										<Text
											style={[theme.textStyles.strikethrough_reg, { color: theme.colors.shades.gray_40, marginHorizontal: theme.spacing.xxSmall }]}>
											$79.99
										</Text>
										<Pill variant="saved" text="20% OFF" />
									</View>
								</View>
								<TouchableOpacity
									onPress={() => transitionProductInfo(!isSlideOff.current)}
									style={{
										width: 48,
										height: 48,
										backgroundColor: theme.colors.shades.gray_80,
										borderRadius: 50,
										justifyContent: "center",
										alignItems: "center",
									}}>
									<Image source={require("../../assets/images/tabs/bag.png")} style={{ tintColor: theme.colors.shades.white }} />
								</TouchableOpacity>
							</View>
						</Animated.View>
					</>
				);
			}}
		</Container>
	);
};

export default Product;
