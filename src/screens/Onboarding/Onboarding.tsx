import React from "react";
import { Animated, Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme, { rgba } from "../../utils/theme";

const { width, height } = Dimensions.get("screen");

const slides = [
	{
		title: "Welcome!",
		description: "It’s a pleasure to meet you. We are excited that you’re here so let’s get started!",
		color: theme.colors.primary.yellow,
		illustration: require("../../assets/images/illustration.png"),
		textStyle: theme.textStyles.h1,
	},
	{
		title: "Irrelevant\nresults again?",
		description:
			"No need to rummage through irrelevant items anymore, we got you covered. Habitual sends you relevant items based off of your habits and interests.",
		color: theme.colors.accents.teal,
		illustration: require("../../assets/images/slide-illustration-2.png"),
		textStyle: theme.textStyles.h3,
	},
	{
		title: "Your interests\nworking with you.",
		description: "Tell us what you like. No, really, it helps a bunch when we serve you some great products. You just keep doing your thing.",
		color: theme.colors.accents.red,
		illustration: require("../../assets/images/slide-illustration-3.png"),
		textStyle: theme.textStyles.h3,
	},
	{
		title: "And that’s the \ncherry on top!",
		description: "Tell us what you like. No, really, it helps a bunch when we serve you some great products. You just keep doing your thing.",
		color: theme.colors.secondary.blue,
		illustration: require("../../assets/images/slide-illustration-4.png"),
		textStyle: theme.textStyles.h3,
	},
];

const Onboarding = () => {
	const insets = useSafeAreaInsets();
	return (
		<View style={{ ...theme.containerStyle }}>
			<Animated.View style={styles.slider}>
				<View style={[styles.circle, { backgroundColor: rgba.yellow(0.2) }]} />
				{slides.map(({ illustration }, index) => {
					return (
						<Animated.View
							key={index}
							style={{ ...StyleSheet.absoluteFillObject, justifyContent: "flex-end", alignItems: "center", opacity: index === 0 ? 1 : 0 }}>
							<Image source={illustration} />
						</Animated.View>
					);
				})}
			</Animated.View>

			<Animated.ScrollView
				snapToInterval={width}
				decelerationRate="fast"
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
			<TouchableOpacity style={{ marginTop: Math.max(insets.top, 15), ...styles.skipBtn }}>
				<Text style={[theme.textStyles.strikethrough_reg, { textDecorationLine: "none" }]}>Skip</Text>
			</TouchableOpacity>
		</View>
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
		left: 55,
		top: -70,
	},
	skipBtn: {
		alignSelf: "flex-end",
		padding: theme.spacing.medium,
		position: "absolute",
	},
	scrollView: {
		position: "absolute",
		alignItems: "flex-end",
		flex: 1,
		height: height * 0.8,
	},
});

export default Onboarding;
