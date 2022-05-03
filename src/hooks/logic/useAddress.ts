import { FormikProps, useFormik } from "formik";

import { Address } from "../../utils/types";
import { AddressSchema } from "../../utils/validation";
import { User } from "../../utils/schema.types";
import { useUser } from "../../utils/store";

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
	default: false,
};

function useAddress() {
	const setUser = useUser((store) => store.setUser);
	const { mutateAsync, isLoading } = useUpdateAddress<"address" | "path" | "default", User>();
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

	const markAddressAsDefault = (addressId: string) => {
		return mutateAsync(
			{ default: true, path: addressId },
			{
				onSuccess: (response) => {
					console.log("Address set as default.");
					setUser(response.data);
				},
				onError: (error) => {
					console.log({ error });
				},
			},
		);
	};

	return { formik, isLoading, markAddressAsDefault };
}

export default useAddress;
