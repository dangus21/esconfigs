import * as constants from "../const";

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
