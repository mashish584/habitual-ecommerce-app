import React from "react";

import { SVG } from "./types";
import { AnimatedPath, AnimatedSVG } from "./index";

const Bag = (props: SVG) => {
	return (
		<AnimatedSVG width={props.width || 32} height={props.height || 33} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<AnimatedPath
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.433 1.867A1.333 1.333 0 0 1 8.5 1.333h16c.42 0 .815.198 1.067.534l3.991 5.322c.173.225.275.506.275.811v18.667a4 4 0 0 1-4 4H7.167a4 4 0 0 1-4-4V8c0-.305.102-.586.274-.81l3.992-5.323Zm-1.6 7.466v17.334A1.333 1.333 0 0 0 7.167 28h18.666a1.334 1.334 0 0 0 1.334-1.333V9.333H5.833Zm20-2.666H7.167l2-2.667h14.666l2 2.667ZM11.167 12c.736 0 1.333.597 1.333 1.333a4 4 0 1 0 8 0 1.333 1.333 0 0 1 2.667 0 6.667 6.667 0 0 1-13.334 0c0-.736.597-1.333 1.334-1.333Z"
				fill={props.fill}
			/>
		</AnimatedSVG>
	);
};

export default Bag;
