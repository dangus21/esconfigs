#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const prompts = require("prompts");

function copyConfig(configName) {
	const configFileName =
		configName === "eslint" ? `./${configName}.js` : `.${configName}`;
	fs.copyFileSync(
		path.resolve(__dirname, configFileName),
		path.resolve(process.cwd(), configFileName)
	);
}

(async function () {
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
		}
	]);

	if (response.configType.length === 0) {
		return;
	}

	for (const config of response.configType) {
		copyConfig(config);
	}
})();
