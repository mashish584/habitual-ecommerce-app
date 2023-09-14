import config from "./app.json";

module.exports = {
	name: config.name,
	version: "1.0.0", //Need to update when post version script run
	slug: "habitual-ecommerce",
	extra: {
		eas: {
			projectId: "32cc310e-b1f1-40a4-bf6c-22ec2148b087",
		},
	},
};
