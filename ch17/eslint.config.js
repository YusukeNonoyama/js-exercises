import globals from "globals";
import { defineConfig } from "eslint/config";
import js from "@eslint/js"; // ← 推奨ルール（40個の警告の正体）を復活させるために必要

export default defineConfig([
  // 1. 推奨ルールセットを読み込む（これを入れないと警告は増えません）
  js.configs.recommended,

  // 2. カスタム設定
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    
    languageOptions: { 
      globals: globals.browser,
      // ▼ ここが重要：これを "script" にすると、重複定義などのチェックが少し緩くなる可能性があります
      sourceType: "script", 
      
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-empty': 'off',
    },
  },
]);
