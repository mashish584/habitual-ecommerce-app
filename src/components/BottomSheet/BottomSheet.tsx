import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { Easing } from "react-native-reanimated";
import GBottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";

import { Header } from "../Header";
import BottomSheetI from "./types";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

const BottomSheet: React.FC<BottomSheetI> = ({ visible, headerTitle, onClose, children }) => {
	const bottomSheetRef = useRef<GBottomSheet>(null);
	const currentSnapIndex = useRef(0);

	const [contentHeight, setContentHeight] = useState(0);
	const snapPoints = useMemo(() => ["-10%", contentHeight], [contentHeight]);

	const handleOnLayout = useCallback(
		({
			nativeEvent: {
				layout: { height },
			},
		}) => {
			const maxHeight = SCREEN_HEIGHT * 0.5;
			setContentHeight(height <= maxHeight ? height : maxHeight);
		},
		[],
	);

	useEffect(() => {
		const snapIndex = currentSnapIndex.current;
		if (visible && snapIndex === 0) {
			currentSnapIndex.current = 1;
			bottomSheetRef.current?.expand();
		}

		if (!visible && snapIndex === 1) {
			currentSnapIndex.current = 0;
			bottomSheetRef.current?.close();
		}
	}, [visible]);

	return (
		<GBottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			index={0}
			animationEasing={Easing.out(Easing.quad)}
			animationDuration={250}
			handleComponent={(handleProps) => (
				<Header
					variant="primary"
					title={headerTitle}
					headerStyle={{
						borderTopLeftRadius: 15,
						borderTopRightRadius: 15,
						marginTop: 10,
						borderBottomWidth: 0,
					}}
					onAction={onClose}
					{...handleProps}
				/>
			)}
			enableContentPanningGesture={false}
			backdropComponent={(props) => (visible ? <BottomSheetBackdrop {...props} /> : null)}
			onChange={(index) => {
				if (index === -1) {
					onClose();
				}
			}}>
			<BottomSheetView onLayout={handleOnLayout}>{children}</BottomSheetView>
		</GBottomSheet>
	);
};

export default BottomSheet;
