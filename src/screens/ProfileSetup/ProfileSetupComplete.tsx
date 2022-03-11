import React from "react";
import Success from "../../components/Success";

export default () => {
	return (
		<Success
			title="Woohoo!"
			description={"Registration complete! Get ready to have the\n best shopping experiences of your life."}
			buttonText="Let the shopping begin!"
			buttonVariant="primary"
			onAction={() => {}}
		/>
	);
};
