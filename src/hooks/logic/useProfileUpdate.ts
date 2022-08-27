import { useCallback } from "react";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";

import { User } from "../../utils/schema.types";
import { useUser } from "../../utils/store";
import { ProfileSchema, UserProfile } from "../../utils/validation";

import { useFavouriteProduct, useUpdateUser, useUserProfile } from "../api";
import { breakFullName, isValidJSONString, showToast } from "../../utils";
import { ScreenNavigationProp } from "../../navigation/types";

const userProfile = (user: User) => {
	const [firstName, lastName] = breakFullName(user?.fullname);
	return {
		firstName: firstName,
		lastName: lastName,
		profile: user?.profile || "",
		bio: user?.bio || "",
		email: user?.email || "",
	};
};

function useProfileUpdate<T extends string>(user?: User) {
	const [{ id: userId, profile, joining_reasons, favouriteProductIds }, setUser] = useUser((store) => [store.user, store.setUser]);
	const navigation = useNavigation<ScreenNavigationProp>();
	const { mutateAsync, isLoading } = useUpdateUser<T, User>(userId);
	const fetchProfile = useUserProfile<T, User>();
	const updateFavouriteProduct = useFavouriteProduct<T, User>();

	const formik = useFormik({
		initialValues: userProfile(user),
		validationSchema: ProfileSchema,
		validateOnChange: true,
		onSubmit: async (data: UserProfile & { profile: string }) => {
			const body = {} as Record<T, any>;

			if (isValidJSONString(data.profile)) {
				body["profile"] = JSON.parse(data.profile);
			}

			body["fullname"] = `${data.firstName} ${data.lastName}`;
			body["bio"] = data.bio;
			await updateUserInfo(body);
			navigation.goBack();
		},
	});

	const updateUserInfo = useCallback((data: Record<T, any>) => {
		return mutateAsync(data, {
			onSuccess: (response) => {
				if (response?.data) {
					setUser(response.data);
				}
			},
			onError: (error) => {
				showToast("error", { title: "Habitual Ecommerce", message: "Oops! Something went wrong." });
			},
		});
	}, []);

	const markProductAsFavourite = useCallback(
		async (productId) => {
			const productExist = favouriteProductIds?.includes(productId);

			return updateFavouriteProduct.mutateAsync(
				{ id: productId, method: productExist ? "DELETE" : "POST" },
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
		},
		[favouriteProductIds],
	);

	const fetchUserInfo = useCallback(() => {
		return fetchProfile.mutateAsync(userId, {
			onSuccess: (response) => {
				if (response?.data) {
					setUser(response.data);
				}
			},
			onError: (error) => {
				showToast("error", { title: "Habitual Ecommerce", message: "Oops! Something went wrong." });
			},
		});
	}, []);

	return { profile, joining_reasons, updateUserInfo, favouriteProductIds, fetchUserInfo, markProductAsFavourite, isLoading, formik };
}

export default useProfileUpdate;
