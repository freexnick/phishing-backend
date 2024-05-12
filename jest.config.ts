import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/src"],
    maxWorkers: 1,
    bail: true,
    verbose: true,
};

export default config;
