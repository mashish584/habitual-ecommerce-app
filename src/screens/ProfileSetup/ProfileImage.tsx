import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/Button";
import Container from "../../components/Container";
import { Header } from "../../components/Header";
import theme from "../../utils/theme";

const ProfileImage = () => {
	return (
		<Container>
			{() => {
				return (
					<>
						<Header variant="secondary" title="Step 1 of 1" />
						<View style={styles.container}>
							<View style={{ alignItems: "center", paddingTop: theme.spacing.large }}>
								<Text style={[theme.textStyles.h3]}>Welcome!</Text>
								<Text style={[theme.textStyles.body_reg, theme.textStyles.center, { marginTop: theme.spacing.medium }]}>
									{"Add a photo so other members\n know who you are."}
								</Text>

								<Image source={require("../../assets/images/avatar.png")} style={styles.profileImage} />
							</View>
							<View style={styles.footer}>
								<Button variant="transparent" text="Skip for now" onPress={() => {}} />
								<Button variant="primary" text="Upload a photo" onPress={() => {}} style={{ flex: 0.6 }} />
							</View>
						</View>
					</>
				);
			}}
		</Container>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: theme.spacing.medium,
		justifyContent: "space-between",
		flex: 1,
	},
	footer: {
		...theme.rowStyle,
		justifyContent: "space-between",
	},
	profileImage: {
		width: 124,
		height: 124,
		marginTop: theme.spacing.medium,
	},
});

export default ProfileImage;
