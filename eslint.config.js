import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  pluginJs.configs.recommended,

  // React configuration
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest", 
        sourceType: "module",  
        ecmaFeatures: {
          jsx: true, 
        },
      },
    },
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: "detect", 
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules, 
      "react/react-in-jsx-scope": "off", 
      "react/prop-types": "off", 
      "react/no-unescaped-entities": "off", 
    },
  },

  // Jest configuration
  {
    files: ["**/*.{test,spec}.{js,mjs,cjs,jsx}"], // Target test files
    languageOptions: {
      globals: {
        ...globals.node, // Node.js globals for test files
        ...globals.jest, // Jest globals
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      jest: pluginJest,
    },
    rules: {
      ...pluginJest.configs.recommended.rules, // Apply recommended Jest rules
    },
  },
];
