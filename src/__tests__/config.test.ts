import * as configs from "../configs";

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
