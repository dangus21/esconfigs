#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

fs.copyFileSync(
	path.resolve(__dirname, "./.prettierrc"),
	path.resolve(process.cwd(), ".prettierrc")
);
