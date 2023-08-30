import React, { useCallback, useState } from "react";
import { Text, TextInput as RNTextInput, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Container from "../../components/Container";
import { TextInput } from "../../components/TextInput";
import { PaginatedFlatlist } from "../../components/PaginatedFlatlist";
import { MergedRoutes, StackNavigationProps } from "../../navigation/types";

import theme from "../../utils/theme";
import { debounce, isAndroid } from "../../utils";

import SearchItem from "./SearchItem";

const Search: React.FC<StackNavigationProps<MergedRoutes, "Search">> = ({ navigation }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const searchInputRef = React.useRef<RNTextInput>(null);

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
								style={{ borderWidth: 0, paddingBottom: 0, paddingTop: isAndroid ? 15 : 0 }}
								placeholderTextColor={theme.colors.shades.gray_40}
								containerStyle={{ marginBottom: 0 }}
								searchIconStyle={{ left: 0 }}
								onChangeText={searchProducts}
								isLoading={isLoading}
							/>
						</View>
						<View style={{ height: "100%", backgroundColor: theme.colors.shades.gray_20 }}>
							{searchQuery !== "" && (
								<PaginatedFlatlist
									queryName="Search Products"
									url={"products/"}
									query={`?take=50&select=id&select=title&select=id&select=slideColors&select=images&search=${searchQuery}`}
									contentContainerStyle={{
										paddingBottom: 0,
										backgroundColor: theme.colors.shades.white,
										flex: 1,
										borderTopColor: theme.colors.shades.gray_40,
										borderTopWidth: 0.2,
									}}
									showsVerticalScrollIndicator={false}
									keyExtractor={(item) => item.id}
									isRefresh={false}
									showPaginationLoader={false}
									ListFooterComponent={null}
									ListEmptyComponent={() => (
										<View style={[theme.rowStyle, { alignItems: "center", marginTop: theme.spacing.medium, justifyContent: "center" }]}>
											<Text style={{ textAlign: "center", color: theme.colors.shades.gray_80 }}>No product found </Text>
											<Text style={theme.textStyles.hightlightText}>{`"${searchQuery}"`}</Text>
										</View>
									)}
									renderItem={({ item }) => {
										return (
											<SearchItem
												query={searchQuery}
												text={item.title}
												onAction={() => {
													const product = { ...item };
													product.image = product.images[0].url;
													delete product.images;
													navigation.navigate("Product", { product });
												}}
											/>
										);
									}}
									onLoadStart={onLoadStart}
									onLoadEnd={onLoadEnd}
								/>
							)}
						</View>
					</>
				);
			}}
		</Container>
	);
};

export default Search;
