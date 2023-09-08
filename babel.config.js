module.exports = {
	presets: ["module:metro-react-native-babel-preset"],
	plugins: [
		"react-native-reanimated/plugin",
		[
			"module-resolver",
			{
				extensions: [".ios.js", ".android.js", ".ios.jsx", ".android.jsx", ".js", ".jsx", ".json", ".ts", ".tsx"],
				root: ["."],
				alias: {
					"@assets": "./src/assets",
					"@components": "./src/components",
					"@screens": "./src/screens",
					"@utils": "./src/utils",
					"@hooks": "./src/hooks",
					"@nav": "./src/navigation",
				},
			},
		],
	],
};
