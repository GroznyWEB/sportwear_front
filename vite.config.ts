// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // Только React-плагин
  build: {
    // Базовые оптимизации билда
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          // Разделение vendor-чанков (опционально)
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});