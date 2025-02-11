const biome = {
	$schema: "https://biomejs.dev/schemas/1.8.3/schema.json",
	organizeImports: {
		enabled: true
	},
	linter: {
		enabled: true,
		rules: {
			recommended: true,
			style: {
				noNonNullAssertion: "off",
				useFragmentSyntax: "error",
				useTemplate: "error",
				noUselessElse: "error"
			},
			correctness: {
				recommended: true,
				noUnusedVariables: "error",
				noUnusedImports: "error",
				useExhaustiveDependencies: "error"
			},
			suspicious: {
				recommended: true
			},
			a11y: {
				recommended: true
			},
			complexity: {
				recommended: true
			},
			security: {},
			performance: {}
		}
	},
	javascript: {
		formatter: {
			enabled: true,
			arrowParentheses: "always",
			jsxQuoteStyle: "double",
			semicolons: "always",
			quoteProperties: "asNeeded",
			bracketSpacing: true,
			bracketSameLine: false,
			indentWidth: 4,
			indentStyle: "tab",
			quoteStyle: "double",
			lineEnding: "lf",
			lineWidth: 80
		}
	}
};

const eslint = {
	env: {
		browser: true,
		node: true,
		es2021: true
	},
	extends: [],
	plugins: ["import", "unused-imports", "sort-imports-es6-autofix"],
	rules: {
		"arrow-body-style": ["error", "as-needed"],
		"sort-imports-es6-autofix/sort-imports-es6": [
			2,
			{
				ignoreCase: false,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ["none", "all", "multiple", "single"]
			}
		]
	},
	settings: {}
};

const eslintv9 = `
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import path from "node:path";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";

import react from "eslint-plugin-react";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import sortImportsES6 from "eslint-plugin-sort-imports-es6-autofix";
import reactCompiler from "eslint-plugin-react-compiler";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import tailwindcss from "eslint-plugin-tailwindcss";
import tsParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default [
	...compat.extends("plugin:@typescript-eslint/recommended"),
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: { jsx: true }
			}
		},
		plugins: {
			react,
			"@typescript-eslint": tsPlugin,
			"unused-imports": unusedImports,
			"sort-imports-es6-autofix": sortImportsES6,
			"react-compiler": reactCompiler,
			import: importPlugin,
			"react-hooks": reactHooks,
			"@next/next": nextPlugin,
			tailwindcss
		},
		settings: {
			react: { version: "detect" },
			"import/resolver": { typescript: {} }
		},
		rules: {
			// ...react.rules,
			// ...tsPlugin.rules,
			// ...reactHooks.rules,
			// ...nextPlugin.rules,
			// ...tailwindcss.rules,

			// Custom rule overrides from your previous config:
			"unused-imports/no-unused-imports": "warn",
			"react-compiler/react-compiler": "error",
			"sort-imports-es6-autofix/sort-imports-es6": [
				"error",
				{
					ignoreCase: false,
					ignoreMemberSort: false,
					memberSyntaxSortOrder: ["none", "all", "multiple", "single"]
				}
			],
			"react/react-in-jsx-scope": "off",
			"@typescript-eslint/no-unused-expressions": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ ignoreRestSiblings: true }
			],
			"@typescript-eslint/naming-convention": [
				"warn",
				{
					selector: "interface",
					format: ["PascalCase"],
					custom: { regex: "^I[A-Z]", match: false }
				}
			]
		},

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},

			parser: tsParser
		}
	}
];
`;

const prettier = {
	singleQuote: false,
	trailingComma: "none",
	endOfLine: "lf",
	printWidth: 80,
	useTabs: true,
	tabWidth: 4,
	bracketSpacing: true,
	arrowParens: "always"
};

const editorConfig = `
# editorconfig.org
root = true

[*]
indent_style = tab
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
`;

export { biome, eslint, prettier, editorConfig, eslintv9 };
