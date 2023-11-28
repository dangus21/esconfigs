export type ConfigOptions = "eslint" | "prettier";
export type PackageManager = "npm" | "yarn" | "pnpm" | "current" | null;
export type Prompt = {
	configType: [ConfigOptions];
	packageManager: PackageManager;
	withTailwind: boolean;
};
export type BuildDestinationFileName = (
	configName: ConfigOptions,
	withTailwind: boolean
) => [string, string];
