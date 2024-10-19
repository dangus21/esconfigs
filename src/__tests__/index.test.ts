import * as configs from "../configs";
import * as constants from "../const";
import * as utils from "../utils";
import child_process from "child_process";
import fs from "fs";

jest.mock("fs");
jest.mock("child_process");
jest.mock("prompts");

describe("Config Generator Utils", () => {
	// beforeEach(() => {
	// 	jest.clearAllMocks();
	// 	(fs.existsSync as jest.Mock).mockReset();
	// 	(fs.readdirSync as jest.Mock).mockReset();
	// 	(fs.readFileSync as jest.Mock).mockReset();
	// 	(fs.writeFileSync as jest.Mock).mockReset();
	// 	(child_process.spawnSync as jest.Mock).mockReset();
	// });

	describe("detectCurrentPackageManager", () => {
		it("should detect pnpm", () => {
			(fs.existsSync as jest.Mock).mockImplementation((file) =>
				file.includes("pnpm-lock.yaml")
			);
			expect(utils.detectCurrentPackageManager()).toBe("pnpm");
		});

		it("should detect yarn", () => {
			(fs.existsSync as jest.Mock).mockImplementation((file) =>
				file.includes("yarn.lock")
			);
			expect(utils.detectCurrentPackageManager()).toBe("yarn");
		});

		it("should detect npm", () => {
			(fs.existsSync as jest.Mock).mockImplementation((file) =>
				file.includes("package-lock.json")
			);
			expect(utils.detectCurrentPackageManager()).toBe("npm");
		});

		it("should default to npm when no lock file is found", () => {
			(fs.existsSync as jest.Mock).mockReturnValue(false);
			expect(utils.detectCurrentPackageManager()).toBe("npm");
		});
	});

	describe("detectPackageManager", () => {
		it("should return the specified package manager", () => {
			expect(utils.detectPackageManager("yarn")).toBe("yarn");
		});

		it('should detect current package manager when "current" is specified', () => {
			(fs.existsSync as jest.Mock).mockImplementation((file) =>
				file.includes("yarn.lock")
			);
			expect(utils.detectPackageManager("current")).toBe("yarn");
		});

		it("should initialize npm if no package.json exists", () => {
			(fs.existsSync as jest.Mock).mockReturnValue(false);
			(fs.readdirSync as jest.Mock).mockReturnValue([]);
			utils.detectPackageManager("npm");
			expect(child_process.spawnSync).toHaveBeenCalledWith(
				"npm",
				["init", "-y"],
				expect.any(Object)
			);
		});

		it("should initialize npm if no package.json exists", () => {
			(fs.existsSync as jest.Mock).mockReturnValue(false);
			(fs.readdirSync as jest.Mock).mockReturnValue([]);
			utils.detectPackageManager("npm");
			expect(child_process.spawnSync).toHaveBeenCalledWith(
				"npm",
				["init", "-y"],
				expect.any(Object)
			);
			// The real 'npm init' is not executed, only our mock is called
		});
	});

	describe("buildPackageList", () => {
		it("should build correct package list for ESLint and Prettier with NextJS and Tailwind", () => {
			const result = utils.buildPackageList(
				["eslint", "prettier"],
				true,
				true
			);
			expect(result).toContain("prettier");
			expect(result).toContain("prettier-plugin-tailwindcss");
			expect(result).toContain("@next/eslint-plugin-next");
			expect(result).toContain("eslint@8.57.1");
		});

		it("should build correct package list for Biome without NextJS and Tailwind", () => {
			const result = utils.buildPackageList(["biomejs"], false, false);
			expect(result).toContain("@biomejs/biome@latest");
			expect(result).not.toContain("prettier");
			expect(result).not.toContain("@next/eslint-plugin-next");
		});
	});

	describe("copyConfig", () => {
		it("should write the correct ESLint config file", () => {
			utils.copyConfig("eslint");
			expect(fs.writeFileSync).toHaveBeenCalledWith(
				expect.stringContaining(".eslintrc.js"),
				expect.stringContaining("module.exports =")
			);
		});

		it("should write the correct Prettier config file", () => {
			utils.copyConfig("prettier");
			expect(fs.writeFileSync).toHaveBeenCalledWith(
				expect.stringContaining(".prettierrc"),
				expect.stringContaining('"singleQuote": false')
			);
		});

		it("should write the correct Biome config file", () => {
			utils.copyConfig("biomejs");
			expect(fs.writeFileSync).toHaveBeenCalledWith(
				expect.stringContaining("biome.json"),
				expect.stringContaining('"$schema":')
			);
		});

		it("should write the correct EditorConfig file", () => {
			utils.copyConfig("editorConfig");
			expect(fs.writeFileSync).toHaveBeenCalledWith(
				expect.stringContaining(".editorConfig"),
				expect.stringContaining("root = true")
			);
		});
	});

	describe("detectReactInPackageJson", () => {
		it("should return true when React is in dependencies", () => {
			(fs.existsSync as jest.Mock).mockReturnValue(true);
			(fs.readFileSync as jest.Mock).mockReturnValue(
				JSON.stringify({
					dependencies: { react: "^17.0.2" }
				})
			);
			expect(utils.detectReactInPackageJson()).toBe(true);
		});

		it("should return true when React is in devDependencies", () => {
			(fs.existsSync as jest.Mock).mockReturnValue(true);
			(fs.readFileSync as jest.Mock).mockReturnValue(
				JSON.stringify({
					devDependencies: { "react-dom": "^17.0.2" }
				})
			);
			expect(utils.detectReactInPackageJson()).toBe(true);
		});

		it("should return false when React is not in package.json", () => {
			(fs.existsSync as jest.Mock).mockReturnValue(true);
			(fs.readFileSync as jest.Mock).mockReturnValue(
				JSON.stringify({
					dependencies: { lodash: "^4.17.21" }
				})
			);
			expect(utils.detectReactInPackageJson()).toBe(false);
		});

		it("should return false when package.json does not exist", () => {
			(fs.existsSync as jest.Mock).mockReturnValue(false);
			expect(utils.detectReactInPackageJson()).toBe(false);
		});
	});

	describe("installDeps", () => {
		it("should call spawnSync with the correct package manager and arguments", () => {
			utils.installDeps({
				config: ["eslint", "prettier"],
				manager: "npm",
				withNextJS: true,
				withTailwind: true
			});
			expect(child_process.spawnSync).toHaveBeenCalledWith(
				"npm",
				["install", expect.stringContaining("eslint@8.57.1")],
				expect.any(Object)
			);
		});

		it('should use "add" for yarn', () => {
			utils.installDeps({
				config: ["eslint"],
				manager: "yarn",
				withNextJS: false,
				withTailwind: false
			});
			expect(child_process.spawnSync).toHaveBeenCalledWith(
				"yarn",
				["add", expect.stringContaining("eslint@8.57.1")],
				expect.any(Object)
			);
		});

		it("should not actually run any commands", () => {
			utils.installDeps({
				config: ["eslint"],
				manager: "npm",
				withNextJS: false,
				withTailwind: false
			});
			expect(child_process.spawnSync).toHaveBeenCalled();
			// The real command is not executed, only our mock is called
		});
	});
});

describe("Config Files", () => {
	it("should have correct structure for ESLint config", () => {
		expect(configs.eslint).toHaveProperty("env");
		expect(configs.eslint).toHaveProperty("extends");
		expect(configs.eslint).toHaveProperty("plugins");
		expect(configs.eslint).toHaveProperty("rules");
	});

	it("should have correct structure for Prettier config", () => {
		expect(configs.prettier).toHaveProperty("singleQuote");
		expect(configs.prettier).toHaveProperty("trailingComma");
		expect(configs.prettier).toHaveProperty("tabWidth");
	});

	it("should have correct structure for Biome config", () => {
		expect(configs.biome).toHaveProperty("$schema");
		expect(configs.biome).toHaveProperty("linter");
		expect(configs.biome).toHaveProperty("javascript");
	});

	it("should have correct content for EditorConfig", () => {
		expect(configs.editorConfig).toContain("root = true");
		expect(configs.editorConfig).toContain("indent_style = tab");
	});
});

describe("Constants", () => {
	it("should have correct PACKAGES object", () => {
		expect(constants.PACKAGES).toEqual({
			pnpm: "pnpm-lock.yaml",
			yarn: "yarn.lock",
			npm: "package-lock.json"
		});
	});

	it("should have correct spawnOptions", () => {
		expect(constants.spawnOptions).toHaveProperty("cwd");
		expect(constants.spawnOptions).toHaveProperty("stdio", "inherit");
		expect(constants.spawnOptions).toHaveProperty("shell", true);
	});
});
