import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import { fixupPluginRules } from "@eslint/compat";
import _import from "eslint-plugin-import";
import globals from "globals";
import js from "@eslint/js";
import path from "node:path";
import sortImportsEs6Autofix from "eslint-plugin-sort-imports-es6-autofix";
import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";

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
		plugins: {
			import: fixupPluginRules(_import),
			"unused-imports": unusedImports,
			"@typescript-eslint": typescriptEslint,
			"sort-imports-es6-autofix": sortImportsEs6Autofix
		},

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},

			parser: tsParser
		},

		rules: {
			"sort-imports-es6-autofix/sort-imports-es6": [
				2,
				{
					ignoreCase: false,
					ignoreMemberSort: false,
					memberSyntaxSortOrder: ["none", "all", "multiple", "single"]
				}
			],

			"@typescript-eslint/no-unused-vars": [
				2,
				{
					ignoreRestSiblings: true
				}
			],

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
];
