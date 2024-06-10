const biome = `{
	"$schema": "https://biomejs.dev/schemas/1.4.1/schema.json",
	"organizeImports": {
		"enabled": true
	},
	"linter": {
		"enabled": true,
		"rules": {
			"recommended": true,
			"style": {
				"noNonNullAssertion": "off",
				"useFragmentSyntax": "error",
				"useTemplate": "error",
				"noUselessElse": "error"
			},
			"correctness": {
				"noUnusedVariables": "error",
				"useExhaustiveDependencies": "error"
			},
			"suspicious": {
				"recommended": true
			},
			"a11y": {
				"recommended": true
			},
			"complexity": {
				"recommended": true
			},
			"security": {},
			"performance": {}
		}
	},
	"formatter": {
		"enabled": true,
		"formatWithErrors": false,
		"indentStyle": "tab",
		"indentWidth": 4,
		"lineWidth": 80,
		"lineEnding": "lf",
		"ignore": [
			"node_modules"
		]
	},
	"javascript": {
		"formatter": {
			"enabled": true,
			"arrowParentheses": "always",
			"jsxQuoteStyle": "double",
			"semicolons": "always",
			"quoteProperties": "asNeeded",
			"bracketSpacing": true,
			"bracketSameLine": false,
			"indentWidth": 4,
			"indentStyle": "tab",
			"quoteStyle": "double",
			"lineEnding": "lf",
			"lineWidth": 80
		}
	},
	"vcs": {
		"enabled": true,
		"clientKind": "git"
	},
	"files": {
		"ignore": [
			"./src/routeTree.gen.ts"
		]
	}
}`

const eslint = `
module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	extends: [
		"plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
		"plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
	],
	parser: "@typescript-eslint/parser",
	plugins: [
		"unused-imports",
		"sort-imports-es6-autofix",
		"import",
		"@typescript-eslint",
	],
	rules: {
		"react/react-in-jsx-scope": 0,
		"@typescript-eslint/no-unused-vars": [2, { ignoreRestSiblings: true }],
		"@typescript-eslint/naming-convention": [
			"warn",
			{
				selector: "interface",
				format: ["PascalCase"],
				custom: {
					regex: "^I[A-Z]",
					match: false,
				},
			},
		],
	},
	settings: {
		react: {
			version: "detect",
		},
		"import/resolver": {
			typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
		},
	},
};
`

const prettier = `{
	"singleQuote": false,
	"trailingComma": "none",
	"endOfLine": "lf",
	"printWidth": 80,
	"useTabs": true,
	"tabWidth": 4,
	"bracketSpacing": true,
	"arrowParens": "always"
}`

const prettierTW = `{
	"singleQuote": false,
	"trailingComma": "none",
	"endOfLine": "lf",
	"printWidth": 80,
	"useTabs": true,
	"tabWidth": 4,
	"bracketSpacing": true,
	"arrowParens": "always",
	"plugins": [
		"prettier-plugin-tailwindcss"
	]
}`

export { biome, eslint, prettier, prettierTW }
