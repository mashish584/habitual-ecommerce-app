import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";

import { Button } from "../../components/Button";
import Container from "../../components/Container";
import { Header } from "../../components/Header";
import { ActionType } from "../../components/Header/Header";
import { Back } from "../../components/Svg";
import { TextInput } from "../../components/TextInput";
import useAddress from "../../hooks/logic/useAddress";

import { RootStackScreens, StackNavigationProps } from "../../navigation/types";
import theme from "../../utils/theme";

const Address: React.FC<StackNavigationProps<RootStackScreens, "Address">> = ({ navigation }) => {
	const { formik, isLoading } = useAddress();
	const { values, handleChange, handleSubmit, submitCount, errors } = formik;

	const isFormSubmit = submitCount > 0;

	return (
		<Container avoidHomBar={true}>
			{(_, bottom) => (
				<>
					<Header
						variant="primary"
						leftIcon={<Back fill={theme.colors.shades.gray_80} />}
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
								onSubmitEditing={() => {}}
								message={isFormSubmit && errors.firstName ? errors.firstName : ""}
								containerStyle={{ flex: 0.48 }}
							/>
							<TextInput
								label="Last Name"
								type="text"
								onChangeText={handleChange("lastName")}
								value={values.lastName}
								messageType={isFormSubmit && errors.lastName ? "error" : "null"}
								returnKeyType="next"
								onSubmitEditing={() => {}}
								message={isFormSubmit && errors.lastName ? errors.lastName : ""}
								containerStyle={{ flex: 0.48 }}
							/>
						</View>
						<TextInput
							label="Street Name"
							type="text"
							onChangeText={handleChange("streetName")}
							value={values.streetName}
							messageType={isFormSubmit && errors.streetName ? "error" : "null"}
							returnKeyType="next"
							onSubmitEditing={() => {}}
							message={isFormSubmit && errors.streetName ? errors.streetName : ""}
						/>
						<View style={styles.formGroup}>
							<TextInput
								label="State"
								type="text"
								onChangeText={handleChange("state")}
								value={values.state}
								messageType={isFormSubmit && errors.state ? "error" : "null"}
								returnKeyType="next"
								onSubmitEditing={() => {}}
								message={isFormSubmit && errors.state ? errors.state : ""}
								containerStyle={{ flex: 0.48 }}
							/>
							<TextInput
								label="City"
								type="text"
								onChangeText={handleChange("city")}
								value={values.city}
								messageType={isFormSubmit && errors.city ? "error" : "null"}
								returnKeyType="next"
								onSubmitEditing={() => {}}
								message={isFormSubmit && errors.city ? errors.city : ""}
								containerStyle={{ flex: 0.48 }}
							/>
						</View>
						<TextInput
							label="Pin"
							type="text"
							onChangeText={handleChange("pin")}
							value={values.pin}
							messageType={isFormSubmit && errors.pin ? "error" : "null"}
							returnKeyType="next"
							onSubmitEditing={() => {}}
							message={isFormSubmit && errors.pin ? errors.pin : ""}
						/>
						<TextInput
							label="Mobile No."
							type="text"
							onChangeText={handleChange("mobileNumber")}
							value={values.mobileNumber}
							messageType={isFormSubmit && errors.mobileNumber ? "error" : "null"}
							returnKeyType="next"
							onSubmitEditing={() => {}}
							message={isFormSubmit && errors.mobileNumber ? errors.mobileNumber : ""}
						/>
					</ScrollView>
					<Button
						variant="primary"
						isLoading={isLoading}
						text={"Save"}
						style={{ marginBottom: bottom, marginHorizontal: theme.spacing.medium }}
						onPress={handleSubmit}
					/>
				</>
			)}
		</Container>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		paddingHorizontal: theme.spacing.medium,
		marginTop: theme.spacing.small,
	},
	formGroup: {
		...theme.rowStyle,
		justifyContent: "space-between",
	},
});

export default Address;
