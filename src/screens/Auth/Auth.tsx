import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput as RNTextInput, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
// import { faFacebook, faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@components/Button";
import Container from "@components/Container";
import { Header } from "@components/Header";
import Seperator from "@components/Seperator";
import { TextInput } from "@components/TextInput";

import theme from "@utils/theme";

import { ScreenNavigationProp } from "@nav/types";
import { useAuth } from "@hooks/logic";
import images from "@assets/images";

// const socialLogins = [
// 	{
// 		label: "Continue with Apple",
// 		icon: <FontAwesomeIcon icon={faApple} />,
// 	},
// 	{
// 		label: "Continue with Facebook",
// 		icon: <FontAwesomeIcon icon={faFacebook} color="#4267B2" />,
// 	},
// 	{
// 		label: "Continue with Google",
// 		icon: <FontAwesomeIcon icon={faGoogle} color="#EA4335" />,
// 	},
// ];

interface Auth {
	type: "signup" | "signin";
}

const Auth = ({ type }: Auth) => {
	const navigation = useNavigation<ScreenNavigationProp>();
	const isSignIn = type === "signin";

	const { formik, isLoading } = useAuth(isSignIn);
	const { values, handleChange, handleSubmit, submitCount, errors } = formik;

	const passwordRef = React.useRef<RNTextInput>(null);

	const isFormSubmit = submitCount > 0;

	return (
		<Container>
			{() => {
				return (
					<>
						<Header
							variant="primary"
							leftIcon={<FontAwesomeIcon icon={faClose as IconProp} />}
							title={isSignIn ? "Log in" : "Sign Up"}
							onAction={(type) => {
								if (type === "left") {
									navigation.goBack();
								}
							}}
						/>
						<ScrollView style={{ paddingHorizontal: theme.spacing.medium, paddingTop: theme.spacing.medium }} keyboardShouldPersistTaps="always">
							<Image source={images.logo} style={styles.logo} resizeMode="contain" />
							<TextInput
								label="Email"
								type="text"
								onChangeText={handleChange("email")}
								value={values.email}
								messageType={isFormSubmit && errors.email ? "error" : "null"}
								returnKeyType="next"
								onSubmitEditing={() => passwordRef?.current?.focus()}
								message={isFormSubmit ? errors.email : ""}
							/>
							<TextInput
								label="Password"
								type="password"
								ref={passwordRef}
								onChangeText={handleChange("password")}
								value={values.password}
								messageType={isFormSubmit && errors.password ? "error" : "null"}
								message={isFormSubmit ? errors.password : ""}
								onSubmitEditing={() => Keyboard.dismiss()}
							/>
							<Button variant="primary" isLoading={isLoading} text={isSignIn ? "Log in" : "Get started"} onPress={handleSubmit} />
							{/* {type === "signin" && (
								<TouchableOpacity style={{ maxWidth: 100, marginTop: theme.spacing.small }}>
									<Text style={theme.textStyles.link_sm}>Forgot Password</Text>
								</TouchableOpacity>
							)} */}
							<Seperator mt={theme.spacing.medium} />
							{/* Social Logins */}
							{/* <View style={{ marginTop: theme.spacing.medium }}>
								{socialLogins.map(({ label, icon }, index) => (
									<Button
										variant="bordered"
										key={index}
										text={label}
										iconComponent={icon}
										style={{ marginBottom: theme.spacing.small }}
										onPress={() => {}}
									/>
								))}
							</View> */}
							<View style={[theme.rowStyle, { justifyContent: "space-between", alignItems: "center" }]}>
								<View style={[theme.rowStyle, { marginTop: theme.spacing.small, alignItems: "center" }]}>
									<Text style={theme.textStyles.body_reg}>{isSignIn ? "New to Habitual?" : "Already have an account?"}</Text>
									<TouchableOpacity
										onPress={() => {
											navigation.navigate(isSignIn ? "SignUp" : "SignIn");
										}}
										style={{ marginLeft: 3 }}>
										<Text style={[theme.textStyles.link_reg]}>{isSignIn ? "Sign up" : "Log in"}</Text>
									</TouchableOpacity>
								</View>
							</View>
						</ScrollView>
					</>
				);
			}}
		</Container>
	);
};

const styles = StyleSheet.create({
	logo: {
		width: 171,
		height: 41,
		alignSelf: "center",
		marginBottom: theme.spacing.medium,
	},
});

export default Auth;
