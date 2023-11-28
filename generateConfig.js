#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const { installDeps } = require("./installDeps");

const { prompt } = require("enquirer");

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
	const answers = await prompt([
		{
			name: "configType",
			message: "What configs do you want to copy over?",
			type: "multiselect",
			choices: ["ESlint", "Prettier"],
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
	if (answers.configType.length === 0 || !answers.packageManager) {
		return;
	}

	for (const config of answers.configType) {
		copyConfig(config.toLowerCase(), answers.withTailwind);
	}
	installDeps(
		answers.packageManager,
		answers.configType,
		answers.withTailwind
	);
})();
