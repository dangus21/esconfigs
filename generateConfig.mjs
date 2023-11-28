#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { installDeps } from "./installDeps.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import inquirer from "inquirer";

const configOptions = {
	eslint: /** @type {const} */ (["./.eslintrc.js", ".eslintrc.js"]),
	prettier: /** @type {const} */ (["./prettier/.prettierrc", ".prettierrc"])
};

/**
 * @type {import("./types").BuildDestinationFileName}
 */
function buildDestinationFileName(configName, withTailwind) {
	if (configName === "prettier" && withTailwind) {
		return ["./prettier/.prettierrc-tw", ".prettierrc"];
	} else {
		return configOptions[configName];
	}
}

/**
 * @param {import("./types").ConfigOptions} configName
 * @param {boolean} withTailwind
 */
function copyConfig(configName, withTailwind) {
	const [ogFile, fileName] = buildDestinationFileName(
		configName,
		withTailwind
	);

	fs.copyFileSync(
		path.resolve(__dirname, ogFile),
		path.resolve(process.cwd(), fileName)
	);
}

(async function () {
	/**
	 * @type {import("./types").Prompt}
	 */

	inquirer
		.prompt([
			{
				name: "configType",
				message: "What configs do you want to copy over?",
				type: "checkbox",
				choices: [
					{
						title: "ESlint",
						value: "eslint"
					},
					{
						title: "Prettier",
						value: "prettier"
					}
				],
				min: 1,
				max: 2
			},
			{
				name: "withTailwind",
				message: "Are you using tailwind?",
				type: "confirm",
				initial: true,
				when: (answers) => answers.configType.includes("prettier")
			},
			{
				name: "packageManager",
				message: "What package manager that you have do you prefer?",
				type: "list",
				choices: [
					{
						title: "From working directory",
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
				validate: (option) => (!option ? "Select an option" : true)
			}
		])
		.then((response) => {
			if (response.configType.length === 0 || !response.packageManager) {
				return;
			}

			for (const config of response.configType) {
				copyConfig(config, response.withTailwind);
			}
			installDeps(
				response.packageManager,
				response.configType,
				response.withTailwind
			);
		});
})();
