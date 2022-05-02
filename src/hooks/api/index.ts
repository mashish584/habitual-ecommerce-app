import { useMutation, useQuery } from "react-query";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Address, Urls } from "../../utils/types";
import { ErrorResponse, FetchConfig, SuccessResponse } from "../../utils/interface";
import { UserState } from "../../utils/store";

//Fetch config to work with react-query
const appFetch = async (url: Urls, options: FetchConfig) => {
	const userAsyncData = await AsyncStorage.getItem("user");
	let token = null;

	if (userAsyncData) {
		let userStoreInfo = JSON.parse(userAsyncData) as { state: Pick<UserState, "token" | "user"> };
		token = userStoreInfo.state.token;
	}

	let endpoint = `${API_URL}${url}${options.path || ""}`;

	if (options.path) {
		delete options.path;
	}

	if (options.headers["Content-Type"] === "multipart/form-data") {
		const data = { ...options.body };
		const formData = new FormData();
		for (let key in data) {
			formData.append(key, data[key]);
		}
		options.body = formData;
	}

	if (token) {
		// options.headers.Authorization = `Bearer ${token}`;
		options.headers["token"] = `Bearer ${token}`;
	}

	let response = await fetch(endpoint, { ...options });
	if (response.status !== 200) {
		return response.json();
	} else {
		return response.json();
	}
};

//@API Query

export const useUserProfile = <T extends string, M>() => {
	return useMutation<SuccessResponse<M>, ErrorResponse<T>, string | null>((profileId) => {
		return appFetch("user/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			path: profileId,
		});
	});
};

export const useCategories = <T extends string, M>(query) => {
	return useMutation<SuccessResponse<M>, ErrorResponse<T>, string | null>((mutateQuery) => {
		return appFetch("category/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			path: mutateQuery ? mutateQuery : query,
		});
	});
};

export const useHome = <T extends String, M>() => {
	return useQuery<SuccessResponse<M>, ErrorResponse<T>>("home", () => {
		return appFetch("home/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
	});
};

export const useProductInfo = <T extends string, M>() => {
	return useMutation<SuccessResponse<M>, ErrorResponse<T>, string>((id) => {
		return appFetch("product/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			path: id,
		});
	});
};

//@API Mutations
export const useAuthAPI = <T extends string, M>(isSignIn = false) => {
	return useMutation<SuccessResponse<M>, ErrorResponse<T>, Record<T, string>>((data) => {
		return appFetch(!isSignIn ? "register/" : "signin/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
	});
};

export const useUpdateUser = <T extends string, M>(path: string) => {
	return useMutation<SuccessResponse<M>, ErrorResponse<T>, Record<T, any>>((data) => {
		return appFetch("user/", {
			method: "PATCH",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			body: data,
			path,
		});
	});
};

export const useUpdateAddress = <T extends string, M>(path?: string) => {
	return useMutation<SuccessResponse<M>, ErrorResponse<T>, Record<"address", Omit<Address, "id">>>((data) => {
		return appFetch("user/address/", {
			method: path ? "PATCH" : "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			path,
		});
	});
};

export const useCartCheckout = <T extends string, M>() => {
	return useMutation<SuccessResponse<M>, ErrorResponse<T>, Record<T, any>>((data) => {
		return appFetch("checkout/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
	});
};

export const useUpdateTransaction = <T extends string, M>() => {
	return useMutation<SuccessResponse<M>, ErrorResponse<T>, Record<T, any>>((data) => {
		return appFetch("payment-success/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
	});
};
