/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const { installDeps } = require("./installDeps");

const { MultiSelect, Confirm, Select } = require("enquirer");

const configOptions = {
	eslint: /** @type {const} */ (["./.eslintrc.js", ".eslintrc.js"]),
	prettier: /** @type {const} */ (["./prettier/.prettierrc", ".prettierrc"]),
	biomejs: /** @type {const} */ (["./biome.json", "biome.json"]),
};

/**
 * @type {import("./types").BuildDestinationFileName}
 */
function buildDestinationFileName(configName, withTailwind) {
	if (configName === "prettier" && withTailwind) {
		return ["./prettier/.prettierrc-tw", ".prettierrc"];
	}
	return configOptions[configName];
}

/**
 * @param {import("./types").ConfigOptions} configName
 * @param {boolean} withTailwind
 */
function copyConfig(configName, withTailwind) {
	const [ogFile, fileName] = buildDestinationFileName(
		configName,
		withTailwind,
	);

	fs.copyFileSync(
		path.resolve(__dirname, ogFile),
		path.resolve(process.cwd(), fileName),
	);
}

(async () => {
	const configType = await new MultiSelect({
		name: "configType",
		message: "What configs do you want to copy over?",
		choices: [
			{ name: "ESlint", value: "eslint" },
			{ name: "Prettier", value: "prettier" },
			{ name: "BiomeJS", value: "biomejs" },
		],
		limit: 3,
	})
		.run()
		.then((ans) => ans.map((res) => res.toLowerCase()))
		.catch(console.error);

	const withTailwind = new Confirm({
		name: "withTailwind",
		message: "Are you using tailwind?",
		type: "confirm",
		initial: true,
	});

	if (configType.includes("tailwind")) {
		tailwind
			.run()
			.then((ans) => ans.toLowerCase())
			.catch(console.error);
	}

	const packageManager = await new Select({
		name: "packageManager",
		message: "What package manager that you have do you prefer?",
		type: "select",
		choices: [
			{
				title: "Current",
				value: "current",
			},
			{
				title: "Npm",
				value: "npm",
			},
			{
				title: "Yarn",
				value: "yarn",
			},
			{
				title: "Pnpm",
				value: "pnpm",
			},
		],
		validate: (option) => (!option ? "Select an option" : true),
	})
		.run()
		.then((ans) => ans.toLowerCase())
		.catch(console.error);

	if (configType.length === 0 || !packageManager) {
		return;
	}

	for (const config of configType) {
		copyConfig(config, withTailwind);
	}

	installDeps(packageManager, configType, withTailwind);
})();
