import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://artifinda-test-aaf09bed12f5.herokuapp.com',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'https://artifinda-test-aaf09bed12f5.herokuapp.com',
        changeOrigin: true,
        secure: false,
      },
      '/login': {
        target: 'https://artifinda-test-aaf09bed12f5.herokuapp.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

