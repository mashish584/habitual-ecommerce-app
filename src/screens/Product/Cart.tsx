import React from "react";
import { Text } from "react-native";
import { BottomSheet, BottomSheetI } from "../../components/BottomSheet";

interface Cart extends BottomSheetI {
	items: any;
}

const Cart = ({ items, ...props }: Cart) => {
	return (
		<BottomSheet {...{ ...props }}>
			<Text>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit magni natus dolores debitis, tempore incidunt cupiditate odio provident
				tempora sint, eligendi minima quis officiis eum, doloremque voluptatum ullam error. Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Rem suscipit magni natus dolores debitis, tempore incidunt cupiditate odio provident tempora sint, eligendi minima quis officiis eum,
				doloremque voluptatum ullam error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit magni natus dolores debitis, tempore
				incidunt cupiditate odio provident tempora sint, eligendi minima quis officiis eum, doloremque voluptatum ullam error. Lorem ipsum dolor sit
				amet consectetur adipisicing elit. Rem suscipit magni natus dolores debitis, tempore incidunt cupiditate odio provident tempora sint, eligendi
				minima quis officiis eum, doloremque voluptatum ullam error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit magni natus
				dolores debitis, tempore incidunt cupiditate odio provident tempora sint, eligendi minima quis officiis eum, doloremque voluptatum ullam
				error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit magni natus dolores debitis, tempore incidunt cupiditate odio
				provident tempora sint, eligendi minima quis officiis eum, doloremque voluptatum ullam error. Lorem ipsum dolor sit amet consectetur
				adipisicing elit. Rem suscipit magni natus dolores debitis, tempore incidunt cupiditate odio provident tempora sint, eligendi minima quis
				officiis eum, doloremque voluptatum ullam error.Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit magni natus dolores
				debitis, tempore incidunt cupiditate odio provident tempora sint, eligendi minima quis officiis eum, doloremque voluptatum ullam error. Lorem
				ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit magni natus dolores debitis, tempore incidunt cupiditate odio provident
				tempora sint, eligendi minima quis officiis eum, doloremque voluptatum ullam error. Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Rem suscipit magni natus dolores debitis, tempore incidunt cupiditate odio provident tempora sint, eligendi minima quis officiis eum,
				doloremque voluptatum ullam error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit magni natus dolores debitis, tempore
				incidunt cupiditate odio provident tempora sint, eligendi minima quis officiis eum, doloremque voluptatum ullam error. Lorem ipsum dolor sit
				amet consectetur adipisicing elit. Rem suscipit magni natus dolores debitis, tempore incidunt cupiditate odio provident tempora sint, eligendi
				minima quis officiis eum, doloremque voluptatum ullam error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit magni natus
				dolores debitis, tempore incidunt cupiditate odio provident tempora sint, eligendi minima quis officiis eum, doloremque voluptatum ullam
				error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit magni natus dolores debitis, tempore incidunt cupiditate odio
				provident tempora sint, eligendi minima quis officiis eum, doloremque voluptatum ullam error.Lorem ipsum dolor sit amet consectetur
				adipisicing elit. Rem suscipit magni natus dolores debitis, tempore incidunt cupiditate odio provident tempora sint, eligendi minima quis
				officiis eum, doloremque voluptatum ullam error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit magni natus dolores
				debitis, tempore incidunt cupiditate odio provident tempora sint, eligendi minima quis officiis eum, doloremque voluptatum ullam error. Lorem
				ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit magni natus dolores debitis, tempore incidunt cupiditate odio provident
				tempora sint, eligendi minima quis officiis eum, doloremque voluptatum ullam error. Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Rem suscipit magni natus dolores debitis, tempore incidunt cupiditate odio provident tempora sint, eligendi minima quis officiis eum,
				doloremque voluptatum ullam error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit magni natus dolores debitis, tempore
				incidunt cupiditate odio provident tempora sint, eligendi minima quis officiis eum, doloremque voluptatum ullam error. Lorem ipsum dolor sit
				amet consectetur adipisicing elit. Rem suscipit magni natus dolores debitis, tempore incidunt cupiditate odio provident tempora sint, eligendi
				minima quis officiis eum, doloremque voluptatum ullam error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit magni natus
				dolores debitis, tempore incidunt cupiditate odio provident tempora sint, eligendi minima quis officiis eum, doloremque voluptatum ullam
				error.
			</Text>
		</BottomSheet>
	);
};

export default Cart;
