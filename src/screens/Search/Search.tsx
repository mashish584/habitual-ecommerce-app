import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Container from "../../components/Container";
import { TextInput } from "../../components/TextInput";
import { PaginatedFlatlist } from "../../components/PaginatedFlatlist";

import theme from "../../utils/theme";
import { debounce } from "../../utils";

import SearchItem from "./SearchItem";

const Search = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const searchInputRef = React.useRef(null);

	useFocusEffect(
		React.useCallback(() => {
			searchInputRef?.current?.focus();
		}, []),
	);

	const searchProducts = debounce((text) => {
		setSearchQuery(text);
	}, 1000);

	const onLoadStart = useCallback(() => {
		setIsLoading(true);
	}, [setIsLoading]);

	const onLoadEnd = useCallback(() => {
		setIsLoading(false);
	}, [setIsLoading]);

	return (
		<Container avoidTopNotch={true} viewContainerStyle={{ backgroundColor: theme.colors.shades.gray_20 }}>
			{(top) => {
				return (
					<>
						<View style={{ backgroundColor: theme.colors.shades.white, paddingTop: top, paddingHorizontal: theme.spacing.medium }}>
							<TextInput
								type="search"
								ref={searchInputRef}
								placeholder="Search by keyword"
								style={{ borderWidth: 0, paddingBottom: 0 }}
								containerStyle={{ marginBottom: 0 }}
								searchIconStyle={{ left: 0 }}
								onChangeText={searchProducts}
								isLoading={isLoading}
							/>
						</View>
						<View style={{ height: "100%", backgroundColor: theme.colors.shades.white }}>
							<PaginatedFlatlist
								queryName="Search Products"
								url={"products/"}
								query={`?take=7&select=id&select=title&select=id&search=${searchQuery}`}
								contentContainerStyle={{ paddingBottom: 0 }}
								showsVerticalScrollIndicator={false}
								keyExtractor={(item) => item.id}
								isRefresh={false}
								renderItem={({ item }) => {
									return <SearchItem text={item.title} onAction={() => {}} />;
								}}
								onLoadStart={onLoadStart}
								onLoadEnd={onLoadEnd}
							/>
						</View>
					</>
				);
			}}
		</Container>
	);
};

export default Search;
