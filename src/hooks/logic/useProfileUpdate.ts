import { useCallback } from "react";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";

import { User } from "../../utils/schema.types";
import { useUI, useUser } from "../../utils/store";
import { ProfileSchema, UserProfile } from "../../utils/validation";

import { useFavouriteProduct, useUpdateUser, useUserProfile } from "../api";
import { breakFullName, isValidJSONString, showToast } from "../../utils";
import { ScreenNavigationProp } from "../../navigation/types";
import { getPasswordConfirmationModal } from "../../utils/media";

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
	const updateValue = useUI((store) => store.updateValue);
	const navigation = useNavigation<ScreenNavigationProp>();
	const { mutateAsync, isLoading } = useUpdateUser<T, User>(userId);
	const fetchProfile = useUserProfile<T, User>();
	const updateFavouriteProduct = useFavouriteProduct<T, User>();

	const formik = useFormik({
		initialValues: userProfile(user || ({} as User)),
		validationSchema: ProfileSchema,
		validateOnChange: true,
		onSubmit: async (data: UserProfile & { profile: string }) => {
			const body = {} as Record<keyof User, any>;

			if (isValidJSONString(data.profile)) {
				body["profile"] = JSON.parse(data.profile);
			}

			body["fullname"] = `${data.firstName} ${data.lastName}`;
			body["bio"] = data.bio;
			await updateUserInfo(body as Record<T, any>);
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
			onError: () => {
				showToast("error", { title: "Habitual Ecommerce", message: "Oops! Something went wrong." });
			},
		});
	}, []);

	const markProductAsFavourite = useCallback(
		async (productId: string) => {
			if (!userId) {
				updateValue(getPasswordConfirmationModal(updateValue, navigation.navigate));
				return;
			}

			const productIndex = favouriteProductIds?.indexOf(productId);

			// → creating optimistic response
			let favouriteProducts = [...favouriteProductIds];

			if (productIndex != -1) {
				favouriteProducts.splice(productIndex, 1);
			} else {
				favouriteProducts = [...favouriteProductIds, productId];
			}

			setUser({ favouriteProductIds: favouriteProducts });

			return updateFavouriteProduct.mutateAsync(
				{ id: productId, method: productIndex !== -1 ? "DELETE" : "POST" },
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
