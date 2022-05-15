import React, { useEffect } from "react";
import { FlatList, FlatListProps, View, ViewStyle } from "react-native";
import { usePaginateAPI } from "../../hooks/api";
import { Urls } from "../../utils/types";

interface PaginatedFlatlist extends Omit<FlatListProps<any>, "data"> {
	url: Urls;
	query?: string;
	skelton?: () => JSX.Element;
	skeltonContainerStyle?: ViewStyle;
	isRefresh?: boolean;
	onLoadStart?: () => void;
	onLoadEnd?: () => void;
}

const PaginatedFlatlist = ({ url, skelton, ...props }: PaginatedFlatlist) => {
	const { data, fetchNextPage, isLoading, refetch, isRefetching } = usePaginateAPI<"", any[]>(url, props.query);
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
		if (props.query !== undefined) {
			refetch();
		}
	}, [props.query]);

	if (props.isRefresh) {
		extranProps.onRefresh = () => refetch();
		extranProps.refreshing = isRefetching;
	}

	const info = data?.pages.reduce(
		(prev, page) => {
			const data = { ...prev };

			if (page?.data) {
				data.data = [...data.data, ...page.data];
				data.next = page.next;
			}

			return data;
		},
		{ data: [], next: null },
	);

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
