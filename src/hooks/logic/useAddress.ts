import { FormikProps, useFormik } from "formik";

import { Address } from "../../utils/types";
import { AddressSchema } from "../../utils/validation";
import { User } from "../../utils/schema.types";
import { useUser } from "../../utils/store";

import useProfileUpdate from "./useProfileUpdate";

const values: Address = {
	firstName: "",
	lastName: "",
	streetName: "",
	state: "",
	city: "",
	pin: "",
	mobileNumber: "",
};

function useAddress(index = 0) {
	const addresses = useUser((store) => store.user.addresses);
	const { updateUserInfo, isLoading } = useProfileUpdate<keyof Pick<User, "addresses">>();
	const formik: FormikProps<Address> = useFormik({
		initialValues: addresses.length ? addresses[index] : values,
		validationSchema: AddressSchema,
		validateOnChange: true,
		onSubmit: async (data: Address) => {
			updateUserInfo({ addresses: JSON.stringify([data]) });
		},
	});

	return { formik, isLoading };
}

export default useAddress;
