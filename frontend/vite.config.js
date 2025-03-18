import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
const frontendPORT = 5000;
const backendPORT = 5500;

export default defineConfig({
    server: {
        port: frontendPORT,
        proxy: {
          '/api': {
            target: `http://localhost:${backendPORT}`, 
            changeOrigin: true
          }
        }
      },
    plugins: [
        tailwindcss(),
    ],
});
