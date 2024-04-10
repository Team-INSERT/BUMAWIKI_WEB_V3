module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  env: {
    node: true,
  },
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb-typescript",
    "plugin:prettier/recommended",
  ],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    // 'React' must be in scope when using JSX in Next.JS
    "react/react-in-jsx-scope": "off",
    "react/jsx-no-useless-fragment": 0,
    "react/jsx-key": 1,
    "react/no-danger": 0,
    "react/button-has-type": 0,
    "@typescript-eslint/no-use-before-define": "off",
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }], // should add ".ts" if typescript project
    "no-unused-vars": "off",
    "no-param-reassign": "off",
    "react/function-component-definition": [
      2,
      { namedComponents: ["arrow-function", "function-declaration"] },
    ],
    "@typescript-eslint/no-unused-vars": "warn",
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "import/no-cycle": 0,
    "react/require-default-props": 0,
    "react/jsx-props-no-spreading": 0,
    "no-empty-interface": 0,
    "import/prefer-default-export": "off",
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        labelAttributes: ["htmlFor"],
      },
    ],
    "react/no-array-index-key": 0,
    "consistent-return": 0,
    "react-hooks/exhaustive-deps": "off",
    "no-restricted-imports": [
      "warn",
      {
        paths: [
          {
            name: "react",
            importNames: ["default"],
            message: "import React from 'react' is increases bundling size without the need.",
          },
        ],
      },
    ],
  },
};
