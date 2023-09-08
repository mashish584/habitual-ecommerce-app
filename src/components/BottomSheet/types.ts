interface BottomSheet {
	visible: boolean;
	headerTitle: string;
	footerComponent?: () => React.JSX.Element;
	isFullViewSheet?: boolean | undefined;
	onClose: () => void;
}

export default BottomSheet;
