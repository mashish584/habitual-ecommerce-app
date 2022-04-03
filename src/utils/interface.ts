import { ErrorMessage, FetchHeader } from "./types";

export interface FetchConfig {
	method: "POST" | "GET" | "PATCH" | "DELETE" | "PUT";
	headers: FetchHeader;
	body: any;
}

export interface ErrorResponse<T> {
	errorMessage: ErrorMessage<T>;
	errors: ErrorMessage<T>[];
	message: string;
}

export interface SuccessResponse<T> {
	message: string;
	token: string;
	data: T;
}
