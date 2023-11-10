#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const prompts = require("prompts");
const { installDeps } = require("./installDeps");

const configOptions = {
	eslint: /** @type {const} */ (".eslintrc.js"),
	prettier: /** @type {const} */ (".prettierrc")
};

/**
 * @param {import("./types").ConfigOptions} configName
 */
function copyConfig(configName) {
	const configFileName = configOptions[configName];
	fs.copyFileSync(
		path.resolve(__dirname, configFileName),
		path.resolve(process.cwd(), configFileName)
	);
}

(async function () {
	/**
	 * @type {import("./types").Prompt}
	 */
	const response = await prompts([
		{
			name: "configType",
			message: "What configs do you want to copy over?",
			type: "multiselect",
			choices: [
				{
					title: "ESlint",
					value: "eslint"
				},
				{
					title: "Prettier",
					value: "prettier"
				}
			]
		},
		{
			name: "packageManager",
			message: "What package manager that you have do you prefer?",
			type: "select",
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
			]
		}
	]);

	if (response.configType.length === 0 || !response.packageManager) {
		return;
	}

	for (const config of response.configType) {
		copyConfig(config);
	}
	installDeps(response.packageManager, response.configType);
})();
