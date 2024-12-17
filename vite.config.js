import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/components': '/src/components',
      '@/utils': '/src/utils',
      '@/hooks': '/src/hooks',
    },
  },
  server: {
    host: '127.0.0.1',
    port: 3000 // Change this to your desired port
  },

})
