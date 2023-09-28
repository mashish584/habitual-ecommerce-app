import React, { useState } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import NetInfo from "@react-native-community/netinfo";

import theme from "@utils/theme";

import { Button } from "../Button";

const NoNetwork = () => {
	const insets = useSafeAreaInsets();

	const [isNetworkAvailable, setIsNetworkAvailable] = useState(true);

	const checkStatus = async () => {
		const response = await NetInfo.fetch();
		const isInternetReachable = Boolean(response.isConnected && response.isInternetReachable);

		setIsNetworkAvailable(isInternetReachable);
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
				...StyleSheet.absoluteFillObject,
				height: Dimensions.get("window").height,
				backgroundColor: theme.colors.shades.white,
				paddingHorizontal: theme.spacing.medium,
				paddingBottom: insets.bottom,
				paddingTop: insets.top,
				justifyContent: "center",
			}}>
			<View style={{ flex: 0.4 }}>
				<LottieView source={require("../../assets/lottie/no-connection.json")} loop={true} autoPlay={true} />
			</View>
			<Text style={[theme.textStyles.h5, { fontFamily: theme.fonts.lato.regular, alignSelf: "center" }]}>Please check your internet connection.</Text>
			<Button variant="primary" style={{ width: 150, alignSelf: "center", marginTop: theme.spacing.large }} text="Check" onPress={checkStatus} />
		</View>
	);
};

export default NoNetwork;
