import React, { useEffect, useRef } from "react";
import { Text, View, ViewStyle } from "react-native";
import LottieView from "lottie-react-native";

import theme from "../utils/theme";

import { Button } from "./Button";
import { variant } from "./Button/types";
import Container from "./Container";

interface Success {
	title: string;
	description: string;
	buttonVariant?: variant;
	buttonStyle?: ViewStyle;
	buttonText?: string;
	onAction?: () => void;
}

const Success = ({ title, description, buttonVariant, ...props }: Success) => {
	const popperRef = useRef<LottieView>(null);

	useEffect(() => {
		popperRef.current?.play(40, 165);
	}, []);

	return (
		<Container viewContainerStyle={{ justifyContent: "flex-end", paddingHorizontal: theme.spacing.medium }}>
			{() => {
				return (
					<>
						<LottieView ref={popperRef} source={require("../assets/lottie/popper.json")} loop={false} style={{ position: "absolute", top: -50 }} />
						<View style={{ flex: 0.6, justifyContent: "space-between" }}>
							<View style={{ alignItems: "center", paddingTop: theme.spacing.large }}>
								<Text style={[theme.textStyles.h3, theme.textStyles.center]}>{title}</Text>
								<Text style={[theme.textStyles.body_reg, theme.textStyles.center, { marginTop: theme.spacing.medium }]}>{description}</Text>
							</View>
							{props.buttonText ? (
								<Button variant={buttonVariant} text={props.buttonText} onPress={props.onAction} style={props.buttonStyle} />
							) : null}
						</View>
					</>
				);
			}}
		</Container>
	);
};

export default Success;
