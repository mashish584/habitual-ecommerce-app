import React from "react";
import { FlatList, FlatListProps } from "react-native";
import { useOrders } from "../../hooks/api";

interface PaginatedFlatlist extends Omit<FlatListProps<any>, "data"> {
	url: string;
}

const PaginatedFlatlist = ({ url, ...props }: PaginatedFlatlist) => {
	const { data, fetchNextPage } = useOrders<"", any[]>(url);

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

	return (
		<FlatList
			{...{ ...props }}
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
