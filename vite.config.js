import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
        server: {
          port: 3005,
          proxy: {
            '/create-order': 'http://localhost:8081',
            '/payment-callback': 'http://localhost:8081',
          }
        }
})
