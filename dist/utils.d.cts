import { ConfigOption, PackageManager } from './types.cjs';

declare function buildDestinationFileAndFileName(configName: ConfigOption): [string, string];
declare function installDeps({ config, manager, withNextJS, withTailwind }: {
    manager: NonNullable<PackageManager>;
    config: ConfigOption[];
    withNextJS: boolean;
    withTailwind: boolean;
}): void;
declare function detectReactInPackageJson(): boolean;
declare function copyConfig(configName: ConfigOption): void;

export { buildDestinationFileAndFileName as buildDestinationFileName, copyConfig, detectReactInPackageJson, installDeps };
