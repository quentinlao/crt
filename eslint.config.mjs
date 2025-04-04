import eslint from "@eslint/js";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint"; //eslint-disable-line import/no-unresolved
import importPlugin from "eslint-plugin-import";
import globals from "globals";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended, // This is not a plugin object, but a shareable config object
  react.configs.flat["jsx-runtime"], // Add this if you are using React 17+
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.react,
  importPlugin.flatConfigs.typescript,
  // typescript rules
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "import/no-unresolved": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-this-alias": "warn",
    },
  },
  // react rules
  {
    files: ["**/*.{ts,tsx}"],
    settings: {
      react: {
        version: "detect", // detect react version
      },
    },
    rules: {
      "react/jsx-fragments": "off",
      "react/react-in-jsx-scope": "off", // React 17+ doesn't require React import
      "react/prop-types": "off", // TypeScript handles prop types
      "react/jsx-uses-react": "off", // React 17+ doesn't require React import
    },
  },
  // ignores
  {
    ignores: [
      "**/node_modules/**",
      "docs/**",
      "**/dist/**",
      "**/build/**",
      "**/public/**",
      "**/src/index.html",
      ".pnp.*",
      "coverage",
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.jest,
        ...globals.node,
      },
    },
  }
);
