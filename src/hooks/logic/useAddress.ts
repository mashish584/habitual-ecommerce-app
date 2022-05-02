import { FormikProps, useFormik } from "formik";

import { Address } from "../../utils/types";
import { AddressSchema } from "../../utils/validation";
import { User } from "../../utils/schema.types";

import { useUpdateAddress } from "../api";

type AddressT = Omit<Address, "id">;

const values: AddressT = {
	firstName: "",
	lastName: "",
	streetName: "",
	state: "",
	city: "",
	pin: "",
	mobileNumber: "",
};

function useAddress(id?: string) {
	// const setUser = useUser((store) => store.setUser);
	const { mutateAsync, isLoading } = useUpdateAddress<"address", User>(id);
	const formik: FormikProps<AddressT> = useFormik({
		initialValues: values,
		validationSchema: AddressSchema,
		validateOnChange: true,
		onSubmit: async (data: AddressT) => {
			return mutateAsync(
				{ address: data },
				{
					onSuccess: (response) => {
						console.log({ response });
						// setUser(response.data);
					},
					onError: (err) => {
						console.log(err);
					},
				},
			);
		},
	});

	return { formik, isLoading };
}

export default useAddress;
