import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// This is the standard and correct configuration for our project.
// It only includes the essential plugin for React.
export default defineConfig({
  plugins: [react()],
})

