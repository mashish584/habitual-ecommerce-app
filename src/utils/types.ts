//@Date types
export type DateFormats = "dddd" | "dddd DD MMM" | "HH:mm A" | "DD MMM, YYYY" | "YYYY-MM-DD" | "HH:mm" | "YYYY-MM-DD HH:mm";

export type ScrollToIndexParams = {
	animated?: boolean | null | undefined;
	index: number;
	viewOffset?: number | undefined;
	viewPosition?: number | undefined;
};
