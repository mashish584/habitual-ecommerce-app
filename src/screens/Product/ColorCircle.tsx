import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";

interface ColorCircle {
	color: string;
	selected: boolean;
	onPress: () => void;
}

const ColorCircle = ({ color, selected, onPress }: ColorCircle) => {
	return (
		<TouchableOpacity style={[styles.colorContainer, { borderWidth: selected ? 2 : 0 }]} onPress={onPress}>
			<View
				style={{
					...styles.color,
					backgroundColor: color,
					borderWidth: selected ? 0 : 1,
				}}
			/>
		</TouchableOpacity>
	);
};

export default ColorCircle;
