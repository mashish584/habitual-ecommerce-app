import React from "react";

import { SVG } from "./types";
import { AnimatedG, AnimatedPath, AnimatedSVG } from "./index";

const Bag = (props: SVG) => {
	return (
		<AnimatedSVG width={32} height={33} xmlns="http://www.w3.org/2000/svg" {...props}>
			<AnimatedPath
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.433 1.867A1.333 1.333 0 0 1 8.5 1.333h16c.42 0 .815.198 1.067.534l3.991 5.322c.173.225.275.506.275.811v18.667a4 4 0 0 1-4 4H7.167a4 4 0 0 1-4-4V8c0-.305.102-.586.274-.81l3.992-5.323Zm-1.6 7.466v17.334A1.333 1.333 0 0 0 7.167 28h18.666a1.334 1.334 0 0 0 1.334-1.333V9.333H5.833Zm20-2.666H7.167l2-2.667h14.666l2 2.667ZM11.167 12c.736 0 1.333.597 1.333 1.333a4 4 0 1 0 8 0 1.333 1.333 0 0 1 2.667 0 6.667 6.667 0 0 1-13.334 0c0-.736.597-1.333 1.334-1.333Z"
				fill={props.fill}
			/>
		</AnimatedSVG>
	);
};

export const SmallBag = (props: SVG) => {
	return (
		<AnimatedSVG width={20} height={20} xmlns="http://www.w3.org/2000/svg" {...props}>
			<AnimatedG clipPath="url(#a)">
				<AnimatedPath
					fillRule="evenodd"
					clipRule="evenodd"
					d="M4.333 1.167A.833.833 0 0 1 5 .833h10c.262 0 .51.124.667.334l2.495 3.326a.828.828 0 0 1 .171.507v11.667a2.5 2.5 0 0 1-2.5 2.5H4.167a2.5 2.5 0 0 1-2.5-2.5V5a.83.83 0 0 1 .171-.507l2.495-3.326Zm-1 4.666v10.834a.833.833 0 0 0 .834.833h11.666a.834.834 0 0 0 .834-.833V5.833H3.333Zm12.5-1.666H4.167L5.417 2.5h9.166l1.25 1.667ZM6.667 7.5c.46 0 .833.373.833.833a2.5 2.5 0 1 0 5 0 .833.833 0 0 1 1.667 0 4.167 4.167 0 1 1-8.334 0c0-.46.374-.833.834-.833Z"
					fill={props.fill}
				/>
			</AnimatedG>
		</AnimatedSVG>
	);
};

export default Bag;
