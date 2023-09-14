import React, { useRef } from "react";
import { ScrollView, View, StyleSheet, TextInput as RNTextInput, Keyboard, StyleProp, ViewStyle } from "react-native";

import { Button } from "@components/Button";
import Container from "@components/Container";
import { Header } from "@components/Header";
import { ActionType } from "@components/Header/Header";
import { Back } from "@components/Svg";
import { TextInput } from "@components/TextInput";
import { useAddress } from "@hooks/logic";

import { RootStackScreens, StackNavigationProps } from "@nav/types";
import { isIOS } from "@utils/index";
import theme from "@utils/theme";

const Address: React.FC<StackNavigationProps<RootStackScreens, "Address">> = ({ navigation, route }) => {
	const { formik, isLoading } = useAddress(route.params?.address);
	const { values, handleChange, handleSubmit, submitCount, errors } = formik;

	const lastNameRef = useRef<RNTextInput>(null);
	const streetRef = useRef<RNTextInput>(null);
	const stateRef = useRef<RNTextInput>(null);
	const cityRef = useRef<RNTextInput>(null);
	const pinRef = useRef<RNTextInput>(null);
	const mobileRef = useRef<RNTextInput>(null);

	const isFormSubmit = submitCount > 0;

	return (
		<Container avoidHomBar={true}>
			{(_, bottom) => (
				<>
					<Header
						variant="primary"
						leftIcon={<Back style={{ color: theme.colors.shades.gray_80 } as StyleProp<ViewStyle>} />}
						title="Address"
						onAction={(type: ActionType) => {
							if (type === "left") {
								navigation.goBack();
							}
						}}
					/>
					<ScrollView contentContainerStyle={styles.scrollView}>
						<View style={styles.formGroup}>
							<TextInput
								label="First Name"
								type="text"
								onChangeText={handleChange("firstName")}
								value={values.firstName}
								messageType={isFormSubmit && errors.firstName ? "error" : "null"}
								returnKeyType="next"
								onSubmitEditing={() => lastNameRef?.current?.focus()}
								message={isFormSubmit && errors.firstName ? errors.firstName : ""}
								maxLength={50}
								containerStyle={{ flex: 0.48 }}
							/>
							<TextInput
								label="Last Name"
								type="text"
								ref={lastNameRef}
								onChangeText={handleChange("lastName")}
								value={values.lastName}
								messageType={isFormSubmit && errors.lastName ? "error" : "null"}
								returnKeyType="next"
								onSubmitEditing={() => streetRef?.current?.focus()}
								message={isFormSubmit && errors.lastName ? errors.lastName : ""}
								maxLength={50}
								containerStyle={{ flex: 0.48 }}
							/>
						</View>
						<TextInput
							label="Street Name"
							type="text"
							ref={streetRef}
							onChangeText={handleChange("streetName")}
							value={values.streetName}
							messageType={isFormSubmit && errors.streetName ? "error" : "null"}
							returnKeyType="next"
							maxLength={100}
							onSubmitEditing={() => stateRef?.current?.focus()}
							message={isFormSubmit && errors.streetName ? errors.streetName : ""}
						/>
						<View style={styles.formGroup}>
							<TextInput
								label="State"
								type="text"
								ref={stateRef}
								onChangeText={handleChange("state")}
								value={values.state}
								messageType={isFormSubmit && errors.state ? "error" : "null"}
								returnKeyType="next"
								maxLength={25}
								onSubmitEditing={() => cityRef?.current?.focus()}
								message={isFormSubmit && errors.state ? errors.state : ""}
								containerStyle={{ flex: 0.48 }}
							/>
							<TextInput
								label="City"
								type="text"
								ref={cityRef}
								onChangeText={handleChange("city")}
								value={values.city}
								messageType={isFormSubmit && errors.city ? "error" : "null"}
								returnKeyType="next"
								maxLength={25}
								onSubmitEditing={() => pinRef?.current?.focus()}
								message={isFormSubmit && errors.city ? errors.city : ""}
								containerStyle={{ flex: 0.48 }}
							/>
						</View>
						<TextInput
							label="Pin"
							type="text"
							ref={pinRef}
							onChangeText={handleChange("pin")}
							value={values.pin}
							messageType={isFormSubmit && errors.pin ? "error" : "null"}
							keyboardType="number-pad"
							returnKeyType="next"
							maxLength={6}
							onSubmitEditing={() => mobileRef?.current?.focus()}
							message={isFormSubmit && errors.pin ? errors.pin : ""}
						/>
						<TextInput
							label="Mobile No."
							type="phone"
							ref={mobileRef}
							onChangeText={handleChange("mobileNumber")}
							value={values.mobileNumber}
							messageType={isFormSubmit && errors.mobileNumber ? "error" : "null"}
							keyboardType="number-pad"
							returnKeyType="next"
							maxLength={10}
							onSubmitEditing={() => {
								Keyboard.dismiss();
							}}
							message={isFormSubmit && errors.mobileNumber ? errors.mobileNumber : ""}
						/>
					</ScrollView>
					<View style={{ paddingVertical: isIOS ? 0 : theme.spacing.normal }}>
						<Button
							variant="primary"
							isLoading={isLoading}
							text={"Save"}
							style={{ marginBottom: bottom, marginHorizontal: theme.spacing.medium }}
							onPress={handleSubmit}
						/>
					</View>
				</>
			)}
		</Container>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		paddingHorizontal: theme.spacing.medium,
		marginTop: theme.spacing.large,
		paddingBottom: theme.spacing.large,
	},
	formGroup: {
		...theme.rowStyle,
		justifyContent: "space-between",
	},
});

export default Address;
