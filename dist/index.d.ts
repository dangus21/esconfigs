type ConfigOption = "eslint" | "prettier" | "biomejs";
type PackageManager = "npm" | "yarn" | "pnpm" | "current" | null;
type Prompt = {
    configType: [ConfigOption];
    packageManager: PackageManager;
    withTailwind: boolean;
};
type BuildDestinationFileName = (configName: ConfigOption, withTailwind: boolean) => [string, string];

export type { BuildDestinationFileName, ConfigOption, PackageManager, Prompt };
