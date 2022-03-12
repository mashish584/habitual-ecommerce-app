import React from "react";
import { ScrollView, Text, View } from "react-native";

import Container from "../../components/Container";
import CreditCard from "../../components/Cards/CreditCard";
import { Button } from "../../components/Button";
import SectionHeading from "../../components/SectionHeading";
import Header, { ActionType } from "../../components/Header/Header";
import { TextInput } from "../../components/TextInput";
import { Back } from "../../components/Svg";

import theme from "../../utils/theme";
import { RootStackScreens, StackNavigationProps } from "../../navigation/types";

// spacing of bot
const footerTopPadding = theme.spacing.medium;
const scrollViewBottomSpace = footerTopPadding * 2 + (footerTopPadding + 48);

const Checkout: React.FC<StackNavigationProps<RootStackScreens, "Checkout">> = ({ navigation }) => {
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
								<CreditCard />
							</View>
							<View style={{ marginHorizontal: theme.spacing.medium }}>
								{/* Address */}
								<View style={{ marginTop: theme.spacing.medium }}>
									<SectionHeading
										title="Address"
										headingStyle={{ textTransform: "uppercase" }}
										containerStyle={{ paddingHorizontal: 0 }}
										actionText="Edit"
									/>
									<View style={{ marginTop: theme.spacing.small }}>
										<Text style={theme.textStyles.h5}>Leslie Flores</Text>
										<Text style={[theme.textStyles.body_reg, { width: "70%", marginTop: theme.spacing.xxSmall, color: theme.colors.shades.gray_60 }]}>
											2972 Westheimer Rd. Santa Ana, Illinois 85486, United States of America
										</Text>
									</View>
								</View>
								{/* Promo Code */}
								<View style={[theme.rowStyle, { alignItems: "center" }]}>
									<TextInput label="" type="text" placeholder="Promo Code" containerStyle={{ flex: 1, marginRight: theme.spacing.xxSmall }} />
									<Button variant="primary" text="Apply" style={{ width: 100 }} onPress={() => {}} />
								</View>
								{/* Checkout Meta Info */}
								<View style={[theme.rowStyle, { justifyContent: "space-between", marginTop: theme.spacing.small, alignItems: "center" }]}>
									<Text style={[theme.textStyles.pill_sm, { textTransform: "uppercase", color: theme.colors.shades.gray_60 }]}>Delivery</Text>
									<Text style={[theme.textStyles.body_reg, { color: theme.colors.shades.gray_80 }]}>Free</Text>
								</View>
								<View style={[theme.rowStyle, { justifyContent: "space-between", marginTop: theme.spacing.large, alignItems: "center" }]}>
									<Text style={[theme.textStyles.pill_reg, { textTransform: "uppercase", color: theme.colors.shades.gray_60 }]}>Total</Text>
									<Text style={[theme.textStyles.h4, { color: theme.colors.shades.gray_80 }]}>$135.98</Text>
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
								style={{ marginHorizontal: theme.spacing.medium }}
								onPress={() => navigation.navigate("CheckoutSuccess")}
							/>
						</View>
					</>
				);
			}}
		</Container>
	);
};

export default Checkout;
