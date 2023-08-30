import ImagePicker, { ImageOrVideo, Options } from "react-native-image-crop-picker";
import { checkGalleryPermission } from "./permissions";
import { MergedRoutes } from "../navigation/types";
import { UIInterface } from "./store";

const ImageConfig: Options = {
	width: 400,
	height: 400,
	compressImageQuality: 0.6,
};

const generateFileName = (media: ImageOrVideo & { uri?: any; type?: any }) => {
	const extension = media.sourceURL?.split(".").pop();

	return {
		uri: media.path || media.uri,
		fileName: `media_${Date.now()}.${extension}`,
		name: `media__${Date.now()}.${extension}`,
		path: media.path,
		type: media.mime || media.type,
		width: media.width,
		height: media.height,
		fileSize: media.size,
		data: media.path,
	};
};

const formatFiles = (files: ImageOrVideo[]) => {
	return files.map((file) => generateFileName(file));
};

export const openCamera = async (options?: Options) => {
	const config: Options = { ...ImageConfig, useFrontCamera: true, ...options };
	await ImagePicker.openCamera(config);
};

export const openGallery = async (options?: Options) => {
	const isGalleryPermissionGiven = await checkGalleryPermission();

	if (!isGalleryPermissionGiven) return;

	const config: Options = { ...ImageConfig, ...options };
	const response = await ImagePicker.openPicker(config);
	const files = config.multiple ? response : [response];

	return formatFiles(files as ImageOrVideo[]);
};

// password confirmation object

export const getPasswordConfirmationModal = (
	updateValue: (options: Pick<UIInterface, "showConfirmationModal">) => void,
	onNavigate: (screen: keyof MergedRoutes) => void,
) => ({
	showConfirmationModal: true,
	headerTitle: "Habitual Ecommerce",
	message: "Please login to continue.",
	acceptText: "Login",
	rejectText: "Cancel",
	onAction: (action: "Yes" | "No") => {
		if (action === "Yes") {
			updateValue({ showConfirmationModal: false });
			onNavigate("UnauthStack");
		} else {
			updateValue({ showConfirmationModal: false });
		}
	},
});
