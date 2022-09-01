import { ErrorMessage, FetchHeader, RequestMethods } from "./types";

export interface FetchConfig {
	method: RequestMethods;
	headers: FetchHeader;
	body?: any;
	path?: string | null;
	query?: string;
	url?: string;
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
	next: string;
}
