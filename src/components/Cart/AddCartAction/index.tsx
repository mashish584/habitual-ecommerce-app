import React from "react";
import { Text, Animated, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import theme from "../../../utils/theme";
import { QuantityAction } from "../../../utils/store";
import styles from "./styles";

interface AddCartActions {
	dragX: Animated.AnimatedInterpolation<string | number>;
	quantity: number;
	onUpdate: (type: QuantityAction) => void;
}

const AddCartActions = ({ dragX, quantity, onUpdate }: AddCartActions) => {
	const translateX = dragX.interpolate({
		inputRange: [-100, 0],
		outputRange: [0, 100],
		extrapolate: "clamp",
	});

	const opacity = dragX.interpolate({
		inputRange: [-100, 0],
		outputRange: [1, 0],
		extrapolate: "clamp",
	});

	return (
		<Animated.View style={[theme.rowStyle, styles.container, { opacity, transform: [{ translateX }] }]}>
			<TouchableOpacity onPress={() => onUpdate("-")} style={styles.button}>
				<FontAwesomeIcon icon={faMinus as IconProp} color={theme.colors.shades.white} />
			</TouchableOpacity>
			<Text style={[theme.textStyles.h5, { color: theme.colors.shades.white }]}>{quantity}</Text>
			<TouchableOpacity onPress={() => onUpdate("+")} style={styles.button}>
				<FontAwesomeIcon icon={faPlus as IconProp} color={theme.colors.shades.white} />
			</TouchableOpacity>
		</Animated.View>
	);
};

export default AddCartActions;
