import { useMutation } from "react-query";
import { API_URL } from "@env";

import { Paths } from "../../utils/types";
import { ErrorResponse, FetchConfig, SuccessResponse } from "../../utils/interface";

//Fetch config to work with react-query
const appFetch = async (path: Paths, options: FetchConfig) => {
	console.log({ path: `${API_URL}${path}`, options });
	let response = await fetch(`${API_URL}${path}`, options);
	if (response.status !== 200) {
		throw await response.json();
	} else {
		return response.json();
	}
};

console.log({ API_URL });

//@API Query
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

//@API Mutations
