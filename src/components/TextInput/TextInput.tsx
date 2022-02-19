import React, { ForwardedRef, useState } from "react";
import { View, TextInput as RNTextInput, TextInputProps, StyleSheet, TextStyle } from "react-native";

import { generateBoxShadowStyle } from "../../utils";
import theme, { rgba } from "../../utils/theme";

import Label from "./Label";
import Error from "./Error";

import { MessageType, TextInput as ITextInput } from "./types";

export type Ref = RNTextInput | null;

type Input = ITextInput & Omit<TextInputProps, "style"> & { ref: ForwardedRef<Ref> };

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

const TextInput = ({ ref, label, isOptional, type, message, ...props }: Input) => {
	const [isFocused, setIsFocused] = useState(false);

	const { textInputStyle, shadowStyle } = getTextInputStyle(type);

	return (
		<View style={{ marginBottom: 16 }}>
			<Label {...{ label, isOptional }} />
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
						...textInputStyle,
					},
					isFocused && shadowStyle,
				]}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				{...props}
			/>
			<Error message="Invalid email address." type={type} />
		</View>
	);
};

const styles = StyleSheet.create({
	successShadow: {
		...generateBoxShadowStyle(0, 3, rgba.green(0.25), 1, 5, 5, rgba.green(0.25)),
	},
	errorShadow: {
		...generateBoxShadowStyle(0, 3, rgba.orange(0.25), 1, 5, 5, rgba.orange(0.25)),
	},
});

export default React.forwardRef<Ref, ITextInput>((props, ref) => <TextInput {...props} ref={ref} />);
