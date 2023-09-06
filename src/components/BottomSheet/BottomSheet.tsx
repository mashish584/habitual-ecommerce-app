import React, { PropsWithChildren, useEffect, useMemo, useRef } from "react";
import { StyleSheet, Pressable } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GBottomSheet, { BottomSheetView, useBottomSheetDynamicSnapPoints } from "@gorhom/bottom-sheet";

import { Header } from "../Header";

import { rgba } from "../../utils/theme";

import BottomSheetI from "./types";

const BottomSheet = ({ visible, headerTitle, onClose, children }: PropsWithChildren<BottomSheetI>) => {
	const bottomSheetRef = useRef<GBottomSheet>(null);
	const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
	const { bottom } = useSafeAreaInsets();

	const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

	useEffect(() => {
		if (visible) {
			bottomSheetRef.current?.expand();
		}

		if (!visible) {
			bottomSheetRef.current?.close();
		}
	}, [visible]);

	return (
		<GBottomSheet
			ref={bottomSheetRef}
			index={-1}
			snapPoints={animatedSnapPoints as (string | number)[] | SharedValue<(string | number)[]>}
			handleHeight={animatedHandleHeight}
			contentHeight={animatedContentHeight}
			enablePanDownToClose={true}
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
			backdropComponent={() =>
				visible ? <Pressable style={{ ...StyleSheet.absoluteFillObject, backgroundColor: rgba.black(0.5) }} onPress={onClose} /> : null
			}
			onChange={(index) => {
				if (index === -1) {
					onClose();
				}
			}}>
			<BottomSheetView style={{ paddingBottom: bottom }} onLayout={handleContentLayout}>
				{children}
			</BottomSheetView>
		</GBottomSheet>
	);
};

export default BottomSheet;
