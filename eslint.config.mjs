// eslint.config.mjs
import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Импорт парсера как объект (важно для Flat Config)
import * as tsParser from "@typescript-eslint/parser";

// Импорт плагинов
import perfectionist from "eslint-plugin-perfectionist";
import typeScriptEslint from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import prettierPlugin from "eslint-plugin-prettier";
import sonarjsPlugin from "eslint-plugin-sonarjs";
import reactPlugin from "eslint-plugin-react";
import commentLengthPlugin from "eslint-plugin-comment-length";
import importPlugin from "eslint-plugin-import"; // если нужно import/no-cycle

// Эмуляция __dirname в ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Создаём экземпляр для подтягивания старых extends
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // 0) Явно игнорируем сам файл конфигурации,
  //    чтобы правила @typescript-eslint не пытались его анализировать:
  {
    ignores: ["**/eslint.config.mjs"],
  },

  // 1) Подтягиваем конфиги (если какие-то конфликтуют — уберите их)
  ...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
    "eslint-config-prettier",
  ),

  // 2) Наш основной блок настроек
  {
    // Линтим все JS/TS-файлы, кроме eslint.config.mjs
    files: ["**/*.{js,ts,jsx,tsx}", "!eslint.config.mjs"],

    // Подключаем @typescript-eslint/parser в виде ОБЪЕКТА
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        // Включаем typed linting (укажите реальный путь к вашему tsconfig)
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,

        ecmaVersion: "latest",
        sourceType: "module",
      },
    },

    // Объявляем все плагины
    plugins: {
      "@typescript-eslint": typeScriptEslint,
      "unused-imports": unusedImports,
      "prettier": prettierPlugin,
      "sonarjs": sonarjsPlugin,
      "react": reactPlugin,
      "comment-length": commentLengthPlugin,
      "perfectionist": perfectionist,
      "import": importPlugin,
    },

    // Все правила
    rules: {
      // Если хотите заимпортировать recommended-набор perfectionist вручную:
      ...perfectionist.configs["recommended-natural"].rules,

      // --- General ESLint rules
      // "prettier/prettier": "warn",
      "react/prop-types": "off",
      "no-shadow": "off",
      "no-unused-vars": "off",
      "import/no-cycle": "off",
      "no-magic-numbers": "off",
      "no-empty-pattern": "off",
      "no-nested-ternary": "off",
      "import/extensions": "off",
      "no-param-reassign": "off",
      "prefer-rest-params": "off",
      "prefer-destructuring": "off",
      "no-underscore-dangle": "off",
      "no-use-before-define": "off",
      "class-methods-use-this": "off",
      "function-paren-newline": "off",
      "import/no-default-export": "off",
      "unicorn/filename-case": "off",
      "no-bitwise": "off",
      "no-empty-function": "off",
      "no-useless-constructor": "off",
      "sonarjs/no-duplicate-string": "off",

      // --- TypeScript-specific rules
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: { attributes: false },
        },
      ],

      // --- Style and formatting rules
      "brace-style": ["warn", "1tbs"],
      "react-hooks/exhaustive-deps": "off",
      curly: ["warn", "all"],
      "max-len": [
        "warn",
        {
          code: 170,
          ignoreUrls: true,
          ignoreRegExpLiterals: true,
        },

      ],
      "padding-line-between-statements": [
        "warn",
        {
          blankLine: "always",
          prev: ["const", "let", "var"],
          next: "*",
        },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],
      "id-length": [
        "warn",
        {
          min: 1,
          exceptions: ["i", "x", "y", "e", "t", "_", "id", "or", "OR", "z"],
        },
      ],
      "id-match": [
        "warn",
        "^(([A-Za-z0-9]+){1,})|([A-Z][A-Z_0-9]+)$",
        {
          properties: false,
          onlyDeclarations: true,
        },
      ],

      // --- Perfectionist (sorting) rules
      "perfectionist/sort-classes": "off",
      "perfectionist/sort-enums": "off",
      "perfectionist/sort-interfaces": "off",
      "perfectionist/sort-object-types": "off",
      "perfectionist/sort-objects": "off",
      "perfectionist/sort-imports": [
        "warn",
        {
          type: "natural",
          order: "asc",
          groups: [
            // "import",
            // "export",
            "type",
            "react",
            "nanostores",
            ["builtin", "external"],
            "internal-type",
            "internal",
            ["parent-type", "sibling-type", "index-type"],
            ["parent", "sibling", "index"],
            "side-effect",
            "style",
            "object",
            "unknown",
          ],
          "customGroups": {
            value: {
              react: ["react", "react-*"],
              nanostores: "^@nanostores/",
            },
            type: {
              react: "react",
            },
          },
          "newlinesBetween": "always",
          "internalPattern": [
            "^@/components/",
            "^@/stores/",
            "^@/pages/",
            "^@/lib/",
          ],
        },
      ],

      // --- Comment-length rules
      "comment-length/limit-single-line-comments": [
        "warn",
        {
          mode: "overflow-only",
          maxLength: 100,
          logicalWrap: true,
          ignoreUrls: true,
          ignoreCommentsWithCode: true,
          tabSize: 2,
        },
      ],

      // --- Other
      "linebreak-style": ["off", ""],
    },
  },
];
