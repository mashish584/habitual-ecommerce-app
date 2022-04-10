//@Date types
export type DateFormats = "dddd" | "dddd DD MMM" | "HH:mm A" | "DD MMM, YYYY" | "YYYY-MM-DD" | "HH:mm" | "YYYY-MM-DD HH:mm";

//@Component Specific Types
export type ProductFooterActions = "slideUp" | "removeCart" | "showCartModal";
export type ScrollToIndexParams = {
	animated?: boolean | null | undefined;
	index: number;
	viewOffset?: number | undefined;
	viewPosition?: number | undefined;
};

//@Form Types
export type Auth = {
	email: string;
	password: string;
};

//@API
export type ErrorMessage<T> = {
	key: T;
	message: string;
};
export type Urls = "register/" | "user/" | "category/";
export type FetchHeader = {
	"Content-Type": "application/json" | "multipart/form-data";
	Authorization?: string;
};
