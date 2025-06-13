import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    // Add allowed hosts here
    allowedHosts: [
      'elvificent.com',
      'www.elvificent.com',
      'localhost' // For local development
    ],
    hmr: {
      clientPort: 80, // Important for Cloudflare proxy
      protocol: 'ws' // Use 'ws' not 'wss' when behind Cloudflare
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        secure: false
      },
      '/chatapi': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
});