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

export { biome, eslint, prettier, editorConfig };
