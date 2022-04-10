import * as React from "react";
import { Path, Defs, ClipPath } from "react-native-svg";
import { AnimatedG, AnimatedSVG } from ".";

const Payment = () => (
	<AnimatedSVG width={33} height={32} fill="none" xmlns="http://www.w3.org/2000/svg">
		<AnimatedG clipPath="url(#a)">
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M.5 8a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4h-24a4 4 0 0 1-4-4V8Zm2.667 0c0-.736.597-1.333 1.333-1.333h24c.736 0 1.333.597 1.333 1.333v4H3.167V8Zm26.666 6.667V24c0 .736-.597 1.333-1.333 1.333h-24A1.333 1.333 0 0 1 3.167 24v-9.333h26.666Z"
				fill="#A6A6AA"
			/>
		</AnimatedG>
		<Defs>
			<ClipPath id="a">
				<Path fill="#fff" transform="translate(.5)" d="M0 0h32v32H0z" />
			</ClipPath>
		</Defs>
	</AnimatedSVG>
);

export default Payment;
