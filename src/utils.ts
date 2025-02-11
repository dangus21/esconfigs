import * as configs from "./configs";
import {
	PACKAGES,
	currDirFiles,
	cwd,
	spawnOptions,
	/* withNextJS,
	withReact,
	withTS, */
	withTailwind
} from "./const";
import child_process from "node:child_process";

import { eslintDeps } from "./const";
import { existsSync, readFileSync } from "fs";
import { resolve } from "node:path";
import { writeFileSync } from "node:fs";
import type { ConfigOption, PackageManager } from "./types";

function join(...paths: string[]): string {
	return paths.join("/").replace(/\/+/g, "/");
}

function prettyObject(obj: Record<string, unknown> | string) {
	if (typeof obj === "string") return obj;
	return JSON.stringify(obj, null, 2);
}

function buildDestinationFileAndFileName(
	configName: ConfigOption
): [string, string] {
	if (configName === "eslint") {
		/* if (withTS) {
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
		} */
		return [
			"eslint.config.mjs",
			configs.eslintv9
			// `module.exports = ${prettyObject(configs.eslintv9)}`
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

function detectCurrentPackageManager(): PackageManager {
	if (existsSync(join(cwd, PACKAGES.pnpm))) return "pnpm";
	if (existsSync(join(cwd, PACKAGES.yarn))) return "yarn";
	if (existsSync(join(cwd, PACKAGES.npm))) return "npm";
	return "npm"; // Default to npm if no lock file is found
}

function detectPackageManager(manager: PackageManager): PackageManager {
	if (
		currDirFiles.length === 0 ||
		(currDirFiles.length > 0 && !currDirFiles.includes("package.json"))
	) {
		child_process.spawnSync("npm", ["init", "-y"], spawnOptions);
	}

	if (manager === "current") {
		return detectCurrentPackageManager();
	}

	return manager;
}

function buildPackageList(
	config: ConfigOption[],
	withNextJS: boolean,
	withTailwind: boolean
): string {
	return String(
		[
			...(config.includes("prettier")
				? withTailwind
					? ["prettier", "prettier-plugin-tailwindcss"]
					: ["prettier"]
				: []),
			...(withNextJS ? [...eslintDeps, "@next/eslint-plugin-next"] : []),
			...(config.includes("eslint") ? eslintDeps : []),
			...(config.includes("biomejs") ? ["@biomejs/biome@latest"] : [])
		].join(" ")
	);
}

function installDeps({
	config,
	manager,
	withNextJS = false,
	withTailwind = false
}: {
	manager: NonNullable<PackageManager>;
	config: ConfigOption[];
	withNextJS: boolean;
	withTailwind: boolean;
}) {
	const currDirPackageManager = detectPackageManager(manager);
	const packages = buildPackageList(config, withNextJS, withTailwind);

	child_process.spawnSync(
		currDirPackageManager,
		[currDirPackageManager === "yarn" ? "add" : "install", packages],
		spawnOptions
	);
}

export function detectReactInPackageJson(): boolean {
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

function copyConfig(configName: ConfigOption) {
	try {
		const [fileName, ogFile] = buildDestinationFileAndFileName(configName);
		writeFileSync(resolve(process.cwd(), fileName), ogFile);
		console.log(`Successfully created ${fileName}`);
	} catch (error) {
		console.error(`Error creating ${configName} config:`, error);
	}
}

export {
	buildDestinationFileAndFileName as buildDestinationFileName,
	installDeps,
	copyConfig,
	detectCurrentPackageManager,
	detectPackageManager,
	buildPackageList
};
