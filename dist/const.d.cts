import child_process from 'node:child_process';

declare const cwd: string;
declare const currDirFiles: string[];
declare const withReact: boolean;
declare const withTS: boolean;
declare const withNextJS: boolean;
declare const withTailwind: boolean;
declare const eslintDeps: string[];
declare const spawnOptions: child_process.SpawnSyncOptionsWithBufferEncoding;
declare const PACKAGES: {
    pnpm: string;
    yarn: string;
    npm: string;
};

export { PACKAGES, currDirFiles, cwd, eslintDeps, spawnOptions, withNextJS, withReact, withTS, withTailwind };
