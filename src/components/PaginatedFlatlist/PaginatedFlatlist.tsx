import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, FlatListProps, View, ViewStyle } from "react-native";
import { usePaginateAPI } from "../../hooks/api";
import theme from "../../utils/theme";
import { Urls } from "../../utils/types";

interface PaginatedFlatlist extends Omit<FlatListProps<any>, "data"> {
	url: Urls;
	queryName: string;
	query?: string;
	skelton?: () => JSX.Element;
	skeltonContainerStyle?: ViewStyle;
	isRefresh?: boolean;
	showPaginationLoader?: boolean;
	onLoadStart?: () => void;
	onLoadEnd?: () => void;
}

type InitialPageDataType = {
	data: any[];
	next: null | string;
};

const initialPageData: InitialPageDataType = {
	data: [],
	next: null,
};

function formatPaginationData(prev, page) {
	const data = { ...prev };

	if (page?.data) {
		data.data = [...data.data, ...page.data];
		data.next = page.next;
	}

	return data;
}

const PaginatedFlatlist = ({ url, skelton, ...props }: PaginatedFlatlist) => {
	const { data, fetchNextPage, isLoading, refetch, isRefetching } = usePaginateAPI<"", any[]>(url, props.query, props.queryName);
	const extranProps = {} as FlatListProps<any>;

	useEffect(() => {
		if (props.onLoadStart && props.onLoadEnd) {
			if (isLoading === true || isRefetching === true) {
				props.onLoadStart();
			}
			if (isLoading === false && isRefetching === false) {
				props.onLoadEnd();
			}
		}
	}, [isLoading, isRefetching]);

	useEffect(() => {
		// eslint-disable-next-line no-undefined
		if (props.query !== undefined) {
			refetch();
		}
	}, [props.query]);

	if (props.isRefresh) {
		extranProps.onRefresh = () => refetch();
		extranProps.refreshing = isRefetching;
	}

	const info = data?.pages.reduce(formatPaginationData, initialPageData);

	if (isLoading && skelton) {
		const Skelton = skelton;
		return (
			<View style={props.skeltonContainerStyle}>
				{new Array(5).fill(1).map((_, index) => {
					return <Skelton key={index} />;
				})}
			</View>
		);
	}

	return (
		<FlatList
			{...{ ...props }}
			{...{ ...extranProps }}
			data={info?.data}
			ListFooterComponent={() => {
				if (isRefetching && info?.data?.length && props.showPaginationLoader) {
					return <ActivityIndicator size="small" color={theme.colors.shades.gray_80} style={{ marginVertical: theme.spacing.small }} />;
				} else {
					return null;
				}
			}}
			ListEmptyComponent={info?.data?.length == 0 && (!isLoading || !isRefetching) && props.ListEmptyComponent ? props.ListEmptyComponent : null}
			onEndReached={() => {
				if (info?.next) {
					fetchNextPage({
						pageParam: { url: info?.next },
					});
				}
			}}
		/>
	);
};

export default PaginatedFlatlist;
