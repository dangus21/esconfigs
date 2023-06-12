import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

import prompt from "prompts";

import * as configs from "./configs";
import { installDeps } from "./installDeps";

function detectReactInPackageJson(): boolean {
	const packageJsonPath = join(process.cwd(), "package.json");

	if (!existsSync(packageJsonPath)) {
		console.log("package.json not found in the current directory.");
		return false;
	}

	try {
		const packageData = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
		const dependencies = {
			...packageData.dependencies,
			...packageData.devDependencies
		};

		return "react" in dependencies || "react-dom" in dependencies;
	} catch (error) {
		console.error("Error reading or parsing package.json:", error);
		return false;
	}
}

const cwd = process.cwd();
const currDirFiles = readdirSync(cwd);
const withReact = detectReactInPackageJson();
const withTS = currDirFiles.some((file) => file.startsWith("tsconfig."));
const withNextJS = currDirFiles.some((file) => file.startsWith("next."));
const withTailwind = currDirFiles.some((file) => file.startsWith("tailwind."));

export type ConfigOption = "eslint" | "prettier" | "editorConfig" | "biomejs";
export type PackageManager = "npm" | "yarn" | "pnpm" | "current" | null;

function prettyObject(obj: Record<string, unknown> | string) {
	if (typeof obj === "string") return obj;
	return JSON.stringify(obj, null, 2);
}

function buildDestinationFileName(configName: ConfigOption): [string, string] {
	if (configName === "eslint") {
		if (withTS) {
			configs.eslint.extends.push(
				"plugin:@typescript-eslint/recommended"
			);
			configs.eslint["parser"] = "@typescript-eslint/parser";
			configs.eslint.plugins.push("@typescript-eslint");
			configs.eslint.rules["@typescript-eslint/no-unused-vars"] = [
				2,
				{ ignoreRestSiblings: true }
			];
			configs.eslint.rules["@typescript-eslint/naming-convention"] = [
				"warn",
				{
					selector: "interface",
					format: ["PascalCase"],
					custom: {
						regex: "^I[A-Z]",
						match: false
					}
				}
			];
			configs.eslint.settings["import/resolver"] = {
				// This loads <rootdir>/tsconfig.json to eslint
				typescript: {}
			};
		}
		if (withReact) {
			configs.eslint.extends.push(
				"plugin:react/recommended",
				"plugin:react-hooks/recommended"
			);
			configs.eslint.rules["react-hooks/exhaustive-deps"] = 2;
			configs.eslint.rules["react/react-in-jsx-scope"] = 0;
			configs.eslint.settings["react"] = { version: "detect" };
		}
		if (withNextJS) {
			configs.eslint.extends.push("plugin:@next/next/recommended");
		}
		return [
			".eslintrc.js",
			`module.exports = ${prettyObject(configs.eslint)}`
		];
	}

	if (configName === "prettier") {
		if (withTailwind) {
			configs.prettier["plugins"] = ["prettier-plugin-tailwindcss"];
		}
		return [".prettierrc", prettyObject(configs.prettier)];
	}

	if (configName === "biomejs") {
		return ["biome.json", prettyObject(configs.biome)];
	}

	if (configName === "editorConfig") {
		return [".editorConfig", configs.editorConfig];
	}
}

function copyConfig(configName: ConfigOption) {
	const [fileName, ogFile] = buildDestinationFileName(configName);

	writeFileSync(resolve(process.cwd(), fileName), ogFile);
}

(async () => {
	const { configType }: { configType: ConfigOption[] } = await prompt({
		type: "multiselect",
		name: "configType",
		message: "What configs do you want to copy over?",
		choices: [
			{ title: "ESlint", value: "eslint" },
			{ title: "Prettier", value: "prettier" },
			{ title: "Editor Config", value: "editorConfig" },
			{ title: "BiomeJS", value: "biomejs" }
		]
	});

	let packageManagerOption: PackageManager;
	if (configType) {
		const { packageManager }: { packageManager: PackageManager } =
			await prompt({
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
				validate: (option: { title: string; value: string }) =>
					!option ? "Select an option" : true
			});
		packageManagerOption = packageManager;
	}

	if (configType && packageManagerOption) {
		if (configType.length >= 0 && packageManagerOption) {
			for (const configName of configType) {
				copyConfig(configName);
			}

			installDeps({
				manager: packageManagerOption,
				config: configType,
				withNextJS,
				withTailwind
			});
		}
	}
})();
