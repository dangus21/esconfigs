import { type Options } from "tsup";

export const tsup: Options = {
	format: ["cjs", "esm"], // Build for commonJS and ESmodules
	dts: true, // Generate declaration file (.d.ts)
	sourcemap: true,
	clean: true,
	shims: true,
	cjsInterop: true,

	splitting: true,
	minify: true,
	bundle: true,
	skipNodeModulesBundle: true,
	entryPoints: ["src/index.ts"],
	target: "es2020",
	outDir: "dist",
	entry: ["src/**/*.ts"] //include all files under src
};
