import React, { ForwardedRef } from "react";
import { View, TextInput as RNTextInput, TextInputProps, StyleSheet, TextStyle, Image, TouchableOpacity, Text } from "react-native";
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

export type Input = ITextInput & TextInputProps;

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

const TextInput = ({ label, isOptional, messageType, message, style, ...props }: Input, ref: ForwardedRef<Ref>) => {
	const [isFocused, setIsFocused] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);
	const { textInputStyle, shadowStyle } = getTextInputStyle(messageType || "null");

	const isInputDisabled = props.editable === false;

	return (
		<View style={{ marginBottom: 16, ...props.containerStyle }}>
			{label ? <Label {...{ label, isOptional }} /> : null}
			<View style={styles.inputContainer}>
				<RNTextInput
					ref={ref}
					style={[
						styles.textInput,
						textInputStyle,
						isFocused && shadowStyle,
						props.type === "search" && styles.searchInput,
						props.type === "phone" && styles.phoneInput,
						isInputDisabled && styles.disabled,
						style,
					]}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					autoCapitalize={"none"}
					secureTextEntry={props.type === "password" && !showPassword}
					allowFontScaling={false}
					{...props}
				/>
				{props.type === "phone" && (
					<View style={styles.isdCode}>
						<Text style={styles.isdCodeText}>+91</Text>
					</View>
				)}
				{props.type === "search" && (
					<View style={[styles.searchIcon, props.searchIconStyle]}>
						<Image source={require("../../assets/images/search.png")} />
					</View>
				)}
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
};

const styles = StyleSheet.create({
	inputContainer: {
		position: "relative",
		justifyContent: "center",
	},
	textInput: {
		minHeight: 48,
		maxWidth: "100%",
		borderRadius: 15,
		backgroundColor: theme.colors.shades.white,
		borderWidth: 1,
		borderColor: theme.colors.shades.gray_40,
		paddingHorizontal: theme.spacing.small,
		color: theme.colors.shades.gray_80,
	},
	disabled: {
		backgroundColor: theme.colors.shades.gray_20,
	},
	searchInput: {
		paddingLeft: theme.spacing.normal * 2,
	},
	phoneInput: {
		paddingLeft: theme.spacing.normal * 2.5,
	},
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
	isdCode: {
		position: "absolute",
		height: "100%",
		zIndex: 1,
		left: theme.spacing.small,
		backgroundColor: "transparent",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 15,
		paddingTop: 1,
	},
	isdCodeText: {
		color: theme.colors.shades.gray_80,
	},
});

export default React.forwardRef(TextInput);
