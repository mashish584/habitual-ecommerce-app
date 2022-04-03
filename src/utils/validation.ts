import * as yup from "yup";
import { Auth } from "./types";

export const AuthSchema = () => {
	const schema: yup.SchemaOf<Auth> = yup.object().shape({
		email: yup.string().trim().required("Email address is required.").email("Email address is not valid.").label("email"),
		password: yup.string().required("Password is required.").label("password"),
	});

	return schema;
};
