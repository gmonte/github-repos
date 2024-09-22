import react from '@vitejs/plugin-react'
import path from 'path'
import Unfonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    Unfonts({
      google: {
        families: ['Inter:400,700', 'Fira Code:400,700'],
      },
    }),
  ]
})
