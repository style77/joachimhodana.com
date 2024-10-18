import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ssr from 'vike/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ssr({ prerender: true })],
})
