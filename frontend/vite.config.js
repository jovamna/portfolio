import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600, // Ajusta el límite según tus necesidades

    rollupOptions: {
      output: {
        // Configuración de manualChunks actualizada
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Agrupa los módulos de node_modules en un archivo separado
            return 'vendor';
          }
        },
      },
    },
  },
});
