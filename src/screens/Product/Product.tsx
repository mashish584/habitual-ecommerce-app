import React from "react";
import { Dimensions, Image, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";

import Container from "../../components/Container";
import theme from "../../utils/theme";

const SLIDER_WIDTH = Dimensions.get("screen").width;

const Product = () => {
	return (
		<Container avoidTopNotch={true} avoidHomBar={false}>
			{() => {
				return (
					<>
						{/* Slider  */}
						<View style={{ flex: 0.9 }}>
							<ScrollView
								horizontal
								bounces={false}
								showsHorizontalScrollIndicator={false}
								decelerationRate="fast"
								snapToInterval={SLIDER_WIDTH}
								style={{ backgroundColor: theme.colors.shades.gray_20 }}>
								<View style={{ width: SLIDER_WIDTH, justifyContent: "center", alignItems: "center" }}>
									<Image source={require("../../assets/images/example/product-sample.png")} />
								</View>
								<View style={{ width: SLIDER_WIDTH, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.shades.gray }}>
									<LottieView source={require("../../assets/lottie/xbox-controller.json")} />
								</View>
							</ScrollView>
						</View>
					</>
				);
			}}
		</Container>
	);
};

export default Product;
