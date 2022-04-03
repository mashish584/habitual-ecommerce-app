import { useFormik } from "formik";

import { Auth } from "../../utils/types";
import { AuthSchema } from "../../utils/validation";
import { useAuthAPI } from "../api";

const values: Auth = {
	email: "",
	password: "",
};

function useAuth(isSignIn = false) {
	const authenticate = useAuthAPI<keyof Auth>();

	const formik = useFormik({
		initialValues: values,
		validationSchema: AuthSchema,
		validateOnChange: true,
		onSubmit: async (data: Auth) =>
			authenticate.mutate(data, {
				onSuccess: (success) => {
					console.log({ success });
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
