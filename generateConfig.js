#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const prompts = require("prompts");
const { installDeps } = require("./installDeps");

const configOptions = {
	eslint: /** @type {const} */ (["./eslint/index.js", ".eslintrc.js"]),
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
			],
			min: 1,
			max: 2
		},
		{
			name: "withTailwind",
			message: "Are you using tailwind?",
			type: "confirm",
			initial: true
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
			],
			validate: (option) => (!option ? "Select an option" : true)
		}
	]);

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
})();
