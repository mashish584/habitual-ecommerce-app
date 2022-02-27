import React, { useRef } from "react";
import { Dimensions, Image, View } from "react-native";
import Animated from "react-native-reanimated";
import { interpolateColor, useScrollHandler } from "react-native-redash";

import Container from "../../components/Container";
import theme from "../../utils/theme";
import Dot from "../Onboarding/Dot";

const SLIDER_WIDTH = Dimensions.get("screen").width;

const slides = [{ color: theme.colors.shades.gray_20 }, { color: theme.colors.shades.gray }];

const Product = () => {
	const sliderRef = useRef<Animated.ScrollView>(null);

	const { scrollHandler, x } = useScrollHandler();

	const backgroundColor = interpolateColor(x, {
		inputRange: slides.map((_, i) => i * SLIDER_WIDTH),
		outputRange: slides.map((_) => _.color),
	});

	return (
		<Container avoidTopNotch={true} avoidHomBar={false}>
			{() => {
				return (
					<>
						{/* Slider  */}
						<Animated.View style={{ flex: 0.9, backgroundColor } as any}>
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
							<View style={[theme.rowStyle, { justifyContent: "center", position: "absolute", bottom: 100, width: "100%" }]}>
								{slides.map((_, index) => {
									return <Dot key={index} currentIndex={index} width={SLIDER_WIDTH} scrollX={x} mh={index === 1 ? 6 : 0} length={slides.length} />;
								})}
							</View>
						</Animated.View>
					</>
				);
			}}
		</Container>
	);
};

export default Product;
