import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  base: '/PokerFace/',
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler']
      }
    }),
    tailwindcss(),
    checker({
      typescript: {
        tsconfigPath: './tsconfig.app.json', 
      }, 
    }),
  ]
})
