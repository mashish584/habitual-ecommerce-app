import React from "react";
import { View, TextInput as RNTextInput, TextInputProps, StyleSheet, TextStyle, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import Loader from "../Loader";

import { generateBoxShadowStyle } from "../../utils";
import theme, { rgba } from "../../utils/theme";

import Label from "./Label";
import Message from "./Message";

import { MessageType, TextInput as ITextInput } from "./types";

export type Ref = RNTextInput | null;

type Input = ITextInput & TextInputProps & { ref: React.ForwardedRef<Ref> };

const getTextInputStyle = (type: MessageType) => {
	const textInputStyle: TextStyle = {};
	let shadowStyle: TextStyle = {};

	switch (type) {
		case "error":
			textInputStyle.borderColor = theme.colors.accents.red;
			shadowStyle = styles.errorShadow;
			break;
		case "success":
			textInputStyle.borderColor = theme.colors.secondary.green;
			shadowStyle = styles.successShadow;
			break;
	}

	return { textInputStyle, shadowStyle };
};

export default React.forwardRef<Ref, Input>(({ label, isOptional, messageType, message, style, ...props }, ref) => {
	const [isFocused, setIsFocused] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);
	const { textInputStyle, shadowStyle } = getTextInputStyle(messageType || "null");

	return (
		<View style={{ marginBottom: 16, ...props.containerStyle }}>
			{label ? <Label {...{ label, isOptional }} /> : null}
			<View style={{ position: "relative", justifyContent: "center" }}>
				<RNTextInput
					ref={ref}
					style={[
						{
							minHeight: 48,
							maxWidth: "100%",
							borderRadius: 15,
							backgroundColor: theme.colors.shades.white,
							borderWidth: 1,
							borderColor: theme.colors.shades.gray_40,
							paddingHorizontal: theme.spacing.small,
							color: theme.colors.shades.gray_80,
							...textInputStyle,
						},
						isFocused && shadowStyle,
						props.type === "search" && { paddingLeft: theme.spacing.normal * 2 },
						style,
					]}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					autoCapitalize={"none"}
					secureTextEntry={props.type === "password" && !showPassword}
					{...props}
				/>
				{props.type === "search" && <Image source={require("../../assets/images/search.png")} style={[styles.searchIcon, props.searchIconStyle]} />}
				{props.type === "password" && (
					<TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword((prev) => !prev)}>
						<FontAwesomeIcon icon={!showPassword ? (faEyeSlash as IconProp) : (faEye as IconProp)} color={theme.colors.shades.gray_80} />
					</TouchableOpacity>
				)}
				{props.isLoading && <Loader style={{ alignItems: "flex-end", right: theme.spacing.medium }} />}
			</View>

			{message ? <Message message={message} messageType={messageType} /> : null}
		</View>
	);
});

const styles = StyleSheet.create({
	successShadow: {
		...generateBoxShadowStyle(0, 3, rgba.green(0.25), 1, 5, 5, rgba.green(0.25)),
	},
	errorShadow: {
		...generateBoxShadowStyle(0, 3, rgba.orange(0.25), 1, 5, 5, rgba.orange(0.25)),
	},
	searchIcon: {
		position: "absolute",
		left: theme.spacing.small,
	},
	eyeIcon: {
		position: "absolute",
		right: theme.spacing.small,
	},
});
