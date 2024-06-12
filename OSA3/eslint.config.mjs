import globals from "globals";
import pluginJs from "@eslint/js";



export default [
  {
    files: ["**/*.js"], 
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: 'latest',
    globals:{
      process: true
    }},
    ignores: ["dist/**","**/.*"],
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 0
    },
  },
  
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended
];