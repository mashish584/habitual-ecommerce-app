import React from "react";
import { View } from "react-native";

import Container from "../../components/Container";
import { Header } from "../../components/Header";
import { TextInput } from "../../components/TextInput";
import theme from "../../utils/theme";

const SignIn = () => {
	return (
		<Container>
			{() => {
				return (
					<>
						<Header title="Log in" />
						<View style={{ paddingHorizontal: theme.spacing.medium }}>
							<TextInput label="Email" type="error" message="Invalid email address" />
							<TextInput label="Password" type="success" message="Password is correct." />
						</View>
					</>
				);
			}}
		</Container>
	);
};

export default SignIn;
