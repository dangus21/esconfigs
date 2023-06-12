module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true
	},
	extends: ["plugin:@typescript-eslint/recommended"],
	parser: "@typescript-eslint/parser",
	plugins: [
		"import",
		"unused-imports",
		"@typescript-eslint",
		"sort-imports-es6-autofix"
	],
	rules: {
		"sort-imports-es6-autofix/sort-imports-es6": [
			2,
			{
				ignoreCase: false,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ["none", "all", "multiple", "single"]
			}
		],
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
	}
};
