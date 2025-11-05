// ESLint flat config for ESLint v9+
// Keep it simple and valid: array of config objects, avoid spreading arrays into objects
import js from "@eslint/js";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import globals from "globals";

const rootDir = new URL(".", import.meta.url).pathname;

export default [
  // 1) Global ignores
  {
    ignores: [
      "dist",
      "node_modules",
      "build",
      "coverage",
      "**/*.d.ts",
      "eslint.config.js",
      "packages/**/dist",
      "packages/**/build",
      "packages/**/lib",
    ],
  },

  // 2) Base JS recommended with browser globals
  {
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.es2021 },
    },
  },

  // 3) Type-aware TS rules for app source only (src/**)
  ...tseslint.configs.recommendedTypeChecked.map((c) => ({
    ...c,
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      ...(c.languageOptions ?? {}),
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: rootDir,
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: { ...globals.browser, ...globals.es2021 },
    },
  })),
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // Calibrated TS rules (mostly warnings)
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-misused-promises": "warn",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/restrict-template-expressions": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
    },
  },

  // 4) TS files outside src: non-type-aware recommended rules
  ...tseslint.configs.recommended.map((c) => ({
    ...c,
    files: [
      "edge/**/*.ts",
      "scripts/**/*.ts",
      "*.ts",
      "*.tsx",
      "**/*.cts",
      "**/*.mts",
    ],
    languageOptions: {
      ...(c.languageOptions ?? {}),
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node, ...globals.es2021 },
    },
    rules: {
      ...(c.rules ?? {}),
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  })),

  // 5) Node environment for config and scripts
  {
    files: ["vite.config.ts", "tailwind.config.js", "eslint.config.js", "scripts/**/*.{ts,js}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node, ...globals.es2021 },
    },
    rules: { "no-undef": "off" },
  },
];
