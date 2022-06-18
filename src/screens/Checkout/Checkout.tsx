import React from "react";
import { ScrollView, Text, View, Pressable } from "react-native";

import Container from "../../components/Container";
import { Button } from "../../components/Button";
import SectionHeading from "../../components/SectionHeading";
import Header, { ActionType } from "../../components/Header/Header";
// import { TextInput } from "../../components/TextInput";
import { Back } from "../../components/Svg";
import Line from "../../components/Line";
import AddressText from "../../components/AddressText";
import PaymentCards from "../../components/PaymentCards";

import theme from "../../utils/theme";
import { RootStackScreens, StackNavigationProps } from "../../navigation/types";
import { useCart, useUser } from "../../utils/store";

import { useStripeCheckout } from "../../hooks/logic/useStripeCheckout";

// spacing of bot
const footerTopPadding = theme.spacing.medium;
const scrollViewBottomSpace = footerTopPadding * 2 + (footerTopPadding + 48);

const Checkout: React.FC<StackNavigationProps<RootStackScreens, "Checkout">> = ({ navigation }) => {
	const { initiatePaymentSheet, isLoading } = useStripeCheckout();
	const addresses = useUser((store) => store.user.addresses);
	const total = useCart((store) => store.total);

	const processCheckout = async () => {
		const response = await initiatePaymentSheet(addresses[0]);
		if (response) {
			navigation.replace("CheckoutSuccess");
		}
	};

	const defaultAddress = addresses?.filter((address) => address.default)[0];

	return (
		<Container avoidHomBar={true}>
			{(_, bottom) => {
				return (
					<>
						<Header
							variant="primary"
							leftIcon={<Back fill={theme.colors.shades.gray_80} />}
							title="Checkout"
							onAction={(type: ActionType) => {
								if (type === "left") {
									navigation.goBack();
								}
							}}
						/>
						<ScrollView
							contentContainerStyle={{ flexGrow: 1, paddingTop: theme.spacing.large, position: "relative", paddingBottom: scrollViewBottomSpace }}
							showsVerticalScrollIndicator={false}>
							{/* Cards */}
							<View>
								<SectionHeading
									title="Payment Method"
									headingStyle={{ textTransform: "uppercase" }}
									containerStyle={{ marginBottom: theme.spacing.small }}
								/>
								<PaymentCards />
							</View>
							<View style={{ marginHorizontal: theme.spacing.medium }}>
								{/* Address */}
								<View style={{ marginTop: theme.spacing.medium }}>
									<SectionHeading
										title="Address"
										headingStyle={{ textTransform: "uppercase" }}
										containerStyle={{ paddingHorizontal: 0 }}
										actionText={addresses?.length ? "Edit" : ""}
										onPress={() => {
											navigation.navigate("Addresses");
										}}
									/>

									<View style={{ marginTop: theme.spacing.small }}>
										{addresses?.length === 0 ? (
											<View style={theme.rowStyle}>
												<Text style={{ color: theme.colors.shades.gray_80 }}>Please add address to continue.</Text>
												<Pressable onPress={() => navigation.navigate("Address", {})} style={{ marginLeft: 5 }}>
													<Text style={[theme.textStyles.link_sm]}>Add Address</Text>
												</Pressable>
											</View>
										) : (
											<>
												<AddressText address={defaultAddress} />
											</>
										)}
									</View>
								</View>
								{/* Promo Code */}
								{/* <View style={[theme.rowStyle, { alignItems: "center", marginTop: theme.spacing.medium }]}>
									<TextInput type="text" placeholder="Promo Code" containerStyle={{ flex: 1, marginRight: theme.spacing.xxSmall, marginBottom: 0 }} />
									<Button variant="primary" text="Apply" style={{ width: 100 }} onPress={() => {}} />
								</View> */}
								<Line style={{ marginTop: theme.spacing.medium, height: 0.5 }} />
								{/* Checkout Meta Info */}
								<View style={[theme.rowStyle, { justifyContent: "space-between", marginTop: theme.spacing.normal, alignItems: "center" }]}>
									<Text style={[theme.textStyles.pill_sm, { textTransform: "uppercase", color: theme.colors.shades.gray_60 }]}>Delivery</Text>
									<Text style={[theme.textStyles.body_reg, { color: theme.colors.shades.gray_80 }]}>Free</Text>
								</View>
								<View style={[theme.rowStyle, { justifyContent: "space-between", marginTop: theme.spacing.large, alignItems: "center" }]}>
									<Text style={[theme.textStyles.pill_reg, { textTransform: "uppercase", color: theme.colors.shades.gray_60 }]}>Total</Text>
									<Text style={[theme.textStyles.h4, { color: theme.colors.shades.gray_80 }]}>${total}</Text>
								</View>
							</View>
						</ScrollView>
						{/* CTA */}
						<View
							style={{
								paddingTop: footerTopPadding,
								paddingBottom: Math.max(bottom, footerTopPadding),
								borderTopWidth: 1,
								borderTopColor: theme.colors.shades.gray_20,
								position: "absolute",
								width: "100%",
								backgroundColor: theme.colors.shades.white,
								bottom: 0,
							}}>
							<Button
								variant="primary"
								text="Pay Now"
								isLoading={isLoading}
								style={{ marginHorizontal: theme.spacing.medium }}
								onPress={processCheckout}
							/>
						</View>
					</>
				);
			}}
		</Container>
	);
};

export default Checkout;
