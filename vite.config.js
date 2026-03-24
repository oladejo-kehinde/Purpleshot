// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {  // Matches fetch('/api/events') etc.
        target: 'http://localhost:YOUR_BACKEND_PORT',  // Change this!
        changeOrigin: true,
        secure: false  // If backend is HTTP
      }
    }
  }
})
