const { spawnSync } = require("child_process");
const fs = require("fs");

const path = process.cwd();
const packages = {
	npm: "package-lock.json",
	pnpm: "pnpm-lock.yaml",
	yarn: "yarn.lock"
};
const spawnOptions = {
	cwd: path,
	stdio: "inherit",
	env: process.env,
	shell: true
};
// https://www.npmjs.com/package/cli-progress
const deps = [
	"@typescript-eslint/eslint-plugin",
	"@typescript-eslint/parser",
	"eslint",
	"eslint-plugin-babel",
	"eslint-plugin-import",
	"eslint-plugin-react",
	"eslint-plugin-react-hooks",
	"eslint-plugin-sort-imports-es6-autofix",
	"eslint-plugin-unused-imports",
	"prettier",
	"prettier-plugin-tailwindcss"
];

function installDeps() {
	const currDirFiles = fs.readdirSync(path);
	let currDirPackageManager = null;
	if (
		currDirFiles.length === 0 ||
		(currDirFiles.length > 0 && !currDirFiles.includes("package.json"))
	) {
		currDirPackageManager = "npm";
		spawnSync(currDirPackageManager, ["init"], spawnOptions);
	} else {
		for (const file of currDirFiles) {
			switch (file) {
				case packages.pnpm:
					currDirPackageManager = "pnpm";
					break;
				case packages.yarn:
					currDirPackageManager = "yarn";
					break;
				case packages.npm:
					currDirPackageManager = "npm";
					break;
				default:
					currDirPackageManager = "pnpm";
					break;
			}
		}
	}

	spawnSync(currDirPackageManager, ["install", ...deps], spawnOptions);
}

module.exports = { installDeps };
