import { ConfigOption, PackageManager } from './types.cjs';

declare function buildDestinationFileName(configName: ConfigOption): [string, string];
declare function installDeps({ config, manager, withNextJS, withTailwind }: {
    manager: NonNullable<PackageManager>;
    config: ConfigOption[];
    withNextJS: boolean;
    withTailwind: boolean;
}): void;
declare function detectReactInPackageJson(): boolean;
declare function copyConfig(configName: ConfigOption): void;

export { buildDestinationFileName, copyConfig, detectReactInPackageJson, installDeps };
