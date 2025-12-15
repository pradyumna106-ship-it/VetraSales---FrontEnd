import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
        server: {
          port: 3005,
          proxy: {
            '/create-order': 'https://vetrasales-payment-service-production.up.railway.app',
            '/payment-callback': 'https://vetrasales-payment-service-production.up.railway.app',
          }
        }
})
