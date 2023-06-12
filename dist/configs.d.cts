declare const biome: {
    $schema: string;
    organizeImports: {
        enabled: boolean;
    };
    linter: {
        enabled: boolean;
        rules: {
            recommended: boolean;
            style: {
                noNonNullAssertion: string;
                useFragmentSyntax: string;
                useTemplate: string;
                noUselessElse: string;
            };
            correctness: {
                recommended: boolean;
                noUnusedVariables: string;
                noUnusedImports: string;
                useExhaustiveDependencies: string;
            };
            suspicious: {
                recommended: boolean;
            };
            a11y: {
                recommended: boolean;
            };
            complexity: {
                recommended: boolean;
            };
            security: {};
            performance: {};
        };
    };
    javascript: {
        formatter: {
            enabled: boolean;
            arrowParentheses: string;
            jsxQuoteStyle: string;
            semicolons: string;
            quoteProperties: string;
            bracketSpacing: boolean;
            bracketSameLine: boolean;
            indentWidth: number;
            indentStyle: string;
            quoteStyle: string;
            lineEnding: string;
            lineWidth: number;
        };
    };
};
declare const eslint: {
    env: {
        browser: boolean;
        node: boolean;
        es2021: boolean;
    };
    extends: any[];
    plugins: string[];
    rules: {
        "sort-imports-es6-autofix/sort-imports-es6": (number | {
            ignoreCase: boolean;
            ignoreMemberSort: boolean;
            memberSyntaxSortOrder: string[];
        })[];
    };
    settings: {};
};
declare const prettier: {
    singleQuote: boolean;
    trailingComma: string;
    endOfLine: string;
    printWidth: number;
    useTabs: boolean;
    tabWidth: number;
    bracketSpacing: boolean;
    arrowParens: string;
};
declare const editorConfig = "\n# editorconfig.org\nroot = true\n\n[*]\nindent_style = tab\nindent_size = 2\nend_of_line = lf\ncharset = utf-8\ntrim_trailing_whitespace = true\ninsert_final_newline = true\n\n[*.md]\ntrim_trailing_whitespace = false\n";

export { biome, editorConfig, eslint, prettier };
