import * as configs from "./configs";
import {
	PACKAGES,
	currDirFiles,
	spawnOptions,
	withNextJS,
	withReact,
	withTS,
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
	let currDirPackageManager = manager;

	if (
		currDirFiles.length === 0 ||
		(currDirFiles.length > 0 && !currDirFiles.includes("package.json"))
	) {
		currDirPackageManager = "npm";
		child_process.spawnSync(
			currDirPackageManager,
			["init", "-y"],
			spawnOptions
		);
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
	const packages = String(
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
	const [fileName, ogFile] = buildDestinationFileName(configName);

	writeFileSync(resolve(process.cwd(), fileName), ogFile);
}

export { buildDestinationFileName, installDeps, copyConfig };
