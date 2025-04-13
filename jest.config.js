import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": "ts-jest" // Transform TypeScript files
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    setupFiles: ["dotenv/config"],
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    globals: {
        "ts-jest": {
            isolatedModules: true
        }
    }
};

export default config;