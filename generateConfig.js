#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const prompts = require("prompts");

function copyConfig(configName) {
	fs.copyFileSync(
		path.resolve(__dirname, `./${configName}.js`),
		path.resolve(process.cwd(), `${configName}.js`)
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
