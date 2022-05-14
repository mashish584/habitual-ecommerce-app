import React from "react";
import { FlatList, FlatListProps, View, ViewStyle } from "react-native";
import { usePaginateAPI } from "../../hooks/api";
import { Urls } from "../../utils/types";

interface PaginatedFlatlist extends Omit<FlatListProps<any>, "data"> {
	url: Urls;
	skelton: () => JSX.Element;
	skeltonContainerStyle?: ViewStyle;
}

const PaginatedFlatlist = ({ url, skelton, ...props }: PaginatedFlatlist) => {
	const { data, fetchNextPage, isLoading, refetch, isRefetching } = usePaginateAPI<"", any[]>(url);

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

	if (isLoading) {
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
			data={info?.data}
			onRefresh={() => refetch()}
			refreshing={isRefetching}
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
