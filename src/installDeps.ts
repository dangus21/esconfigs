import { readdirSync } from "fs";
import { SpawnSyncOptionsWithBufferEncoding, spawnSync } from "child_process";
import { ConfigOption, PackageManager } from "./";

const path = process.cwd();
const spawnOptions = {
	cwd: path,
	stdio: "inherit",
	env: process.env,
	shell: true,
	encoding: "buffer"
} as SpawnSyncOptionsWithBufferEncoding;

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
	"eslint",
];

const PACKAGES = {
	pnpm: "pnpm",
	yarn: "yarn",
	npm: "package-lock",
};

function installDeps(manager: NonNullable<PackageManager>, config: ConfigOption[], withTailwind = false) {
	const currDirFiles = readdirSync(path);
	let currDirPackageManager = manager;

	if (
		currDirFiles.length === 0 ||
		(currDirFiles.length > 0 && !currDirFiles.includes("package.json"))
	) {
		currDirPackageManager = "npm";
		spawnSync(currDirPackageManager, ["init", "-y"], spawnOptions);
	}

	if (manager === "current") {
		for (const file of currDirFiles) {
			switch (true) {
				case file.startsWith(PACKAGES.pnpm):
					currDirPackageManager = "pnpm";
					break;
				case file.startsWith(PACKAGES.yarn):
					currDirPackageManager = "yarn";
					break;
				case file.startsWith(PACKAGES.npm):
					currDirPackageManager = "npm";
					break;
				default:
					currDirPackageManager = "pnpm";
					break;
			}
		}
	} else {
		currDirPackageManager = manager;
	}
	const packages = String(
		[
			...(config.includes("prettier")
				? withTailwind
					? ["prettier", "prettier-plugin-tailwindcss"]
					: ["prettier"]
				: []),
			...(config.includes("eslint") ? eslintDeps : []),
			...(config.includes("biomejs") ? ["@biomejs/biome@latest"] : []),
		].join(" "),
	);

	spawnSync(
		currDirPackageManager,
		[currDirPackageManager === "yarn" ? "add" : "install", packages],
		spawnOptions,
	);
}

export { installDeps };
