import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Regla de TypeScript que deseas forzar como "error"
      "@typescript-eslint/no-explicit-any": "off"
      
      // Opcional: Si quieres desactivar o modificar alguna regla de los 'extends'
      // Por ejemplo, para forzar el uso de imports nombrados en React
      // "react/destructuring-assignment": ["error", "always"] 
    }
  },
])
