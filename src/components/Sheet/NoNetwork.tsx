import React, { useState } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NetInfo from "@react-native-community/netinfo";
import LottieView from "lottie-react-native";

import theme from "../../utils/theme";
import { Button } from "../Button";

const NoNetwork = () => {
	const insets = useSafeAreaInsets();

	const [isNetworkAvailable, setIsNetworkAvailable] = useState(true);

	const checkStatus = async () => {
		const response = await NetInfo.fetch();
		console.log(response);
		if (response.isConnected === true && response.isInternetReachable === true) {
			setIsNetworkAvailable(true);
		}
	};

	React.useEffect(() => {
		const subscription = NetInfo.addEventListener((state) => {
			const isNetworkIssue = state.isConnected === false || state.isInternetReachable === false;
			setIsNetworkAvailable(!isNetworkIssue);
		});

		return () => subscription();
	}, []);

	if (isNetworkAvailable) return null;

	return (
		<View
			style={{
				height: Dimensions.get("window").height,
				backgroundColor: theme.colors.shades.white,
				paddingHorizontal: theme.spacing.medium,
				paddingBottom: insets.bottom,
				...StyleSheet.absoluteFillObject,
				paddingTop: insets.top,
				justifyContent: "center",
			}}>
			<View style={{ flex: 0.4 }}>
				<LottieView source={require("../../assets/lottie/no-connection.json")} loop={true} autoPlay={true} />
			</View>
			<Text style={[theme.textStyles.h5, { fontFamily: theme.fonts.lato.regular, alignSelf: "center" }]}>Please check your internet connection.</Text>
			<Button variant="primary" style={{ width: 150, alignSelf: "center", marginTop: theme.spacing.large }} text="Retry" onPress={checkStatus} />
		</View>
	);
};

export default NoNetwork;
