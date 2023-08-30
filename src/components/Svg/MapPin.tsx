import * as React from "react";
import { AnimatedPath, AnimatedSVG } from "./index";
import { SVG } from "./types";

const MapPin = (props: SVG) => (
	<AnimatedSVG width={33} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<AnimatedPath d="m15.76 31.776.74-1.11.74 1.11a1.335 1.335 0 0 1-1.48 0Z" fill="#A6A6AA" />
		<AnimatedPath
			fillRule="evenodd"
			clipRule="evenodd"
			d="M16.5 8a5.333 5.333 0 1 0 0 10.667A5.333 5.333 0 0 0 16.5 8Zm-2.667 5.333a2.667 2.667 0 1 1 5.334 0 2.667 2.667 0 0 1-5.334 0Z"
			fill="#A6A6AA"
		/>
		<AnimatedPath
			fillRule="evenodd"
			clipRule="evenodd"
			d="m15.76 31.776.74-1.11c.74 1.11.741 1.109.741 1.109l.003-.002.009-.006.03-.02.11-.076a37.973 37.973 0 0 0 1.812-1.357 41.91 41.91 0 0 0 4.263-3.897c3.053-3.223 6.365-7.881 6.365-13.084a13.334 13.334 0 0 0-26.666 0c0 5.203 3.312 9.861 6.365 13.084a41.908 41.908 0 0 0 5.672 4.969 25.091 25.091 0 0 0 .512.36l.03.021.01.006.004.003ZM8.957 5.79a10.667 10.667 0 0 1 18.21 7.542c0 4.131-2.688 8.14-5.635 11.25A39.227 39.227 0 0 1 16.5 29.03a39.238 39.238 0 0 1-5.032-4.447c-2.947-3.11-5.635-7.119-5.635-11.25 0-2.829 1.124-5.542 3.124-7.542Z"
			fill="#A6A6AA"
		/>
	</AnimatedSVG>
);

export default MapPin;
