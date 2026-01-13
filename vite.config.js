import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()
    , tailwindcss()
    , svgr()
  ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
        server: {
          port: 3005,
          proxy: {
            '/create-order': 'https://vetrasales-payment-service-production.up.railway.app',
            '/payment-callback': 'https://vetrasales-payment-service-production.up.railway.app',
          }
        }
})
