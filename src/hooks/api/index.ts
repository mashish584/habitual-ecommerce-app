import { useMutation } from "react-query";
import { API_URL } from "@env";

import { Urls } from "../../utils/types";
import { ErrorResponse, FetchConfig, SuccessResponse } from "../../utils/interface";

//Fetch config to work with react-query
const appFetch = async (url: Urls, options: FetchConfig) => {
	console.log({ path: `${API_URL}${url}`, options });

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

	let response = await fetch(endpoint, options);
	if (response.status !== 200) {
		throw await response.json();
	} else {
		return response.json();
	}
};

//@API Query
export const useCategories = <T extends string, M>(query) => {
	return useMutation<SuccessResponse<M>, ErrorResponse<T>>(() => {
		return appFetch("category/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			path: query,
		});
	});
};

//@API Mutations
export const useAuthAPI = <T extends string, M>() => {
	return useMutation<SuccessResponse<M>, ErrorResponse<T>, Record<T, string>>((data) => {
		return appFetch("register/", {
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
