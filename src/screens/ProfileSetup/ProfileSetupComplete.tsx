import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

import { Button } from "../../components/Button";
import Container from "../../components/Container";

import theme from "../../utils/theme";
import { RootStackScreens, StackNavigationProps } from "../../navigation/types";

import ProfileSetupHeader from "./ProfileSetupHeader";

const ProfileSetupComplete: React.FC<StackNavigationProps<RootStackScreens, "ProfileSetupComplete">> = () => {
	const popperRef = useRef<LottieView>(null);

	useEffect(() => {
		popperRef.current?.play(40, 165);
	}, []);

	return (
		<Container viewContainerStyle={{ justifyContent: "flex-end", paddingHorizontal: theme.spacing.medium }}>
			{() => {
				return (
					<>
						<LottieView ref={popperRef} source={require("../../assets/lottie/popper.json")} loop={false} style={{ position: "absolute", top: -50 }} />
						<View style={{ flex: 0.6, justifyContent: "space-between" }}>
							<ProfileSetupHeader
								title="Woohoo!"
								description={"Registration complete! Get ready to have the\n best shopping experiences of your life."}
								titleStyle={{ ...theme.textStyles.h1, lineHeight: theme.fontSizes.xxl }}
							/>
							<Button variant="primary" text="Let the shopping begin!" onPress={() => {}} />
						</View>
					</>
				);
			}}
		</Container>
	);
};

export default ProfileSetupComplete;
