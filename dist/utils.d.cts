import { ConfigOption, PackageManager } from './types.cjs';

declare function buildDestinationFileAndFileName(configName: ConfigOption): [string, string];
declare function detectCurrentPackageManager(): PackageManager;
declare function detectPackageManager(manager: PackageManager): PackageManager;
declare function buildPackageList(config: ConfigOption[], withNextJS: boolean, withTailwind: boolean): string;
declare function installDeps({ config, manager, withNextJS, withTailwind }: {
    manager: NonNullable<PackageManager>;
    config: ConfigOption[];
    withNextJS: boolean;
    withTailwind: boolean;
}): void;
declare function detectReactInPackageJson(): boolean;
declare function copyConfig(configName: ConfigOption): void;

export { buildDestinationFileAndFileName as buildDestinationFileName, buildPackageList, copyConfig, detectCurrentPackageManager, detectPackageManager, detectReactInPackageJson, installDeps };
