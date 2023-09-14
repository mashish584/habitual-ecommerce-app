import * as yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import { User } from "./schema.types";
import { Address, Auth } from "./types";

export type UserProfile = Pick<User, "email" | "bio"> & { firstName: string; lastName: string };

export const AuthSchema = () => {
	const schema: yup.SchemaOf<Auth> = yup.object().shape({
		email: yup.string().trim().required("Email address is required.").email("Email address is not valid.").label("email"),
		password: yup.string().required("Password is required.").label("password"),
	});

	return schema;
};

export const AddressSchema = () => {
	const schema: yup.SchemaOf<Omit<Address, "id" | "default">> = yup.object().shape({
		firstName: yup.string().trim().required("First name is required.").max(50, "First name should not exceed 100 chars."),
		lastName: yup.string().trim().required("Last name is required.").max(50, "Last name should not exceed 100 chars."),
		streetName: yup.string().trim().required("Street name is required.").max(100, "Street name should not exceed 100 chars."),
		state: yup.string().trim().required("State is required.").max(25, "State should not exceed 50 chars."),
		city: yup.string().trim().required("City is required.").max(25, "City should not exceed 50 chars."),
		pin: yup.string().trim().required("Pin is required.").max(6, "Pin should not exceed 6 chars."),
		mobileNumber: yup
			.string()
			.trim()
			.required("Mobile number is required.")
			.test((value, ctx) => {
				let message = "";

				const parsedNumber = parsePhoneNumberFromString(value || "", "IN");

				if (!parsedNumber?.isValid()) {
					message = "Mobile number is not valid.";
				}

				return message ? ctx.createError({ message }) : true;
			}),
	});

	return schema;
};

export const ProfileSchema = () => {
	const schema: yup.SchemaOf<Partial<UserProfile>> = yup.object().shape({
		firstName: yup.string().trim().required("First name is required.").max(50, "First name should not exceed 100 chars."),
		lastName: yup.string().trim().required("Last name is required.").max(50, "Last name should not exceed 100 chars."),
		email: yup.string().trim().required("Email address is required.").email("Email address is not valid.").label("email"),
		bio: yup.string().trim().required("Bio is required.").min(20, "Bio should be between 20-100 characters.").notRequired(),
	});

	return schema;
};
