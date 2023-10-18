#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const targetPath = path.resolve(__dirname.split("node_modules")[0]);

if (!fs.existsSync(targetPath)) {
	fs.copyFileSync(
		path.resolve(__dirname, "prettierrc.js"),
		targetPath + "/prettierrc.js"
	);
}
