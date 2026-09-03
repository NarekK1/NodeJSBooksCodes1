import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.browser }, "extends": "eslint:recommended",
  "env": {
    "node": true,
    "es2021": true
  },
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "no-console": "warn"
  } 
},
  tseslint.configs.recommended,
]);
