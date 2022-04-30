import { useCallback } from "react";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";

import { User } from "../../utils/schema.types";
import { useUser } from "../../utils/store";
import { ProfileSchema, UserProfile } from "../../utils/validation";

import { useUpdateUser, useUserProfile } from "../api";
import { breakFullName, isValidJSONString } from "../../utils";
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
	const [{ id: userId, profile, joining_reasons }, setUser] = useUser((store) => [store.user, store.setUser]);
	const navigation = useNavigation<ScreenNavigationProp>();
	const { mutateAsync, isLoading } = useUpdateUser<T, User>(userId);
	const fetchProfile = useUserProfile<T, User>();

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
				console.log("Profile detail updated", { profile: response.data });
				setUser(response.data);
			},
			onError: (error) => {
				console.log(error);
			},
		});
	}, []);

	const fetchUserInfo = useCallback(() => {
		return fetchProfile.mutateAsync(userId, {
			onSuccess: (response) => {
				console.log({ response });
				setUser(response.data);
			},
			onError: (error) => {
				console.log({ error });
			},
		});
	}, []);

	return { profile, joining_reasons, updateUserInfo, fetchUserInfo, isLoading, formik };
}

export default useProfileUpdate;
