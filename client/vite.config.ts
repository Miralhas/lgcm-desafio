import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'
import path from "path"
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  preview: {
    port: 4173,
    allowedHosts: true,
    host: true,
    cors: true
  },
  server: {
    port: 4173,
    host: true,
    origin: "http://0.0.0.0:4173",
    allowedHosts: true,
  },
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
