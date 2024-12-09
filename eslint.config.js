import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

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
];
