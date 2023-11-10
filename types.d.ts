export type ConfigOptions = "eslint" | "prettier";
export type PackageManager = "npm" | "yarn" | "pnpm" | "current" | null;
export type Prompt = {
	configType: Array<ConfigOptions>;
	packageManager: PackageManager;
};
