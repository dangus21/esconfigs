var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
import { writeFileSync } from "fs";
import path2 from "path";
import { prompt } from "prompts";

// src/installDeps.ts
import { readdirSync } from "fs";
import { spawnSync } from "child_process";
var path = process.cwd();
var spawnOptions = {
  cwd: path,
  stdio: "inherit",
  env: process.env,
  shell: true,
  encoding: "buffer"
};
var eslintDeps = [
  "@typescript-eslint/eslint-plugin",
  "@typescript-eslint/parser",
  "eslint-import-resolver-typescript",
  "eslint-plugin-babel",
  "eslint-plugin-html",
  "eslint-plugin-import",
  "eslint-plugin-prettier",
  "eslint-plugin-react-hooks",
  "eslint-plugin-react",
  "eslint-plugin-sort-imports-es6-autofix",
  "eslint-plugin-unused-imports",
  "eslint"
];
var PACKAGES = {
  pnpm: "pnpm",
  yarn: "yarn",
  npm: "package-lock"
};
function installDeps(manager, config, withTailwind = false) {
  const currDirFiles = readdirSync(path);
  let currDirPackageManager = manager;
  if (currDirFiles.length === 0 || currDirFiles.length > 0 && !currDirFiles.includes("package.json")) {
    currDirPackageManager = "npm";
    spawnSync(currDirPackageManager, ["init", "-y"], spawnOptions);
  }
  if (manager === "current") {
    for (const file of currDirFiles) {
      switch (true) {
        case file.startsWith(PACKAGES.pnpm):
          currDirPackageManager = "pnpm";
          break;
        case file.startsWith(PACKAGES.yarn):
          currDirPackageManager = "yarn";
          break;
        case file.startsWith(PACKAGES.npm):
          currDirPackageManager = "npm";
          break;
        default:
          currDirPackageManager = "pnpm";
          break;
      }
    }
  } else {
    currDirPackageManager = manager;
  }
  console.log("LOG ~ currDirPackageManager:", currDirPackageManager);
  const packages = String(
    [
      ...config.includes("prettier") ? withTailwind ? ["prettier", "prettier-plugin-tailwindcss"] : ["prettier"] : [],
      ...config.includes("eslint") ? eslintDeps : [],
      ...config.includes("biomejs") ? ["@biomejs/biome@latest"] : []
    ].join(" ")
  );
}

// src/configs.ts
var biome = `{
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
			"nursery": {
				"noUnusedImports": "error",
				"useAwait": "error"
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
			"trailingComma": "all",
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
}`;
var eslint = `
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
`;
var prettier = `{
	"singleQuote": false,
	"trailingComma": "none",
	"endOfLine": "lf",
	"printWidth": 80,
	"useTabs": true,
	"tabWidth": 4,
	"bracketSpacing": true,
	"arrowParens": "always"
}`;
var prettierTW = `{
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
}`;

// src/index.ts
var configOptions = {
  eslint: [eslint, ".eslintrc.js"],
  prettier: [prettier, ".prettierrc"],
  biomejs: [biome, "biome.json"]
};
function buildDestinationFileName(configName, withTailwind) {
  if (configName === "prettier" && withTailwind) {
    return [prettierTW, ".prettierrc"];
  }
  return configOptions[configName];
}
function copyConfig(configName, withTailwind) {
  const [ogFile, fileName] = buildDestinationFileName(
    configName,
    withTailwind
  );
  writeFileSync(
    path2.resolve(process.cwd(), "test", fileName),
    ogFile
  );
}
(() => __async(void 0, null, function* () {
  const { configType } = yield prompt({
    type: "multiselect",
    name: "configType",
    message: "What configs do you want to copy over?",
    choices: [
      { name: "ESlint", value: "eslint" },
      { name: "Prettier", value: "prettier" },
      { name: "BiomeJS", value: "biomejs" }
    ]
  });
  const { withTailwind } = yield prompt({
    name: "withTailwind",
    message: "Are you using tailwind?",
    type: "confirm",
    initial: true
  });
  const { packageManager } = yield prompt({
    name: "packageManager",
    message: "What package manager that you have do you prefer?",
    type: "select",
    choices: [
      {
        title: "Current",
        value: "current"
      },
      {
        title: "Npm",
        value: "npm"
      },
      {
        title: "Yarn",
        value: "yarn"
      },
      {
        title: "Pnpm",
        value: "pnpm"
      }
    ],
    validate: (option) => !option ? "Select an option" : true
  });
  if (configType.length >= 0 && packageManager) {
    for (const entry of configType) {
      copyConfig(entry, withTailwind);
    }
    installDeps(packageManager, configType, withTailwind);
  }
}))();
//# sourceMappingURL=index.mjs.map