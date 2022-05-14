import React from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Container from "../../components/Container";
import { TextInput } from "../../components/TextInput";

import theme from "../../utils/theme";

const Search = () => {
	const searchInputRef = React.useRef(null);

	useFocusEffect(
		React.useCallback(() => {
			searchInputRef?.current?.focus();
		}, []),
	);

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
							/>
						</View>
						{/* <View style={{ height: "100%", backgroundColor: theme.colors.shades.white }}>
							<SearchItem />
						</View> */}
					</>
				);
			}}
		</Container>
	);
};

export default Search;
