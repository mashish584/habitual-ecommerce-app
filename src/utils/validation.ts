import * as yup from "yup";
import { Address, Auth } from "./types";

export const AuthSchema = () => {
	const schema: yup.SchemaOf<Auth> = yup.object().shape({
		email: yup.string().trim().required("Email address is required.").email("Email address is not valid.").label("email"),
		password: yup.string().required("Password is required.").label("password"),
	});

	return schema;
};

export const AddressSchema = () => {
	const schema: yup.SchemaOf<Address> = yup.object().shape({
		firstName: yup.string().trim().required("First name is required.").max(100, "First name should not exceed 100 chars."),
		lastName: yup.string().trim().required("Last name is required.").max(100, "Last name should not exceed 100 chars."),
		streetName: yup.string().trim().required("Street name is required.").max(100, "Street name should not exceed 100 chars."),
		state: yup.string().trim().required("State is required.").max(50, "State should not exceed 50 chars."),
		city: yup.string().trim().required("City is required.").max(50, "City should not exceed 50 chars."),
		pin: yup.string().trim().required("Pin is required.").max(6, "Pin should not exceed 6 chars."),
		mobileNumber: yup.string().trim().required("Mobile number is required.").max(12, "Mobile number should not exceed 12 chars."),
	});

	return schema;
};
