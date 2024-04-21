import { writeFileSync } from "fs";
import path from "path";
import { prompt } from "prompts";

import { installDeps } from "./installDeps";
import * as configs from "./configs"

export type ConfigOption = "eslint" | "prettier" | "biomejs";
export type PackageManager = "npm" | "yarn" | "pnpm" | "current" | null;
export type Prompt = {
	configType: [ConfigOption];
	packageManager: PackageManager;
	withTailwind: boolean;
};
export type BuildDestinationFileName = (
	configName: ConfigOption,
	withTailwind: boolean
) => [string, string];



const configOptions: { [key: string]: [string, string] } = {
	eslint: [configs.eslint, ".eslintrc.js"],
	prettier: [configs.prettier, ".prettierrc"],
	biomejs: [configs.biome, "biome.json"],
};

function buildDestinationFileName(configName: ConfigOption, withTailwind: boolean): [string, string] {
	if (configName === "prettier" && withTailwind) {
		return [configs.prettierTW, ".prettierrc"];
	}
	return configOptions[configName];
}

function copyConfig(configName: ConfigOption, withTailwind: boolean) {
	const [ogFile, fileName] = buildDestinationFileName(
		configName,
		withTailwind,
	);

	writeFileSync(
		path.resolve(process.cwd(), fileName),
		ogFile,
	);
}

(async () => {
	const { configType }: { configType: ConfigOption[] } = await prompt({
		type: "multiselect",
		name: "configType",
		message: "What configs do you want to copy over?",
		choices: [
			{ name: "ESlint", value: "eslint" },
			{ name: "Prettier", value: "prettier" },
			{ name: "BiomeJS", value: "biomejs" },
		],
	})

	const { withTailwind }: { withTailwind: boolean } = await prompt({
		name: "withTailwind",
		message: "Are you using tailwind?",
		type: "confirm",
		initial: true,
	});

	const { packageManager }: { packageManager: PackageManager } = await prompt({
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

	if (configType.length >= 0 && packageManager) {
		for (const entry of configType) {
			copyConfig(entry, withTailwind);
		}

		installDeps(packageManager, configType, withTailwind);
	}
})()
