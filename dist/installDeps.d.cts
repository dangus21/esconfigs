import { PackageManager, ConfigOption } from './index.cjs';

declare function installDeps({ config, manager, withNextJS, withTailwind }: {
    manager: NonNullable<PackageManager>;
    config: ConfigOption[];
    withNextJS: boolean;
    withTailwind: boolean;
}): void;

export { installDeps };
