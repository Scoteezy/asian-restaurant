/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions } */
export default config = {
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 80, // Максимальная длина строки перед переносом
  tabWidth: 2,    // Ширина табуляции
  useTabs: false, // Использовать пробелы вместо табуляции
  semi: true,     // Использовать точки с запятой
  singleQuote: true, // Использовать одинарные кавычки
  trailingComma: "es5", // Висячие запятые в ES5 (массивы, объекты)
  bracketSpacing: true, // Пробелы внутри фигурных скобок { foo: bar }
  arrowParens: "always", // Всегда оборачивать аргументы стрелочных функций в скобки
};

