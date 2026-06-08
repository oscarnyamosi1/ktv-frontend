
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: "127.0.0.1",   // force consistent origin (IMPORTANT for cookies)
    port: 5000,
    strictPort: true,
    allowedHosts: 'all',

     }

})