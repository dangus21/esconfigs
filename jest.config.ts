module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	collectCoverage: true,
	coverageReporters: ["text", "lcov"],
	coverageThreshold: {
		global: {
			branches: 90,
			functions: 90,
			lines: 90,
			statements: 90
		}
	},
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/$1"
	},
	roots: ["<rootDir>/src"],
	testMatch: [
		"**/__tests__/**/*.+(ts|tsx|js)",
		"**/?(*.)+(spec|test).+(ts|tsx|js)"
	],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest"
	},
	coverageDirectory: "coverage"
};
