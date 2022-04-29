import { useCallback } from "react";
import { User } from "../../utils/schema.types";
import { useUser } from "../../utils/store";
import { useUpdateUser, useUserProfile } from "../api";

function useProfileUpdate<T extends string>() {
	const [{ id: userId, profile, joining_reasons }, setUser] = useUser((store) => [store.user, store.setUser]);

	const { mutateAsync, isLoading } = useUpdateUser<T, User>(userId);
	const fetchProfile = useUserProfile<T, User>();

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

	return { profile, joining_reasons, updateUserInfo, fetchUserInfo, isLoading };
}

export default useProfileUpdate;
