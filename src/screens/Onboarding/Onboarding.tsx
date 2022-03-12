import React, { useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Animated, { interpolate, Extrapolate } from "react-native-reanimated";
import { useScrollHandler } from "react-native-redash";

import { Button } from "../../components/Button";
import Container from "../../components/Container";
import { RootStackScreens, StackNavigationProps } from "../../navigation/types";

import { isIOS } from "../../utils";
import theme, { rgba } from "../../utils/theme";
import Dot from "./Dot";

const { width, height } = Dimensions.get("screen");

const slides = [
	{
		title: "Welcome!",
		description: "It’s a pleasure to meet you. We are excited that you’re here so let’s get started!",
		color: theme.colors.primary.yellow,
		illustration: require("../../assets/images/illustration.png"),
		textStyle: theme.textStyles.h1,
		ovalColor: rgba.yellow(0.2),
	},
	{
		title: "Irrelevant\nresults again?",
		description:
			"No need to rummage through irrelevant items anymore, we got you covered. Habitual sends you relevant items based off of your habits and interests.",
		color: theme.colors.accents.teal,
		illustration: require("../../assets/images/slide-illustration-2.png"),
		textStyle: theme.textStyles.h3,
		ovalColor: rgba.teal(0.1),
	},
	{
		title: "Your interests\nworking with you.",
		description: "Tell us what you like. No, really, it helps a bunch when we serve you some great products. You just keep doing your thing.",
		color: theme.colors.accents.red,
		illustration: require("../../assets/images/slide-illustration-3.png"),
		textStyle: theme.textStyles.h3,
		ovalColor: rgba.orange(0.1),
	},
	{
		title: "And that’s the \ncherry on top!",
		description: "Tell us what you like. No, really, it helps a bunch when we serve you some great products. You just keep doing your thing.",
		color: theme.colors.secondary.blue,
		illustration: require("../../assets/images/slide-illustration-4.png"),
		textStyle: theme.textStyles.h3,
		ovalColor: rgba.blue(0.1),
	},
];

const ScrollViewHeight = height * 0.7;

const Onboarding: React.FC<StackNavigationProps<RootStackScreens, "Onboarding">> = ({ navigation }) => {
	const { scrollHandler, x } = useScrollHandler();
	const activeSlideIndex = useRef(0);
	const scrollRef = useRef<Animated.ScrollView>(null);

	const [isLastSlide, setIsLastSlide] = useState(false);

	const dotOpacity = interpolate(x, {
		inputRange: [0, width, width * 2, width * 3],
		outputRange: [1, 1, 1, 0],
		extrapolate: Extrapolate.CLAMP,
	});

	const transparentButtonOpacity = interpolate(x, {
		inputRange: [0, width, width * 2, width * 3],
		outputRange: [0, 0, 0, 1],
		extrapolate: Extrapolate.CLAMP,
	});

	const primaryButtonPosition = interpolate(x, {
		inputRange: [0, width, width * 2, width * 3],
		outputRange: [48, 48, 48, 0],
		extrapolate: Extrapolate.CLAMP,
	});

	const moveToSlide = (index?: number) => {
		const nextIndex = index ? index : activeSlideIndex.current + 1;
		const x = nextIndex * width;

		scrollRef.current?.getNode().scrollTo({ x, animated: true });
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

								const opacity = x.interpolate({
									inputRange: [(index - 0.5) * width, index * width, (index + 0.5) * width],
									outputRange: [0, 1, 0],
								});

								return (
									<Animated.View
										key={index}
										style={{
											...StyleSheet.absoluteFillObject,
											justifyContent: "flex-end",
											alignItems: "center",
											height: height * 0.5,
											paddingBottom: index === 2 ? 50 : 0,
											opacity,
										}}>
										<View
											style={[styles.circle, { backgroundColor: ovalColor, transform: [{ translateX: translateXPosition }], position: "absolute" }]}
										/>
										<Image source={illustration} />
									</Animated.View>
								);
							})}

							{/* Onboarding footer dots */}
							<Animated.View
								style={{
									width,
									alignItems: "center",
									justifyContent: "center",
									flexDirection: "row",
									position: "absolute",
									top: height * (isIOS ? 0.83 : 0.78),
									height: 20,
									opacity: dotOpacity,
								}}>
								{new Array(3).fill(1).map((_, index) => {
									return <Dot key={index} currentIndex={index} width={width} scrollX={x} mh={index === 1 ? 6 : 0} />;
								})}
							</Animated.View>
						</View>

						{/* Slide Text Content  */}
						<Animated.ScrollView
							ref={scrollRef}
							snapToInterval={width}
							decelerationRate="fast"
							onMomentumScrollEnd={(e) => {
								const step = e.nativeEvent.contentOffset.x / width;
								activeSlideIndex.current = step;
								setIsLastSlide(step === 3);
							}}
							bounces={false}
							showsHorizontalScrollIndicator={false}
							horizontal
							contentContainerStyle={styles.scrollView}
							{...scrollHandler}>
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
						<Animated.View style={{ top: primaryButtonPosition, zIndex: 1 }}>
							<Button
								variant="primary"
								text={isLastSlide ? "Sign me up!" : "Next"}
								onPress={() => {
									if (isLastSlide) {
										navigation.replace("SignUp");
									} else {
										moveToSlide();
									}
								}}
								style={{ marginHorizontal: theme.spacing.medium }}
							/>
						</Animated.View>

						{/* Ask me agin 4th slide */}
						<Animated.View style={{ opacity: transparentButtonOpacity }}>
							<Button
								variant="transparent"
								text="Ask me again later"
								onPress={() => {
									//will take user to home screen
								}}
								style={{ marginHorizontal: theme.spacing.medium }}
							/>
						</Animated.View>

						{/* Header Components */}
						<Animated.View style={[{ opacity: dotOpacity, alignSelf: "flex-end", top }, styles.headerContent]}>
							<TouchableOpacity onPress={() => navigation.replace("SignIn")} style={{ padding: theme.spacing.small }}>
								<Text style={[theme.textStyles.strikethrough_reg, { textDecorationLine: "none" }]}>Skip</Text>
							</TouchableOpacity>
						</Animated.View>

						<Animated.View
							style={[{ opacity: transparentButtonOpacity, alignSelf: "center", top }, theme.rowStyle, styles.headerContent, styles.logo]}>
							<Image source={require("../../assets/images/full-logo.png")} style={{ width: "100%", height: "100%" }} />
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
