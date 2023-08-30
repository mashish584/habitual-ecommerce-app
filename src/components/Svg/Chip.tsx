import * as React from "react";

import { AnimatedPath, AnimatedSVG } from "./index";
import { SVG } from "./types";

const Chip = (props: SVG) => (
	<AnimatedSVG width={26} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<AnimatedPath
			d="M0 6.667v-4C0 1.2 1.2 0 2.667 0h20c1.466 0 2.666 1.2 2.666 2.667v4h-8c-.733 0-1.333-.6-1.333-1.334C16 4.6 16.6 4 17.333 4H18V2.667h-.667a2.674 2.674 0 0 0-2.666 2.666C14.667 6.8 15.867 8 17.333 8h2v4h-2A3.301 3.301 0 0 0 14 15.333a3.301 3.301 0 0 0 3.333 3.334h1.334v-1.334h-1.334c-1.133 0-2-.866-2-2 0-1.133.867-2 2-2h8v4c0 1.467-1.2 2.667-2.666 2.667h-20A2.675 2.675 0 0 1 0 17.333v-4h8c1.133 0 2 .867 2 2 0 1.134-.867 2-2 2H6.667v1.334H8a3.301 3.301 0 0 0 3.333-3.334A3.3 3.3 0 0 0 8 12H6V8h2c1.467 0 2.667-1.2 2.667-2.667 0-1.466-1.2-2.666-2.667-2.666H6V4h2c.733 0 1.333.6 1.333 1.333 0 .734-.6 1.334-1.333 1.334H0Z"
			fill="#F8F7FA"
		/>
		<AnimatedPath d="M0 8v4h4.667V8H0ZM20.667 8h4.666v4h-4.666V8Z" fill="#F8F7FA" />
	</AnimatedSVG>
);

export default Chip;
