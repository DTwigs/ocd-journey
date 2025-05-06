import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import { fixupPluginRules } from "@eslint/compat";

// export default defineConfig([
//   {
//     files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
//     plugins: { eslint },
//     extends: ["js/recommended"],
//   },
//   {
//     files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
//     languageOptions: { globals: globals.browser },
//   },
//   tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
//   pluginReactNative,
// ]);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
//   recommendedConfig: eslint.configs.recommended,
//   allConfig: eslint.configs.all,
// });

export default tseslint.config(
  // ...fixupConfigRules(reactNativeConfig),
  eslint.configs.recommended,
  prettierRecommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "**/android",
      "**/ios",
      "**/package.json",
      "**/__mocks__",
      "**/jest-setup",
      "**/app.json",
      "**/*.config.js",
      "**/coverage",
      "**/node_modules",
      "**/*.d.ts",
      "**/__generated__",
      "**/scripts",
      "**/.prettierrc.js",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: react,
      "react-native": fixupPluginRules(reactNative),
      "@typescript-eslint": tseslint.plugin,
      prettier: prettier,
      // jest: jest,
      "react-hooks": fixupPluginRules(eslintPluginReactHooks),
    },
    languageOptions: {
      ecmaVersion: 12,
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        warnOnUnsupportedTypeScriptVersion: false,
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.jest,
        ...globals.node,
        ...globals.es2021,
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,

      "prettier/prettier": 2,

      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],

      "prefer-destructuring": 2,
      camelcase: 2,
      "comma-dangle": "off",
      "object-shorthand": 2,
      "no-nested-ternary": 1,
      "no-shadow": 0,
      "@typescript-eslint/no-shadow": 2,
      "no-unused-vars": 0,

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-var-requires": 0,
      "@typescript-eslint/explicit-module-boundary-types": 0,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",

      "react-hooks/exhaustive-deps": "off",

      "react/function-component-definition": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      "react/jsx-curly-brace-presence": [
        "error",
        {
          props: "never",
          children: "never",
        },
      ],

      "react-native/no-inline-styles": "off",
      "consistent-return": "off",
      curly: ["error", "all"],
      "react/display-name": "off",

      "@typescript-eslint/naming-convention": [
        "off",
        {
          selector: ["enumMember", "enum"],
          format: ["PascalCase"],
        },
      ],

      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
  // OVERRIDES
  // {
  //   files: ["*.test.{ts,tsx}"],
  //   plugins: {
  //     "react-native": fixupPluginRules(reactNative),
  //     "@typescript-eslint": tseslint.plugin,
  //   },
  //   rules: {
  //     "react-native/no-inline-styles": 0,
  //     "@typescript-eslint/no-empty-function": 0,
  //     "@typescript-eslint/no-explicit-any": 0,
  //     "@typescript-eslint/no-unused-vars": 0,
  //   },
  // },
  // {
  //   files: ["*.json"],
  //   rules: {
  //     "@stylistic/comma-dangle": "off",
  //   },
  // }
);
