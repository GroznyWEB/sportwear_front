// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // Только React-плагин
  server: {
    host: '0.0.0.0',  // разрешает доступ с любых IP (опционально)
    allowedHosts: [
      'subkimonos.ru',  // ваш домен
      'www.subkimonos.ru',  // с www, если нужно
    ],
  },
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
