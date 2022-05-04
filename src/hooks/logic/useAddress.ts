import { useEffect } from "react";
import { FormikProps, useFormik } from "formik";

import { Address } from "../../utils/types";
import { AddressSchema } from "../../utils/validation";
import { User } from "../../utils/schema.types";
import { useUser } from "../../utils/store";

import { useRemoveAddress, useUpdateAddress } from "../api";

type AddressT = Omit<Address, "id" | "default">;

const values: AddressT = {
	firstName: "",
	lastName: "",
	streetName: "",
	state: "",
	city: "",
	pin: "",
	mobileNumber: "",
};

function useAddress(address?: Address) {
	const setUser = useUser((store) => store.setUser);
	const { mutateAsync, ...updateAddress } = useUpdateAddress<"address" | "path" | "default" | "method", User>(address?.id);
	const removeAddress = useRemoveAddress<"path", User>();
	const formik: FormikProps<AddressT> = useFormik({
		initialValues: values,
		validationSchema: AddressSchema,
		validateOnChange: true,
		onSubmit: async (data: AddressT) => {
			if (address?.id) {
				const updateValues = { ...data };
				for (let key in updateValues) {
					if (updateValues[key] === address[key]) {
						delete updateValues[key];
					}
				}

				if (Object.keys(updateValues).length === 0) {
					return true;
				}
			}

			return mutateAsync(
				{ address: data },
				{
					onSuccess: (response) => {
						setUser(response.data);
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

	const deleteAddress = (addressId: string) => {
		return removeAddress.mutateAsync(
			{ path: addressId },
			{
				onSuccess: (response) => {
					console.log("Address removed.");
					setUser(response.data);
				},
				onError: (error) => {
					console.log({ error });
				},
			},
		);
	};

	useEffect(() => {
		if (address?.id) {
			const data = { ...address };
			delete data.id;
			delete data.default;
			console.log({ data });
			formik.setValues(data);
		}
	}, [address?.id]);

	return { formik, isLoading: updateAddress.isLoading || removeAddress.isLoading, markAddressAsDefault, deleteAddress };
}

export default useAddress;
