import { useFormik } from "formik";

import { Auth } from "../../utils/types";
import { AuthSchema } from "../../utils/validation";
import { User } from "../../utils/schema.types";

import { useAuthAPI } from "../api";
import { useUser } from "../../utils/store";

const values: Auth = {
	email: "",
	password: "",
};

function useAuth(isSignIn = false) {
	const authenticate = useAuthAPI<keyof Auth, User>();
	const onLoginSuccess = useUser((state) => state.onLoginSuccess);

	const formik = useFormik({
		initialValues: values,
		validationSchema: AuthSchema,
		validateOnChange: true,
		onSubmit: async (data: Auth) =>
			authenticate.mutate(data, {
				onSuccess: (response) => {
					onLoginSuccess({ token: response.token, user: response.data });
				},
				onError: (errors) => {
					if (errors.errors?.length) {
						const fieldErrors = errors.errors.reduce((previousErrros, error) => ({ ...previousErrros, [error.key]: error.message }), {});
						formik.setErrors(fieldErrors);
					}
				},
			}),
	});

	return { formik, isLoading: authenticate.isLoading };
}

export default useAuth;
