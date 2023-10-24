#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

fs.copyFileSync(
	path.resolve(__dirname, "./eslintrc.js"),
	path.resolve(process.cwd(), "eslintrc.js")
);
