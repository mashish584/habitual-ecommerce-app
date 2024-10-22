import React, { ForwardedRef, useImperativeHandle, useRef, useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import Animated from "react-native-reanimated";

import theme from "@utils/theme";
import ActiveBar, { MenuLayout } from "./ActiveBar";

export type CategoryMenuAPI = {
	updateMenuPosition: (index: number) => void;
};

interface CategoryMenuI {
	ref: CategoryMenuAPI;
	items: string[];
	activeIndex: number;
	containerWidth: number;
	onScrollChange: (index: number) => void;
}

const CategoryMenu = React.forwardRef(({ items, activeIndex, containerWidth, onScrollChange }: CategoryMenuI, ref: ForwardedRef<CategoryMenuAPI>) => {
	const menuLayouts = useRef<MenuLayout>({});
	const categoryListRef = useRef<ScrollView | null>(null);

	const [isMenuLayoutAvailable, setIsMenuLayoutAvailable] = useState(false);

	function updateMenuPosition(index: number) {
		const currentItemLayout = menuLayouts.current[index];
		const x = currentItemLayout.x + currentItemLayout.width / 2 - containerWidth / 2;
		categoryListRef.current?.scrollTo({ x, y: 0, animated: true });
	}

	useImperativeHandle(
		ref,
		() => {
			return {
				updateMenuPosition,
			};
		},
		[],
	);

	return (
		<ScrollView ref={categoryListRef} horizontal={true} showsHorizontalScrollIndicator={false}>
			{items.map((item, index) => {
				return (
					<TouchableOpacity
						key={index}
						onLayout={(e) => {
							menuLayouts.current[index] = e.nativeEvent.layout;
							if (Object.keys(menuLayouts.current).length === items.length && !isMenuLayoutAvailable) {
								setIsMenuLayoutAvailable(true);
							}
						}}
						onPress={() => {
							onScrollChange(index);
							updateMenuPosition(index);
						}}
						style={{ paddingHorizontal: theme.spacing.normal, height: 30 }}>
						<Animated.Text style={[theme.textStyles.body_reg, { color: theme.colors.shades.gray_80 }]}>{item}</Animated.Text>
					</TouchableOpacity>
				);
			})}
			{isMenuLayoutAvailable && <ActiveBar layouts={menuLayouts.current} activeIndex={activeIndex} />}
		</ScrollView>
	);
});

export default CategoryMenu;
