import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFacebook, faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";

import { Button } from "../../components/Button";
import Container from "../../components/Container";
import { Header } from "../../components/Header";
import Seperator from "../../components/Seperator";
import { TextInput } from "../../components/TextInput";

import theme from "../../utils/theme";

const socialLogins = [
	{
		label: "Continue with Apple",
		icon: <FontAwesomeIcon icon={faApple} />,
	},
	{
		label: "Continue with Facebook",
		icon: <FontAwesomeIcon icon={faFacebook} color="#4267B2" />,
	},
	{
		label: "Continue with Google",
		icon: <FontAwesomeIcon icon={faGoogle} color="#EA4335" />,
	},
];

const SignIn = () => {
	return (
		<Container>
			{() => {
				return (
					<>
						<Header title="Log in" />
						<ScrollView style={{ paddingHorizontal: theme.spacing.medium, paddingTop: theme.spacing.medium }}>
							<Image source={require("../../assets/images/full-logo.png")} style={styles.logo} resizeMode="contain" />
							<TextInput label="Email" type="null" />
							<TextInput label="Password" type="null" />
							<Button variant="primary" text="Log in" onPress={() => {}} />
							<TouchableOpacity style={{ maxWidth: 100, marginTop: theme.spacing.small }}>
								<Text style={theme.textStyles.link_sm}>Forgot Password</Text>
							</TouchableOpacity>
							<Seperator mt={theme.spacing.medium} />
							{/* Social Logins */}
							<View style={{ marginTop: theme.spacing.medium }}>
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
							</View>
							<View style={[theme.rowStyle, { justifyContent: "space-between", alignItems: "center" }]}>
								<TouchableOpacity style={[theme.rowStyle, { marginTop: theme.spacing.small, alignItems: "center" }]}>
									<Text style={theme.textStyles.body_reg}>New to Habitual?</Text>
									<Text style={[theme.textStyles.link_reg, { marginLeft: 3 }]}>Sign up</Text>
								</TouchableOpacity>
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

export default SignIn;
