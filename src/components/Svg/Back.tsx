import React from "react";
import { SVG } from "./types";
import { AnimatedPath, AnimatedSVG } from "./index";

const Back = (props: SVG) => (
	<AnimatedSVG width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<AnimatedPath
			fillRule="evenodd"
			clipRule="evenodd"
			d="M.333 7c0-.46.373-.833.834-.833h11.666a.833.833 0 0 1 0 1.666H1.167A.833.833 0 0 1 .333 7Z"
			fill={props.fill}
		/>
		<AnimatedPath
			fillRule="evenodd"
			clipRule="evenodd"
			d="M7.59.577a.833.833 0 0 1 0 1.179L2.344 7l5.244 5.244a.833.833 0 1 1-1.178 1.179L.577 7.589a.833.833 0 0 1 0-1.178L6.411.577a.833.833 0 0 1 1.178 0Z"
			fill={props.fill}
		/>
	</AnimatedSVG>
);

export default Back;
