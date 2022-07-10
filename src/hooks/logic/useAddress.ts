import { useEffect } from "react";
import { FormikProps, useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";

import { Address } from "../../utils/types";
import { AddressSchema } from "../../utils/validation";
import { User } from "../../utils/schema.types";
import { useUser } from "../../utils/store";

import { useRemoveAddress, useUpdateAddress } from "../api";
import { showToast } from "../../utils";
import { ScreenNavigationProp } from "../../navigation/types";

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
	const navigation = useNavigation<ScreenNavigationProp>();
	const setUser = useUser((store) => store.setUser);
	const { mutateAsync, ...updateAddress } = useUpdateAddress<"address" | "path" | "default" | "method", User>(address?.id);
	const removeAddress = useRemoveAddress<"path", User>();

	const formik: FormikProps<AddressT> = useFormik({
		initialValues: values,
		validationSchema: AddressSchema,
		validateOnChange: true,
		onSubmit: async (data: AddressT) => {
			const updateValues = { ...data };

			if (address?.id) {
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
				{ address: updateValues },
				{
					onSuccess: (response) => {
						if (response.message) {
							showToast("success", { title: "Habitual Ecommerce", message: response.message });
							navigation.goBack();
						}
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
					if (response?.data) {
						console.log("Address set as default.");
						setUser(response.data);
					}
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
					if (response?.data) {
						setUser(response.data);
					}
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
