import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";

import { Auth } from "@utils/types";
import { AuthSchema } from "@utils/validation";
import { User } from "@utils/schema.types";
import { useUser } from "@utils/store";
import { showToast } from "@utils/index";

import { ScreenNavigationProp } from "@nav/types";
import { useAuthAPI } from "../api";

const values: Auth = {
	email: "",
	password: "",
};

function useAuth(isSignIn = false) {
	const navigation = useNavigation<ScreenNavigationProp>();
	const authenticate = useAuthAPI<keyof Auth, User>(isSignIn);
	const onLoginSuccess = useUser((state) => state.onLoginSuccess);

	const formik = useFormik({
		initialValues: values,
		validationSchema: AuthSchema,
		validateOnChange: true,
		onSubmit: async (data: Auth) =>
			authenticate.mutate(data, {
				onSuccess: (response) => {
					if (response?.data) {
						showToast("success", { title: "Habitual Ecommerce", message: "Welcome to your habitual shopping experience, enjoy!" });
						onLoginSuccess({ token: response.token, user: response.data });
						if (isSignIn) {
							navigation.replace("BottomStack");
						} else {
							navigation.replace("ProfileSetup");
						}
					}

					if (response?.message && !response?.data) {
						showToast("error", { title: "Habitual Ecommerce", message: response.message });
					}
				},
				onError: (errors) => {
					if (errors?.errors?.length) {
						const fieldErrors = errors.errors.reduce((previousErrros, error) => ({ ...previousErrros, [error.key]: error.message }), {});
						formik.setErrors(fieldErrors);
					}
				},
			}),
	});

	return { formik, isLoading: authenticate.isLoading };
}

export default useAuth;
