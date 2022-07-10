import React from "react";
import { StyleSheet, Pressable, ScrollView, View, Text } from "react-native";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { Card } from "../../components/Cards";
import Container from "../../components/Container";
import Curve from "../../components/Container/Curve";
import { Header } from "../../components/Header";
import { Back } from "../../components/Svg";
import { Button } from "../../components/Button";
import AddressText from "../../components/AddressText";

import { RootStackScreens, StackNavigationProps } from "../../navigation/types";
import theme, { rgba } from "../../utils/theme";
import { generateBoxShadowStyle } from "../../utils";
import { useUser } from "../../utils/store";
import useAddress from "../../hooks/logic/useAddress";
import AddressOptions from "../../components/Sheet/AddressOptions";

const Addresses: React.FC<StackNavigationProps<RootStackScreens>> = ({ navigation }) => {
	const [options, setOptions] = React.useState({ visible: false, index: null });
	const addresses = useUser((store) => store.user.addresses);
	const { markAddressAsDefault, deleteAddress } = useAddress();

	return (
		<Container avoidHomBar={true} viewContainerStyle={{ backgroundColor: theme.colors.primary.yellow }}>
			{(top, bottom) => (
				<>
					<Header
						variant="primary"
						title="Addresses"
						leftIcon={<Back fill={theme.colors.shades.gray_80} />}
						headerStyle={{ marginTop: top / 2, borderBottomWidth: 0 }}
						onAction={(type) => {
							if (type === "left") {
								navigation.goBack();
							}
						}}
					/>
					<Curve isCurve={false}>
						<Button
							variant="primary"
							text="+"
							style={[styles.addBtn, { bottom: bottom + theme.spacing.small }]}
							onPress={() => navigation.navigate("Address")}
						/>
						{addresses.length > 0 && (
							<ScrollView contentContainerStyle={styles.containerStyle}>
								{addresses.map((address, index) => {
									const activeCardStyle = address.default ? { borderWidth: 1, borderColor: theme.colors.accents.teal } : {};
									return (
										<Card key={address.id} cardStyle={{ ...styles.addressCard, ...activeCardStyle }}>
											<AddressText address={{ ...address }} />
											<Pressable
												onPress={() => {
													setOptions({ visible: true, index });
												}}
												style={[styles.action, styles.more]}>
												{[...Array(3)].map((_, index) => (
													<View key={index} style={styles.circle} />
												))}
											</Pressable>
											<Pressable onPress={() => markAddressAsDefault(address.id)} style={[styles.action, styles.check]}>
												{address.default && <FontAwesomeIcon icon={faCheckCircle as IconProp} color={theme.colors.accents.teal} />}
											</Pressable>
										</Card>
									);
								})}
							</ScrollView>
						)}
						{addresses.length === 0 && (
							<Text style={[theme.textStyles.h5, theme.textStyles.center, { color: theme.colors.shades.gray_60, marginTop: theme.spacing.medium }]}>
								No address added.
							</Text>
						)}
					</Curve>
					<AddressOptions
						visible={options.visible}
						headerTitle="Choose Option"
						onAction={(type) => {
							const address = addresses[options.index];
							setOptions({ visible: false, index: null });
							if (type === "edit") {
								navigation.navigate("Address", {
									address,
								});
							}
							if (type === "delete") {
								deleteAddress(address.id);
							}
						}}
						onClose={() => {
							setOptions({ visible: false, index: null });
						}}
					/>
				</>
			)}
		</Container>
	);
};

const styles = StyleSheet.create({
	containerStyle: {
		width: "100%",
		paddingHorizontal: theme.spacing.medium,
		flexGrow: 1,
	},
	addressCard: {
		aspectRatio: undefined,
		width: "100%",
		minHeight: 140,
		padding: theme.spacing.small,
		alignItems: "flex-start",
		marginBottom: theme.spacing.normal,
	},
	action: {
		alignSelf: "flex-end",
		width: 17,
		height: 17,
		position: "absolute",
		right: theme.spacing.small,
	},
	check: {
		backgroundColor: rgba.black(0.1),
		borderRadius: 50,
		bottom: theme.spacing.small,
	},
	more: {
		top: theme.spacing.small,
		...theme.rowStyle,
		width: 25,
		justifyContent: "space-between",
		alignItems: "center",
	},
	addBtn: {
		width: 50,
		height: 50,
		borderRadius: 25,
		position: "absolute",
		right: theme.spacing.medium,
		zIndex: 999,
		...generateBoxShadowStyle(1, 4, rgba.black(0.2), 1, 10, 10, rgba.black(1)),
	},
	circle: {
		width: 7,
		height: 7,
		borderRadius: 3.5,
		backgroundColor: theme.colors.shades.gray_40,
	},
});

export default Addresses;
