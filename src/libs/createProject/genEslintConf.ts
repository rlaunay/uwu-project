import { AnswerSetup } from "./prompt";
import fs from "fs";

export default async function genEslintConf(answer: AnswerSetup) {
  const rootPath = `./${answer.name}/.eslintrc.json`;
  if (answer.lang === "ts") {
    fs.writeFileSync(rootPath, JSON.stringify(tsEsConf, null, 2));
  } else {
    fs.writeFileSync(rootPath, JSON.stringify(jsEsConf, null, 2));
  }
}

const jsEsConf = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["off"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
  },
};

const tsEsConf = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["off"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
  },
};
