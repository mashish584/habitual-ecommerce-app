import React, { PropsWithChildren, useEffect, useMemo, useRef } from "react";
import { StyleSheet, Pressable, Dimensions, NativeEventSubscription, BackHandler } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GBottomSheet, { BottomSheetFooter, BottomSheetView, useBottomSheetDynamicSnapPoints } from "@gorhom/bottom-sheet";

import { isIOS } from "@utils/index";
import { rgba } from "@utils/theme";

import { Header } from "../Header";
import BottomSheetI from "./types";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

const BottomSheet = ({ visible, headerTitle, onClose, footerComponent, isFullViewSheet, children }: PropsWithChildren<BottomSheetI>) => {
	const bottomSheetRef = useRef<GBottomSheet>(null);
	const { bottom, top } = useSafeAreaInsets();
	const topSnapPoint = isIOS ? SCREEN_HEIGHT - top : "100%";

	const initialSnapPoints = useMemo(() => (isFullViewSheet ? ["CONTENT_HEIGHT", topSnapPoint] : ["CONTENT_HEIGHT"]), [topSnapPoint]);

	const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

	useEffect(() => {
		let backHandler: NativeEventSubscription | null = null;
		if (visible) {
			bottomSheetRef.current?.expand();
			backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
				onClose();
				return true;
			});
		}

		if (!visible) {
			bottomSheetRef.current?.close();
		}

		return () => {
			backHandler?.remove();
		};
	}, [visible]);

	return (
		<GBottomSheet
			ref={bottomSheetRef}
			index={-1}
			snapPoints={animatedSnapPoints as (string | number)[] | SharedValue<(string | number)[]>}
			handleHeight={animatedHandleHeight}
			contentHeight={animatedContentHeight}
			enablePanDownToClose={true}
			footerComponent={footerComponent}
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
export { BottomSheetFooter };
