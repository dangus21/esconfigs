module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true
	},
	extends: ["eslint:recommended"],
	parser: "@typescript-eslint/parser",
	plugins: [
		"unused-imports",
		"sort-imports-es6-autofix",
		"import",
		"@typescript-eslint"
	],
	rules: {
		"@typescript-eslint/no-unused-vars": [2, { ignoreRestSiblings: true }],
		"@typescript-eslint/naming-convention": [
			"warn",
			{
				selector: "interface",
				format: ["PascalCase"],
				custom: {
					regex: "^I[A-Z]",
					match: false
				}
			}
		]
	},
	settings: {
		react: {
			version: "detect"
		},
		"import/resolver": {
			typescript: {} // this loads <rootdir>/tsconfig.json to eslint
		}
	}
};
