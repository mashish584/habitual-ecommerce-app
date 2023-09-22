import React, { useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import Animated, {
	interpolate,
	Extrapolate,
	useAnimatedScrollHandler,
	useSharedValue,
	useAnimatedStyle,
	useDerivedValue,
} from "react-native-reanimated";

import { Button } from "@components/Button";
import Container from "@components/Container";
import { MergedRoutes, StackNavigationProps } from "@nav/types";

import { isIOS } from "@utils/index";
import theme, { rgba } from "@utils/theme";
import images from "@assets/images";
import Dot from "./Dot";

const { width, height } = Dimensions.get("screen");

const slides = [
	{
		title: "Welcome!",
		description: "It’s a pleasure to meet you. We are excited that you’re here so let’s get started!",
		color: theme.colors.primary.yellow,
		illustration: images.onboardSlideFirstImage,
		textStyle: theme.textStyles.h1,
		ovalColor: rgba.yellow(0.2),
	},
	{
		title: "Irrelevant\nresults again?",
		description:
			"No need to rummage through irrelevant items anymore, we got you covered. Habitual sends you relevant items based off of your habits and interests.",
		color: theme.colors.accents.teal,
		illustration: images.onboardSlideSecondImage,
		textStyle: theme.textStyles.h3,
		ovalColor: rgba.teal(0.1),
	},
	{
		title: "Your interests\nworking with you.",
		description: "Tell us what you like. No, really, it helps a bunch when we serve you some great products. You just keep doing your thing.",
		color: theme.colors.accents.red,
		illustration: images.onboardSlideThirdImage,
		textStyle: theme.textStyles.h3,
		ovalColor: rgba.orange(0.1),
	},
	{
		title: "And that’s the \ncherry on top!",
		description: "No fees, free shipping and amazing customer service.",
		color: theme.colors.secondary.blue,
		illustration: images.onboardFourthSlideImage,
		textStyle: theme.textStyles.h3,
		ovalColor: rgba.blue(0.1),
	},
];

const ScrollViewHeight = height * 0.75;

const Onboarding: React.FC<StackNavigationProps<MergedRoutes, "Onboarding">> = ({ navigation }) => {
	const translateX = useSharedValue(0);
	const progress = useSharedValue(0);
	const ctaText = useDerivedValue(() => {
		return (progress.value ? "Sign me up!" : "Next") as string;
	});
	const scrollHandler = useAnimatedScrollHandler((e) => {
		translateX.value = e.contentOffset.x;
		progress.value = e.contentOffset.x > e.layoutMeasurement.width * 2.5 ? 1 : 0;
	});

	const activeSlideIndex = useRef(0);
	const scrollRef = useRef<Animated.ScrollView>(null);
	let scrollBegin = useRef(false);

	const [isLastSlide, setIsLastSlide] = useState(false);

	const rDotStyle = useAnimatedStyle(() => {
		const opacity = interpolate(translateX.value, [0, width, width * 2, width * 3], [1, 1, 1, 0], Extrapolate.CLAMP);
		return {
			opacity,
		};
	});

	const rTransparentButtonStyle = useAnimatedStyle(() => {
		const opacity = interpolate(translateX.value, [0, width, width * 2, width * 3], [0, 0, 0, 1], Extrapolate.CLAMP);
		return {
			opacity,
		};
	});

	const rPrimaryButtonStyle = useAnimatedStyle(() => {
		const position = interpolate(translateX.value, [0, width, width * 2, width * 3], [48, 48, 48, 0], Extrapolate.CLAMP);
		return {
			top: position,
		};
	});

	const moveToSlide = (index?: number) => {
		const nextIndex = index ? index : activeSlideIndex.current + 1;
		const x = nextIndex * width;

		setIsLastSlide(nextIndex === 3);
		activeSlideIndex.current = nextIndex;
		scrollRef.current?.scrollTo({ x, animated: true });
	};

	return (
		<Container>
			{(top) => {
				return (
					<>
						<View style={[styles.slider]}>
							{/* Slide Illustrations */}
							{slides.map(({ illustration, ovalColor }, index) => {
								const translateXPosition = (index + 1) % 2 === 0 ? width * 0.3 * -1 : width * 0.3;

								const rIllustrationStyle = useAnimatedStyle(() => {
									const opacity = interpolate(translateX.value, [(index - 0.5) * width, index * width, (index + 0.5) * width], [0, 1, 0]);
									return {
										opacity,
									};
								});

								return (
									<Animated.View
										key={index}
										style={[
											{
												...StyleSheet.absoluteFillObject,
												justifyContent: "flex-end",
												alignItems: "center",
												height: height * 0.5,
												paddingBottom: index === 2 ? 50 : 0,
											},
											rIllustrationStyle,
										]}>
										<View
											style={[styles.circle, { backgroundColor: ovalColor, transform: [{ translateX: translateXPosition }], position: "absolute" }]}
										/>
										<Image source={illustration} />
									</Animated.View>
								);
							})}

							{/* Onboarding footer dots */}
							<Animated.View
								style={[
									{
										width,
										alignItems: "center",
										justifyContent: "center",
										flexDirection: "row",
										position: "absolute",
										top: height * (isIOS ? 0.83 : 0.78),
										height: 20,
									},
									rDotStyle,
								]}>
								{new Array(3).fill(1).map((_, index) => {
									return (
										<Dot
											key={index}
											currentIndex={index}
											width={width}
											scrollX={translateX}
											mh={index === 1 ? 6 : 0}
											activeColor={theme.colors.primary.yellow}
										/>
									);
								})}
							</Animated.View>
						</View>

						{/* Slide Text Content  */}
						<Animated.ScrollView
							ref={scrollRef}
							onScroll={scrollHandler}
							snapToInterval={width}
							decelerationRate="fast"
							onMomentumScrollBegin={() => {
								scrollBegin.current = true;
							}}
							onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
								// ⚠️ Prevent android multiple trigger
								if (scrollBegin.current) {
									const step = Math.round(e.nativeEvent.contentOffset.x / width);
									activeSlideIndex.current = step;
									setIsLastSlide(step === 3);
									scrollBegin.current = false;
								}
							}}
							scrollEventThrottle={16}
							bounces={false}
							showsHorizontalScrollIndicator={false}
							horizontal
							contentContainerStyle={styles.scrollView}>
							{slides.map(({ title, description, textStyle }, index) => {
								return (
									<View key={index} style={{ width, paddingHorizontal: theme.spacing.medium }}>
										<Text style={[textStyle, theme.textStyles.center]}>{title}</Text>
										<Text style={[theme.textStyles.body_reg, theme.textStyles.center, { marginTop: theme.spacing.medium }]}>{description}</Text>
									</View>
								);
							})}
						</Animated.ScrollView>

						{/* Next Button */}
						<Animated.View style={[{ zIndex: 1 }, rPrimaryButtonStyle]}>
							<Button
								variant="primary"
								animatedText={ctaText}
								onPress={() => {
									if (isLastSlide) {
										navigation.navigate("SignUp");
									} else {
										moveToSlide();
									}
								}}
								style={{ marginHorizontal: theme.spacing.medium }}
							/>
						</Animated.View>

						{/* Ask me agin 4th slide */}
						<Animated.View style={rTransparentButtonStyle}>
							<Button
								variant="transparent"
								text="Ask me again later"
								onPress={() => {
									//will take user to home screen
									navigation.navigate("BottomStack");
								}}
								style={{ marginHorizontal: theme.spacing.medium }}
							/>
						</Animated.View>

						{/* Header Components */}
						<Animated.View style={[{ alignSelf: "flex-end", top }, styles.headerContent, rDotStyle]}>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate("SignIn");
								}}
								style={{ padding: theme.spacing.small }}>
								<Text style={[theme.textStyles.strikethrough_reg, { textDecorationLine: "none" }]}>Skip</Text>
							</TouchableOpacity>
						</Animated.View>

						<Animated.View style={[{ alignSelf: "center", top }, theme.rowStyle, styles.headerContent, styles.logo, rTransparentButtonStyle]}>
							<Image source={images.logo} style={{ width: "100%", height: "100%" }} />
						</Animated.View>
					</>
				);
			}}
		</Container>
	);
};

const styles = StyleSheet.create({
	slider: {
		width,
		height: height * 0.55,
		position: "absolute",
	},
	circle: {
		position: "absolute",
		width: 503,
		height: 503,
		borderRadius: 503 / 2,
		top: -100,
	},
	scrollView: {
		position: "absolute",
		height: ScrollViewHeight,
		paddingTop: height * 0.5,
	},
	headerContent: {
		position: "absolute",
	},
	logo: {
		width: 139,
		height: 32,
		marginTop: theme.spacing.small,
	},
});

export default Onboarding;
