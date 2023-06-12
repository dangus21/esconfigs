// This is a patch so that eslint will load the plugins as dependencies. Otherwise we can to install EVERYTHING in th root project
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
	extends: [
		"airbnb",
		"plugin:react/recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
		"eslint:recommended",
		"prettier"
	],
	parser: "@babel/eslint-parser",
	env: {
		browser: true,
		node: true,
		jquery: true,
		jest: true
	},
	rules: {
		"no-debugger": 0,
		"import/no-cycle": "off",
		"no-alert": 0,
		"no-await-in-loop": 0,
		"no-return-assign": ["error", "except-parens"],
		"no-restricted-syntax": [
			2,
			"ForInStatement",
			"LabeledStatement",
			"WithStatement"
		],
		"no-unused-vars": [
			1,
			{
				ignoreRestSiblings: true,
				argsIgnorePattern: "res|next|^err|^_",
				varsIgnorePattern: "^_"
				// Broken in TypeSCript.Want this turned on
				// destructuredArrayIgnorePattern: '^_',
			}
		],
		"prefer-const": ["error", { destructuring: "all" }],
		"arrow-body-style": [2, "as-needed"],
		"no-unused-expressions": [
			"error",
			{
				allowTaggedTemplates: true,
				allowShortCircuit: true,
				allowTernary: true
			}
		],
		"no-param-reassign": [2, { props: false }],
		"no-console": 0,
		"import/prefer-default-export": 0,
		import: 0,
		"func-names": 0,
		"space-before-function-paren": 0,
		"comma-dangle": 0,
		"max-len": 0,
		"import/extensions": 0,
		"no-underscore-dangle": 0,
		"consistent-return": 0,
		"react/display-name": 1,
		"react/no-array-index-key": 0,
		"react/react-in-jsx-scope": 0,
		"react/prefer-stateless-function": 0,
		"react/forbid-prop-types": 0,
		"react/no-unescaped-entities": 0,
		"react/function-component-definition": 0,
		"react/require-default-props": 0,
		"react/jsx-filename-extension": [
			1,
			{ extensions: [".js", ".jsx", ".ts", ".tsx", ".mdx"] }
		],
		radix: 0,
		"no-shadow": [
			2,
			{
				hoist: "all",
				allow: ["resolve", "reject", "done", "next", "err", "error"]
			}
		],
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"@typescript-eslint/comma-dangle": ["off"],
		"react/jsx-props-no-spreading": "off",

		"react/jsx-uses-react": "error",
		"react/jsx-uses-vars": "error",
		"react/prop-types": 0,
		"react/jsx-curly-brace-presence": [
			"error",
			{
				props: "never",
				children: "never"
			}
		],
		"no-use-before-define": "error",
		"no-duplicate-imports": 2,
		"no-dupe-class-members": ["error"],
		"import/no-extraneous-dependencies": [
			"error",
			{
				devDependencies: true
			}
		],
		"prefer-template": ["error"]
	},
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			extends: ["plugin:import/typescript"],
			parser: "@typescript-eslint/parser",
			plugins: ["@typescript-eslint"],
			rules: {
				"no-unused-vars": "off",
				"@typescript-eslint/no-unused-vars": [
					2,
					{ ignoreRestSiblings: true }
				],
				"no-dupe-class-members": "off",
				"@typescript-eslint/no-dupe-class-members": ["error"],
				"@typescript-eslint/adjacent-overload-signatures": "off",
				"@typescript-eslint/array-type": [
					"error",
					{ default: "array" }
				],
				"@typescript-eslint/ban-types": [
					"error",
					{
						types: {
							Object: {
								message:
									"Avoid using the `Object` type. Did you mean `object`?"
							},
							Function: {
								message:
									"Avoid using the `Function` type. Prefer a specific function type, like `() => void`."
							},
							Boolean: {
								message:
									"Avoid using the `Boolean` type. Did you mean `boolean`?"
							},
							Number: {
								message:
									"Avoid using the `Number` type. Did you mean `number`?"
							},
							String: {
								message:
									"Avoid using the `String` type. Did you mean `string`?"
							},
							Symbol: {
								message:
									"Avoid using the `Symbol` type. Did you mean `symbol`?"
							}
						}
					}
				],
				"@typescript-eslint/consistent-type-assertions": "error",
				"@typescript-eslint/dot-notation": "error",
				"@typescript-eslint/indent": "off",
				"@typescript-eslint/no-empty-function": "error",
				"@typescript-eslint/no-empty-interface": "error",
				"@typescript-eslint/no-explicit-any": "warn",
				"@typescript-eslint/no-misused-new": "error",
				"@typescript-eslint/no-namespace": "error",
				"@typescript-eslint/no-parameter-properties": "off",
				"@typescript-eslint/no-unused-expressions": "error",
				"@typescript-eslint/no-use-before-define": "warn",
				"@typescript-eslint/no-var-requires": "off",
				"@typescript-eslint/prefer-for-of": "error",
				"@typescript-eslint/prefer-function-type": "error",
				"@typescript-eslint/prefer-namespace-keyword": "error",
				"@typescript-eslint/quotes": "off",
				"@typescript-eslint/triple-slash-reference": [
					"error",
					{
						path: "always",
						types: "prefer-import",
						lib: "always"
					}
				],
				"@typescript-eslint/unified-signatures": "error",
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
		}
	],
	plugins: [
		"html",
		"react-hooks",
		"react",
		"unused-imports",
		"babel",
		"sort-imports-es6-autofix",
		"import",
		"prettier"
	]
};
