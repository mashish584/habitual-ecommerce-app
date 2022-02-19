import React from "react";

import Container from "../../components/Container";
import { Header } from "../../components/Header";

const SignIn = () => {
	return (
		<Container>
			{() => {
				return <Header title="Log in" />;
			}}
		</Container>
	);
};

export default SignIn;
