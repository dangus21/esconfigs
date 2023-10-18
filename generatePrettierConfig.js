#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const targetPath = path.resolve(__dirname.split("node_modules")[0]);

fs.copyFileSync(
	path.resolve(__dirname, "./prettierrc.js"),
	path.resolve(targetPath, "prettierrc.js")
);
