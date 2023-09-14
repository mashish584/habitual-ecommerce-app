import { useEffect } from "react";
import { FormikProps, useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";

import { Address, PartialBy } from "@utils/types";
import { AddressSchema } from "@utils/validation";
import { User } from "@utils/schema.types";
import { useUser } from "@utils/store";
import { showToast } from "@utils/index";
import { ScreenNavigationProp } from "@nav/types";

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

function useAddress(address?: PartialBy<Address, "id" | "default">) {
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
					const currentKey = key as keyof AddressT;
					if (updateValues[currentKey] === address[currentKey]) {
						delete updateValues[currentKey];
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
						showToast("error", { title: "Habitual Ecommerce", message: "Oops! Something went wrong." });
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
						setUser(response.data);
					}
				},
				onError: (error) => {
					showToast("error", { title: "Habitual Ecommerce", message: "Oops! Something went wrong." });
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
					showToast("error", { title: "Habitual Ecommerce", message: "Oops! Something went wrong." });
				},
			},
		);
	};

	useEffect(() => {
		if (address?.id) {
			const data = { ...address };
			delete data.id;
			delete data.default;
			formik.setValues(data);
		}
	}, [address?.id]);

	return { formik, isLoading: updateAddress.isLoading || removeAddress.isLoading, markAddressAsDefault, deleteAddress };
}

export default useAddress;
