import { BottomSheetFooterProps } from "@gorhom/bottom-sheet";

interface BottomSheet {
	visible: boolean;
	headerTitle: string;
	footerComponent?: React.FC<BottomSheetFooterProps> | undefined;
	isFullViewSheet?: boolean | undefined;
	onClose: () => void;
}

export default BottomSheet;
export type { BottomSheetFooterProps };
