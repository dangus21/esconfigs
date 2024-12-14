#!/usr/bin/env node
import prompt from "prompts";

import { ConfigOption, PackageManager } from "./types";
import { copyConfig, installDeps } from "./utils";
import { withNextJS, withTailwind } from "./const";

(async () => {
	const { configType }: { configType: ConfigOption[] } = await prompt({
		type: "multiselect",
		name: "configType",
		message:
			"Select the configuration files you want to generate (use space to select, enter to confirm):",
		choices: [
			{ title: "ESlint", value: "eslint" },
			{ title: "Prettier", value: "prettier" },
			{ title: "Editor Config", value: "editorConfig" },
			{ title: "BiomeJS", value: "biomejs" }
		]
	});

	let packageManagerOption: PackageManager;
	if (configType) {
		const { packageManager }: { packageManager: PackageManager } =
			await prompt({
				name: "packageManager",
				message: "What package manager that you have do you prefer?",
				type: "select",
				choices: [
					{
						title: "Current",
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
				validate: (option: { title: string; value: string }) =>
					!option ? "Select an option" : true
			});
		packageManagerOption = packageManager;
	}

	if (configType && packageManagerOption) {
		if (configType.length >= 0 && packageManagerOption) {
			for (const configName of configType) {
				copyConfig(configName);
			}

			installDeps({
				manager: packageManagerOption,
				config: configType,
				withNextJS,
				withTailwind
			});
		}
	}
})();
