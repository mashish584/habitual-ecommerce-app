interface BottomSheet {
	visible: boolean;
	headerTitle: string;
	maxHeight?: number;
	onClose: () => void;
}

export default BottomSheet;
