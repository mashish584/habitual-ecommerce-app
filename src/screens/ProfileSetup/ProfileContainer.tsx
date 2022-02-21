import React from "react";
import { ViewStyle } from "react-native";

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
						<Header variant="secondary" title={title} />
						{children}
					</>
				);
			}}
		</Container>
	);
};

export default ProfileContainer;
