import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Singular, SingularConfig } from "singular-react-native";

const SingularInit = () => {
	const navigation = useNavigation<any>();

	useEffect(() => {
		//Singular initialization
		const apiKey = "bytelearn_8f969cad";
		const secret = "7e886327d8e9434cb87c9ad3ff007e4a";
		const config = new SingularConfig(apiKey, secret);
		config.withLoggingEnabled();
		config.withCustomUserId("ashishmehra@bytelearn.ai");
		config.withManualSkanConversionManagement();
		config.withSingularLink(async (singularLinksParams) => {
			const passthrough = singularLinksParams.passthrough;

			if (passthrough) {
				/* 
					- verify the referral from backend
					- on 200, we will check is onboarding is done or not
					- If done, navigate user to success screen
					- else save some key example "redirect" in Async
					- which we will be using at the whene skipping or 
					- moving away from third onboarding screen
				*/
				console.log(passthrough);
				console.log({ navigation });
				navigation.navigate("BottomStack");
			}
		});
		Singular.init(config);
	}, []);

	return null;
};

export default SingularInit;
