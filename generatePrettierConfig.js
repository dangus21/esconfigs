const fs = require("fs");
const path = require("path");

const targetPath = path.resolve(__dirname, "../..");

if (!fs.existsSync(targetPath)) {
	fs.copyFileSync(
		path.resolve(__dirname, "prettierrc.js"),
		targetPath + "/prettierrc.js"
	);
}
