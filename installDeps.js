const { spawnSync } = require("child_process");
const fs = require("fs");

const path = process.cwd();
const spawnOptions = {
	cwd: path,
	stdio: "inherit",
	env: process.env,
	shell: true
};

const prettierDeps = ["prettier-plugin-tailwindcss"];
const eslintDeps = [
	"@typescript-eslint/eslint-plugin",
	"@typescript-eslint/parser",
	"eslint",
	"eslint-plugin-babel",
	"eslint-plugin-import",
	"eslint-plugin-react",
	"eslint-plugin-react-hooks",
	"eslint-plugin-sort-imports-es6-autofix",
	"eslint-plugin-unused-imports",
	"prettier"
];

/**
 * @param {import("./types").PackageManager} manager
 * @param {import("./types").ConfigOptions[]} config
 */
function installDeps(manager, config) {
	const currDirFiles = fs.readdirSync(path);
	/** @type {import("./types").PackageManager} */
	let currDirPackageManager = null;
	if (
		currDirFiles.length === 0 ||
		(currDirFiles.length > 0 && !currDirFiles.includes("package.json"))
	) {
		currDirPackageManager = "npm";
		spawnSync(currDirPackageManager, ["init"], spawnOptions);
	} else {
		if (manager === "current") {
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
		} else {
			currDirPackageManager = manager;
		}
	}

	const packages = String(
		[
			...(config.includes("prettier") ? prettierDeps : []),
			...(config.includes("eslint") ? eslintDeps : [])
		].join(" ")
	);
	console.log("LOG ~ file: installDeps.js:74 ~ packages:", packages);

	spawnSync(
		currDirPackageManager,
		[currDirPackageManager === "yarn" ? "add" : "install", packages],
		spawnOptions
	);
}

module.exports = { installDeps };
