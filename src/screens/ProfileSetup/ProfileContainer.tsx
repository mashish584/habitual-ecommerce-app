import React from "react";
import { Image, ViewStyle } from "react-native";

import Container from "../../components/Container";
import { Header } from "../../components/Header";
import theme from "../../utils/theme";

type HeaderTitle = Pick<Header, "title">;

interface ProfileContainer extends HeaderTitle {}

export const containerStyle: ViewStyle = { paddingHorizontal: theme.spacing.medium, justifyContent: "space-between", flex: 1 };

const ProfileContainer: React.FC<ProfileContainer> = ({ title, children }) => {
	return (
		<Container>
			{() => {
				return (
					<>
						<Header
							variant="secondary"
							leftIcon={<Image source={require("../../assets/images/bag.png")} />}
							title={title}
							headerStyle={{ justifyContent: "flex-end" }}
						/>
						{children}
					</>
				);
			}}
		</Container>
	);
};

export default ProfileContainer;
