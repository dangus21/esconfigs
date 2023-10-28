#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const prompts = require("prompts");

function copyPrettierConfig() {
	fs.copyFileSync(
		path.resolve(__dirname, "./.prettierrc"),
		path.resolve(process.cwd(), ".prettierrc")
	);
}

function copyEslintConfig() {
	fs.copyFileSync(
		path.resolve(__dirname, "./eslintrc.js"),
		path.resolve(process.cwd(), "eslintrc.js")
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

	if (response.configType.includes("prettier")) {
		copyPrettierConfig();
	} else if (response.configType.includes("includes")) {
		copyEslintConfig();
	} else {
		return;
	}
})();
