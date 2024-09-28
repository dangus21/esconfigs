import { detectReactInPackageJson } from "./utils";
import child_process from "node:child_process";
import fs from "node:fs";

const cwd = process.cwd();
const currDirFiles = fs.readdirSync(cwd);
const withReact = detectReactInPackageJson();
const withTS = currDirFiles.some((file) => file.startsWith("tsconfig."));
const withNextJS = currDirFiles.some((file) => file.startsWith("next."));
const withTailwind = currDirFiles.some((file) => file.startsWith("tailwind."));

const eslintDeps = [
	"@typescript-eslint/eslint-plugin",
	"@typescript-eslint/parser",
	"eslint-import-resolver-typescript",
	"eslint-plugin-babel",
	"eslint-plugin-html",
	"eslint-plugin-import",
	"eslint-plugin-prettier",
	"eslint-plugin-react-hooks",
	"eslint-plugin-react",
	"eslint-plugin-sort-imports-es6-autofix",
	"eslint-plugin-unused-imports",
	"eslint-plugin-react-hooks",
	"eslint@8.57.1"
];

const spawnOptions = {
	cwd: cwd,
	stdio: "inherit",
	env: process.env,
	shell: true,
	encoding: "buffer"
} as child_process.SpawnSyncOptionsWithBufferEncoding;

const PACKAGES = {
	pnpm: "pnpm",
	yarn: "yarn",
	npm: "package-lock"
};

export {
	currDirFiles,
	cwd,
	eslintDeps,
	PACKAGES,
	spawnOptions,
	withNextJS,
	withReact,
	withTailwind,
	withTS
};