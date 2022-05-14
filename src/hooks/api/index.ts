import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Address, RequestMethods, Urls } from "../../utils/types";
import { ErrorResponse, FetchConfig, SuccessResponse } from "../../utils/interface";
import { UserState } from "../../utils/store";
import { showToast } from "../../utils";

type AddressData = {
	address?: Omit<Address, "id" | "default">;
	path?: string;
	default?: boolean;
};

//Fetch config to work with react-query
const appFetch = async (url: Urls, options: FetchConfig) => {
	try {
		const userAsyncData = await AsyncStorage.getItem("user");
		let token = null;

		if (userAsyncData) {
			let userStoreInfo = JSON.parse(userAsyncData) as { state: Pick<UserState, "token" | "user"> };
			token = userStoreInfo.state.token;
		}

		let endpoint = `${options.url || url}${options.path || ""}${options.query || ""}`;

		if (!endpoint.includes("http")) {
			endpoint = `${API_URL}${endpoint}`;
		}

		if (options.path) {
			delete options.path;
		}

		if (options.query) {
			delete options.query;
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

		if (response.status === 200) {
			return response.json();
		} else {
			throw new Error(`Unable to fetch ${endpoint}`);
		}
	} catch (error) {
		showToast("error", { title: "Network Error", message: error?.message });
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

export const useCards = <T extends string, M>() => {
	return useQuery<SuccessResponse<M>, ErrorResponse<T>>("userCards", () => {
		return appFetch("cards/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
	});
};

export const useOrders = <T extends string, M>(url = "user/orders/") => {
	return useInfiniteQuery<SuccessResponse<M>, ErrorResponse<T>>(["orders", url], (params) => {
		console.log({ params });
		return appFetch("user/orders/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			url: params?.pageParam?.url || url,
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
	return useMutation<SuccessResponse<M>, ErrorResponse<T>, AddressData>((data) => {
		if (!path) {
			path = data?.path;
		}
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

export const useRemoveAddress = <T extends string, M>(path?: string) => {
	return useMutation<SuccessResponse<M>, ErrorResponse<T>, AddressData>((data) => {
		if (!path) {
			path = data?.path;
		}
		return appFetch("user/address/", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: {},
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

export const useFavouriteProduct = <T extends string, M>() => {
	return useMutation<SuccessResponse<M>, ErrorResponse<T>, { id: string; method: RequestMethods }>((data) => {
		return appFetch("user/mark-favourite/", {
			method: data.method,
			headers: {
				"Content-Type": "application/json",
			},
			query: `?id=${data.id}`,
		});
	});
};
