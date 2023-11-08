const { spawn } = require("child_process");
const fs = require("fs");

const path = process.cwd();
const packages = {
	npm: "package-lock.json",
	pnpm: "pnpm-lock.yaml",
	yarn: "yarn.lock"
};

// https://www.npmjs.com/package/cli-progress
// const deps = [
// 	"@types/node@^20.8.6",
// 	"@typescript-eslint/eslint-plugin@^6.8.0",
// 	"@typescript-eslint/parser@^6.8.0",
// 	"eslint@^8.51.0",
// 	"eslint-plugin-babel@^5.3.1",
// 	"eslint-plugin-import@^2.28.1",
// 	"eslint-plugin-react@^7.33.2",
// 	"eslint-plugin-react-hooks@^4.6.0",
// 	"eslint-plugin-sort-imports-es6-autofix@^0.6.0",
// 	"eslint-plugin-unused-imports@^3.0.0",
// 	"prettier@^3.0.3",
// 	"prettier-plugin-tailwindcss@^0.5.6",
// 	"prompts@^2.4.2"
// ];

function installDeps() {
	const currDirFiles = fs.readdirSync(path);
	let currDirPackageManager = null;
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
				break;
		}
	}
	spawn(currDirPackageManager, ["install"], { cwd: path });
}

export { installDeps };
